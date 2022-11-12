import React from "react";
import styles from "./LessonStats.module.css";

interface LessonStatsProps {
  speed: number;
  accuracy: number;
}

export default function LessonStats({ speed, accuracy }: LessonStatsProps) {
  return (
    <div className={styles.container}>
      <span>Speed: {speed}</span>
      <span>Accuracy: {accuracy}%</span>
    </div>
  );
}
