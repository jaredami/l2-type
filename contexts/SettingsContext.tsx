import React, { useContext, useState } from "react";
interface SettingsContextInterface {
  includeCapitals: boolean;
  setIncludeCapitals: React.Dispatch<React.SetStateAction<boolean>>;
  wordsPerLesson: number;
  setWordsPerLesson: React.Dispatch<React.SetStateAction<number>>;
}

const DEFAULT_WORD_COUNT = 20;

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
  const [wordsPerLesson, setWordsPerLesson] = useState(DEFAULT_WORD_COUNT);

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
