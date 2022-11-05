import React from "react";
import styles from "./TextBoard.module.css";

interface TextBoardProps {
  currentCharIndex: number;
  mistakeIndexes: number[];
  sample: string[];
}

export default function TextBoard({
  sample,
  mistakeIndexes,
  currentCharIndex,
}: TextBoardProps) {
  return (
    <div className={styles.textBoard}>
      {sample.map((char, index) => {
        return (
          <span
            key={`${char}${index}`}
            className={`${
              mistakeIndexes.includes(index) ? styles.mistake : ""
            } ${currentCharIndex === index ? styles.active : ""}`}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
