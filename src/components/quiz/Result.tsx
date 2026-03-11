import { appContext } from "./../App";
import { useContext } from "react";
import styles from "/src/styles/result.module.css";
import MCQ from "./MCQ";
import { useTranslation } from "react-i18next";

export default function Result() {
    const { t } = useTranslation();
    const ctx = useContext(appContext);
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
        <div className={styles["container"]}>
            <h1>{t("result.heading")}</h1>
            <p>{t("result.subheading")}</p>
            {resultItems}
        </div>
    );
}
