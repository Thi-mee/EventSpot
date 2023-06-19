import React from "react";
import Card from "../../../components/card";
import Button from "../../../components/button";
import style from '../Register.module.css'

const RegistrationCard = ({ image, title, description, onClick }) => {
  return (
    <Card height="100%">
      <img src={image} alt="" />
      <h2 className={style.h2}>{title}</h2>
      <p>{description}</p>
      <Button onClick={onClick} variant="primary" size="lg">Choose</Button>
    </Card>
  );
};

export default RegistrationCard;
