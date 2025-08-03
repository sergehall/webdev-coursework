import { Suspense, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { assignmentComponents } from "@/data/assignmentComponents";
import type { CourseCode } from "@/data/types/CourseCode";
import { useCompletedModules } from "@/hooks/useCompletedModules";
import { COURSE_PROGRESS_CONFIG } from "@/api/config/course-progress";
import type { CourseId } from "@/api/config/course-progress";

export default function AutoAssignmentRouter() {
  const { id, courseId } = useParams<{ id: string; courseId: CourseCode }>();
  const { completedModules } = useCompletedModules();
  const navigate = useNavigate();
  const location = useLocation();

  // These are safe defaults to use even before validation
  const config = courseId
    ? COURSE_PROGRESS_CONFIG[courseId as CourseId]
    : undefined;
  const maxModules = config?.maxModules ?? 0;

  const isAllCompleted = completedModules.length === maxModules;
  const isOnCompletedPage = location.pathname.endsWith("/completed");

  useEffect(() => {
    if (courseId && isAllCompleted && !isOnCompletedPage) {
      navigate(`/coursework/${courseId}/assignment/completed`);
    }
  }, [isAllCompleted, isOnCompletedPage, navigate, courseId]);

  // Validation and fallback rendering — only AFTER hooks
  if (!id || !courseId) {
    return <div className="p-6 text-red-600">Module not found</div>;
  }

  const components = assignmentComponents(id, courseId);
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
