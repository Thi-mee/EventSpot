import React from "react";
import { getButtonClasses, getCtnClasses } from "./helper";
import style from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={getCtnClasses(props, style)}>
      <button
        onClick={props.onClick}
        className={getButtonClasses(props, style)}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
