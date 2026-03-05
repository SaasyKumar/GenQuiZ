function isQuestionStart(line: string): boolean {
    if (/^Question:/i.test(line)) return true;
    if (/^\d+[.)\s]/.test(line)) return true;
    return false;
}

function extractFromAikenFormat(data: string) {
    const allLines = data.trim().replace(/\r\n/g, "\n").split("\n");
    const blocks: string[][] = [];
    let current: string[] | null = null;

    for (const line of allLines) {
        if (isQuestionStart(line)) {
            current = [line];
            blocks.push(current);
        } else if (current !== null) {
            current.push(line);
        }
    }

    const optionPattern = /^([a-zA-Z])[).] (.+)/;

    const result: question[] = blocks.map((lines) => {
        const question = lines[0].replace(/^Question:\s*/i, "").trim();

        const options: Record<string, string> = {};
        let answer = "";
        let explanation = "";
        let inExplanation = false;

        for (const line of lines.slice(1)) {
            if (/^ANSWER:/i.test(line)) {
                inExplanation = false;
                const m = line.match(/ANSWER:\s*([a-zA-Z])/i);
                if (m) answer = m[1].toLowerCase();
                continue;
            }

            if (/^EXPLANATION:/i.test(line)) {
                inExplanation = true;
                const m = line.match(/EXPLANATION:\s*(.*)/i);
                if (m) explanation = m[1];
                continue;
            }
            if (inExplanation) {
                explanation += (explanation ? " " : "") + line;
                continue;
            }

            const optionMatch = line.match(optionPattern);
            if (optionMatch) {
                options[optionMatch[1].toLowerCase()] = optionMatch[2].trim();
            }
        }

        return {
            id: crypto.randomUUID(),
            question,
            options,
            answer,
            explanation: explanation.trim(),
        };
    });

    return result;
}

type question = {
    id: string;
    question: string;
    options: Record<string, string>;
    answer: string;
    explanation: string;
};

export { extractFromAikenFormat };
export type { question };
