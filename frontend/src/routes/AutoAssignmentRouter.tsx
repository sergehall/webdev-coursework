import { Suspense, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { assignmentComponents } from "@/courses/assignment-registry/assignmentComponents";
import { useCompletedModules } from "@/hooks/useCompletedModules";
import { COURSE_PROGRESS_CONFIG } from "@/api/config/course-progress";
import type { CourseId } from "@/api/config/course-progress";
import { normalizeCourseIdToCode } from "@/utils/normalizeCourseIdToCode";

function ModuleLoadingState() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-gray-900">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-700" />
        <div className="space-y-3">
          <div className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
      <p className="sr-only">Loading module...</p>
    </section>
  );
}

export default function AutoAssignmentRouter() {
  const { id, courseId: courseIdParam } = useParams<{
    id?: string;
    courseId?: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { completedModules, isLoadingProgress } = useCompletedModules();

  const normalizedCode = useMemo(() => {
    if (!courseIdParam) return null;
    return normalizeCourseIdToCode(courseIdParam);
  }, [courseIdParam]);

  const isValidCourse = useMemo(() => {
    if (!courseIdParam || !normalizedCode) return false;
    return courseIdParam in COURSE_PROGRESS_CONFIG;
  }, [courseIdParam, normalizedCode]);

  const courseId = useMemo(() => {
    if (!isValidCourse || !courseIdParam) return undefined;
    return courseIdParam as CourseId;
  }, [isValidCourse, courseIdParam]);

  const maxModules = useMemo(() => {
    if (!courseId) return 0;
    return COURSE_PROGRESS_CONFIG[courseId]?.maxModules || 0;
  }, [courseId]);

  const isAllCompleted = useMemo(
    () => completedModules.length === maxModules,
    [completedModules, maxModules]
  );

  const isOnCompletedPage = useMemo(
    () => location.pathname.endsWith("/completed"),
    [location.pathname]
  );

  useEffect(() => {
    if (courseId && isAllCompleted && !isOnCompletedPage) {
      navigate(`/coursework/${courseId}/assignment/completed`);
    }
  }, [courseId, isAllCompleted, isOnCompletedPage, navigate]);

  const moduleNumber = useMemo(() => {
    const num = parseInt(id ?? "", 10);
    return isNaN(num) ? null : num;
  }, [id]);

  const isUnlocked = useMemo(() => {
    if (!moduleNumber) return false;
    return moduleNumber === 1 || completedModules.includes(moduleNumber - 1);
  }, [moduleNumber, completedModules]);

  const canRender =
    id &&
    courseIdParam &&
    normalizedCode &&
    isValidCourse &&
    courseId &&
    moduleNumber !== null;

  let components;
  if (canRender) {
    try {
      components = assignmentComponents(id!, normalizedCode!);
    } catch (error) {
      console.error("Failed to load assignment component:", error);
    }
  }

  // UI responses after all hooks
  if (!id || !courseIdParam) {
    return <div className="p-6 text-red-600">Module not found</div>;
  }

  if (!isValidCourse || !normalizedCode || !courseId) {
    return <div className="p-6 text-red-600">Invalid course ID</div>;
  }

  if (!components) {
    return <div className="p-6 text-red-600">Failed to load module</div>;
  }

  if (isLoadingProgress) {
    return <ModuleLoadingState />;
  }

  const AssignmentComponent = isUnlocked
    ? components.main
    : components.placeholder;

  return (
    <Suspense fallback={<ModuleLoadingState />}>
      <AssignmentComponent />
    </Suspense>
  );
}
