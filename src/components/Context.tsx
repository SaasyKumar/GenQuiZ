import React from "react";
import { type question } from "./../utils/extractQn";

export type appContextType = {
    updateHeaderDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    rawText: string;
    updateRawText: React.Dispatch<React.SetStateAction<string>>;
    questionList: question[];
    setQuestionsList: React.Dispatch<React.SetStateAction<question[]>>;
    optionsSelected: Record<string, string>;
    setSelectedOption: React.Dispatch<
        React.SetStateAction<Record<string, string>>
    >;
};
