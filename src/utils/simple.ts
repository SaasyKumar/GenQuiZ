type MCQ = {
    question: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: "A" | "B" | "C" | "D";
};
function parseMCQ(text: string): MCQ[] {
    const blocks = text.trim().split(/\n\s*\n/);

    return blocks.map((block) => {
        const lines = block.split("\n").map((l) => l.trim());

        const question = lines[0].replace(/^Question:\s*/, "");

        const options = {
            A: lines[1].slice(3),
            B: lines[2].slice(3),
            C: lines[3].slice(3),
            D: lines[4].slice(3),
        };

        const answer = lines[5].replace("ANSWER:", "").trim() as MCQ["answer"];

        return { question, options, answer };
    });
}
export default parseMCQ;
