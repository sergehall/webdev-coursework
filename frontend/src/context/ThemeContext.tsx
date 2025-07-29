// src/context/ThemeContext.ts
import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (value: Theme) => void;
}

// Only exports the context (safe for Fast Refresh)
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
