import React from "react";
import { useStatsContext } from "../../contexts/StatsContext";
import styles from "./LessonStats.module.css";

interface LessonStatsProps {
  speed: number;
  accuracy: number;
}

export default function LessonStats() {
  const stats = useStatsContext();

  return (
    <div className={styles.container}>
      <span>Speed: {stats.getPreviousLesson().wpm}</span>
      <span>
        (<span className={styles.deviationPositive}>+19.3</span>)
      </span>
      <span>Accuracy: {stats.getPreviousLesson().accuracy}%</span>
      <span>
        (<span className={styles.deviationNegative}>+19.3</span>)
      </span>
    </div>
  );
}
