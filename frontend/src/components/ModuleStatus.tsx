"use client";

import CourseProgress from "./CourseProgress";

import { useProgress } from "@/hooks/useProgress";

export default function ModuleStatus() {
  const { completedModules, maxModules, isLoadingProgress } = useProgress();

  return (
    <CourseProgress
      completedModules={completedModules.length}
      totalModules={maxModules}
      isLoading={isLoadingProgress}
    />
  );
}
