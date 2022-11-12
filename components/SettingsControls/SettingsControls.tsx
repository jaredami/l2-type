import styles from "./SettingsControls.module.css";

export default function Settings() {
  return (
    <>
      <p>Include Capital Letters:</p>
      <label className={styles.switch}>
        <input type="checkbox" checked={true} />
        <span className={styles.slider}></span>
      </label>
    </>
  );
}
