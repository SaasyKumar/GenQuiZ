import GenerateQuiz from "./components/generate/GenerateQuiz";
import App from "./components/App";
import LoadQuiz from "./components/load/LoadQuiz";
import Home from "./components/home/Home";
import MCQMain from "./components/quiz/MCQMain";
import type { RouteObject } from "react-router-dom";
import Result from "./components/quiz/Result";
const route: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "app",
        element: <App />,
        children: [
            {
                index: true,
                element: <GenerateQuiz />,
            },
            {
                path: "load-quiz",
                element: <LoadQuiz />,
            },
            {
                path: "quiz",
                element: <MCQMain />,
            },
            {
                path: "result",
                element: <Result />,
            },
        ],
    },
    // {
    //     path: "test",
    //     element: <Test />,
    // },
];
export default route;
