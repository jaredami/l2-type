import styles from "./LessonBoard.module.css";

interface TextBoardProps {
  currentCharIndex: number;
  mistakeIndexes: number[];
  lesson: string[];
}

export default function LessonBoard({
  lesson,
  mistakeIndexes,
  currentCharIndex,
}: TextBoardProps) {
  return (
    <div className={styles.textBoard}>
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
