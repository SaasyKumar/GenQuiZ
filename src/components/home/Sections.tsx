import Card from "./Card";
import styles from "/src/styles/home/sections.module.css";
import { useTranslation } from "react-i18next";
export default function Sections() {
    const { t } = useTranslation();
    return (
        <>
            <div className={styles["overview"]}>
                <h5>{t("home.sections.overviewLabel")}</h5>
                <h2>{t("home.sections.overviewHeading")}</h2>
                <div className={styles["card-container"]}>
                    <Card
                        iconStyle={styles["ai"]}
                        headingContent={t(
                            "home.sections.cards.generate.heading",
                        )}
                        paraContent={t("home.sections.cards.generate.para")}
                        buttonContent={t("home.sections.cards.generate.button")}
                        linkTo="app"
                    />
                    <Card
                        iconStyle={styles["extract"]}
                        headingContent={t("home.sections.cards.parse.heading")}
                        paraContent={t("home.sections.cards.parse.para")}
                        buttonContent={t("home.sections.cards.parse.button")}
                        linkTo="app/load-quiz"
                    />
                    <Card
                        iconStyle={styles["cloud"]}
                        headingContent={t("home.sections.cards.cloud.heading")}
                        paraContent={t("home.sections.cards.cloud.para")}
                        buttonContent={t("home.sections.cards.cloud.button")}
                        linkTo=""
                    />
                </div>
            </div>
        </>
    );
}
