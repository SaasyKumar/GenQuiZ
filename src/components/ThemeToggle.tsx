import { useTheme } from "./ThemeContext";
import styles from "/src/styles/themeToggle.module.css";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            className={styles["toggle"]}
            onClick={toggleTheme}
            title={
                theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            }
            aria-label="Toggle theme"
        >
            <span className={styles["track"]}>
                <span className={styles["thumb"]} />
            </span>
            <span className={styles["icon"]}>
                {theme === "light" ? "☀︎" : "☽"}
            </span>
        </button>
    );
}
