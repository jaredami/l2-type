import React from "react";
import styles from "./StatsPanel.module.css";

export default function StatsPanel() {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statContainer}>
        <p className={styles.statLabel}>Average Speed</p>
        <p>33</p>
      </div>
      <div className={styles.statContainer}>
        <p className={styles.statLabel}>Average Accuracy</p>
        <p>33</p>
      </div>
      <div className={styles.statContainer}>
        <p className={styles.statLabel}>Total Lessons</p>
        <p>33</p>
      </div>
      <div className={styles.statContainer}>
        <p className={styles.statLabel}>Top Speed</p>
        <p>33</p>
      </div>
    </div>
  );
}
