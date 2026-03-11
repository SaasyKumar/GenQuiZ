import { type question } from "./../../utils/extractQn";
import styles from "/src/styles/mcq.module.css";
import Button from "./../Button";
export default function MCQ({
    question,
    onOptionClick,
    optionsSelected,
    showAnswer,
}: {
    question: question;
    onOptionClick?: (key: string, id: string) => void;
    optionsSelected: string | null;
    showAnswer?: boolean;
}) {
    let buttonClassName = styles["options"];
    buttonClassName += showAnswer ? "" : " " + styles["selectable-options"];
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

    return (
        <div key={question["id"]}>
            <h3>{question["question"]}</h3>
            {options}
            {showAnswer ? <p>{question["explanation"]}</p> : null}
        </div>
    );
}
