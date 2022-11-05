import React from "react";
import styles from "./TextBoard.module.css";

export default function TextBoard({
  sample,
  mistakeIndexes,
}: {
  sample: string[];
  mistakeIndexes: number[];
}) {
  return (
    <div className={styles.textBoard}>
      {sample.map((char, index) => {
        return (
          <span
            key={`${char}${index}`}
            className={mistakeIndexes.includes(index) ? styles.mistake : ""}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
