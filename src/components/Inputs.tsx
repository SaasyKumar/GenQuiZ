export type InputChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>;
type SelectOptions = {
    inputType: "select";
    option: string[];
};
type NumberOptions = {
    inputType: "number";
    min: number;
    max: number;
    onBlur?: () => void;
};
type FileOptions = {
    inputType: "file";
    acceptTypes: string;
};
type TextOptions = {
    inputType: "text";
    styleClass: string;
    placeholderContent?: string;
    blurTextBox?: boolean;
    // FIXME: can have default type
};
type CheckBox = {
    inputType: "checkbox";
    isChecked: boolean;
};
import styles from "/src/styles/inputs.module.css";
export default function Inputs({
    name,
    styleClass = "",
    labelContent = "",
    InputOptions,
    defaultValue,
    onChange,
}: {
    name: string;
    labelContent?: string;
    styleClass?: string;
    InputOptions:
        | SelectOptions
        | NumberOptions
        | FileOptions
        | TextOptions
        | CheckBox;
    onChange: ((ev: InputChangeEvent) => void) | (() => void);
    defaultValue?: string;
}) {
    let inputDiv = null;
    if (InputOptions.inputType == "number") {
        inputDiv = (
            <input
                name={name}
                className={styles["input"]}
                type="number"
                onChange={onChange}
                value={defaultValue}
                onBlur={
                    InputOptions.inputType === "number"
                        ? InputOptions.onBlur
                        : undefined
                }
            ></input>
        );
    } else if (InputOptions.inputType == "select") {
        const options = InputOptions["option"].map((item) => {
            return (
                <option key={item} value={item}>
                    {item}
                </option>
            );
        });
        inputDiv = (
            <div className={styles["select-wrapper"]}>
                <select
                    id={name}
                    className={styles["select"]}
                    onChange={onChange}
                    defaultValue={defaultValue}
                >
                    {options}
                </select>
                <span className={styles["drop-down"]}></span>
            </div>
        );
    } else if (InputOptions.inputType == "file") {
        inputDiv = (
            <input
                id={name}
                name={name}
                type="file"
                accept={InputOptions.acceptTypes}
                onChange={onChange}
            ></input>
        );
        return (
            <label className={styleClass}>
                {labelContent}
                {inputDiv}
            </label>
        );
    } else if (InputOptions.inputType == "text") {
        inputDiv = (
            <textarea
                className={InputOptions.styleClass}
                placeholder={InputOptions.placeholderContent}
                id={name}
                onChange={onChange}
                data-blur={InputOptions.blurTextBox}
            ></textarea>
        );
    } else if (InputOptions.inputType == "checkbox") {
        inputDiv = (
            <input
                id={name}
                name={name}
                type="checkbox"
                onChange={onChange}
            ></input>
        );
        return (
            <label className={styleClass} data-checked={InputOptions.isChecked}>
                {inputDiv}
            </label>
        );
    }
    return (
        <div className={styles["container"] + " " + styleClass}>
            <label htmlFor={name}>{labelContent}</label>
            {inputDiv}
        </div>
    );
}
