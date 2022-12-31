import React from "react";
import { useStatsContext } from "../../contexts/StatsContext";
import styles from "./LessonStats.module.css";

export default function LessonStats() {
  const stats = useStatsContext();

  function getWpmDeviation() {
    const wpmDeviation =
      Math.round((stats.getPreviousLesson().wpm - stats.getAverageWpm()) * 10) /
      10;
    return wpmDeviation > 0
      ? `+${wpmDeviation.toString()}`
      : wpmDeviation.toString();
  }

  function getAccuracyDeviation() {
    const accuracyDeviation =
      Math.round(
        (stats.getPreviousLesson().accuracy - stats.getAverageAccuracy()) * 10
      ) / 10;
    return accuracyDeviation > 0
      ? `+${accuracyDeviation.toString()}`
      : accuracyDeviation.toString();
  }

  function isPositive(value: string) {
    return value[0] === "+";
  }

  return (
    <div className={styles.container}>
      <span>
        <span>Speed: {stats.getPreviousLesson().wpm} wpm </span>
        <span>
          (
          <span
            className={
              isPositive(getWpmDeviation())
                ? styles.deviationPositive
                : styles.deviationNegative
            }
            title="The deviation from your average speed."
          >
            {getWpmDeviation()}
          </span>
          )
        </span>
      </span>
      <span>
        <span>Accuracy: {stats.getPreviousLesson().accuracy}% </span>
        <span>
          (
          <span
            className={
              isPositive(getAccuracyDeviation())
                ? styles.deviationPositive
                : styles.deviationNegative
            }
            title="The deviation from your average accuracy."
          >
            {getAccuracyDeviation()}
          </span>
          )
        </span>
      </span>
    </div>
  );
}
