import { Outlet } from "react-router-dom";
import { useState } from "react";
import { type question } from "./../utils/extractQn";
import Header from "./Header";
import { type appContextType } from "./Context";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const appContext = createContext<appContextType | null>(null);

export default function App() {
    const [isHeaderHidden, updateHeaderHideState] = useState<boolean>(false);
    const [rawText, updateRawText] = useState<Record<string, string[]>>({});
    const [questionList, setQuestionsList] = useState<question[]>([]);
    const [optionsSelected, setSelectedOption] = useState<
        Record<string, string>
    >({});
    const headerElement = isHeaderHidden ? null : <Header />;
    return (
        <>
            <appContext.Provider
                value={{
                    updateHeaderHideState,
                    rawText,
                    updateRawText,
                    questionList,
                    setQuestionsList,
                    optionsSelected,
                    setSelectedOption,
                }}
            >
                {headerElement}
                <Outlet></Outlet>
            </appContext.Provider>
        </>
    );
}
