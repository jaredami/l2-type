import React, { useContext, useEffect, useState } from "react";

interface StatsContextInterface {
  setWpmEntries: React.Dispatch<React.SetStateAction<number[]>>;
  setAccuracyEntries: React.Dispatch<React.SetStateAction<number[]>>;
  getAverageWpm(): number;
  getAverageAccuracy(): number;
  getTotalLessonsCount(): number;
  getTopSpeed(): number;
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
  const [wpmEntries, setWpmEntries] = useState<number[]>([]);
  const [accuracyEntries, setAccuracyEntries] = useState<number[]>([]);

  function getAverageWpm() {
    if (!wpmEntries.length) return 0;
    return getAverage(wpmEntries);
  }

  function getAverageAccuracy() {
    if (!accuracyEntries.length) return 0;
    return getAverage(accuracyEntries);
  }

  function getTotalLessonsCount() {
    return wpmEntries.length;
  }

  function getTopSpeed() {
    if (!wpmEntries.length) return 0;
    return wpmEntries.reduce((topSpeed, item): number => {
      if (item > topSpeed) topSpeed = item;
      return topSpeed;
    });
  }

  const value = {
    setWpmEntries,
    setAccuracyEntries,
    getAverageWpm,
    getAverageAccuracy,
    getTotalLessonsCount,
    getTopSpeed,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
}
