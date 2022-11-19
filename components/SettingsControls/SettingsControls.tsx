import { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import styles from "./SettingsControls.module.css";

const WORDS_MIN = 5;
const WORDS_MAX = 30;

export default function Settings() {
  const settings = useContext(SettingsContext);

  const getWordsPerLessonBackgroundSize = () => {
    if (!settings) return;
    return {
      backgroundSize: `${
        (settings.wordsPerLesson * 100) / (WORDS_MAX + WORDS_MIN)
      }% 100%`,
    };
  };

  return (
    settings && (
      <div>
        <p className={styles.statLabel}>Include Capital Letters:</p>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={settings.includeCapitals}
            onChange={() =>
              settings.setIncludeCapitals(!settings.includeCapitals)
            }
          />
          <span className={styles.slider}></span>
        </label>

        <div className={styles.statHeadingContainer}>
          <span className={styles.statLabel}>Words Per Lesson:</span>
          <span> {settings.wordsPerLesson}</span>
        </div>
        <div
          className={styles.range__slider}
          data-min={WORDS_MIN}
          data-max={WORDS_MAX}
        >
          {/* <div className="length range__slider" data-min="4" data-max="32"> */}
          {/* <div className="length__title field-title" data-length="0">
            length:
          </div> */}
          {/* <input id="slider" type="range" min="4" max="32" value="30" /> */}
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
