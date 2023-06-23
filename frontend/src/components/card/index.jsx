import React from "react";
import style from "./Card.module.css";


const getCardClasses = (props) => {
  const classes = new Set([style.card]);
  if (props.className) {
    classes.add(props.className);
  }
  if (props.width) {
    classes.add(style[props.width]);
  }
  if (props.radius) {
    classes.add(style[`rd-${props.radius}`]);
  }
  return Array.from(classes).join(" ");
}
const Card = ({ children, ...rest }) => {
  return <div className={getCardClasses(rest)}>{children}</div>;
};

export default Card;
