import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import styles from "./SettingsControls.module.css";

export const WORDS_MIN = 5;
const WORDS_MAX = 30;

export default function Settings() {
  const settings = useContext(SettingsContext);

  const getWordsPerLessonBackgroundSize = () => {
    if (!settings) return;

    const numerator = settings.wordsPerLesson - WORDS_MIN;
    const denominator = WORDS_MAX - WORDS_MIN;
    const widthPercentage = (numerator / denominator) * 100;
    return {
      backgroundSize: `${widthPercentage}% 100%`,
    };
  };

  const saveSettings = async () => {
    if (!settings) return;
    const { includeCapitals, wordsPerLesson } = settings;
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ includeCapitals, wordsPerLesson }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    settings && (
      <div className={styles.settingsContainer}>
        <div>
          <p className={styles.settingLabel}>Include Capital Letters:</p>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={settings.includeCapitals}
              onChange={() =>
                settings.setIncludeCapitals(!settings.includeCapitals)
              }
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>

        <div>
          <div className={styles.settingHeadingContainer}>
            <span className={styles.settingLabel}>Words Per Lesson:</span>
            <span> {settings.wordsPerLesson}</span>
          </div>
          <div
            className={styles.rangeSliderContainer}
            data-min={WORDS_MIN}
            data-max={WORDS_MAX}
          >
            <input
              className={styles.rangeSlider}
              type="range"
              min={WORDS_MIN}
              max={WORDS_MAX}
              onChange={(event) => {
                console.log("event", event);
                settings.setWordsPerLesson(parseInt(event.target.value));
              }}
              style={getWordsPerLessonBackgroundSize()}
              value={settings.wordsPerLesson}
            />
          </div>
        </div>
        <button className={styles.saveButton} onClick={() => saveSettings()}>
          Save
        </button>
      </div>
    )
  );
}
