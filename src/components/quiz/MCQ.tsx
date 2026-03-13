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
    onCheck,
}: {
    question: question;
    onOptionClick?: (key: string, id: string) => void;
    optionsSelected: string | null;
    showAnswer?: boolean;
    isResult?: boolean;
    isChecked?: boolean;
    onCheck: ((ev: InputChangeEvent) => void) | (() => void);
}) {
    let buttonClassName = styles["options"];
    if (isResult == true) {
        showAnswer = true;
    }
    buttonClassName += showAnswer
        ? ` ${styles["not-selectable"]}`
        : ` ${styles["selectable-options"]}`;
    const options = Object.keys(question["options"]).map((key) => {
        const selected =
            optionsSelected && optionsSelected == key ? true : false;
        // FIXME: et attributes = (showAnswer)?{
        //     isCorrectAnswer: { key == question["answer"]? true :false},
        // } :{};
        // FIXME a chess style blunder okay great answer like that?
        const answerAttributes = showAnswer
            ? {
                  isCorrectAnswer: key == question["answer"],
                  isWrongAnswer: selected && key != question["answer"],
              }
            : {};
        return (
            <Button
                key={key}
                isSelected={selected}
                buttonStyle={buttonClassName}
                {...answerAttributes}
                onClick={() => {
                    if (onOptionClick) {
                        onOptionClick(key, question["id"]);
                    }
                }}
                content={question["options"][key]}
            />
        );
    });
     
    const questionDiv =
        isResult == true ? (
            <div className={styles["result-qn"]}>
                <h3>{question["question"]}</h3>
                <Inputs
                    InputOptions={{
                        inputType: "checkbox",
                        isChecked: isChecked,
                    }}
                    name={question["id"]}
                    styleClass={styles["checkbox"]}
                    onChange={onCheck}
                />
            </div>
        ) : (
            <h3>{question["question"]}</h3>
        );
    return (
        <div key={question["id"]}>
            {questionDiv}
            {options}
            {showAnswer ? <p>{question["explanation"]}</p> : null}
        </div>
    );
}
