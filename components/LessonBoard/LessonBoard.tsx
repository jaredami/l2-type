import styles from "./LessonBoard.module.css";

interface TextBoardProps {
  lesson: string[];
  isLessonInProgress: boolean;
  currentCharIndex: number;
  mistakeIndexes: number[];
}

export default function LessonBoard({
  lesson,
  isLessonInProgress,
  currentCharIndex,
  mistakeIndexes,
}: TextBoardProps) {
  return (
    <div
      className={`${styles.board} ${
        isLessonInProgress ? styles.inProgress : ""
      }`}
    >
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
