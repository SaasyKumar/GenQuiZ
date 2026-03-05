import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import route from "./router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(route);
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
);
