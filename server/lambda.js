import {
    BedrockRuntimeClient,
    ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({});

// ── Token budget constants ────────────────────────────────────────────────────
// Nova Pro's context window is ~300K tokens, but API Gateway has a 10MB body
// limit and Bedrock enforces its own per-request input token ceiling.
// A conservative safe character limit for the user message (≈ 200K tokens at
// ~4 chars/token). We truncate client-side before sending to avoid the error.
const MAX_INPUT_CHARS = 80_000; // ~20K tokens — plenty for study material

// ── Multipart parser ─────────────────────────────────────────────────────────
/**
 * Parse a multipart/form-data body into a key→value map.
 * API Gateway passes the raw body base64-encoded when isBase64Encoded=true.
 */
function parseMultipart(body, isBase64, contentType) {
    const rawBody = isBase64
        ? Buffer.from(body, "base64").toString("utf8")
        : body;

    const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^\s;]+))/i);
    if (!boundaryMatch) throw new Error("No multipart boundary found in Content-Type");
    const boundary = boundaryMatch[1] || boundaryMatch[2];

    const fields = {};
    const delimiter = `--${boundary}`;
    const parts = rawBody.split(delimiter);

    for (const part of parts) {
        if (!part || part.trim() === "--" || part.trim() === "") continue;

        const crlfIndex = part.indexOf("\r\n\r\n");
        const lfIndex = part.indexOf("\n\n");
        const separatorIndex = crlfIndex !== -1 ? crlfIndex : lfIndex;
        if (separatorIndex === -1) continue;

        const headerSection = part.slice(0, separatorIndex);
        let value = part.slice(separatorIndex + (crlfIndex !== -1 ? 4 : 2));
        value = value.replace(/\r\n$/, "").replace(/\n$/, "");

        const nameMatch = headerSection.match(/name="([^"]+)"/i);
        if (nameMatch) {
            fields[nameMatch[1]] = value;
        }
    }

    return fields;
}

// ── Input truncation ──────────────────────────────────────────────────────────
/**
 * Truncate userMessage to MAX_INPUT_CHARS, breaking at the last whitespace
 * boundary so we don't cut mid-word. Returns the (possibly truncated) string
 * and a boolean indicating whether truncation occurred.
 */
function truncateInput(text, limit = MAX_INPUT_CHARS) {
    if (text.length <= limit) return { text, truncated: false };

    // Find the last whitespace at or before the limit to avoid mid-word cuts
    let cutAt = limit;
    while (cutAt > 0 && !/\s/.test(text[cutAt])) cutAt--;
    if (cutAt === 0) cutAt = limit; // no whitespace found — hard cut

    return { text: text.slice(0, cutAt).trimEnd(), truncated: true };
}

// ── Error classification ──────────────────────────────────────────────────────
/**
 * Return true if the Bedrock SDK error is an input-token-exceeded error.
 * Bedrock surfaces this as a ValidationException with a specific message.
 */
function isTokenLimitError(err) {
    if (!err) return false;
    const msg = (err.message || "").toLowerCase();
    return (
        msg.includes("input tokens exceeded") ||
        msg.includes("number of input tokens exceeds") ||
        msg.includes("token") && msg.includes("exceed") ||
        err.name === "ValidationException" && msg.includes("token")
    );
}

// ── Handler ───────────────────────────────────────────────────────────────────
export const handler = async (event) => {
    let userMessage, level, questionCount;

    const contentType = (
        event.headers?.["Content-Type"] ||
        event.headers?.["content-type"] ||
        ""
    ).toLowerCase();

    const isMultipart = contentType.includes("multipart/form-data");

    if (isMultipart) {
        const fields = parseMultipart(
            event.body,
            event.isBase64Encoded === true,
            contentType,
        );
        userMessage = fields["content"] || "";
        level = fields["level"] || "Medium";
        questionCount = fields["no_of_questions"] || "5";
    } else {
        let payload = event;
        if (typeof event.body === "string") {
            try {
                payload = JSON.parse(event.body);
            } catch {
                payload = event;
            }
        }
        userMessage = payload["content"] || "";
        level = payload["level"] || "Medium";
        questionCount = payload["no_of_questions"] || "5";
    }

    // ── Truncate oversized input before hitting Bedrock ───────────────────────
    const { text: safeMessage, truncated } = truncateInput(userMessage);
    if (truncated) {
        console.warn(
            `Input truncated from ${userMessage.length} to ${safeMessage.length} chars to stay within token budget.`,
        );
    }

    const modelId = "amazon.nova-pro-v1:0";
    const conversation = [
        {
            role: "user",
            content: [{ text: safeMessage }],
        },
    ];
    const systemPrompt = `Generate ${questionCount} ${level} level mcq questions (can use web source to get the number of questions) based on the prompt in this format, no extra words, no special chars: 
          \nQUESTION: question ?\nA. Option 1\nB. Option 2\nC. Option 3\nD. Option 4\nANSWER: C\nEXPLANATION: explanation in max 5 line\n\n`;
    const systemContent = [{ text: systemPrompt }];
    const maxTokens = 10000;

    const request = {
        modelId,
        messages: conversation,
        system: systemContent,
        inferenceConfig: {
            maxTokens,
            temperature: 0.5,
            topP: 0.9,
        },
    };

    try {
        const command = new ConverseCommand(request);
        const response = await client.send(command);

        const responseText = response.output?.message?.content?.[0]?.text || "";
        console.log(responseText);

        return {
            statusCode: 200,
            body: responseText,
            // Inform the client if the input was silently truncated
            truncated: truncated || undefined,
        };
    } catch (err) {
        console.error("Bedrock error:", err);

        if (isTokenLimitError(err)) {
            // Return a structured 413-style error the frontend can display
            return {
                statusCode: 413,
                errorCode: "INPUT_TOO_LONG",
                body: "",
                message:
                    "Your content is too long for the AI to process. Please shorten it and try again.",
            };
        }

        // Re-surface any other Bedrock / SDK error as a 500
        return {
            statusCode: 500,
            errorCode: "BEDROCK_ERROR",
            body: "",
            message: err.message || "An unexpected error occurred.",
        };
    }
};
