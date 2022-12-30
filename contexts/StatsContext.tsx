import { Lesson } from "@prisma/client";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface StatsContextInterface {
  getAverageWpm(): number;
  getAverageAccuracy(): number;
  getTotalLessonsCount(): number;
  getTopSpeed(): number;
  fetchLessons(): void;
}

export const StatsContext = React.createContext<StatsContextInterface | null>(
  null
);

export function useStatsContext() {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error(`useStatsContext must be used within a StatsProvider`);
  }
  return context;
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

  const fetchLessons = useCallback(async () => {
    try {
      const lessonsData = await fetch("/api/lessons", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const items = await lessonsData.json();
      setLessons(items);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

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
    fetchLessons,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
}
