import image from "/assets/intro.png";
import styles from "/src/styles/home/banner.module.css";
import { useTranslation } from "react-i18next";
export default function Banner() {
    const { t } = useTranslation();
    return (
        <div className={styles["banner"]}>
            <img src={image}></img>
            <div className={styles["banner-text"]}>
                <h1>GenQuiZ</h1>
                <p>{t("home.banner.tagline")}</p>
            </div>
            <div
                className={styles["watermark"]}
                title="Am I bothering you?"
            ></div>
        </div>
    );
}
