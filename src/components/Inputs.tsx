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
    InputOptions: SelectOptions | NumberOptions | FileOptions | TextOptions;
    onChange: (
        ev:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => void;
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
    }
    return (
        <div className={styles["container"] + " " + styleClass}>
            <label htmlFor={name}>{labelContent}</label>
            {inputDiv}
        </div>
    );
}
