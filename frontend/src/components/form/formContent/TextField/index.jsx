import React, { memo } from "react";
import style from "../style.module.css";

const textInputTypes = ["text", "password", "email", "number"];

const inputType = (type) => {
  return textInputTypes.includes(type) ? type : "text";
};

const getTextFieldClassname = (props) => {
  const classes = new Set([style.textField]);
  if (props.width === "full") classes.add(style.fullWidth);
  if (props.width === "half") classes.add(style.halfWidth);
  if (props.width === "third") classes.add(style.thirdWidth);
  if (props.width === "quarter") classes.add(style.quarterWidth);

  return Array.from(classes).join(" ");
};

const TextField = ({
  name,
  type,
  label,
  placeholder,
  onChange,
  value,
  error,
  required,
  ...rest
}) => {
  return (
    <div className={getTextFieldClassname(rest)}>
      <label htmlFor={name} className={required ? style.required : null}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder ?? undefined}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          type={inputType(type)}
          name={name}
          id={name}
          placeholder={placeholder ?? undefined}
          onChange={onChange}
          value={value}
          min={rest.min ?? undefined}
        />
      )}

      <div className={style.extratext}>
        {error ? (
          <p className={style.errorText}>{rest.errorText ?? error}</p>
        ) : rest.helperText ? (
          <p className={style.helperText}>{rest.helperText}</p>
        ) : null}
      </div>
    </div>
  );
};

export default memo(TextField);
