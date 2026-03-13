import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { extractFromAikenFormat } from "../../utils/extractQn";
import DOMPurify from "dompurify";
import { appContext } from "./../App";
import Button from "../Button";
import Inputs from "../Inputs";
import styles from "/src/styles/generate/generatequiz.module.css";
import { useTranslation } from "react-i18next";

function GenerateQuiz() {
    const { t } = useTranslation();
    const maximumQuestions = 10;
    const [text, updateText] = useState<string>("");
    const [difficultyLevel, setDifficultyLevel] = useState<string>("Medium");
    const [questionCount, setQuestionCount] = useState<string>("5");
    const ctx = useContext(appContext);
    const navigate = useNavigate();
    useEffect(() => {
        ctx?.updateHeaderHideState(false);
    }, [ctx]);
    async function submitToBedrock() {
        const response = await fetch(
            "https://166qmtqw7g.execute-api.us-east-1.amazonaws.com/production/genquiz",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: text,
                    level: difficultyLevel,
                    no_of_questions: questionCount,
                }),
            },
        );
        const data = await response.json();
        const responseText = data.body["message"]["content"][0]["text"];
        const extract = extractFromAikenFormat(responseText);
        ctx?.updateRawText(extract[1]);
        ctx?.setQuestionsList(extract[0]);
        navigate("/app/quiz");
    }
    function handleBlur() {
        let num = Number(questionCount);
        if (isNaN(num)) {
            num = 5;
        }
        const clamped = Math.max(5, Math.min(maximumQuestions, num));
        setQuestionCount(String(clamped));
    }
    return (
        <div className={styles["body"]}>
            <div className={styles["container"]}>
                <h1>{t("generate.pageTitle")}</h1>
                <div className={styles["options-1"]}>
                    <Inputs
                        name="level"
                        styleClass={styles["input"]}
                        labelContent={t("generate.difficultyLabel")}
                        InputOptions={{
                            inputType: "select",
                            option: t("generate.difficultyOptions", {
                                returnObjects: true,
                            }) as string[],
                        }}
                        defaultValue={difficultyLevel}
                        onChange={(ev) => setDifficultyLevel(ev.target.value)}
                    />
                    <Inputs
                        name="questions"
                        styleClass={styles["input"]}
                        labelContent={t("generate.numQuestionsLabel")}
                        InputOptions={{
                            inputType: "number",
                            min: 1,
                            max: 25,
                            onBlur: handleBlur,
                        }}
                        defaultValue={questionCount}
                        onChange={(ev) => {
                            setQuestionCount(ev.target.value);
                        }}
                    />
                </div>
                <div className={styles["options-2"]}>
                    <div className={styles["txt-input-label"]}>
                        {t("generate.pasteLabel")}
                    </div>
                </div>
                <Inputs
                    name="text-input"
                    InputOptions={{
                        inputType: "text",
                        styleClass: styles["quiz-input"],
                        placeholderContent: t("generate.placeholder"),
                    }}
                    onChange={(ev) => {
                        updateText(DOMPurify.sanitize(ev.target.value));
                    }}
                />
                <Button
                    buttonStyle={styles["submit-button"]}
                    variant="primary"
                    onClick={submitToBedrock}
                    content={t("generate.submitButton")}
                />
            </div>
        </div>
    );
}

export default GenerateQuiz;
