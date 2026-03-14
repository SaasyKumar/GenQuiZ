import { type question } from "./../../utils/extractQn";
import styles from "/src/styles/mcq.module.css";
import Button from "./../Button";
import Inputs, { type InputChangeEvent } from "../Inputs";

export default function MCQ({
    question,
    onOptionClick,
    optionsSelected,
    showAnswer = false,
    isResult = false,
    isChecked = false,
    onCheck = () => {},
}: {
    question: question;
    onOptionClick?: (key: string, id: string) => void;
    optionsSelected: string | null;
    showAnswer?: boolean;
    isResult?: boolean;
    isChecked?: boolean;
    onCheck?: ((ev: InputChangeEvent) => void) | (() => void);
}) {
    if (isResult) showAnswer = true;

    const optionBaseClass = styles["options"];
    const selectabilityClass = showAnswer
        ? styles["not-selectable"]
        : styles["selectable-options"];

    const options = Object.keys(question.options).map((key) => {
        const selected = !!optionsSelected && optionsSelected === key;
        const answerAttributes = showAnswer
            ? {
                  isCorrectAnswer: key === question.answer,
                  isWrongAnswer: selected && key !== question.answer,
              }
            : {};
        return (
            <Button
                key={key}
                isSelected={selected}
                buttonStyle={`${optionBaseClass} ${selectabilityClass}`}
                {...answerAttributes}
                onClick={() => onOptionClick?.(key, question.id)}
                content={question.options[key]}
            />
        );
    });

    const questionDiv = isResult ? (
        <div className={styles["result-qn"]}>
            <h3>{question.question}</h3>
            <Inputs
                InputOptions={{ inputType: "checkbox", isChecked }}
                name={question.id}
                styleClass={styles["checkbox"]}
                onChange={onCheck}
            />
        </div>
    ) : (
        <h3 className={styles["question-text"]}>{question.question}</h3>
    );

    return (
        <div key={question.id}>
            {questionDiv}
            {options}
            {showAnswer && question.explanation && (
                <p className={styles["explanation"]}>{question.explanation}</p>
            )}
        </div>
    );
}
