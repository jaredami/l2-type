import React, { useContext, useEffect, useState } from "react";

interface StatsContextInterface {
  setWpmEntries: React.Dispatch<React.SetStateAction<number[]>>;
  averageWpm: number;
  setAccuracyEntries: React.Dispatch<React.SetStateAction<number[]>>;
  averageAccuracy: number;
  getTotalLessonsCount(): number;
}

export const StatsContext = React.createContext<StatsContextInterface | null>(
  null
);

export function useStatsContext() {
  return useContext(StatsContext);
}

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

    const preciseAvgWpm =
      (100 * wpmEntries.reduce((wpm, sum) => wpm + sum)) / wpmEntries.length;
    const avgWpm = Math.round(preciseAvgWpm) / 100;
    setAverageWpm(avgWpm);
  }, [wpmEntries]);

  useEffect(() => {
    if (!accuracyEntries.length) return;

    const preciseAvgAccuracy =
      (100 * accuracyEntries.reduce((accuracy, sum) => accuracy + sum)) /
      accuracyEntries.length;
    const avgAccuracy = Math.round(preciseAvgAccuracy) / 100;
    setAverageAccuracy(avgAccuracy);
  }, [accuracyEntries]);

  function getTotalLessonsCount() {
    return wpmEntries.length;
  }

  const value = {
    setWpmEntries,
    averageWpm,
    setAccuracyEntries,
    averageAccuracy,
    getTotalLessonsCount,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
}
