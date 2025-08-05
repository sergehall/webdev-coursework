// src/routes/AutoAssignmentRouter.tsx
import { Suspense, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { assignmentComponents } from "@/data/assignmentComponents";
import { useCompletedModules } from "@/hooks/useCompletedModules";
import { COURSE_PROGRESS_CONFIG } from "@/api/config/course-progress";
import type { CourseId } from "@/api/config/course-progress";
import { normalizeCourseIdToCode } from "@/utils/normalizeCourseIdToCode";

export default function AutoAssignmentRouter() {
  const { id, courseId: rawCourseId } = useParams<{
    id: string;
    courseId: string;
  }>();
  const courseCode = rawCourseId
    ? normalizeCourseIdToCode(rawCourseId)
    : undefined;

  const { completedModules } = useCompletedModules();
  const navigate = useNavigate();
  const location = useLocation();

  const config = courseCode
    ? COURSE_PROGRESS_CONFIG[courseCode as CourseId]
    : undefined;
  const maxModules = config?.maxModules ?? 0;

  const isAllCompleted = completedModules.length === maxModules;
  const isOnCompletedPage = location.pathname.endsWith("/completed");

  useEffect(() => {
    if (courseCode && isAllCompleted && !isOnCompletedPage) {
      navigate(`/coursework/${rawCourseId}/assignment/completed`);
    }
  }, [isAllCompleted, isOnCompletedPage, navigate, rawCourseId, courseCode]);

  if (!id || !courseCode) {
    return <div className="p-6 text-red-600">Module not found</div>;
  }

  const components = assignmentComponents(id, courseCode);
  if (!components) {
    return <div className="p-6 text-red-600">Module not found</div>;
  }

  const modNumber = parseInt(id, 10);
  const isUnlocked =
    modNumber === 1 || completedModules.includes(modNumber - 1);

  const Component = isUnlocked ? components.main : components.placeholder;

  return (
    <Suspense fallback={<div className="p-6">Loading module...</div>}>
      <Component />
    </Suspense>
  );
}
