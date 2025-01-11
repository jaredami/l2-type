import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Keyboard from "../components/Keyboard/Keyboard";
import LessonBoard from "../components/LessonBoard/LessonBoard";
import LessonStats from "../components/LessonStats/LessonStats";
import { useStatsContext } from "../contexts/StatsContext";
import { getUserSettingsWithDefaults } from "../lib/utils";

const chance = require("chance").Chance();

export default function Practice(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const stats = useStatsContext();

  const [lesson, setLesson] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [mistakeIndexes, setMistakeIndexes] = useState<number[]>([]);
  const [lessonStartTime, setLessonStartTime] = useState(0);
  const [isLessonInProgress, setIsLessonInProgress] = useState(false);

  const getRandomWords = useCallback(() => {
    const wordCount = props.settings?.wordsPerLesson ?? 0;
    const wordsArr: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      wordsArr.push(chance.word());
    }
    return wordsArr;
  }, [props.settings?.wordsPerLesson]);

  const getLesson = useCallback(() => {
    return getRandomWords().join(" ").replaceAll(" ", "_").split("");
  }, [getRandomWords]);

  useEffect(() => {
    if (!props.settings) return;
    setLesson(getLesson());
  }, [getLesson, props.settings]);

  function toggleActiveKeyClass(element: Element | null) {
    if (!element) return;
    element.classList.toggle("active-key");
  }

  function getKeyElement(event: KeyboardEvent) {
    const charSelector = `[data-char="${event.key.toUpperCase()}"]`;
    const charElement = document.body.querySelector(charSelector);

    const keySelector = `[data-key="${event.code}"]`;
    const keyElement = document.body.querySelector(keySelector);

    return charElement || keyElement;
  }

  const checkIfCorrectKey = useCallback(
    (keyPressed: string) => {
      const correctChar = lesson[currentCharIndex];
      const spaceBarCorrectlyPressed =
        correctChar === "_" && keyPressed === " ";

      if (spaceBarCorrectlyPressed || keyPressed === correctChar) {
        setCurrentCharIndex(currentCharIndex + 1);
      } else {
        if (
          keyPressed !== "Shift" &&
          !mistakeIndexes.includes(currentCharIndex)
        ) {
          setMistakeIndexes((prev) => [...prev, currentCharIndex]);
        }
      }
    },
    [currentCharIndex, mistakeIndexes, lesson]
  );

  function handleStartOfLesson() {
    setLessonStartTime(Date.now());
    setIsLessonInProgress(true);
  }

  const getWpm = useCallback(() => {
    const elapsedTime = Date.now() - lessonStartTime;
    const seconds = elapsedTime / 1000;
    const minutes = seconds / 60;
    const preciseWpm = lesson.length / 5 / minutes;
    const wpm = Math.round(100 * preciseWpm) / 100;
    return wpm;
  }, [lesson.length, lessonStartTime]);

  const getAccuracy = useCallback(() => {
    const lessonCharCount = lesson.length;
    const correctCharsCount = lessonCharCount - mistakeIndexes.length;
    const accuracy = correctCharsCount / lessonCharCount;
    const percentage = (accuracy * 100).toFixed(2);
    return parseFloat(percentage);
  }, [mistakeIndexes.length, lesson.length]);

  const handleEndOfLesson = useCallback(async () => {
    const wpm = getWpm();
    const accuracy = getAccuracy();

    const lesson = { wpm, accuracy };

    try {
      await fetch("/api/lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lesson),
      });
    } catch (error) {
      console.error(error);
    }

    setIsLessonInProgress(false);
    setLesson(getLesson());
    setCurrentCharIndex(0);
    setMistakeIndexes([]);
    stats.fetchLessons();
  }, [getLesson, getWpm, getAccuracy, stats]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (currentCharIndex === 0) {
        handleStartOfLesson();
      }

      checkIfCorrectKey(event.key);

      if (currentCharIndex === lesson.length - 1) {
        handleEndOfLesson();
      }

      toggleActiveKeyClass(getKeyElement(event));
    }

    function handleKeyUp(event: KeyboardEvent) {
      toggleActiveKeyClass(getKeyElement(event));
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [checkIfCorrectKey, currentCharIndex, handleEndOfLesson, lesson.length]);

  return (
    <>
      <Head>
        <title>Practice - L2Type</title>
      </Head>
      <div>
        <LessonStats />
        <LessonBoard
          lesson={lesson}
          mistakeIndexes={mistakeIndexes}
          currentCharIndex={currentCharIndex}
          isLessonInProgress={isLessonInProgress}
        ></LessonBoard>
      </div>
      <Keyboard></Keyboard>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const session = await getSession();
    const userId = session?.user?.id;
    const settings = await getUserSettingsWithDefaults(userId);

    return {
      props: { settings },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { settings: null },
    };
  }
}
