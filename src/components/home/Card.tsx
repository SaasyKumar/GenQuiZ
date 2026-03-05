import { Link } from "react-router-dom";
import Button from "../Button";
import styles from "/src/styles/home/card.module.css";
export default function Card({
    iconStyle,
    headingContent,
    paraContent,
    buttonContent,
    linkTo,
}: {
    iconStyle?: string;
    headingContent: string;
    paraContent: string;
    buttonContent: string;
    linkTo: string;
}) {
    const icon = iconStyle ? (
        <div className={styles["icon"] + " " + iconStyle}></div>
    ) : null;
    return (
        <>
            <div className={styles["card"]}>
                {icon}
                <h3>{headingContent}</h3>
                <p>{paraContent}</p>
                <Link className={styles["link"]} to={linkTo}>
                    {" "}
                    <Button
                        content={buttonContent}
                        variant="primary"
                        buttonStyle={styles["button"]}
                    />
                </Link>
            </div>
        </>
    );
}
