import React from "react";
import { type question } from "./../utils/extractQn";

export type QuizAttempt = {
    /** Label shown in the result header, e.g. "Attempt 1", "Retry 1" */
    label: string;
    /** The question list that was active for this attempt */
    questions: question[];
    /** Map of questionId → chosen option key */
    selections: Record<string, string>;
};

export type appContextType = {
    updateHeaderHideState: React.Dispatch<React.SetStateAction<boolean>>;
    rawText: Record<string, string[]>;
    updateRawText: React.Dispatch<
        React.SetStateAction<Record<string, string[]>>
    >;
    questionList: question[];
    setQuestionsList: React.Dispatch<React.SetStateAction<question[]>>;
    optionsSelected: Record<string, string>;
    setSelectedOption: React.Dispatch<
        React.SetStateAction<Record<string, string>>
    >;
    /** Ordered list of all completed attempts (original + retries) */
    quizHistory: QuizAttempt[];
    /** Push a completed attempt snapshot into history */
    addQuizAttempt: (attempt: QuizAttempt) => void;
    /** Wipe history (called when a brand-new quiz is generated/parsed) */
    clearQuizHistory: () => void;
};
