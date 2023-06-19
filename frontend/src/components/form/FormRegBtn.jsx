import React, { memo } from "react";
import style from "./Form.module.css";

const getBtnClass = (fullWidth) => {
  if (fullWidth) {
    return `${style.submitBtn} ${style.fullWidth}`;
  }
  return style.submitBtn;
};

const FormRegBtn = ({ text = "Button", fullWidth, onClick }) => {
  return (
    <button type="button" className={getBtnClass(fullWidth)} onClick={onClick}>
      {text}
    </button>
  );
};

export default memo(FormRegBtn);
