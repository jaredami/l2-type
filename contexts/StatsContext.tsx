import React, { useContext, useEffect, useState } from "react";

interface StatsContextInterface {
  setWpmEntries: React.Dispatch<React.SetStateAction<number[]>>;
  averageWpm: number;
  setAccuracyEntries: React.Dispatch<React.SetStateAction<number[]>>;
  averageAccuracy: number;
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
  const [averageWpm, setAverageWpm] = useState(0);
  const [accuracyEntries, setAccuracyEntries] = useState<number[]>([]);
  const [averageAccuracy, setAverageAccuracy] = useState(0);

  useEffect(() => {
    if (!wpmEntries.length) return;

    setAverageWpm(getAverage(wpmEntries));
  }, [wpmEntries]);

  useEffect(() => {
    if (!accuracyEntries.length) return;

    setAverageAccuracy(getAverage(accuracyEntries));
  }, [accuracyEntries]);

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
    averageWpm,
    setAccuracyEntries,
    averageAccuracy,
    getTotalLessonsCount,
    getTopSpeed,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
}
