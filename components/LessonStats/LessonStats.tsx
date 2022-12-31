import React from "react";
import { useStatsContext } from "../../contexts/StatsContext";
import styles from "./LessonStats.module.css";

interface LessonStatsProps {
  speed: number;
  accuracy: number;
}

export default function LessonStats({ speed, accuracy }: LessonStatsProps) {
  const stats = useStatsContext();

  return (
    <div className={styles.container}>
      <span>Speed: {stats.getPreviousLesson().wpm}</span>
      <span>Accuracy: {stats.getPreviousLesson().accuracy}%</span>
    </div>
  );
}
