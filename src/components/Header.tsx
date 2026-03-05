import styles from "/src/styles/header.module.css";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";
export default function Header() {
    const navigationList: Record<string, Record<string, string>> = {
        gen: { content: "Generate Quiz", link: "/app" },
        extract: { content: "Extract", link: "/app/load-quiz" },
        load: { content: "Load", link: "/app/load" },
    };
    const navigation = Object.keys(navigationList).map((key) => {
        return (
            <NavLink
                key={key}
                to={navigationList[key]["link"]}
                end
                // TODO: wow end if default children is set
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
