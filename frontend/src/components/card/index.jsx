import React from "react";
import style from "./Card.module.css";


const Card = ({ children, radius = 10,  height = 'auto' }) => {
  return <div className={style.card} style={{
    borderRadius: radius,
    height: height,
  }}>{children}</div>;
};

export default Card;
