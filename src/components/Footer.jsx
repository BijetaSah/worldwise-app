import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        Copyright &copy; {new Date().getFullYear()} by worldWise Inc.
      </p>
    </footer>
  );
}

export default Footer;
