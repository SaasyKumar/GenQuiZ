import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { extractFromAikenFormat } from "../../utils/extractQn";
import { appContext } from "../App";
import DOMPurify from "dompurify";
import Button from "../Button";
import Inputs from "../Inputs";
import styles from "/src/styles/generate/generatequiz.module.css";
import { useTranslation } from "react-i18next";

export default function LoadQuiz() {
    const { t } = useTranslation();
    const [text, updateText] = useState<string>("");
    const navigate = useNavigate();
    const ctx = useContext(appContext);
    useEffect(() => {
        ctx?.updateHeaderDisplay(false);
    }, []);
    function loadQuiz() {
        ctx?.setQuestionsList(extractFromAikenFormat(text));
        navigate("/app/quiz");
    }
    return (
        <>
            <div className={styles["body"]}>
                <div className={styles["container"]}>
                    <h1>{t("parse.pageTitle")}</h1>
                    <label htmlFor="textinput">{t("parse.pasteLabel")}</label>
                    <Inputs
                        name="text-input"
                        InputOptions={{
                            inputType: "text",
                            styleClass: styles["quiz-input"],
                            placeholderContent: t("parse.placeholder"),
                        }}
                        onChange={(ev) => {
                            updateText(DOMPurify.sanitize(ev.target.value));
                        }}
                    />
                    <Button
                        buttonStyle={styles["load-button"]}
                        onClick={loadQuiz}
                        variant="primary"
                        content={t("parse.loadButton")}
                    />
                </div>
            </div>
        </>
    );
}
