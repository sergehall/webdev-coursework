import { apiFetch } from "./client";

import { COURSE_PROGRESS_CONFIG } from "@/api/config/course-progress";
import type { CourseId } from "@/api/config/course-progress";

type ProgressRequest = {
  clientId: string;
  appId: string;
  moduleNumber: number;
  courseId: CourseId;
};

type ResetProgress = {
  clientId: string;
  appId: string;
  courseId: CourseId;
};

export async function fetchProgress(
  clientId: string,
  courseId: CourseId
): Promise<number[]> {
  const { appId } = COURSE_PROGRESS_CONFIG[courseId];

  return apiFetch<number[]>(
    `/api/quizzes/progress?clientId=${clientId}&appId=${appId}&courseId=${courseId}`
  );
}

export async function markModuleCompleted(
  body: ProgressRequest
): Promise<void> {
  const { appId } = COURSE_PROGRESS_CONFIG[body.courseId];

  await apiFetch<void, ProgressRequest>("/api/quizzes/progress", {
    method: "POST",
    body: {
      ...body,
      appId,
    },
  });
}

export async function unmarkModuleCompleted(
  body: ProgressRequest
): Promise<void> {
  const { appId } = COURSE_PROGRESS_CONFIG[body.courseId];

  await apiFetch<void, ProgressRequest>("/api/quizzes/progress", {
    method: "DELETE",
    body: {
      ...body,
      appId,
    },
  });
}

export async function resetAllModules(body: ResetProgress): Promise<void> {
  const { appId } = COURSE_PROGRESS_CONFIG[body.courseId];

  await apiFetch<void, ResetProgress>("/api/quizzes/progress/reset", {
    method: "POST",
    body: {
      ...body,
      appId,
    },
  });
}
