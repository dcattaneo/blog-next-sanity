import { useTheme } from "next-themes";

export const useThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isLightMode = resolvedTheme === "light";

  const toggleToLightMode = () => {
    setTheme("light");
  };

  const toggleToDarkMode = () => {
    setTheme("dark");
  };

  return { isLightMode, toggleToLightMode, toggleToDarkMode };
};
