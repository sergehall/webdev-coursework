import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { ProgressContext } from "./ProgressContext";

import { COURSE_PROGRESS_CONFIG } from "@/api/config/course-progress";
import type { CourseId } from "@/api/config/course-progress";
import {
  fetchProgress,
  markModuleCompleted,
  unmarkModuleCompleted,
} from "@/api/quiz-progress";
import { useClientId } from "@/hooks/useClientId";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const clientId = useClientId();
  const { courseId } = useParams<{ courseId: CourseId }>();

  const [completedModules, setCompletedModules] = useState<
    Partial<Record<CourseId, number[]>>
  >({});

  const hasValidContext =
    clientId && courseId && courseId in COURSE_PROGRESS_CONFIG;

  const currentConfig = hasValidContext
    ? COURSE_PROGRESS_CONFIG[courseId as CourseId]
    : undefined;

  useEffect(() => {
    if (!hasValidContext || !currentConfig) return;

    const load = async () => {
      try {
        const data = await fetchProgress(clientId, courseId as CourseId);
        setCompletedModules((prev) => ({
          ...prev,
          [courseId as CourseId]: data,
        }));
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      }
    };

    load();
  }, [clientId, courseId, currentConfig, hasValidContext]);

  const markAsCompleted = useCallback(
    async (mod: number) => {
      if (
        !hasValidContext ||
        !currentConfig ||
        completedModules[courseId as CourseId]?.includes(mod)
      )
        return;

      setCompletedModules((prev) => ({
        ...prev,
        [courseId as CourseId]: [...(prev[courseId as CourseId] || []), mod],
      }));

      await markModuleCompleted({
        clientId,
        appId: currentConfig.appId,
        moduleNumber: mod,
        courseId: courseId as CourseId,
      });
    },
    [clientId, courseId, currentConfig, completedModules, hasValidContext]
  );

  const unmarkAsCompleted = useCallback(
    async (mod: number) => {
      if (!hasValidContext || !currentConfig) return;

      setCompletedModules((prev) => ({
        ...prev,
        [courseId as CourseId]: (prev[courseId as CourseId] || []).filter(
          (m) => m !== mod
        ),
      }));

      await unmarkModuleCompleted({
        clientId,
        appId: currentConfig.appId,
        moduleNumber: mod,
        courseId: courseId as CourseId,
      });
    },
    [clientId, courseId, currentConfig, hasValidContext]
  );

  const value = useMemo(() => {
    if (!hasValidContext || !currentConfig || !courseId) {
      return {
        courseId: "" as CourseId,
        completedModules: [],
        markAsCompleted: async () => {},
        unmarkAsCompleted: async () => {},
        maxModules: 0,
      };
    }

    return {
      courseId,
      completedModules: completedModules[courseId] || [],
      markAsCompleted,
      unmarkAsCompleted,
      maxModules: currentConfig.maxModules,
    };
  }, [
    completedModules,
    markAsCompleted,
    unmarkAsCompleted,
    currentConfig,
    courseId,
    hasValidContext,
  ]);

  if (!hasValidContext || !currentConfig) {
    return <>{children}</>;
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;
