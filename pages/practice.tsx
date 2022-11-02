import Head from "next/head";
import { useEffect, useState } from "react";
import Keyboard from "../components/Keyboard/Keyboard";

const SAMPLE_LENGTH = 5;
const includeCapitals = false;

export default function Practice() {
  const [sample, setSample] = useState<string[]>([]);

  // TODO fix dependency array
  useEffect(() => {
    function getSample() {
      return getRandomWords().join(" ").replaceAll(" ", "_").split("");
    }

    setSample(getSample());
  }, []);

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

  return (
    <>
      <Head>
        <title>Practice - L2 Type</title>
      </Head>
      <h1>Practice</h1>
      <div>
        {sample.map((char, i) => {
          return <span key={`${char}${i}`}>{char}</span>;
        })}
      </div>
      <Keyboard></Keyboard>
    </>
  );
}
