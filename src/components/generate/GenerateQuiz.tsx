import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { extractFromAikenFormat } from "../../utils/extractQn";
import DOMPurify from "dompurify";
import { appContext } from "./../App";
import Button from "../Button";
import Inputs from "../Inputs";
import styles from "/src/styles/generate/generatequiz.module.css";
import { useTranslation } from "react-i18next";

function GenerateQuiz() {
    const { t } = useTranslation();
    const maximumQuestions = 10;
    const [text, updateText] = useState<string>("");
    const [difficultyLevel, setDifficultyLevel] = useState<string>("Medium");
    const [questionCount, setQuestionCount] = useState<string>("5");
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const ctx = useContext(appContext);
    const navigate = useNavigate();

    useEffect(() => {
        ctx?.updateHeaderHideState(false);
    }, [ctx]);

    function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const file = ev.target.files?.[0];
        if (!file) return;
        setError(null);
        setWarning(null);
        setUploadedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = DOMPurify.sanitize(
                (e.target?.result as string) ?? "",
            );
            updateText(content);
        };
        reader.onerror = () => {
            setError(t("generate.errors.fileRead"));
            clearFile();
        };
        reader.readAsText(file);
    }

    function clearFile() {
        setUploadedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    async function submitToBedrock() {
        if (loading) return;

        // ── Client-side validation ────────────────────────────────────────────
        if (!text.trim() && !uploadedFile) {
            setError(t("generate.errors.emptyInput"));
            return;
        }

        setError(null);
        setWarning(null);
        setLoading(true);

        try {
            let response: Response;

            if (uploadedFile) {
                // ── File uploaded → multipart/form-data ──────────────────────
                const formData = new FormData();
                formData.append("content", uploadedFile, uploadedFile.name);
                formData.append("level", difficultyLevel);
                formData.append("no_of_questions", questionCount);
                response = await fetch(
                    "https://vm40njaor9.execute-api.us-east-1.amazonaws.com/production/genqiz",
                    { method: "POST", body: formData },
                );
            } else {
                // ── Text only → application/json ─────────────────────────────
                response = await fetch(
                    "https://vm40njaor9.execute-api.us-east-1.amazonaws.com/production/genqiz",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            content: text,
                            level: difficultyLevel,
                            no_of_questions: questionCount,
                        }),
                    },
                );
            }

            // ── HTTP-level error ──────────────────────────────────────────────
            if (!response.ok) {
                const status = response.status;
                if (status >= 500) {
                    throw new Error(t("generate.errors.serverError"));
                } else if (status === 429) {
                    throw new Error(t("generate.errors.rateLimit"));
                } else {
                    throw new Error(t("generate.errors.httpError", { status }));
                }
            }

            const data = await response.json();

            // ── Token limit exceeded (lambda returns 413 + errorCode) ─────────
            if (
                data.errorCode === "INPUT_TOO_LONG" ||
                data.statusCode === 413
            ) {
                throw new Error(t("generate.errors.inputTooLong"));
            }

            // ── Other lambda-level error ──────────────────────────────────────
            if (data.errorCode === "BEDROCK_ERROR" || data.statusCode === 500) {
                throw new Error(
                    data.message || t("generate.errors.serverError"),
                );
            }

            const responseText: string = data.body ?? "";

            // ── Empty response ────────────────────────────────────────────────
            if (!responseText.trim()) {
                throw new Error(t("generate.errors.emptyResponse"));
            }

            const extract = extractFromAikenFormat(responseText);
            const questions = extract[0];

            // ── No questions parsed ───────────────────────────────────────────
            if (!questions || questions.length === 0) {
                throw new Error(t("generate.errors.noQuestions"));
            }

            // ── Warn if lambda silently truncated the input ───────────────────
            if (data.truncated) {
                setWarning(t("generate.warnings.truncated"));
            }

            ctx?.updateRawText(extract[1]);
            ctx?.setQuestionsList(questions);
            ctx?.clearQuizHistory();
            navigate("/app/quiz");
        } catch (err: unknown) {
            if (err instanceof TypeError) {
                setError(t("generate.errors.network"));
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(t("generate.errors.unknown"));
            }
        } finally {
            setLoading(false);
        }
    }

    function handleBlur() {
        let num = Number(questionCount);
        if (isNaN(num)) num = 5;
        const clamped = Math.max(5, Math.min(maximumQuestions, num));
        setQuestionCount(String(clamped));
    }

    return (
        <div className={styles["body"]}>
            <div className={styles["container"]}>
                {/* ── Loading overlay ── */}
                {loading && (
                    <div className={styles["loading-overlay"]}>
                        <div className={styles["spinner"]} />
                        <p className={styles["loading-text"]}>
                            Generating your quiz…
                        </p>
                        <p className={styles["loading-sub"]}>
                            Talking to Bedrock, this may take a few seconds
                        </p>
                    </div>
                )}

                <h1>{t("generate.pageTitle")}</h1>

                {/* ── Error banner ── */}
                {error && (
                    <div className={styles["error-banner"]}>
                        <span className={styles["error-icon"]} />
                        <span className={styles["error-message"]}>{error}</span>
                        <button
                            className={styles["error-dismiss"]}
                            onClick={() => setError(null)}
                            aria-label="Dismiss error"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* ── Warning banner (truncation notice) ── */}
                {warning && (
                    <div className={styles["warning-banner"]}>
                        <span className={styles["warning-icon"]} />
                        <span className={styles["warning-message"]}>
                            {warning}
                        </span>
                        <button
                            className={styles["warning-dismiss"]}
                            onClick={() => setWarning(null)}
                            aria-label="Dismiss warning"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <div className={styles["options-1"]}>
                    <Inputs
                        name="level"
                        styleClass={styles["input"]}
                        labelContent={t("generate.difficultyLabel")}
                        InputOptions={{
                            inputType: "select",
                            option: t("generate.difficultyOptions", {
                                returnObjects: true,
                            }) as string[],
                        }}
                        defaultValue={difficultyLevel}
                        onChange={(ev) => setDifficultyLevel(ev.target.value)}
                    />
                    <Inputs
                        name="questions"
                        styleClass={styles["input"]}
                        labelContent={t("generate.numQuestionsLabel")}
                        InputOptions={{
                            inputType: "number",
                            min: 1,
                            max: 25,
                            onBlur: handleBlur,
                        }}
                        defaultValue={questionCount}
                        onChange={(ev) => setQuestionCount(ev.target.value)}
                    />
                </div>

                {/* ── Textarea label row: title + file upload ── */}
                <div className={styles["label-div"]}>
                    <h4>{t("generate.pasteLabel")}</h4>
                    <div className={styles["file-upload-area"]}>
                        {uploadedFile ? (
                            <div className={styles["file-chip"]}>
                                <span className={styles["file-chip-name"]}>
                                    {uploadedFile.name}
                                </span>
                                <button
                                    className={styles["file-chip-clear"]}
                                    onClick={clearFile}
                                    title="Remove file"
                                    aria-label="Remove file"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <label className={styles["file-input"]}>
                                {t("button.uploadFile")}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".txt,.md,.pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                />
                            </label>
                        )}
                    </div>
                </div>

                <Inputs
                    name="text-input"
                    InputOptions={{
                        inputType: "text",
                        styleClass: styles["quiz-input"],
                        placeholderContent: t("generate.placeholder"),
                    }}
                    onChange={(ev) => {
                        updateText(DOMPurify.sanitize(ev.target.value));
                        if (uploadedFile) clearFile();
                        if (error) setError(null);
                    }}
                />

                <Button
                    buttonStyle={styles["submit-button"]}
                    variant="primary"
                    onClick={submitToBedrock}
                    disabled={loading}
                    content={
                        loading ? "Generating…" : t("generate.submitButton")
                    }
                />
            </div>
        </div>
    );
}

export default GenerateQuiz;
