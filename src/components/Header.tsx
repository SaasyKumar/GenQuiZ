import styles from "/src/styles/header.module.css";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t } = useTranslation();

    const navigationList: Record<string, Record<string, string>> = {
        gen: { content: t("header.nav.generate"), link: "/app" },
        extract: { content: t("header.nav.parse"), link: "/app/load-quiz" },
        load: { content: t("header.nav.myQuizzes"), link: "/app/load" },
    };
    const navigation = Object.keys(navigationList).map((key) => {
        return (
            <NavLink
                key={key}
                to={navigationList[key]["link"]}
                end
                className={({ isActive }) =>
                    `${styles["nav-link"]} ${isActive ? styles["active"] : ""}`
                }
            >
                <li>{navigationList[key]["content"]}</li>
            </NavLink>
        );
    });
    return (
        <header className={styles["header"]}>
            <NavLink to="/" className={styles["icon"]}>
                <Icon />
            </NavLink>
            <ul>{navigation}</ul>
        </header>
    );
}
