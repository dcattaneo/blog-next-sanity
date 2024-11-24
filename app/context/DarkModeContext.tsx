"use client";

import React, { createContext, useContext } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

type DarkModeContextType = ReturnType<typeof useDarkMode>;

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const darkMode = useDarkMode();
  return (
    <DarkModeContext.Provider value={darkMode}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error(
      "useDarkModeContext must be used within a DarkModeProvider"
    );
  }
  return context;
};
