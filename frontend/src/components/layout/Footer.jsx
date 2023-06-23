import styles from "./Layout.module.css";

const Footer = () => {
  return <footer className={styles.footer}>&copy; EventSpot {new Date().getFullYear()}</footer>;
};

export default Footer;
