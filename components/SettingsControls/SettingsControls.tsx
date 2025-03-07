import { useEffect, useState } from "react";
import { UserSettings } from "../../lib/utils";
import styles from "./SettingsControls.module.css";

export const WORDS_MIN = 5;
const WORDS_MAX = 30;

export default function SettingsControls({ settings }: { settings: UserSettings }) {
  const [includeCapitals, setIncludeCapitals] = useState(
    settings.includeCapitals
  );
  const [wordsPerLesson, setWordsPerLesson] = useState(settings.wordsPerLesson);
  const [isDirty, setIsDirty] = useState(false);

  const getWordsPerLessonBackgroundSize = () => {
    const numerator = wordsPerLesson - WORDS_MIN;
    const denominator = WORDS_MAX - WORDS_MIN;
    const widthPercentage = (numerator / denominator) * 100;
    return {
      backgroundSize: `${widthPercentage}% 100%`,
    };
  };

  useEffect(() => {
    if (
      includeCapitals !== settings.includeCapitals ||
      wordsPerLesson !== settings.wordsPerLesson
    ) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [
    includeCapitals,
    settings.includeCapitals,
    settings.wordsPerLesson,
    wordsPerLesson,
  ]);

  const saveSettings = async () => {
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
    <div className={styles.settingsContainer}>
      <div>
        <p className={styles.settingLabel}>Include Capital Letters:</p>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={includeCapitals}
            onChange={() => setIncludeCapitals(!includeCapitals)}
          />
          <span className={styles.toggleSlider}></span>
        </label>
      </div>

      <div>
        <div className={styles.settingHeadingContainer}>
          <span className={styles.settingLabel}>Words Per Lesson:</span>
          <span> {wordsPerLesson}</span>
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
              setWordsPerLesson(parseInt(event.target.value));
            }}
            style={getWordsPerLessonBackgroundSize()}
            value={wordsPerLesson}
          />
        </div>
      </div>
      <button
        className={styles.saveButton}
        onClick={() => saveSettings()}
        disabled={!isDirty}
      >
        Save
      </button>
    </div>
  );
}
