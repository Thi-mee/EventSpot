import React, { memo } from "react";
import style from "../style.module.css";

const CheckboxField = ({
  name,
  required,
  label,
  placeholder,
  onChange,
  errorText,
  checked,
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
        checked={checked}
      />
      <label htmlFor={name} className={required ? style.required : null}>
        {label}
      </label>
      <p className={style.errorText}>{errorText ?? null}</p>
    </div>
  );
};

export default memo(CheckboxField);
