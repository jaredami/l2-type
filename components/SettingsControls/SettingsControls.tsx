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

  return (
    settings && (
      <div>
        <p className={styles.statLabel}>Include Capital Letters:</p>
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

        <div className={styles.statHeadingContainer}>
          <span className={styles.statLabel}>Words Per Lesson:</span>
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
            onChange={(event) =>
              settings.setWordsPerLesson(parseInt(event.target.value))
            }
            style={getWordsPerLessonBackgroundSize()}
            value={settings.wordsPerLesson}
          />
        </div>
      </div>
    )
  );
}
