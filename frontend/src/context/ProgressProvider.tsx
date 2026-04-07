import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
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
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [progressError, setProgressError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const hasValidContext = !!(clientId && validCourseId);
  const currentConfig = validCourseId
    ? COURSE_PROGRESS_CONFIG[validCourseId]
    : undefined;

  const retryProgress = useCallback(() => {
    setProgressError(null);
    setRetryCount((n) => n + 1);
  }, []);

  // Track the latest load call to discard stale results on fast course switches
  const loadIdRef = useRef(0);

  useEffect(() => {
    if (!hasValidContext || !currentConfig || !validCourseId) return;

    const loadId = ++loadIdRef.current;

    const load = async () => {
      setIsLoadingProgress(true);
      setProgressError(null);
      try {
        const data = await fetchProgress(clientId, validCourseId);
        if (loadId !== loadIdRef.current) return; // stale response, discard
        setCompletedModules((prev) => ({
          ...prev,
          [validCourseId]: data,
        }));
      } catch (err) {
        if (loadId !== loadIdRef.current) return;
        const error = err instanceof Error ? err : new Error(String(err));
        console.error("Failed to fetch progress:", error);
        setProgressError(error);
      } finally {
        if (loadId === loadIdRef.current) setIsLoadingProgress(false);
      }
    };

    load();
  }, [clientId, validCourseId, currentConfig, hasValidContext, retryCount]);

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
        isLoadingProgress: false,
        progressError: null,
        retryProgress,
      };
    }

    return {
      courseId: validCourseId,
      completedModules: completedModules[validCourseId] || [],
      markAsCompleted,
      unmarkAsCompleted,
      maxModules: currentConfig.maxModules,
      isLoadingProgress,
      progressError,
      retryProgress,
    };
  }, [
    completedModules,
    markAsCompleted,
    unmarkAsCompleted,
    currentConfig,
    validCourseId,
    hasValidContext,
    isLoadingProgress,
    progressError,
    retryProgress,
  ]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;
