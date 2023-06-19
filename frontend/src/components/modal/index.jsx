import React, { useEffect } from "react";
import PropTypes from "prop-types";
import style from "./style.module.css";

const Modal = ({ children, isOpen, onClose }) => {
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
    <>
    <div className={style.overlay} onClick={onClose}></div>
    <div className={style.modal}>
      <div className={style.modalContent}>
        {children}
        <button className={style.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
