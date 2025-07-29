// src/context/useThemeContext.ts
import { use } from "react";

import { ThemeContext } from "./ThemeContext";

/**
 * useThemeContext
 * Access the theme context from anywhere in the app
 */
export function useThemeContext() {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used inside ThemeProvider");
  }
  return context;
}
