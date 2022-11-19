import React, { useContext, useState } from "react";

interface SettingsContextInterface {
  includeCapitals: boolean;
  setIncludeCapitals: React.Dispatch<React.SetStateAction<boolean>>;
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

  const value = {
    includeCapitals,
    setIncludeCapitals,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
