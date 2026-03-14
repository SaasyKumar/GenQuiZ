import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MCQ from "./MCQ";
import Stopwatch from "./Stopwatch";
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
        return () => {
            ctx?.updateHeaderHideState(false);
        };
    }, [ctx]);

    function onOptionClick(value: string, questionId: string) {
        ctx?.setSelectedOption((prev) => ({ ...prev, [questionId]: value }));
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
        navigate("/app/result");
    }

    if (!ctx || ctx.questionList.length === 0) {
        return (
            <div className={styles["body"]}>
                <p>{t("quiz.emptyState")}</p>
            </div>
        );
    }

    const total = ctx.questionList.length;
    const progressPct = ((currentQuestionIndex + 1) / total) * 100;
    const isLast = currentQuestionIndex === total - 1;

    return (
        <div className={styles["body"]}>
            <div className={styles["container"]}>
                {/* top-bar: back | counter | stopwatch */}
                <div className={styles["top-bar"]}>
                    <Button
                        variant="primary"
                        buttonStyle={styles["back"]}
                        onClick={() => navigate(-1)}
                        content={t("quiz.backButton")}
                    />
                    <span className={styles["counter"]}>
                        {currentQuestionIndex + 1} / {total}
                    </span>
                    <Stopwatch />
                </div>

                <div className={styles["progress-track"]}>
                    <div
                        className={styles["progress-fill"]}
                        style={{ width: `${progressPct}%` }}
                    />
                </div>

                <MCQ
                    question={ctx.questionList[currentQuestionIndex]}
                    onOptionClick={onOptionClick}
                    optionsSelected={
                        ctx.optionsSelected[
                            ctx.questionList[currentQuestionIndex].id
                        ]
                    }
                    showAnswer={showAnswer}
                />

                <div className={styles["actions"]}>
                    <Button
                        variant="primary"
                        buttonStyle={styles["previous"]}
                        disabled={currentQuestionIndex === 0}
                        onClick={previous}
                        content={t("quiz.previousButton")}
                    />
                    {isLast ? (
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
                            onClick={next}
                            content={t("quiz.nextButton")}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
