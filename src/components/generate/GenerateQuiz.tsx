import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { extractFromAikenFormat } from "../../utils/extractQn";
import DOMPurify from "dompurify";
import { appContext } from "./../App";
import Button from "../Button";
import Inputs from "../Inputs";
import styles from "/src/styles/generate/generatequiz.module.css";

function GenerateQuiz() {
    const [text, updateText] = useState<string>("");
    const [qnLevel, setQnLevel] = useState<string>("Medium");
    const [noOfQuestions, setNoOfQuestions] = useState<string>("5");
    const appCTX = useContext(appContext);
    const navigate = useNavigate();
    useEffect(() => {
        appCTX?.updateHeaderDisplay(false);
    }, [appCTX]);
    async function submitToBedrock() {
        const resp = await fetch(
            "https://166qmtqw7g.execute-api.us-east-1.amazonaws.com/production/genquiz",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: text,
                    level: qnLevel,
                    no_of_questions: noOfQuestions,
                }),
            },
        );
        const data = await resp.json();
        const txt = data.body["message"]["content"][0]["text"];
        appCTX?.updateRawText(txt);
        appCTX?.setQuestionsList(extractFromAikenFormat(txt));
        navigate("/app/quiz");
    }
    // function onFileInput(ev: React.ChangeEvent<HTMLInputElement>) {
    //     const files = ev.target.files;
    //     if (!files || files.length == 0) return;
    //     const file = files[0];
    // }
    function handleBlur() {
        let num = Number(noOfQuestions);
        if (isNaN(num)) {
            num = 5;
        }
        const clamped = Math.max(5, Math.min(25, num));
        setNoOfQuestions(String(clamped));
    }
    return (
        <div className={styles["body"]}>
            <div className={styles["container"]}>
                <h1>Generate New Quiz</h1>
                <div className={styles["options-1"]}>
                    <Inputs
                        name="level"
                        styleClass={styles["input"]}
                        labelContent="Difficulty Level"
                        InputOptions={{
                            inputType: "select",
                            option: ["Child", "Easy", "Medium", "Hard"],
                        }}
                        defaultValue={qnLevel}
                        onChange={(ev) => setQnLevel(ev.target.value)}
                    />
                    <Inputs
                        name="questions"
                        styleClass={styles["input"]}
                        labelContent="Number of Questions"
                        InputOptions={{
                            inputType: "number",
                            min: 1,
                            max: 25,
                            onBlur: handleBlur,
                        }}
                        defaultValue={noOfQuestions}
                        onChange={(ev) => {
                            setNoOfQuestions(ev.target.value);
                        }}
                    />
                </div>
                <div className={styles["options-2"]}>
                    <div className={styles["txt-input-label"]}>
                        Paste your notes here:
                    </div>
                    {/* FIXME to file support
                    <Inputs
                        name="file-input"
                        styleClass={styles["file-input"]}
                        InputOptions={{
                            inputType: "file",
                        }}
                        onChange={(ev) => {
                            onFileInput(ev);
                        }}
                    /> */}
                </div>
                <Inputs
                    name="text-input"
                    InputOptions={{
                        inputType: "text",
                        styleClass: styles["quiz-input"],
                        placeholderContent:
                            "Start typing or paste your Study materials, Notes or Articles here...",
                    }}
                    onChange={(ev) => {
                        updateText(DOMPurify.sanitize(ev.target.value));
                    }}
                />
                <Button
                    buttonStyle={styles["submit-button"]}
                    variant="primary"
                    onClick={submitToBedrock}
                    content="Generate Quiz"
                />
                {/* {appCTX?.rawText ? (
                <div>
                    <h2>MCQs:</h2>
                    <div>{appCTX.rawText}</div>
                </div>
            ) : null} */}
            </div>
        </div>
    );
}

export default GenerateQuiz;
