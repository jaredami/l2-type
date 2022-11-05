import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Keyboard from "../components/Keyboard/Keyboard";
import TextBoard from "../components/TextBoard/TextBoard";

const SAMPLE_LENGTH = 20;
const includeCapitals = false;

function getRandomWords() {
  const wordsArr: string[] = [];
  for (let i = 0; i < SAMPLE_LENGTH; i++) {
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
  const [sample, setSample] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [mistakeIndexes, setMistakeIndexes] = useState<number[]>([]);
  const [sampleStartTime, setSampleStartTime] = useState(0);
  const [prevSampleWPM, setPrevSampleWPM] = useState(0);

  useEffect(() => {
    function getSample() {
      return getRandomWords().join(" ").replaceAll(" ", "_").split("");
    }

    setSample(getSample());
  }, []);

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
      const correctChar = sample[currentCharIndex];
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
    [currentCharIndex, mistakeIndexes, sample]
  );

  function handleStartOfSample() {
    setSampleStartTime(Date.now());
  }

  // TODO useCallback
  function handleEndOfSample() {
    getWpm();
    // stats.addWpmEntry(wpm);
    // sample = getSample();
    // letterIndex = 0;
    // mistakeIndexes = [];
  }

  function getWpm() {
    const elapsedTime = Date.now() - sampleStartTime;
    const seconds = elapsedTime / 1000;
    const minutes = seconds / 60;
    const roughWpm = sample.length / 5 / minutes;
    const wpm = Math.round(100 * roughWpm) / 100;
    setPrevSampleWPM(wpm);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (currentCharIndex === 0) {
        handleStartOfSample();
      }

      checkIfCorrectKey(event.key);

      if (currentCharIndex === sample.length) {
        handleEndOfSample();
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
  }, [checkIfCorrectKey, currentCharIndex, handleEndOfSample, sample.length]);

  return (
    <>
      <Head>
        <title>Practice - L2 Type</title>
      </Head>
      <h1>Practice</h1>
      <>
        <TextBoard
          sample={sample}
          mistakeIndexes={mistakeIndexes}
          currentCharIndex={currentCharIndex}
        ></TextBoard>
        <Keyboard></Keyboard>
      </>
    </>
  );
}
