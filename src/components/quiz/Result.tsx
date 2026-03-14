import { appContext } from "./../App";
import { useContext, useState } from "react";
import styles from "/src/styles/result.module.css";
import MCQ from "./MCQ";
import { formatToAikenFormat } from "./../../utils/extractQn";
import { useTranslation } from "react-i18next";
import { type InputChangeEvent } from "../Inputs";

export default function Result() {
    const { t } = useTranslation();
    const ctx = useContext(appContext);

    const questionIds: Record<string, boolean> = {};
    if (ctx) {
        Object.keys(ctx.rawText).forEach((key) => {
            questionIds[key] = true;
        });
    }

    const [copied, setCopied] = useState<boolean>(false);
    const [selectedQnID, updateSelectedQnID] =
        useState<Record<string, boolean>>(questionIds);

    const onCheck = (ev: InputChangeEvent) => {
        updateSelectedQnID((prev) => ({
            ...prev,
            [ev.target.id]: !prev[ev.target.id],
        }));
    };

    const copyToClipboard = async () => {
        if (!ctx?.rawText) return;
        try {
            await navigator.clipboard.writeText(
                formatToAikenFormat(selectedQnID, ctx.rawText),
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const downloadTxt = () => {
        if (!ctx?.rawText) return;
        const text = formatToAikenFormat(selectedQnID, ctx.rawText);
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "genquiz.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    // compute score
    const total = ctx?.questionList.length ?? 0;
    const correct =
        ctx?.questionList.filter((q) => ctx.optionsSelected[q.id] === q.answer)
            .length ?? 0;

    return (
        <div className={styles["page"]}>
            <div className={styles["container"]}>
                {/* ── Score card ── */}
                <div className={styles["score-card"]}>
                    <div className={styles["score-left"]}>
                        <h1>{t("result.heading")}</h1>
                        <p className={styles["score-sub"]}>
                            {t("result.subheading")}
                        </p>
                    </div>
                    <div className={styles["score-right"]}>
                        <span className={styles["score-badge"]}>
                            {correct}/{total}
                        </span>
                        <span className={styles["score-denom"]}>correct</span>
                    </div>
                </div>

                {/* ── Toolbar ── */}
                <div className={styles["toolbar"]}>
                    <span className={styles["toolbar-label"]}>
                        Export selected
                    </span>
                    <div
                        className={`${styles["copy-btn"]} ${copied ? styles["copied"] : ""}`}
                        title={t("result.copyQuestions")}
                        onClick={copyToClipboard}
                    >
                        {copied ? "Copied!" : t("result.copyQuestions")}
                    </div>
                    <div
                        className={styles["download-btn"]}
                        title={t("result.downloadQuestions")}
                        onClick={downloadTxt}
                    >
                        {t("result.downloadQuestions")}
                    </div>
                </div>

                {/* ── Questions ── */}
                {ctx?.questionList.map((item) => (
                    <div key={item.id} className={styles["question-card"]}>
                        <MCQ
                            question={item}
                            onOptionClick={() => {}}
                            optionsSelected={ctx.optionsSelected[item.id]}
                            isResult={true}
                            isChecked={selectedQnID[item.id]}
                            onCheck={onCheck}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
