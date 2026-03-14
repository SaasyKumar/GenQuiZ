import styles from "/src/styles/sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [tooltip, setTooltip] = useState<{ label: string; y: number } | null>(
        null,
    );

    const navigationList: Record<string, Record<string, string>> = {
        gen: {
            content: t("header.nav.generate"),
            link: "/app",
            icon: "generate",
        },
        extract: {
            content: t("header.nav.parse"),
            link: "/app/load-quiz",
            icon: "parse",
        },
        load: {
            content: t("header.nav.myQuizzes"),
            link: "/app/load",
            icon: "load",
        },
    };

    function handleNavClick(link: string) {
        navigate(link);
    }

    const navigation = Object.keys(navigationList).map((key) => {
        const item = navigationList[key];
        return (
            <NavLink
                key={key}
                to={item["link"]}
                end
                onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item["link"]);
                }}
                className={({ isActive }) =>
                    `${styles["nav-item"]} ${isActive ? styles["active"] : ""}`
                }
                onMouseEnter={(e) => {
                    if (!collapsed) return;
                    const rect = (
                        e.currentTarget as HTMLElement
                    ).getBoundingClientRect();
                    setTooltip({
                        label: item["content"],
                        y: rect.top + rect.height / 2,
                    });
                }}
                onMouseLeave={() => setTooltip(null)}
            >
                <span
                    className={`${styles["nav-icon"]} ${styles[`icon-${item["icon"]}`]}`}
                />
                {!collapsed && (
                    <span className={styles["nav-label"]}>
                        {item["content"]}
                    </span>
                )}
            </NavLink>
        );
    });

    return (
        <aside
            className={`${styles["sidebar"]} ${collapsed ? styles["collapsed"] : ""}`}
        >
            <div className={styles["sidebar-top"]}>
                {/* Logo row: logo (expanded only) + collapse/expand toggle */}
                <div className={styles["logo-row"]}>
                    {!collapsed && (
                        <NavLink to="/" className={styles["logo"]}>
                            <Icon />
                        </NavLink>
                    )}
                    <button
                        className={styles["toggle-btn"]}
                        onClick={onToggle}
                        title={
                            collapsed ? "Expand sidebar" : "Collapse sidebar"
                        }
                        aria-label={
                            collapsed ? "Expand sidebar" : "Collapse sidebar"
                        }
                    >
                        <span
                            className={`${styles["toggle-icon"]} ${collapsed ? styles["toggle-icon-expand"] : styles["toggle-icon-collapse"]}`}
                        />
                    </button>
                </div>

                {!collapsed && (
                    <div className={styles["section-label"]}>Practice</div>
                )}

                <nav className={styles["nav"]}>{navigation}</nav>
            </div>

            {/* Bottom: full ThemeToggle when expanded, sun/moon icon when collapsed */}
            <div className={styles["sidebar-bottom"]}>
                {collapsed ? (
                    <button
                        className={styles["theme-icon-btn"]}
                        onClick={toggleTheme}
                        title={
                            theme === "light"
                                ? "Switch to dark mode"
                                : "Switch to light mode"
                        }
                        aria-label="Toggle theme"
                    >
                        <span className={styles["theme-icon"]}>
                            {theme === "light" ? "☀︎" : "☽"}
                        </span>
                    </button>
                ) : (
                    <ThemeToggle />
                )}
            </div>

            {/* Tooltip portal */}
            {collapsed && tooltip && (
                <div className={styles["tooltip"]} style={{ top: tooltip.y }}>
                    {tooltip.label}
                </div>
            )}
        </aside>
    );
}
