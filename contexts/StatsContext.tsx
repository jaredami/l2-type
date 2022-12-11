import { Lesson } from "@prisma/client";
import React, { useContext, useState } from "react";

interface StatsContextInterface {
  getAverageWpm(): number;
  getAverageAccuracy(): number;
  getTotalLessonsCount(): number;
  getTopSpeed(): number;
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
}

export const StatsContext = React.createContext<StatsContextInterface | null>(
  null
);

export function useStatsContext() {
  return useContext(StatsContext);
}

const getAverage = (items: number[]) => {
  const preciseAvg =
    (100 * items.reduce((total, item) => total + item)) / items.length;
  const avg = Math.round(preciseAvg) / 100;
  return avg;
};

export function StatsProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  function getAverageWpm() {
    if (!lessons.length) return 0;
    const wpmEntries = lessons.map((lesson) => lesson.wpm);
    return getAverage(wpmEntries);
  }

  function getAverageAccuracy() {
    if (!lessons.length) return 0;
    const accuracyEntries = lessons.map((lesson) => lesson.accuracy);
    return getAverage(accuracyEntries);
  }

  function getTotalLessonsCount() {
    return lessons.length;
  }

  function getTopSpeed() {
    const wpmEntries = lessons.map((lesson) => lesson.wpm);
    if (!wpmEntries.length) return 0;
    return wpmEntries.reduce((topSpeed, item): number => {
      if (item > topSpeed) topSpeed = item;
      return topSpeed;
    });
  }

  const value = {
    getAverageWpm,
    getAverageAccuracy,
    getTotalLessonsCount,
    getTopSpeed,
    setLessons,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
}
