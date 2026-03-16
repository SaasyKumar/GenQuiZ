import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "/src/styles/home/publicPage.module.css";
import Icon from "../Icon";
import ThemeToggle from "../ThemeToggle";
import { useTranslation } from "react-i18next";

interface PublicNavProps {
    activePage: "how-it-works" | "features" | "support";
}

export default function PublicNav({ activePage }: PublicNavProps) {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const close = () => setMenuOpen(false);

    return (
        <>
            <header className={styles["nav"]}>
                <Link to="/" className={styles["nav-logo"]}>
                    <Icon />
                </Link>
                <ul
                    className={`${styles["nav-links"]} ${menuOpen ? styles["nav-links-open"] : ""}`}
                >
                    <li>
                        <Link
                            to="/how-it-works"
                            onClick={close}
                            className={`${styles["nav-link"]} ${activePage === "how-it-works" ? styles["nav-link-active"] : ""}`}
                        >
                            {t("home.nav.howItWorks")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/features"
                            onClick={close}
                            className={`${styles["nav-link"]} ${activePage === "features" ? styles["nav-link-active"] : ""}`}
                        >
                            {t("home.nav.features")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/support"
                            onClick={close}
                            className={`${styles["nav-link"]} ${activePage === "support" ? styles["nav-link-active"] : ""}`}
                        >
                            {t("home.nav.support")}
                        </Link>
                    </li>
                </ul>
                <ThemeToggle />
                <button
                    className={styles["hamburger"]}
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <span
                        className={`${styles["ham-line"]} ${menuOpen ? styles["ham-open"] : ""}`}
                    />
                </button>
            </header>
            {menuOpen && (
                <div className={styles["menu-backdrop"]} onClick={close} />
            )}
        </>
    );
}
