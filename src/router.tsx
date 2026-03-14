import GenerateQuiz from "./components/generate/GenerateQuiz";
import App from "./components/App";
import LoadQuiz from "./components/load/LoadQuiz";
import Home from "./components/home/Home";
import HowItWorks from "./components/home/HowItWorks";
import Features from "./components/home/Features";
import Support from "./components/home/Support";
import MCQMain from "./components/quiz/MCQMain";
import type { RouteObject } from "react-router-dom";
import Result from "./components/quiz/Result";

const route: RouteObject[] = [
    { path: "/", element: <Home /> },
    { path: "how-it-works", element: <HowItWorks /> },
    { path: "features", element: <Features /> },
    { path: "support", element: <Support /> },
    {
        path: "app",
        element: <App />,
        children: [
            { index: true, element: <GenerateQuiz /> },
            { path: "load-quiz", element: <LoadQuiz /> },
            { path: "quiz", element: <MCQMain /> },
            { path: "result", element: <Result /> },
        ],
    },
];
export default route;
