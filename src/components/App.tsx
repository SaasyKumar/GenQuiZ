import { Outlet } from "react-router-dom";
import { useState } from "react";
import { type question } from "./../utils/extractQn";
import Sidebar from "./Sidebar";
import { type appContextType } from "./Context";
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
                    onExpand={() => setSidebarCollapsed(false)}
                />
                <main
                    style={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </appContext.Provider>
    );
}
