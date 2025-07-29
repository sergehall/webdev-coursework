// src/context/ThemeProvider.tsx
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { ThemeContext, type Theme } from "./ThemeContext";

/**
 * ThemeProvider
 * Provides global theme state (light/dark) using context.
 * Syncs theme with localStorage and <html> class list.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) return stored;

    // Fallback to system color scheme if no theme is stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Sync current theme to <html> class and save it to localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      toggleTheme,
      setTheme,
    }),
    [theme]
  );

  // Provide theme context to children
  return <ThemeContext value={value}>{children}</ThemeContext>;
}
