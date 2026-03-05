import {
    BedrockRuntimeClient,
    InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime"; // ES Modules import

const client = new BedrockRuntimeClient({});

export const handler = async (event) => {
    const content = event["content"];
    console.log(content);
    const level = event["level"] || "medium";
    const no_of_questions = event["no_of_questions"];
    // FIXME: change token size accord
    const system_list = [
        {
            text: `Generate ${no_of_questions} ${level} level mcq questions (can use web source to get the number of questions) based on the prompt in this format, no extra words, no special chars: 
            \nQUESTION: question ?\nA. Option 1\nB. Option 2\nC. Option 3\nD. Option 4\nANSWER: C\nEXPLANATION: explanation in max 5 line\n\n`,
        },
    ];
    //Define one or more messages using the "user" and "assistant" roles.
    const message_list = [{ role: "user", content: [{ text: content }] }];

    //Configure the inference parameters.
    const inf_params = {
        maxTokens: no_of_questions * 200,
        topP: 0.9,
        topK: 20,
        temperature: 0.7,
    };
    const input = {
        modelId: "amazon.nova-pro-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            messages: message_list,
            schemaVersion: "messages-v1",
            system: system_list,
            inferenceConfig: inf_params,
        }),
    };

    const command = new InvokeModelCommand(input);
    try {
        const resp = await client.send(command);
        return {
            statusCode: 200,
            body: JSON.parse(new TextDecoder().decode(resp.body))["output"],
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: "Internal Error",
        };
    }
};
