import styles from "/src/styles/button.module.css";
export default function Button({
    onClick,
    variant,
    titleContent,
    content,
    disabled,
    isSelected,
    isCorrectAnswer,
    isWrongAnswer,
    buttonStyle,
}: {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    variant?: string;
    titleContent?: string;
    content: string;
    disabled?: boolean;
    isSelected?: boolean;
    isCorrectAnswer?: boolean;
    isWrongAnswer?: boolean;
    buttonStyle?: string;
}) {
    let classString = buttonStyle
        ? styles["button"] + " " + buttonStyle + " "
        : styles["button"] + " ";
    const answerAttributes: Record<string, string> = {};
    if (isSelected) {
        answerAttributes["data-selected"] = "true";
    }
    if (isCorrectAnswer) {
        answerAttributes["data-correct"] = "true";
    } else if (isWrongAnswer) {
        answerAttributes["data-wrong"] = "true";
    }
    classString += variant == "primary" ? styles["primary"] : "";
    return (
        <>
            <div
                className={classString}
                title={titleContent}
                onClick={(ev) => {
                    onClick?.(ev);
                }}
                {...(disabled ? { "data-disabled": "true" } : {})}
                {...answerAttributes}
            >
                {content}
            </div>
        </>
    );
}
