import { Link } from "react-router-dom";
import styles from "/src/styles/home/publicPage.module.css";
import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import ThemeToggle from "../ThemeToggle";

const FEATURES = [
    {
        icon: "🤖",
        heading: "AI Quiz Generation",
        body: "Paste any text — notes, articles, textbook excerpts — and Amazon Nova Pro via AWS Bedrock writes MCQ questions tailored to that content in seconds.",
        tag: "live",
    },
    {
        icon: "⚙️",
        heading: "Difficulty Levels",
        body: "Choose from four levels: Easy, Medium, and Hard. The AI adapts question phrasing and complexity to match your chosen difficulty.",
        tag: "live",
    },
    {
        icon: "🔢",
        heading: "Custom Question Count",
        body: "Pick between 5 and 10 questions per run. The token budget scales automatically so the model always has enough room to answer completely.",
        tag: "live",
    },
    {
        icon: "📄",
        heading: "Aiken Format Parser",
        body: "Paste pre-written MCQs in Aiken format or upload a .txt / .md file. GenQuiZ parses them locally — no network call needed — and drops straight into quiz mode.",
        tag: "live",
    },
    {
        icon: "🧹",
        heading: "Input Sanitisation",
        body: "Every text submission is run through DOMPurify in the browser before leaving your device. Only clean plain text reaches the API.",
        tag: "live",
    },
    {
        icon: "📊",
        heading: "Progress Bar",
        body: "A live amber progress bar shows exactly where you are in the quiz at a glance — question X of Y, always visible.",
        tag: "live",
    },
    {
        icon: "✅",
        heading: "Colour-coded Results",
        body: "After submitting, every option is highlighted — green for correct, red for wrong, amber for your unchosen correct pick — so review is instant.",
        tag: "live",
    },
    {
        icon: "💡",
        heading: "AI Explanations",
        body: "Every question includes an AI-authored explanation shown after you reveal the answer, so you actually learn rather than just drill.",
        tag: "live",
    },
    {
        icon: "☑️",
        heading: "Selective Export",
        body: "Check or uncheck individual questions on the Result page, then copy only your selection to clipboard or download it as a .txt file in Aiken format.",
        tag: "live",
    },
    {
        icon: "🔁",
        heading: "Re-load Saved Quizzes",
        body: "Downloaded Aiken .txt files can be re-loaded into GenQuiZ via the Parse Quiz page at any time — no account or storage needed.",
        tag: "live",
    },
    {
        icon: "🌐",
        heading: "Bilingual UI",
        body: "The full interface is available in English and Tamil, driven by i18next. Language switching is seamless across every page.",
        tag: "live",
    },
    {
        icon: "🌙",
        heading: "Dark & Light Theme",
        body: "A persistent theme toggle in every nav bar remembers your preference across sessions via localStorage. All colours use CSS custom properties.",
        tag: "live",
    },
    {
        icon: "☁️",
        heading: "Cloud Quiz Storage",
        body: "Sign in to save your generated quizzes to the cloud and retake them from any device, anytime.",
        tag: "soon",
    },
];

const COMPARE_ROWS = [
    {
        feat: "AI question generation",
        genquiz: true,
        manual: false,
        lms: "partial",
    },
    {
        feat: "Works without an account",
        genquiz: true,
        manual: true,
        lms: false,
    },
    {
        feat: "Aiken format support",
        genquiz: true,
        manual: true,
        lms: "partial",
    },
    {
        feat: "Colour-coded result review",
        genquiz: true,
        manual: false,
        lms: true,
    },
    {
        feat: "AI explanations per question",
        genquiz: true,
        manual: false,
        lms: false,
    },
    {
        feat: "Export / re-import quiz",
        genquiz: true,
        manual: true,
        lms: "partial",
    },
    { feat: "Dark mode", genquiz: true, manual: false, lms: "partial" },
    { feat: "Bilingual interface", genquiz: true, manual: false, lms: false },
];

export default function Features() {
    const { t } = useTranslation();

    const renderCell = (val: boolean | string) => {
        if (val === true) return <span className={styles["tick"]}>✓</span>;
        if (val === false) return <span className={styles["dash"]}>—</span>;
        return <span className={styles["partial"]}>Partial</span>;
    };

    return (
        <div className={styles["page"]}>
            {/* ── NAV ── */}
            <header className={styles["nav"]}>
                <Link to="/" className={styles["nav-logo"]}>
                    <Icon />
                </Link>
                <ul className={styles["nav-links"]}>
                    <li>
                        <Link to="/how-it-works" className={styles["nav-link"]}>
                            {t("home.nav.howItWorks")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/features"
                            className={`${styles["nav-link"]} ${styles["nav-link-active"]}`}
                        >
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
                {/* ── Hero ── */}
                <section className={styles["hero"]}>
                    <span className={styles["eyebrow"]}>
                        {t("features.eyebrow")}
                    </span>
                    <h1 className={styles["hero-title"]}>
                        {t("features.title")}
                    </h1>
                    <p className={styles["hero-sub"]}>
                        {t("features.subtitle")}
                    </p>
                    <div className={styles["hero-cta"]}>
                        <Link to="/app" className={styles["btn-primary"]}>
                            {t("features.ctaPrimary")}
                        </Link>
                        <Link
                            to="/how-it-works"
                            className={styles["btn-ghost"]}
                        >
                            {t("features.ctaSecondary")}
                        </Link>
                    </div>
                </section>

                {/* ── Feature cards ── */}
                <div className={styles["feature-grid"]}>
                    {FEATURES.map((f, i) => (
                        <div key={i} className={styles["feature-card"]}>
                            <div className={styles["feature-card-icon"]}>
                                {f.icon}
                            </div>
                            <h3>{f.heading}</h3>
                            <p>{f.body}</p>
                            <span
                                className={`${styles["feature-card-tag"]} ${f.tag === "live" ? styles["feature-card-tag-live"] : styles["feature-card-tag-soon"]}`}
                            >
                                {f.tag === "live" ? "Live" : "Coming soon"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── Comparison table ── */}
                <section className={styles["section-intro"]}>
                    <span className={styles["section-label"]}>
                        {t("features.compareLabel")}
                    </span>
                    <h2 className={styles["section-title"]}>
                        {t("features.compareTitle")}
                    </h2>
                    <p className={styles["section-sub"]}>
                        {t("features.compareSub")}
                    </p>
                </section>

                <div className={styles["compare-wrap"]}>
                    <table className={styles["compare-table"]}>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>GenQuiZ</th>
                                <th>Manual Flashcards</th>
                                <th>LMS Quiz Builder</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARE_ROWS.map((row, i) => (
                                <tr key={i}>
                                    <td className={styles["feat-name"]}>
                                        {row.feat}
                                    </td>
                                    <td>{renderCell(row.genquiz)}</td>
                                    <td>{renderCell(row.manual)}</td>
                                    <td>{renderCell(row.lms)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ── CTA ── */}
                <section className={styles["cta-banner"]}>
                    <h2>{t("features.ctaBanner.title")}</h2>
                    <p>{t("features.ctaBanner.sub")}</p>
                    <Link to="/app" className={styles["btn-primary-inv"]}>
                        {t("features.ctaBanner.button")}
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
