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
    const [textBlured, blurText] = useState<boolean>(false);
    const navigate = useNavigate();
    const ctx = useContext(appContext);
    useEffect(() => {
        ctx?.updateHeaderDisplay(false);
    }, []);
    function loadQuiz() {
        ctx?.setQuestionsList(extractFromAikenFormat(text));
        ctx?.updateRawText(text);
        navigate("/app/quiz");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadFromFile = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const text = await file.text();
        ctx?.setQuestionsList(extractFromAikenFormat(text));
        ctx?.updateRawText(text);
        navigate("/app/quiz");
    };
    return (
        <>
            <div className={styles["body"]}>
                <div className={styles["container"]}>
                    <h1>{t("parse.pageTitle")}</h1>
                    <div className={styles["label-div"]}>
                        <h4>{t("parse.pasteLabel")}</h4>
                        <Inputs
                            name="file-load"
                            styleClass={styles["file-input"]}
                            labelContent={t("button.uploadFile")}
                            InputOptions={{
                                inputType: "file",
                                acceptTypes: ".txt,.md",
                            }}
                            onChange={loadFromFile}
                        />
                    </div>
                    <Inputs
                        name="text-input"
                        InputOptions={{
                            inputType: "text",
                            styleClass: styles["quiz-input"],
                            placeholderContent: t("parse.placeholder"),
                            blurTextBox: textBlured,
                        }}
                        onChange={(ev) => {
                            const value = DOMPurify.sanitize(ev.target.value);
                            console.log(value);
                            updateText(value);
                            if (value == "" && textBlured == true) {
                                blurText(false);
                            } else if (value != "" && textBlured == false) {
                                blurText(true);
                            }
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
