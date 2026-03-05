import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { extractFromAikenFormat } from "../../utils/extractQn";
import { appContext } from "../App";
import DOMPurify from "dompurify";
import Button from "../Button";
import Inputs from "../Inputs";
import styles from "/src/styles/generate/generatequiz.module.css";

export default function LoadQuiz() {
    const [text, updateText] = useState<string>("");
    const navigate = useNavigate();
    const appCTX = useContext(appContext);
    useEffect(() => {
        appCTX?.updateHeaderDisplay(false);
    }, []);
    function loadQuiz() {
        appCTX?.setQuestionsList(extractFromAikenFormat(text));
        navigate("/app/quiz");
    }
    return (
        <>
            <div className={styles["body"]}>
                <div className={styles["container"]}>
                    <h1>Extract from text</h1>
                    <label htmlFor="textinput">
                        Paste the question in aiken format:
                    </label>
                    <Inputs
                        name="text-input"
                        InputOptions={{
                            inputType: "text",
                            styleClass: styles["quiz-input"],
                            placeholderContent: "Paste the Aiken format Text..",
                        }}
                        onChange={(ev) => {
                            updateText(DOMPurify.sanitize(ev.target.value));
                        }}
                    />
                    <Button
                        buttonStyle={styles["load-button"]}
                        onClick={loadQuiz}
                        variant="primary"
                        content="Load"
                    />
                </div>
            </div>
        </>
    );
}
