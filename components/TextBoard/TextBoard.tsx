import React from "react";
import styles from "./TextBoard.module.css";

export default function TextBoard({ sample }: { sample: string[] }) {
  return (
    <div className={styles.textBoard}>
      {sample.map((char, i) => {
        return <span key={`${char}${i}`}>{char}</span>;
      })}
    </div>
  );
}
