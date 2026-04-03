// src/context/ProgressContext.ts
import { createContext } from "react";

import type { CourseId } from "@/api/config/course-progress";

export interface ProgressContextType {
  courseId: CourseId;
  completedModules: number[];
  markAsCompleted: (mod: number) => Promise<void>;
  unmarkAsCompleted: (mod: number) => Promise<void>;
  maxModules: number;
  isLoadingProgress: boolean;
  progressError: Error | null;
  retryProgress: () => void;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);
