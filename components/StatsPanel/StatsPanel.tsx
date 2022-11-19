import React from "react";
import styles from "./StatsPanel.module.css";

export default function StatsPanel() {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statContainer}>
        <p>Stat</p>
        <p>33</p>
      </div>
      <div className={styles.statContainer}>
        <p>Stat</p>
        <p>33</p>
      </div>
      <div className={styles.statContainer}>
        <p>Stat</p>
        <p>33</p>
      </div>
    </div>
  );
}
