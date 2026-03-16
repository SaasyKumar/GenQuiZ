import { Outlet } from "react-router-dom";
import { useState, useCallback } from "react";
import { type question } from "./../utils/extractQn";
import Sidebar from "./Sidebar";
import { type appContextType, type QuizAttempt } from "./Context";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const appContext = createContext<appContextType | null>(null);

export default function App() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const [rawText, updateRawText] = useState<Record<string, string[]>>({});
    const [questionList, setQuestionsList] = useState<question[]>([]);
    const [optionsSelected, setSelectedOption] = useState<
        Record<string, string>
    >({});
    const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);

    const addQuizAttempt = useCallback((attempt: QuizAttempt) => {
        setQuizHistory((prev) => [...prev, attempt]);
    }, []);

    const clearQuizHistory = useCallback(() => {
        setQuizHistory([]);
    }, []);

    return (
        <appContext.Provider
            value={{
                updateHeaderHideState: setSidebarCollapsed,
                rawText,
                updateRawText,
                questionList,
                setQuestionsList,
                optionsSelected,
                setSelectedOption,
                quizHistory,
                addQuizAttempt,
                clearQuizHistory,
            }}
        >
            <div
                style={{
                    display: "flex",
                    minHeight: "100vh",
                    background: "var(--bg-2)",
                }}
            >
                <Sidebar
                    collapsed={isSidebarCollapsed}
                    onToggle={() => setSidebarCollapsed((v) => !v)}
                />
                <main
                    style={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        /* Reserve space at bottom for mobile nav bar */
                        paddingBottom: "env(safe-area-inset-bottom, 0px)",
                    }}
                    className="app-main"
                >
                    <Outlet />
                </main>
            </div>
            {/* Global mobile bottom-nav spacing injected via style tag */}
            <style>{`
                @media (max-width: 768px) {
                    .app-main {
                        padding-bottom: 56px !important;
                    }
                }
            `}</style>
        </appContext.Provider>
    );
}
