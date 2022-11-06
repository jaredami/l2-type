import React from "react";
import styles from "./SampleStats.module.css";

interface SampleStatsProps {
  speed: number;
  accuracy: number;
}

export default function SampleStats({ speed, accuracy }: SampleStatsProps) {
  return (
    <div className={styles.container}>
      <span>Speed: {speed}</span>
      <span>Accuracy: {accuracy}%</span>
    </div>
  );
}
