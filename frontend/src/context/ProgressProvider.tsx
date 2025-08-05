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
  const { courseId } = useParams<{ courseId: string }>();

  const isValidCourseId = courseId && courseId in COURSE_PROGRESS_CONFIG;
  const validCourseId = isValidCourseId ? (courseId as CourseId) : undefined;

  const [completedModules, setCompletedModules] = useState<
    Partial<Record<CourseId, number[]>>
  >({});

  const hasValidContext = !!(clientId && validCourseId);
  const currentConfig = validCourseId
    ? COURSE_PROGRESS_CONFIG[validCourseId]
    : undefined;

  useEffect(() => {
    if (!hasValidContext || !currentConfig || !validCourseId) return;

    const load = async () => {
      try {
        const data = await fetchProgress(clientId, validCourseId);
        setCompletedModules((prev) => ({
          ...prev,
          [validCourseId]: data,
        }));
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      }
    };

    load();
  }, [clientId, validCourseId, currentConfig, hasValidContext]);

  const markAsCompleted = useCallback(
    async (mod: number) => {
      if (
        !hasValidContext ||
        !currentConfig ||
        !validCourseId ||
        completedModules[validCourseId]?.includes(mod)
      )
        return;

      setCompletedModules((prev) => ({
        ...prev,
        [validCourseId]: [...(prev[validCourseId] || []), mod],
      }));

      await markModuleCompleted({
        clientId,
        appId: currentConfig.appId,
        moduleNumber: mod,
        courseId: validCourseId,
      });
    },
    [clientId, validCourseId, currentConfig, completedModules, hasValidContext]
  );

  const unmarkAsCompleted = useCallback(
    async (mod: number) => {
      if (!hasValidContext || !currentConfig || !validCourseId) return;

      setCompletedModules((prev) => ({
        ...prev,
        [validCourseId]: (prev[validCourseId] || []).filter((m) => m !== mod),
      }));

      await unmarkModuleCompleted({
        clientId,
        appId: currentConfig.appId,
        moduleNumber: mod,
        courseId: validCourseId,
      });
    },
    [clientId, validCourseId, currentConfig, hasValidContext]
  );

  const value = useMemo(() => {
    if (!hasValidContext || !currentConfig || !validCourseId) {
      return {
        courseId: "" as CourseId,
        completedModules: [],
        markAsCompleted: async () => {},
        unmarkAsCompleted: async () => {},
        maxModules: 0,
      };
    }

    return {
      courseId: validCourseId,
      completedModules: completedModules[validCourseId] || [],
      markAsCompleted,
      unmarkAsCompleted,
      maxModules: currentConfig.maxModules,
    };
  }, [
    completedModules,
    markAsCompleted,
    unmarkAsCompleted,
    currentConfig,
    validCourseId,
    hasValidContext,
  ]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;
