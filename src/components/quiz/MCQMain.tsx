import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MCQ from "./MCQ";
import styles from "/src/styles/mcqMain.module.css";
import { appContext } from "./../App";
import Button from "./../Button";
import { useTranslation } from "react-i18next";

export default function MCQMain() {
    const { t } = useTranslation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const ctx = useContext(appContext);
    const navigate = useNavigate();
    useEffect(() => {
        ctx?.updateHeaderHideState(true);
    }, [ctx]);

    function onOptionClick(value: string, questionId: string) {
        ctx?.setSelectedOption((prev) => {
            return {
                ...prev,
                [questionId]: value,
            };
        });
    }
    function next() {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowAnswer(false);
    }
    function previous() {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setShowAnswer(false);
    }
    function submit() {
        ctx?.updateHeaderHideState(false);
        navigate("/app/result");
    }
    if (!ctx || ctx.questionList.length === 0) {
        ctx?.updateHeaderHideState(false);
        return (
            <div>
                <p>{t("quiz.emptyState")}</p>
            </div>
        );
    }
    const actions = (
        <div className={styles["actions"]}>
            <Button
                variant="primary"
                buttonStyle={styles["previous"]}
                disabled={
                    ctx?.questionList.length == 0 || currentQuestionIndex == 0
                }
                onClick={previous}
                content={t("quiz.previousButton")}
            />
            {ctx && currentQuestionIndex == ctx?.questionList.length - 1 ? (
                <Button
                    buttonStyle={styles["submit"]}
                    variant="primary"
                    onClick={submit}
                    content={t("quiz.submitButton")}
                />
            ) : (
                <Button
                    buttonStyle={styles["next"]}
                    variant="primary"
                    disabled={ctx?.questionList.length == 0}
                    onClick={next}
                    content={t("quiz.nextButton")}
                />
            )}
        </div>
    );
    return (
        <div className={styles["body"]}>
            <div className={styles["container"]}>
                <Button
                    variant="primary"
                    buttonStyle={styles["back"]}
                    onClick={() => navigate(-1)}
                    content={t("quiz.backButton")}
                />
                <MCQ
                    question={ctx.questionList[currentQuestionIndex]}
                    onOptionClick={onOptionClick}
                    optionsSelected={
                        ctx.optionsSelected[
                            ctx.questionList[currentQuestionIndex]["id"]
                        ]
                    }
                    showAnswer={showAnswer}
                ></MCQ>
                {actions}
            </div>
        </div>
    );
}
