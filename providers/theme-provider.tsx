"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeHydration>{children}</ThemeHydration>
    </NextThemeProvider>
  );
};

const ThemeHydration = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme) return null;

  return <>{children}</>;
};

export { ThemeProvider };
