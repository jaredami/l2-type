import React, { useContext, useState } from "react";
import { WORDS_MIN } from "../components/SettingsControls/SettingsControls";

interface SettingsContextInterface {
  includeCapitals: boolean;
  setIncludeCapitals: React.Dispatch<React.SetStateAction<boolean>>;
  wordsPerLesson: number;
  setWordsPerLesson: React.Dispatch<React.SetStateAction<number>>;
}

export const SettingsContext =
  React.createContext<SettingsContextInterface | null>(null);

export function useSettingsContext() {
  return useContext(SettingsContext);
}

export function SettingsProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [includeCapitals, setIncludeCapitals] = useState(false);
  const [wordsPerLesson, setWordsPerLesson] = useState(WORDS_MIN);

  const value = {
    includeCapitals,
    setIncludeCapitals,
    wordsPerLesson,
    setWordsPerLesson,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
