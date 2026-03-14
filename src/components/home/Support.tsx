import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "/src/styles/home/publicPage.module.css";
import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import ThemeToggle from "../ThemeToggle";

const FAQS = [
    {
        q: "What kinds of text can I paste to generate a quiz?",
        a: "Anything — lecture notes, Wikipedia excerpts, textbook paragraphs, news articles, technical documentation. The AI works best on factual, information-dense text. Avoid pasting just a list of bullet points with no context; full sentences give the model more to work with.",
    },
    {
        q: "How many questions can I generate at once?",
        a: "Between 5 and 10 questions per generation. The token budget scales with question count (1 200 tokens per question, capped at 10 000) to ensure complete, well-formed output every time.",
    },
    {
        q: "What is Aiken format?",
        a: "Aiken is a plain-text MCQ format widely used in e-learning tools. Each question starts with the question text, followed by lettered options (A. B. C. D.) and a line beginning ANSWER: that names the correct letter. GenQuiZ generates output in this format and can also parse it.",
    },
    {
        q: "Can I load questions I generated previously?",
        a: "Yes. After finishing a quiz, download the selected questions as a .txt file from the Result page. On your next visit, go to Parse Quiz, upload that file or paste its content, and you're back in quiz mode instantly — no account needed.",
    },
    {
        q: "Is my text sent to any server?",
        a: "Only the Generate Quiz path sends your text — to an AWS API Gateway endpoint backed by an AWS Lambda function, which forwards it to Amazon Bedrock. The Parse Quiz path parses entirely in your browser; no text leaves your device. Either way, nothing is stored permanently.",
    },
    {
        q: "Why does the difficulty level matter?",
        a: "The difficulty label is passed as part of the system prompt to Amazon Nova Pro. 'Child' produces short, simple questions with obvious answers. 'Hard' produces nuanced questions that may require understanding relationships between concepts rather than just recalling facts.",
    },
    {
        q: "The generated questions look wrong or incomplete — what should I do?",
        a: "Try pasting a shorter, more focused passage (500–1 500 words works well). Reduce the question count. If the text is highly technical or niche, bump the difficulty down — the model sometimes misunderstands very specialised terminology at higher difficulty levels.",
    },
    {
        q: "How do I switch the language to Tamil?",
        a: "The language switcher is available in the app settings. GenQuiZ supports English and Tamil — the full interface, including labels, placeholders, nav items, and result copy, is translated for both languages via i18next.",
    },
    {
        q: "Does my dark/light theme preference persist?",
        a: "Yes. The toggle in every navigation bar writes your choice to localStorage. It also respects your OS-level prefers-color-scheme setting on first visit.",
    },
    {
        q: "Will cloud saving be available?",
        a: "Cloud storage is on the roadmap. Once available, you'll be able to sign in and access all quizzes you've previously generated from any device. For now, the download-and-re-upload workflow via Aiken .txt files achieves the same thing locally.",
    },
];

const CONTACTS = [
    {
        icon: "📬",
        title: "Email Support",
        body: "Send us a detailed description of your issue and we'll respond within 48 hours.",
        cta: "support@genquiz.app",
    },
    {
        icon: "🐛",
        title: "Report a Bug",
        body: "Found something broken? Open an issue on GitHub with steps to reproduce.",
        cta: "github.com/genquiz",
    },
    {
        icon: "💡",
        title: "Feature Request",
        body: "Have an idea that would make GenQuiZ better? We'd love to hear it.",
        cta: "Submit an idea",
    },
    {
        icon: "📖",
        title: "Documentation",
        body: "Read the full technical walkthrough including the code flow and AWS setup.",
        cta: "Read the docs →",
    },
];

export default function Support() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

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
                        <Link to="/features" className={styles["nav-link"]}>
                            {t("home.nav.features")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/support"
                            className={`${styles["nav-link"]} ${styles["nav-link-active"]}`}
                        >
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
                        {t("support.eyebrow")}
                    </span>
                    <h1 className={styles["hero-title"]}>
                        {t("support.title")}
                    </h1>
                    <p className={styles["hero-sub"]}>
                        {t("support.subtitle")}
                    </p>
                </section>

                {/* ── FAQ ── */}
                <section className={styles["section-intro"]}>
                    <span className={styles["section-label"]}>
                        {t("support.faqLabel")}
                    </span>
                    <h2 className={styles["section-title"]}>
                        {t("support.faqTitle")}
                    </h2>
                </section>

                <div className={styles["faq-list"]}>
                    {FAQS.map((faq, i) => (
                        <div
                            key={i}
                            className={`${styles["faq-item"]} ${openIndex === i ? styles["faq-open"] : ""}`}
                        >
                            <button
                                className={styles["faq-question"]}
                                onClick={() => toggle(i)}
                                aria-expanded={openIndex === i}
                            >
                                {faq.q}
                                <span className={styles["faq-chevron"]} />
                            </button>
                            <div className={styles["faq-answer"]}>{faq.a}</div>
                        </div>
                    ))}
                </div>

                {/* ── Contact ── */}
                <section className={styles["section-intro"]}>
                    <span className={styles["section-label"]}>
                        {t("support.contactLabel")}
                    </span>
                    <h2 className={styles["section-title"]}>
                        {t("support.contactTitle")}
                    </h2>
                    <p className={styles["section-sub"]}>
                        {t("support.contactSub")}
                    </p>
                </section>

                <div className={styles["contact-grid"]}>
                    {CONTACTS.map((c, i) => (
                        <div key={i} className={styles["contact-card"]}>
                            <span className={styles["contact-icon"]}>
                                {c.icon}
                            </span>
                            <h3>{c.title}</h3>
                            <p>{c.body}</p>
                            <span
                                style={{
                                    fontSize: "0.82rem",
                                    color: "var(--accent)",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                {c.cta}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── CTA ── */}
                <section className={styles["cta-banner"]}>
                    <h2>{t("support.ctaBanner.title")}</h2>
                    <p>{t("support.ctaBanner.sub")}</p>
                    <Link to="/app" className={styles["btn-primary-inv"]}>
                        {t("support.ctaBanner.button")}
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
