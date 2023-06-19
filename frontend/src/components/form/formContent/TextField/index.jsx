import React, { memo } from "react";
import style from "../style.module.css";

const textInputTypes = ["text", "password", "email", "number"];

const inputType = (type) => {
  return textInputTypes.includes(type) ? type : "text";
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
}) => {
    return (
      <div className={style.textField}>
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
          />
        )}

        <p className={style.errorText}>{error ?? null}</p>
      </div>
    );
  


};

export default memo(TextField);
