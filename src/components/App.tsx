import { Outlet } from "react-router-dom";
import { useState } from "react";
import { type question } from "./../utils/extractQn";
import Header from "./Header";
import { type appContextType } from "./Context";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const appContext = createContext<appContextType | null>(null);

export default function App() {
    const [showHeader, updateHeaderDisplay] = useState<boolean>(false);
    const [rawText, updateRawText] = useState<string>("");
    const [questionList, setQuestionsList] = useState<question[]>([]);
    const [optionsSelected, setSelectedOption] = useState<
        Record<string, string>
    >({});
    const header = showHeader ? null : <Header />;
    return (
        <>
            <appContext.Provider
                value={{
                    updateHeaderDisplay,
                    rawText,
                    updateRawText,
                    questionList,
                    setQuestionsList,
                    optionsSelected,
                    setSelectedOption,
                }}
            >
                {header}
                <Outlet></Outlet>
            </appContext.Provider>
        </>
    );
}
