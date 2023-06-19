import React, { memo } from "react";
import style from "./Form.module.css";



const getBtnClass = (fullWidth) => {
  if (fullWidth) {
    return `${style.submitBtn} ${style.fullWidth}`;
  }
  return style.submitBtn;
};



const SubmitBtn = ({ text = "Submit", fullWidth }) => {
  return (
    <button type="submit" className={getBtnClass(fullWidth)}>
      {text}
    </button>
  );
};

export default memo(SubmitBtn);
