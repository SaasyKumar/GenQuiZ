import { appContext } from "./../App";
import { useContext } from "react";
import styles from "/src/styles/result.module.css";
import MCQ from "./MCQ";

export default function Result() {
    const appCTX = useContext(appContext);
    // function copyToClipboard() {
    //     if (appCTX) {
    //         navigator.clipboard.writeText(appCTX.rawText);
    //     }
    // }
    const resultList = appCTX?.questionList.map((item) => {
        return (
            <MCQ
                question={item}
                onOptionClick={() => {}}
                optionsSelected={appCTX.optionsSelected[item["id"]]}
                showAnswer={true}
            ></MCQ>
        );
    });
    return (
        <div className={styles["container"]}>
            <h1>Result</h1>
            {resultList}
            {/* FIXME <Button onClick={copyToClipboard} content="Copy to clipboard" /> */}
            {/* <code>{appCTX?.rawText}</code> */}
        </div>
    );
}
