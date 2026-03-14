import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MCQ from "./MCQ";
import Stopwatch from "./Stopwatch";
import styles from "/src/styles/mcqMain.module.css";
import { appContext } from "./../App";
import Button from "./../Button";
import { useTranslation } from "react-i18next";

const MAX_RETRIES = 2;

export default function MCQMain() {
    const { t } = useTranslation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [showRetryModal, setShowRetryModal] = useState<boolean>(false);
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

    /** Snapshot the current attempt into history */
    function snapshotAttempt() {
        if (!ctx) return;
        const attemptNumber = ctx.quizHistory.length + 1;
        const label =
            attemptNumber === 1
                ? t("quiz.attemptLabel", { n: 1 })
                : t("quiz.retryLabel", { n: attemptNumber - 1 });
        ctx.addQuizAttempt({
            label,
            questions: [...ctx.questionList],
            selections: { ...ctx.optionsSelected },
        });
    }

    function submit() {
        if (!ctx) {
            navigate("/app/result");
            return;
        }

        const total = ctx.questionList.length;
        const wrong = ctx.questionList.filter(
            (q) => ctx.optionsSelected[q.id] !== q.answer,
        ).length;
        const wrongPct = total > 0 ? wrong / total : 0;

        // Show retry modal only if >30% wrong AND retry budget remains
        const retriesDone = ctx.quizHistory.length; // snapshots not yet taken for this attempt
        if (wrongPct > 0.3 && retriesDone < MAX_RETRIES) {
            setShowRetryModal(true);
        } else {
            snapshotAttempt();
            navigate("/app/result");
        }
    }

    function goToResult() {
        snapshotAttempt();
        setShowRetryModal(false);
        navigate("/app/result");
    }

    function startRetryTest() {
        if (!ctx) return;
        snapshotAttempt();

        const wrongQuestions = ctx.questionList.filter(
            (q) => ctx.optionsSelected[q.id] !== q.answer,
        );
        ctx.setQuestionsList(wrongQuestions);
        ctx.setSelectedOption({});
        setShowRetryModal(false);
        setCurrentQuestionIndex(0);
        setShowAnswer(false);
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

    const wrongCount = ctx.questionList.filter(
        (q) => ctx.optionsSelected[q.id] !== q.answer,
    ).length;
    const wrongPct = total > 0 ? Math.round((wrongCount / total) * 100) : 0;

    // Retries already consumed (= snapshots already in history, since each retry
    // follows a snapshot). First attempt has 0 snapshots; after 1st retry it's 1, etc.
    const retriesRemaining = MAX_RETRIES - ctx.quizHistory.length;

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

            {/* ── Recursive Test Modal ── */}
            {showRetryModal && (
                <div className={styles["modal-overlay"]}>
                    <div className={styles["modal"]}>
                        <div className={styles["modal-icon"]}>⚠️</div>
                        <h2 className={styles["modal-title"]}>
                            {t("quiz.retryModal.title")}
                        </h2>
                        <p className={styles["modal-body"]}>
                            {t("quiz.retryModal.body", {
                                wrongCount,
                                total,
                                wrongPct,
                            })}
                        </p>
                        <p className={styles["modal-hint"]}>
                            {t("quiz.retryModal.hint", { retriesRemaining })}
                        </p>
                        <div className={styles["modal-actions"]}>
                            <button
                                className={styles["modal-btn-secondary"]}
                                onClick={goToResult}
                            >
                                {t("quiz.retryModal.viewResults")}
                            </button>
                            <button
                                className={styles["modal-btn-primary"]}
                                onClick={startRetryTest}
                            >
                                {t("quiz.retryModal.retryWrong")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
