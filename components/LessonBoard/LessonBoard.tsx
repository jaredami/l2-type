import React from "react";
import styles from "./LessonBoard.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface TextBoardProps {
  currentCharIndex: number;
  mistakeIndexes: number[];
  lesson: string[];
}

export default function TextBoard({
  lesson,
  mistakeIndexes,
  currentCharIndex,
}: TextBoardProps) {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  return (
    <div className={styles.textBoard} ref={parent}>
      {lesson.map((char, index) => {
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
