import styles from "/src/styles/home/home.module.css";
import Body from "./Body";
import Icon from "../Icon";
export default function Home() {
    return (
        <>
            <header className={styles["header"]}>
                <Icon />
                <ul>
                    <li>How it works</li>
                    <li>Blog</li>
                    <li>Support</li>
                </ul>
                {/* <div>Profile</div> */}
            </header>
            <Body />
            <footer className={styles["footer"]}>
                <ul>
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </footer>
        </>
    );
}
