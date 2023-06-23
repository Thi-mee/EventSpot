import React, { memo } from "react";
import style from "../style.module.css";

const CheckboxField = ({
  name,
  required,
  label,
  placeholder,
  onChange,
  error,
  value,
  ...rest
}) => {
  const handleChange = (e) => {
    const newEvent = {
      target: {
        name: e.target.name,
        value: e.target.checked,
        type: "checkbox",
      },
    };
    onChange(newEvent);
  };
  return (
    <div className={style.checkboxField}>
      <input
        type="checkbox"
        name={name}
        id={name}
        placeholder={placeholder ?? undefined}
        onChange={handleChange}
        checked={value}
      />
      <label htmlFor={name} className={required ? style.required : null}>
        {label}
      </label>
      <div className={style.extratext}>
        {rest.errorText ? (
          <p className={style.errorText}>{error}</p>
        ) : rest.helperText ? (
          <p className={style.helperText}>{rest.helperText}</p>
        ) : null}
      </div>
    </div>
  );
};

export default memo(CheckboxField);
