import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Keyboard from "../components/Keyboard/Keyboard";
import LessonStats from "../components/LessonStats/LessonStats";
import TextBoard from "../components/TextBoard/TextBoard";

const LESSON_WORD_COUNT = 20;
const includeCapitals = false;

function getRandomWords() {
  const wordsArr: string[] = [];
  for (let i = 0; i < LESSON_WORD_COUNT; i++) {
    wordsArr.push(getRandomWord(getRandomNumber(10, 2)));
  }
  return wordsArr;
}

function getRandomWord(wordLength = 10) {
  let consonants = "bcdfghjlmnpqrstv".split("");
  let vowels = "aeiou".split("");
  let word = "";
  let length = parseInt(wordLength.toString(), 10);

  for (let i = 0; i < length / 2; i++) {
    const randConsonant = consonants[getRandomNumber(consonants.length)];
    const randVowel = vowels[getRandomNumber(vowels.length)];

    if (includeCapitals) {
      word += i === 0 ? randConsonant.toUpperCase() : randConsonant;
    } else {
      word += i === 0 ? randConsonant : randConsonant;
    }
    word += i * 2 < length - 1 ? randVowel : "";
  }

  return word;
}

function getRandomNumber(upperLimit: number, lowerLimit = 0) {
  return Math.floor(Math.random() * upperLimit) + lowerLimit;
}

export default function Practice() {
  const [lesson, setLesson] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [mistakeIndexes, setMistakeIndexes] = useState<number[]>([]);
  const [lessonStartTime, setLessonStartTime] = useState(0);
  const [prevLessonWPM, setPrevLessonWPM] = useState(0);
  const [prevLessonAccuracy, setPrevLessonAccuracy] = useState(0);

  const getLesson = useCallback(() => {
    return getRandomWords().join(" ").replaceAll(" ", "_").split("");
  }, []);

  useEffect(() => {
    setLesson(getLesson());
  }, [getLesson]);

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
  }

  const getWpm = useCallback(() => {
    const elapsedTime = Date.now() - lessonStartTime;
    const seconds = elapsedTime / 1000;
    const minutes = seconds / 60;
    const roughWpm = lesson.length / 5 / minutes;
    const wpm = Math.round(100 * roughWpm) / 100;
    setPrevLessonWPM(wpm);
  }, [lesson.length, lessonStartTime]);

  const getAccuracy = useCallback(() => {
    const lessonCharCount = lesson.length;
    const correctCharsCount = lessonCharCount - mistakeIndexes.length;
    const accuracy = correctCharsCount / lessonCharCount;
    const percentage = (accuracy * 100).toFixed(2);
    setPrevLessonAccuracy(parseFloat(percentage));
  }, [mistakeIndexes.length, lesson.length]);

  const handleEndOfLesson = useCallback(() => {
    getWpm();
    getAccuracy();
    setLesson(getLesson());
    setCurrentCharIndex(0);
    setMistakeIndexes([]);
  }, [getLesson, getWpm, getAccuracy]);

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
      <h1>Practice</h1>
      <div>
        <LessonStats speed={prevLessonWPM} accuracy={prevLessonAccuracy} />
        <TextBoard
          sample={lesson}
          mistakeIndexes={mistakeIndexes}
          currentCharIndex={currentCharIndex}
        ></TextBoard>
      </div>
      <Keyboard></Keyboard>
    </>
  );
}
