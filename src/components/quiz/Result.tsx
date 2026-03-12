import { appContext } from "./../App";
import { useContext, useState } from "react";
import styles from "/src/styles/result.module.css";
import MCQ from "./MCQ";
import Button from "../Button";
import Header from "../Header";
import { useTranslation } from "react-i18next";

export default function Result() {
    const { t } = useTranslation();
    const ctx = useContext(appContext);
    const [copied, setCopied] = useState<boolean>(false);
    const copyToClipboard = async () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        if (ctx?.rawText) {
            try {
                await navigator.clipboard.writeText(ctx.rawText);
                console.log("Copied!");
            } catch (err) {
                console.error("Failed to copy:", err);
            }
        }
    };
    const downloadTxt = () => {
        if (ctx?.rawText) {
            const blob = new Blob([ctx.rawText], { type: "text/plain" });
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
                showAnswer={true}
            ></MCQ>
        );
    });
    return (
        <>
            <Header />
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
