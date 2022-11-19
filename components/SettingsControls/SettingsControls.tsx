import { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import styles from "./SettingsControls.module.css";

const WORDS_MAX = 10;

export default function Settings() {
  const settings = useContext(SettingsContext);
  const [wordsPerLesson, setWordsPerLesson] = useState(0);
  const getWordsPerLessonBackgroundSize = () => {
    return { backgroundSize: `${(wordsPerLesson * 100) / WORDS_MAX}% 100%` };
  };

  return (
    settings && (
      <>
        <p>Include Capital Letters:</p>
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

        <p>Words Per Lesson:</p>
        <div className={styles.range__slider} data-min="0" data-max={WORDS_MAX}>
          {/* <div className="length range__slider" data-min="4" data-max="32"> */}
          {/* <div className="length__title field-title" data-length="0">
            length:
          </div> */}
          {/* <input id="slider" type="range" min="4" max="32" value="30" /> */}
          <input
            className={styles.rangeSlider}
            type="range"
            min="0"
            max={WORDS_MAX}
            onChange={(e) => setWordsPerLesson(parseInt(e.target.value))}
            style={getWordsPerLessonBackgroundSize()}
            value={wordsPerLesson}
          />
        </div>
      </>
    )
  );
}
