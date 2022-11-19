import React, { useContext, useEffect, useState } from "react";

interface StatsContextInterface {
  setWpmEntries: React.Dispatch<React.SetStateAction<number[]>>;
  averageWpm: number;
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

  useEffect(() => {
    if (!wpmEntries.length) return;

    // TODO refactor
    const avgWpm =
      wpmEntries.length &&
      Math.round(
        (100 * wpmEntries.reduce((wpm, sum) => wpm + sum)) / wpmEntries.length
      ) / 100;
    setAverageWpm(avgWpm);
  }, [wpmEntries]);

  const value = {
    setWpmEntries,
    averageWpm,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
}
