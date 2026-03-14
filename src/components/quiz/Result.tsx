import { appContext } from "./../App";
import { useContext, useState } from "react";
import styles from "/src/styles/result.module.css";
import MCQ from "./MCQ";
import { formatToAikenFormat } from "./../../utils/extractQn";
import { useTranslation } from "react-i18next";
import { type InputChangeEvent } from "../Inputs";
import { type QuizAttempt } from "../Context";
import { type question } from "../../utils/extractQn";
import Inputs from "../Inputs";

// ─── helpers ────────────────────────────────────────────────────────────────

function scoreOf(attempt: QuizAttempt) {
    const correct = attempt.questions.filter(
        (q) => attempt.selections[q.id] === q.answer,
    ).length;
    return { correct, total: attempt.questions.length };
}

/** Pill badge for a single attempt answer in comparison view */
function AnswerPill({
    chosen,
    answer,
    options,
}: {
    chosen: string | undefined;
    answer: string;
    options: Record<string, string>;
}) {
    if (!chosen) {
        return (
            <span className={`${styles["pill"]} ${styles["pill-skipped"]}`}>
                —
            </span>
        );
    }
    const isCorrect = chosen === answer;
    return (
        <span
            className={`${styles["pill"]} ${isCorrect ? styles["pill-correct"] : styles["pill-wrong"]}`}
        >
            <span className={styles["pill-key"]}>{chosen.toUpperCase()}.</span>
            &nbsp;{options[chosen] ?? ""}
        </span>
    );
}

/** One question card in the comparison view */
function CompareRow({
    question,
    attempts,
    isChecked,
    onCheck,
}: {
    question: question;
    attempts: QuizAttempt[];
    isChecked: boolean;
    onCheck: (ev: InputChangeEvent) => void;
}) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={styles["cmp-row"]}>
            {/* ── Question text (full width, clickable to expand) ── */}
            <div className={styles["cmp-question-row"]}>
                <div
                    className={styles["cmp-question"]}
                    onClick={() => setExpanded((v) => !v)}
                    role="button"
                    aria-expanded={expanded}
                >
                    <span className={styles["cmp-chevron"]}>
                        {expanded ? "▾" : "▸"}
                    </span>
                    <span>{question.question}</span>
                </div>
                {/* Export checkbox — mirrors the single-attempt view */}
                <Inputs
                    InputOptions={{ inputType: "checkbox", isChecked }}
                    name={question.id}
                    styleClass={styles["cmp-checkbox"]}
                    onChange={onCheck}
                />
            </div>

            {/* ── Attempt answer pills — full width, one per attempt, below the question ── */}
            <div className={styles["cmp-attempts"]}>
                {attempts.map((attempt) => (
                    <div key={attempt.label} className={styles["cmp-cell"]}>
                        <span className={styles["cmp-cell-label"]}>
                            {attempt.label}
                        </span>
                        <AnswerPill
                            chosen={attempt.selections[question.id]}
                            answer={question.answer}
                            options={question.options}
                        />
                    </div>
                ))}
            </div>

            {/* ── Expanded: all options + explanation ── */}
            {expanded && (
                <div className={styles["cmp-expanded"]}>
                    <div className={styles["cmp-options"]}>
                        {Object.entries(question.options).map(([key, val]) => {
                            const isAnswer = key === question.answer;
                            return (
                                <div
                                    key={key}
                                    className={`${styles["cmp-option"]} ${isAnswer ? styles["cmp-option-correct"] : ""}`}
                                >
                                    <span className={styles["cmp-option-key"]}>
                                        {key.toUpperCase()}.
                                    </span>{" "}
                                    {val}
                                    {isAnswer && (
                                        <span
                                            className={
                                                styles["cmp-option-tick"]
                                            }
                                        >
                                            ✓
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {question.explanation && (
                        <p className={styles["cmp-explanation"]}>
                            {question.explanation}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── main component ──────────────────────────────────────────────────────────

export default function Result() {
    const { t } = useTranslation();
    const ctx = useContext(appContext);

    // ── export checkbox state — seeded from rawText keys (all selected by default) ──
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

    // ── data ──────────────────────────────────────────────────────────────────
    const history = ctx?.quizHistory ?? [];
    const hasMultipleAttempts = history.length > 1;

    // Single-attempt fallback (original behaviour)
    const total = ctx?.questionList.length ?? 0;
    const correct =
        ctx?.questionList.filter((q) => ctx.optionsSelected[q.id] === q.answer)
            .length ?? 0;

    // Build union question list: first attempt has all questions; retries only
    // contain the wrong ones, so merge by id to get every unique question.
    const allQuestionsMap = new Map<string, question>();
    history.forEach((attempt) => {
        attempt.questions.forEach((q) => {
            if (!allQuestionsMap.has(q.id)) allQuestionsMap.set(q.id, q);
        });
    });
    const allQuestions = Array.from(allQuestionsMap.values());

    const attemptScores = history.map(scoreOf);

    // ─────────────────────────────────────────────────────────────────────────
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
                    {hasMultipleAttempts ? (
                        <div className={styles["score-multi"]}>
                            {attemptScores.map((s, i) => (
                                <div
                                    key={history[i].label}
                                    className={styles["score-chip"]}
                                >
                                    <span
                                        className={styles["score-chip-label"]}
                                    >
                                        {history[i].label}
                                    </span>
                                    <span
                                        className={`${styles["score-badge"]} ${i === attemptScores.length - 1 ? styles["score-badge-latest"] : ""}`}
                                    >
                                        {s.correct}/{s.total}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles["score-right"]}>
                            <span className={styles["score-badge"]}>
                                {correct}/{total}
                            </span>
                            <span className={styles["score-denom"]}>
                                correct
                            </span>
                        </div>
                    )}
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

                {/* ── Comparison view (multiple attempts) ── */}
                {hasMultipleAttempts ? (
                    <div className={styles["cmp-container"]}>
                        {allQuestions.map((q) => (
                            <CompareRow
                                key={q.id}
                                question={q}
                                attempts={history}
                                isChecked={selectedQnID[q.id] ?? true}
                                onCheck={onCheck}
                            />
                        ))}
                    </div>
                ) : (
                    /* ── Original single-attempt view ── */
                    ctx?.questionList.map((item) => (
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
                    ))
                )}
            </div>
        </div>
    );
}
