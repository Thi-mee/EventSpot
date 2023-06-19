import React from 'react'
import styles from '../Form.module.css'

const FormHeader = ({ title, subtitle, children }) => {
  if (children) return <div className={styles.formIntro}>{children}</div>;
  return (
    <div className={styles.formIntro}>
      <h1 className={styles.formTitle}>{title}</h1>
      <p className={styles.formDescription}>{subtitle}</p>
    </div>
  );
};

export default FormHeader