// src/context/ProgressContext.ts
import { createContext } from "react";

interface ProgressContextType {
  completedModules: number[];
  markAsCompleted: (mod: number) => void;
  unmarkAsCompleted: (mod: number) => void;
  maxModules: number;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);
