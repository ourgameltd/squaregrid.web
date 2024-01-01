import styles from "./index.module.css";

export default function Home() {
  return (
    <>
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Found <span className={styles.code}>{0}</span> association staff types
        </p>
        <a href="/.auth/logout">Logout</a>
      </div>
    </main>
    </>
  );
}
