// src/context/ProgressContext.ts
import { createContext } from "react";

import type { ActiveCourseId as CourseId } from "@/courses/catalog/activeCourses";

export interface ProgressContextType {
  courseId: CourseId | null;
  completedModules: readonly number[];
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
