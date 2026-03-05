import Card from "./Card";
import styles from "/src/styles/home/sections.module.css";
export default function Sections() {
    return (
        <>
            <div className={styles["overview"]}>
                <h5>OVERVIEW</h5>
                <h2>What you can do</h2>
                <div className={styles["card-container"]}>
                    <Card
                        iconStyle={styles["ai"]}
                        headingContent="Generate Quiz using AI"
                        paraContent="Instantly generate questions from your study
                                notes or documents using advanced AI."
                        buttonContent="Generate"
                        linkTo="app"
                    />
                    <Card
                        iconStyle={styles["extract"]}
                        headingContent="Extract Quiz"
                        paraContent="Generate quiz from Aiken format text."
                        buttonContent="Extract"
                        linkTo="app/load-quiz"
                    />
                    <Card
                        iconStyle={styles["cloud"]}
                        headingContent="Load from Cloud"
                        paraContent="Access and take quizzes you've previously
                                created."
                        buttonContent="Sign in"
                        linkTo=""
                    />
                </div>
            </div>
        </>
    );
}
