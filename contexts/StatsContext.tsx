import { Lesson } from "@prisma/client";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface StatsContextInterface {
  getPreviousLesson(): Lesson;
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
  if (items.length === 0) return 0;
  const preciseAvg =
    (100 * items.reduce((total, item) => total + item, 0)) / items.length;
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
      const response = await fetch("/api/lessons", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch lessons');
      }
      const items = await response.json();
      setLessons(items);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      setLessons([]); // Ensure lessons is an empty array if fetch fails
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
    if (!lessons.length) return 0;
    const wpmEntries = lessons.map((lesson) => lesson.wpm);
    return Math.max(...wpmEntries, 0);
  }

  function getPreviousLesson() {
    return (
      lessons[lessons.length - 1] ?? { // Use nullish coalescing to handle undefined
        wpm: 0,
        accuracy: 0,
      }
    );
  }

  const value = {
    getPreviousLesson,
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
