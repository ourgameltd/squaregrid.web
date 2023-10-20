
import styles from "./../page.module.css";

export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a className={styles.button} href="/.auth/login/ourgame">Login With Us</a>
      </div>
    </main>
  );
}
