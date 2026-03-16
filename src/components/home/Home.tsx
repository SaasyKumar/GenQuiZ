import styles from "/src/styles/home/home.module.css";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import ThemeToggle from "../ThemeToggle";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Home() {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={styles["page"]}>
            {/* ── NAV ── */}
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
                            className={styles["nav-link"]}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t("home.nav.howItWorks")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/features"
                            className={styles["nav-link"]}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t("home.nav.features")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/support"
                            className={styles["nav-link"]}
                            onClick={() => setMenuOpen(false)}
                        >
                            {t("home.nav.support")}
                        </Link>
                    </li>
                </ul>
                <ThemeToggle />
                <Link to="/app" className={styles["nav-cta"]}>
                    {t("home.sections.cards.generate.button")} →
                </Link>
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

            {/* Mobile menu backdrop */}
            {menuOpen && (
                <div
                    className={styles["menu-backdrop"]}
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* ── HERO ── */}
            <section className={styles["hero"]}>
                <div className={styles["hero-eyebrow"]}>
                    <span className={styles["dot"]} />
                    AI-Powered · Instant · Export Ready
                </div>
                <h1 className={styles["hero-heading"]}>
                    <span className={styles["hero-line1"]}>Turn notes</span>
                    <span className={styles["hero-line2"]}>into quizzes.</span>
                    <span className={styles["hero-line3"]}>In seconds.</span>
                </h1>
                <p className={styles["hero-sub"]}>{t("home.banner.tagline")}</p>
                <div className={styles["hero-actions"]}>
                    <Link to="/app" className={styles["btn-primary"]}>
                        Generate with AI
                    </Link>
                    <Link to="/app/load-quiz" className={styles["btn-ghost"]}>
                        Load Aiken format
                    </Link>
                </div>
                <div className={styles["hero-badge"]}>
                    <span className={styles["badge-model"]}>
                        amazon.nova-pro-v1:0
                    </span>
                    <span className={styles["badge-label"]}>
                        Powered by AWS Bedrock
                    </span>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className={styles["features"]}>
                <div className={styles["features-header"]}>
                    <span className={styles["section-label"]}>
                        {t("home.sections.overviewLabel")}
                    </span>
                    <h2 className={styles["features-title"]}>
                        {t("home.sections.overviewHeading")}
                    </h2>
                </div>
                <div className={styles["feature-list"]}>
                    <article className={styles["feature-row"]}>
                        <div className={styles["feature-num"]}>01</div>
                        <div className={styles["feature-icon-wrap"]}>
                            <div
                                className={`${styles["feature-icon"]} ${styles["icon-ai"]}`}
                            />
                        </div>
                        <div className={styles["feature-body"]}>
                            <h3>{t("home.sections.cards.generate.heading")}</h3>
                            <p>{t("home.sections.cards.generate.para")}</p>
                        </div>
                        <Link to="/app" className={styles["feature-cta"]}>
                            {t("home.sections.cards.generate.button")} →
                        </Link>
                    </article>
                    <div className={styles["feature-divider"]} />
                    <article className={styles["feature-row"]}>
                        <div className={styles["feature-num"]}>02</div>
                        <div className={styles["feature-icon-wrap"]}>
                            <div
                                className={`${styles["feature-icon"]} ${styles["icon-extract"]}`}
                            />
                        </div>
                        <div className={styles["feature-body"]}>
                            <h3>{t("home.sections.cards.parse.heading")}</h3>
                            <p>{t("home.sections.cards.parse.para")}</p>
                        </div>
                        <Link
                            to="/app/load-quiz"
                            className={styles["feature-cta"]}
                        >
                            {t("home.sections.cards.parse.button")} →
                        </Link>
                    </article>
                    <div className={styles["feature-divider"]} />
                    <article
                        className={`${styles["feature-row"]} ${styles["feature-row-dim"]}`}
                    >
                        <div className={styles["feature-num"]}>03</div>
                        <div className={styles["feature-icon-wrap"]}>
                            <div
                                className={`${styles["feature-icon"]} ${styles["icon-cloud"]}`}
                            />
                        </div>
                        <div className={styles["feature-body"]}>
                            <h3>{t("home.sections.cards.cloud.heading")}</h3>
                            <p>{t("home.sections.cards.cloud.para")}</p>
                        </div>
                        <span className={styles["feature-cta-soon"]}>
                            Coming soon
                        </span>
                    </article>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className={styles["stats"]}>
                <div className={styles["stat"]}>
                    <span className={styles["stat-value"]}>~10s</span>
                    <span className={styles["stat-label"]}>
                        Quiz generation time
                    </span>
                </div>
                <div className={styles["stat-divider"]} />
                <div className={styles["stat"]}>
                    <span className={styles["stat-value"]}>5–10</span>
                    <span className={styles["stat-label"]}>
                        Questions per run
                    </span>
                </div>
                <div className={styles["stat-divider"]} />
                <div className={styles["stat"]}>
                    <span className={styles["stat-value"]}>2</span>
                    <span className={styles["stat-label"]}>
                        Languages supported
                    </span>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className={styles["cta-section"]}>
                <p className={styles["cta-kicker"]}>Ready?</p>
                <h2 className={styles["cta-heading"]}>
                    Paste your notes.
                    <br />
                    Get your quiz.
                </h2>
                <Link to="/app" className={styles["btn-primary"]}>
                    Start Generating →
                </Link>
            </section>

            {/* ── FOOTER ── */}
            <footer className={styles["footer"]}>
                <Icon />
                <ul className={styles["footer-links"]}>
                    <li>{t("home.footer.privacy")}</li>
                    <li>{t("home.footer.terms")}</li>
                    <li>{t("home.footer.about")}</li>
                    <li>{t("home.footer.contact")}</li>
                </ul>
                <span className={styles["footer-copy"]}>© 2025 GenQuiZ</span>
            </footer>
        </div>
    );
}
