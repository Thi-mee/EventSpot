import React from "react";
import style from "./Layout.module.css";

const getFlexClassnames = (props) => {
  const classes = new Set([style.Flex]);
  if (props.gap) classes.add(style[`gap-${props.gap}`]);
  if (props.direction) classes.add(style[props.direction]);
  if (props.justify) classes.add(style[`justify-${props.justify}`]);
  if (props.align) classes.add(style[`align-${props.align}`]);
  if (props.wrap) classes.add(style[`wrap-${props.wrap}`]);
  if (props.width) classes.add(style[`width-${props.width}`]);

  return Array.from(classes).join(" ");
};

const Flex = ({ children, ...rest }) => {
  return <div className={getFlexClassnames(rest)}>{children}</div>;
};

export default Flex;
