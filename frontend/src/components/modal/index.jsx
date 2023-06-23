import React, { useEffect } from "react";
import style from "./style.module.css";

const Modal = ({ children, isOpen, onClose }) => {

  const secOnClose = () => {
    console.log("onClose function should be plugged in here");
  };

  if (typeof onClose !== "function") {
    onClose = secOnClose;
  }

  useEffect(() => {
    
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal}>
        <div className={style.modalContent}>
          {children}
          <button className={style.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export default Modal;
