import { Link } from "react-router-dom";
import styles from "/src/styles/home/publicPage.module.css";
import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import ThemeToggle from "../ThemeToggle";

export default function HowItWorks() {
    const { t } = useTranslation();

    const steps = [
        {
            number: "01",
            phase: t("howItWorks.steps.step1.phase"),
            title: t("howItWorks.steps.step1.title"),
            description: t("howItWorks.steps.step1.description"),
            detail: t("howItWorks.steps.step1.detail"),
            tag: t("howItWorks.steps.step1.tag"),
        },
        {
            number: "02",
            phase: t("howItWorks.steps.step2.phase"),
            title: t("howItWorks.steps.step2.title"),
            description: t("howItWorks.steps.step2.description"),
            detail: t("howItWorks.steps.step2.detail"),
            tag: t("howItWorks.steps.step2.tag"),
        },
        {
            number: "03",
            phase: t("howItWorks.steps.step3.phase"),
            title: t("howItWorks.steps.step3.title"),
            description: t("howItWorks.steps.step3.description"),
            detail: t("howItWorks.steps.step3.detail"),
            tag: t("howItWorks.steps.step3.tag"),
        },
        {
            number: "04",
            phase: t("howItWorks.steps.step4.phase"),
            title: t("howItWorks.steps.step4.title"),
            description: t("howItWorks.steps.step4.description"),
            detail: t("howItWorks.steps.step4.detail"),
            tag: t("howItWorks.steps.step4.tag"),
        },
        {
            number: "05",
            phase: t("howItWorks.steps.step5.phase"),
            title: t("howItWorks.steps.step5.title"),
            description: t("howItWorks.steps.step5.description"),
            detail: t("howItWorks.steps.step5.detail"),
            tag: t("howItWorks.steps.step5.tag"),
        },
    ];

    const techPillars = (
        t("howItWorks.techPillars", { returnObjects: true }) as {
            label: string;
            value: string;
        }[]
    ).map((item, i) => (
        <div key={i} className={styles["pillar"]}>
            <span className={styles["pillar-value"]}>{item.value}</span>
            <span className={styles["pillar-label"]}>{item.label}</span>
        </div>
    ));

    return (
        <div className={styles["page"]}>
            <header className={styles["nav"]}>
                <Link to="/" className={styles["nav-logo"]}>
                    <Icon />
                </Link>
                <ul className={styles["nav-links"]}>
                    <li>
                        <Link
                            to="/how-it-works"
                            className={`${styles["nav-link"]} ${styles["nav-link-active"]}`}
                        >
                            {t("home.nav.howItWorks")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/features" className={styles["nav-link"]}>
                            {t("home.nav.features")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/support" className={styles["nav-link"]}>
                            {t("home.nav.support")}
                        </Link>
                    </li>
                </ul>
                <ThemeToggle />
            </header>

            <main className={styles["content"]}>
                <section className={styles["hero"]}>
                    <span className={styles["eyebrow"]}>
                        {t("howItWorks.hero.eyebrow")}
                    </span>
                    <h1 className={styles["hero-title"]}>
                        {t("howItWorks.hero.title")}
                    </h1>
                    <p className={styles["hero-sub"]}>
                        {t("howItWorks.hero.subtitle")}
                    </p>
                    <div className={styles["hero-cta"]}>
                        <Link to="/app" className={styles["btn-primary"]}>
                            {t("howItWorks.hero.ctaPrimary")}
                        </Link>
                        <Link
                            to="/app/load-quiz"
                            className={styles["btn-ghost"]}
                        >
                            {t("howItWorks.hero.ctaSecondary")}
                        </Link>
                    </div>
                </section>

                <section className={styles["tech-bar"]}>{techPillars}</section>

                <section className={styles["section-intro"]}>
                    <h2 className={styles["section-title"]}>
                        {t("howItWorks.flow.title")}
                    </h2>
                    <p className={styles["section-sub"]}>
                        {t("howItWorks.flow.subtitle")}
                    </p>
                </section>

                <section className={styles["steps-section"]}>
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`${styles["step"]} ${idx % 2 === 1 ? styles["step-reverse"] : ""}`}
                        >
                            <div className={styles["step-visual"]}>
                                <span className={styles["step-number"]}>
                                    {step.number}
                                </span>
                                <div className={styles["step-tag"]}>
                                    {step.tag}
                                </div>
                            </div>
                            <div className={styles["step-content"]}>
                                <span className={styles["step-phase"]}>
                                    {step.phase}
                                </span>
                                <h3 className={styles["step-title"]}>
                                    {step.title}
                                </h3>
                                <p className={styles["step-desc"]}>
                                    {step.description}
                                </p>
                                <p className={styles["step-detail"]}>
                                    {step.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                <section className={styles["paths"]}>
                    <h2 className={styles["section-title"]}>
                        {t("howItWorks.paths.title")}
                    </h2>
                    <div className={styles["paths-grid"]}>
                        <div className={styles["path-card"]}>
                            <div
                                className={`${styles["path-icon"]} ${styles["path-icon-ai"]}`}
                            />
                            <h3>{t("howItWorks.paths.ai.title")}</h3>
                            <p>{t("howItWorks.paths.ai.desc")}</p>
                            <ol className={styles["path-steps"]}>
                                {(
                                    t("howItWorks.paths.ai.steps", {
                                        returnObjects: true,
                                    }) as string[]
                                ).map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ol>
                            <Link to="/app" className={styles["btn-primary"]}>
                                {t("howItWorks.paths.ai.cta")}
                            </Link>
                        </div>
                        <div className={styles["path-divider"]}>
                            <span>{t("howItWorks.paths.or")}</span>
                        </div>
                        <div className={styles["path-card"]}>
                            <div
                                className={`${styles["path-icon"]} ${styles["path-icon-parse"]}`}
                            />
                            <h3>{t("howItWorks.paths.parse.title")}</h3>
                            <p>{t("howItWorks.paths.parse.desc")}</p>
                            <ol className={styles["path-steps"]}>
                                {(
                                    t("howItWorks.paths.parse.steps", {
                                        returnObjects: true,
                                    }) as string[]
                                ).map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ol>
                            <Link
                                to="/app/load-quiz"
                                className={styles["btn-primary"]}
                            >
                                {t("howItWorks.paths.parse.cta")}
                            </Link>
                        </div>
                    </div>
                </section>

                <section className={styles["export-section"]}>
                    <h2 className={styles["section-title"]}>
                        {t("howItWorks.export.title")}
                    </h2>
                    <p className={styles["section-sub"]}>
                        {t("howItWorks.export.desc")}
                    </p>
                    <div className={styles["export-grid"]}>
                        {(
                            t("howItWorks.export.features", {
                                returnObjects: true,
                            }) as { icon: string; label: string }[]
                        ).map((f, i) => (
                            <div key={i} className={styles["export-feat"]}>
                                <span className={styles["export-icon"]}>
                                    {f.icon}
                                </span>
                                <span>{f.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles["cta-banner"]}>
                    <h2>{t("howItWorks.ctaBanner.title")}</h2>
                    <p>{t("howItWorks.ctaBanner.sub")}</p>
                    <Link to="/app" className={styles["btn-primary-inv"]}>
                        {t("howItWorks.ctaBanner.button")}
                    </Link>
                </section>
            </main>

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
