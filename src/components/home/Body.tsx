import Banner from "./Banner";
import styles from "/src/styles/home/body.module.css";
import Sections from "./Sections";
export default function Body() {
    return (
        <div className={styles["body"]}>
            <Banner />
            <div className={styles["sections"]}>
                {/* <div className={styles["navigation"]}>
                    <ul>
                        <li>Overview</li>
                        {sectionList.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div> */}
                <Sections />
            </div>
        </div>
    );
}
