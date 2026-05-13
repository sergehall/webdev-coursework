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

const EMPTY_COMPLETED_MODULES: readonly number[] = [];

const noopAsync = async (): Promise<void> => {};

const isCourseId = (value: string | undefined): value is CourseId =>
  typeof value === "string" &&
  Object.prototype.hasOwnProperty.call(COURSE_PROGRESS_CONFIG, value);

const toError = (err: unknown): Error =>
  err instanceof Error ? err : new Error(String(err));

const isValidModuleNumber = (
  moduleNumber: number,
  maxModules: number
): boolean =>
  Number.isInteger(moduleNumber) &&
  moduleNumber >= 1 &&
  moduleNumber <= maxModules;

const normalizeCompletedModules = (
  value: unknown,
  maxModules: number
): number[] => {
  if (!Array.isArray(value)) {
    throw new Error("Progress response must be an array.");
  }

  return Array.from(
    new Set(
      value.filter(
        (moduleNumber): moduleNumber is number =>
          typeof moduleNumber === "number" &&
          isValidModuleNumber(moduleNumber, maxModules)
      )
    )
  ).sort((a, b) => a - b);
};

const addCompletedModule = (
  modules: readonly number[],
  moduleNumber: number
): number[] =>
  modules.includes(moduleNumber)
    ? [...modules]
    : [...modules, moduleNumber].sort((a, b) => a - b);

const removeCompletedModule = (
  modules: readonly number[],
  moduleNumber: number
): number[] => modules.filter((module) => module !== moduleNumber);

const getMutationKey = (courseId: CourseId, moduleNumber: number): string =>
  `${courseId}:${moduleNumber}`;

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const clientId = useClientId();
  const { courseId } = useParams<{ courseId: string }>();

  const validCourseId = isCourseId(courseId) ? courseId : null;

  const [completedModules, setCompletedModules] = useState<
    Partial<Record<CourseId, number[]>>
  >({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [progressError, setProgressError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const completedModulesRef = useRef(completedModules);
  const pendingMutationKeysRef = useRef(new Set<string>());

  useEffect(() => {
    completedModulesRef.current = completedModules;
  }, [completedModules]);

  const hasValidContext = clientId !== null && validCourseId !== null;
  const currentConfig = validCourseId
    ? COURSE_PROGRESS_CONFIG[validCourseId]
    : null;

  const retryProgress = useCallback(() => {
    setProgressError(null);
    setRetryCount((n) => n + 1);
  }, []);

  // Track the latest load call to discard stale results on fast course switches
  const loadIdRef = useRef(0);

  useEffect(() => {
    const loadId = ++loadIdRef.current;

    if (!hasValidContext || !currentConfig || !validCourseId) {
      setIsLoadingProgress(false);
      return;
    }

    const load = async () => {
      setIsLoadingProgress(true);
      setProgressError(null);
      try {
        const data = await fetchProgress(clientId, validCourseId);
        if (loadId !== loadIdRef.current) return; // stale response, discard
        setCompletedModules((prev) => ({
          ...prev,
          [validCourseId]: normalizeCompletedModules(
            data,
            currentConfig.maxModules
          ),
        }));
      } catch (err) {
        if (loadId !== loadIdRef.current) return;
        const error = toError(err);
        console.error("Failed to fetch progress:", error);
        setProgressError(error);
      } finally {
        if (loadId === loadIdRef.current) setIsLoadingProgress(false);
      }
    };

    void load();
  }, [clientId, validCourseId, currentConfig, hasValidContext, retryCount]);

  const markAsCompleted = useCallback(
    async (moduleNumber: number) => {
      if (!hasValidContext || !currentConfig || !validCourseId) {
        return;
      }

      if (!isValidModuleNumber(moduleNumber, currentConfig.maxModules)) {
        throw new RangeError(
          `Module number must be an integer between 1 and ${currentConfig.maxModules}.`
        );
      }

      const mutationKey = getMutationKey(validCourseId, moduleNumber);
      const courseModules =
        completedModulesRef.current[validCourseId] ?? EMPTY_COMPLETED_MODULES;

      if (
        courseModules.includes(moduleNumber) ||
        pendingMutationKeysRef.current.has(mutationKey)
      ) {
        return;
      }

      pendingMutationKeysRef.current.add(mutationKey);

      // Optimistic update
      setCompletedModules((prev) => ({
        ...prev,
        [validCourseId]: addCompletedModule(
          prev[validCourseId] ?? EMPTY_COMPLETED_MODULES,
          moduleNumber
        ),
      }));

      try {
        await markModuleCompleted({
          clientId,
          appId: currentConfig.appId,
          moduleNumber,
          courseId: validCourseId,
        });
      } catch (err) {
        // Roll back optimistic update on failure
        setCompletedModules((prev) => ({
          ...prev,
          [validCourseId]: removeCompletedModule(
            prev[validCourseId] ?? EMPTY_COMPLETED_MODULES,
            moduleNumber
          ),
        }));
        throw toError(err);
      } finally {
        pendingMutationKeysRef.current.delete(mutationKey);
      }
    },
    [clientId, validCourseId, currentConfig, hasValidContext]
  );

  const unmarkAsCompleted = useCallback(
    async (moduleNumber: number) => {
      if (!hasValidContext || !currentConfig || !validCourseId) {
        return;
      }

      if (!isValidModuleNumber(moduleNumber, currentConfig.maxModules)) {
        throw new RangeError(
          `Module number must be an integer between 1 and ${currentConfig.maxModules}.`
        );
      }

      const mutationKey = getMutationKey(validCourseId, moduleNumber);
      const courseModules =
        completedModulesRef.current[validCourseId] ?? EMPTY_COMPLETED_MODULES;

      if (
        !courseModules.includes(moduleNumber) ||
        pendingMutationKeysRef.current.has(mutationKey)
      ) {
        return;
      }

      pendingMutationKeysRef.current.add(mutationKey);

      // Optimistic update
      setCompletedModules((prev) => ({
        ...prev,
        [validCourseId]: removeCompletedModule(
          prev[validCourseId] ?? EMPTY_COMPLETED_MODULES,
          moduleNumber
        ),
      }));

      try {
        await unmarkModuleCompleted({
          clientId,
          appId: currentConfig.appId,
          moduleNumber,
          courseId: validCourseId,
        });
      } catch (err) {
        // Roll back optimistic update on failure
        setCompletedModules((prev) => ({
          ...prev,
          [validCourseId]: addCompletedModule(
            prev[validCourseId] ?? EMPTY_COMPLETED_MODULES,
            moduleNumber
          ),
        }));
        throw toError(err);
      } finally {
        pendingMutationKeysRef.current.delete(mutationKey);
      }
    },
    [clientId, validCourseId, currentConfig, hasValidContext]
  );

  const value = useMemo(() => {
    if (!hasValidContext || !currentConfig || !validCourseId) {
      return {
        courseId: null,
        completedModules: EMPTY_COMPLETED_MODULES,
        markAsCompleted: noopAsync,
        unmarkAsCompleted: noopAsync,
        maxModules: 0,
        isLoadingProgress: false,
        progressError: null,
        retryProgress,
      };
    }

    return {
      courseId: validCourseId,
      completedModules:
        completedModules[validCourseId] ?? EMPTY_COMPLETED_MODULES,
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
