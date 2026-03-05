import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MCQ from "./MCQ";
import styles from "/src/styles/mcqMain.module.css";
import { appContext } from "./../App";
import Button from "./../Button";

export default function MCQMain() {
    const [currentQn, setCurrentQn] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const appCTX = useContext(appContext);
    const navigate = useNavigate();
    useEffect(() => {
        // FIXME: shuffle
        appCTX?.updateHeaderDisplay(true);
    }, [appCTX]);

    function onOptionClick(value: string, questionId: string) {
        appCTX?.setSelectedOption((prev) => {
            return {
                ...prev,
                [questionId]: value,
            };
        });
    }
    function next() {
        setCurrentQn(currentQn + 1);
        setShowAnswer(false);
    }
    function previous() {
        setCurrentQn(currentQn - 1);
        setShowAnswer(false);
    }
    function submit() {
        navigate("/app/result");
    }
    if (!appCTX || appCTX.questionList.length === 0) {
        appCTX?.updateHeaderDisplay(false);
        return (
            <div>
                <p>
                    No questions loaded. Please generate or load a quiz first.
                </p>
            </div>
        );
    }
    const actions = (
        <div className={styles["actions"]}>
            <Button
                variant="primary"
                buttonStyle={styles["previous"]}
                disabled={appCTX?.questionList.length == 0 || currentQn == 0}
                onClick={previous}
                content="Previous"
            />
            {appCTX && currentQn == appCTX?.questionList.length - 1 ? (
                <Button
                    buttonStyle={styles["submit"]}
                    variant="primary"
                    onClick={submit}
                    content="SUBMIT"
                />
            ) : (
                <Button
                    buttonStyle={styles["next"]}
                    variant="primary"
                    disabled={appCTX?.questionList.length == 0}
                    onClick={next}
                    content="Next"
                />
            )}
        </div>
    );
    return (
        <div className={styles["body"]}>
            <div className={styles["container"]}>
                {/* <div>Progress</div> */}
                <Button
                    variant="primary"
                    buttonStyle={styles["back"]}
                    onClick={() => navigate(-1)}
                    content="Back"
                />
                {/* <Button onClick={() => setShowAnswer(true)} content="show" /> */}
                <MCQ
                    question={appCTX.questionList[currentQn]}
                    onOptionClick={onOptionClick}
                    optionsSelected={
                        appCTX.optionsSelected[
                            appCTX.questionList[currentQn]["id"]
                        ]
                    }
                    showAnswer={showAnswer}
                ></MCQ>
                {actions}
            </div>
        </div>
    );
}
