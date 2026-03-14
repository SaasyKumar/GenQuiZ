import styles from "/src/styles/sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface SidebarProps {
    collapsed: boolean;
    onExpand: () => void;
}

export default function Sidebar({ collapsed, onExpand }: SidebarProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
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
        onExpand();
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
            {/* Hidden ThemeToggle for collapsed mode click passthrough */}
            <div className={styles["hidden-toggle"]}>
                <ThemeToggle />
            </div>

            <div className={styles["sidebar-top"]}>
                {/* Logo */}
                <div className={styles["logo-row"]}>
                    <NavLink to="/" className={styles["logo"]}>
                        <Icon />
                    </NavLink>
                </div>

                {!collapsed && (
                    <div className={styles["section-label"]}>Practice</div>
                )}

                <nav className={styles["nav"]}>{navigation}</nav>
            </div>

            <div className={styles["sidebar-bottom"]}>
                {collapsed ? (
                    <button
                        className={styles["theme-icon-btn"]}
                        title="Toggle theme"
                        aria-label="Toggle theme"
                        onClick={() => {
                            const btn =
                                document.querySelector<HTMLButtonElement>(
                                    `.${styles["hidden-toggle"]} button`,
                                );
                            btn?.click();
                        }}
                    >
                        <span className={styles["theme-icon-collapsed"]} />
                    </button>
                ) : (
                    <ThemeToggle />
                )}
            </div>

            {/* Tooltip portal — rendered at fixed position so it escapes overflow:hidden */}
            {collapsed && tooltip && (
                <div className={styles["tooltip"]} style={{ top: tooltip.y }}>
                    {tooltip.label}
                </div>
            )}
        </aside>
    );
}
