import { appContext } from "./../App";
import { useContext, useState } from "react";
import styles from "/src/styles/result.module.css";
import MCQ from "./MCQ";
import Button from "../Button";
import { formatToAikenFormat } from "./../../utils/extractQn";
import { useTranslation } from "react-i18next";
import { type InputChangeEvent } from "../Inputs";

export default function Result() {
    const { t } = useTranslation();
    const ctx = useContext(appContext);
    const questionIds: Record<string, boolean> = {};
    if (ctx) {
        Object.keys(ctx.rawText).map((key) => {
            questionIds[key] = true;
        });
    }

    const [copied, setCopied] = useState<boolean>(false);
    const [selectedQnID, updateSelectedQnID] =
        useState<Record<string, boolean>>(questionIds);

    const onCheck = (ev: InputChangeEvent) => {
        updateSelectedQnID((prev) => {
            return {
                ...prev,
                [ev.target.id]: !prev[ev.target.id],
            };
        });
    };
    const copyToClipboard = async () => {
        if (ctx?.rawText) {
            const text = formatToAikenFormat(selectedQnID, ctx.rawText);
            try {
                await navigator.clipboard.writeText(text);
                console.log("Copied!");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy:", err);
            }
        }
    };
    const downloadTxt = () => {
        if (ctx?.rawText) {
            const text = formatToAikenFormat(selectedQnID, ctx.rawText);
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "genquiz.txt"; // FIXME: also md
            a.click();

            URL.revokeObjectURL(url);
        }
    };
    const resultItems = ctx?.questionList.map((item) => {
        return (
            <MCQ
                question={item}
                onOptionClick={() => {}}
                optionsSelected={ctx.optionsSelected[item["id"]]}
                isResult={true}
                isChecked={selectedQnID[item["id"]]}
                onCheck={onCheck}
            ></MCQ>
        );
    });
    return (
        <>
            <div className={styles["container"]}>
                <header className={styles["header"]}>
                    <h1>{t("result.heading")}</h1>
                    <Button
                        content=""
                        titleContent={t("result.copyQuestions")}
                        buttonStyle={
                            copied
                                ? `${styles["copy"]} ${styles["copied"]} `
                                : styles["copy"]
                        }
                        onClick={copyToClipboard}
                    />
                    <Button
                        content=""
                        titleContent={t("result.downloadQuestions")}
                        buttonStyle={styles["download"]}
                        onClick={downloadTxt}
                    />
                </header>
                {resultItems}
            </div>
        </>
    );
}
