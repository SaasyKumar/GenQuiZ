import React from "react";
import { type question } from "./../utils/extractQn";

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
};
