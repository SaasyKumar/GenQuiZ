import image from "/assets/intro.png";
import styles from "/src/styles/home/banner.module.css";
export default function Banner() {
    return (
        <div className={styles["banner"]}>
            <img src={image}></img>
            <div className={styles["banner-text"]}>
                <h1>GenQuiZ</h1>
                <p>
                    Harness the power of AI to generate customized quizzes for
                    any subject within seconds.
                </p>
            </div>
            <div
                className={styles["watermark"]}
                title="Am I bothering you?"
            ></div>
        </div>
    );
}
