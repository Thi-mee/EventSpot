import React, { memo } from "react";
import styles from "../style.module.css";

const selectClassnames = (props) => {
  const classes = new Set([styles.selectField]);
  if (props.width === "full") classes.add(styles.fullWidth);
  if (props.width === "half") classes.add(styles.halfWidth);
  if (props.width === "third") classes.add(styles.thirdWidth);
  if (props.width === "quarter") classes.add(styles.quarterWidth);

  return Array.from(classes).join(" ");
};

const SelectField = ({
  name,
  label,
  options,
  onChange,
  value,
  error,
  required,
  ...rest
}) => {
  return (
    <div className={selectClassnames(rest)}>
      <label htmlFor={name} className={required ? styles.required : null}>
        {label}
      </label>
      <select name={name} id={name} onChange={onChange} value={value}>
        <option value="" disabled={required ?? false}>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className={styles.errorText}>{error ?? null}</p>
    </div>
  );
};

export default memo(SelectField);
