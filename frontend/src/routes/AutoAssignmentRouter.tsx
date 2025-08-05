import { Suspense, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { assignmentComponents } from "@/data/assignmentComponents";
import { useCompletedModules } from "@/hooks/useCompletedModules";
import { COURSE_PROGRESS_CONFIG } from "@/api/config/course-progress";
import type { CourseId } from "@/api/config/course-progress";
import { normalizeCourseIdToCode } from "@/utils/normalizeCourseIdToCode";

export default function AutoAssignmentRouter() {
  const { id, courseId: courseIdParam } = useParams<{
    id?: string;
    courseId?: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { completedModules } = useCompletedModules();

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

  const AssignmentComponent = isUnlocked
    ? components.main
    : components.placeholder;

  return (
    <Suspense fallback={<div className="p-6">Loading module...</div>}>
      <AssignmentComponent />
    </Suspense>
  );
}
