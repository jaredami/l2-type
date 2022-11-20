import React, { useContext } from "react";
import { StatsContext } from "../../contexts/StatsContext";
import styles from "./StatsPanel.module.css";

export default function StatsPanel() {
  const stats = useContext(StatsContext);
  return (
    stats && (
      <div className={styles.statsContainer}>
        <div className={styles.statContainer}>
          <p className={styles.statLabel}>Average Speed</p>
          <p>{stats.averageWpm} wpm</p>
        </div>
        <div className={styles.statContainer}>
          <p className={styles.statLabel}>Average Accuracy</p>
          <p>{stats.averageAccuracy}%</p>
        </div>
        <div className={styles.statContainer}>
          <p className={styles.statLabel}>Total Lessons</p>
          <p>{stats.getTotalLessonsCount()}</p>
        </div>
        <div className={styles.statContainer}>
          <p className={styles.statLabel}>Top Speed</p>
          <p>{stats.getTopSpeed()}</p>
        </div>
      </div>
    )
  );
}
