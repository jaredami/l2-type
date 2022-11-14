import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import styles from "./SettingsControls.module.css";

export default function Settings() {
  // TODO destructure stuff out of context
  const settings = useContext(SettingsContext);
  // TODO toggle includeCapital instead of setting to true
  return (
    settings && (
      <>
        <p>Include Capital Letters:</p>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={settings.includeCapitals}
            onChange={() => settings.setIncludeCapitals(true)}
          />
          <span className={styles.slider}></span>
        </label>
      </>
    )
  );
}
