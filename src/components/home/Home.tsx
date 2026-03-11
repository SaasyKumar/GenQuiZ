import styles from "/src/styles/home/home.module.css";
import Body from "./Body";
import Icon from "../Icon";
import { useTranslation } from "react-i18next";
export default function Home() {
    const { t } = useTranslation();
    return (
        <>
            <header className={styles["header"]}>
                <Icon />
                <ul>
                    <li>{t("home.nav.howItWorks")}</li>
                    <li>{t("home.nav.features")}</li>
                    <li>{t("home.nav.support")}</li>
                </ul>
            </header>
            <Body />
            <footer className={styles["footer"]}>
                <ul>
                    <li>{t("home.footer.privacy")}</li>
                    <li>{t("home.footer.terms")}</li>
                    <li>{t("home.footer.about")}</li>
                    <li>{t("home.footer.contact")}</li>
                </ul>
            </footer>
        </>
    );
}
