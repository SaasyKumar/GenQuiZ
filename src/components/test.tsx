import { type question, extractFromAikenFormat } from "../utils/extractQn";
import parseMCQ from "../utils/simple";

const testTxt: string = `QUESTION: What is the primary purpose of the Immediate Test method?
A. To study a topic
B. To record yourself explaining a topic
C. To experiment with different paces of learning
D. To check the accuracy of your understanding
ANSWER: D
EXPLANATION: The Immediate Test method aims to verify if your understanding of a topic is correct by recording and reviewing your explanation.

QUESTION: What does the Trident method involve?
A. Using three points to summarize a topic
B. Recording yourself explaining a topic
C. Experimenting with different learning paces
D. Converting explanations into content
ANSWER: A
EXPLANATION: The Trident method uses three key points or words to fully summarize a topic, making it concise and memorable.

QUESTION: What is the main goal of the Conversion method?
A. To study a topic thoroughly
B. To convert explanations into content for a platform
C. To experiment with different learning paces
D. To record yourself explaining a topic
ANSWER: B
EXPLANATION: The Conversion method focuses on transforming your explanations into platform-specific content and editing it accordingly.

QUESTION: What is the recommended learning progression in the Chess Master method?
A. Beginner to intermediate to advance
B. Pushing depth first
C. Experimenting with different paces
D. Recording explanations
ANSWER: A
EXPLANATION: The Chess Master method suggests progressing from beginner to intermediate to advance levels without pushing depth first, focusing on quick learning.

QUESTION: What does the Converge method likely focus on?
A. Summarizing topics with key points
B. Integrating different learning methods
C. Converting explanations into content
D. Recording and reviewing explanations
ANSWER: B
EXPLANATION: The Converge method likely focuses on integrating and combining different learning techniques to enhance understanding and retention.`;
const test: question[] = extractFromAikenFormat(testTxt);
export { test };
export default function App() {
    console.log(extractFromAikenFormat(testTxt));
    console.log(parseMCQ(testTxt));
    return (
        <>
            <h1>Test page</h1>
        </>
    );
}
