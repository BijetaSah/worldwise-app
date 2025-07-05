import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>Copyright &copy; by worldWise Inc.</p>
    </footer>
  );
}

export default Footer;
