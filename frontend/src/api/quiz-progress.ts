// frontend/src/api/quiz-progress.ts
import { apiFetch } from "./client";

import { QUIZ_APP_CONFIG } from "@/api/config/quiz-app";

type ProgressRequest = {
  clientId: string;
  appId: string;
  moduleNumber: number;
};

type ResetProgress = {
  clientId: string;
  appId: string;
};

const appId = QUIZ_APP_CONFIG.appId;

export async function fetchProgress(clientId: string): Promise<number[]> {
  return apiFetch<number[]>(
    `/api/quizzes/progress?clientId=${clientId}&appId=${appId}`
  );
}

export async function markModuleCompleted(
  body: ProgressRequest
): Promise<void> {
  await apiFetch<void, ProgressRequest>("/api/quizzes/progress", {
    method: "POST",
    body,
  });
}

export async function unmarkModuleCompleted(
  body: ProgressRequest
): Promise<void> {
  await apiFetch<void, ProgressRequest>("/api/quizzes/progress", {
    method: "DELETE",
    body,
  });
}

export async function resetAllModules(body: ResetProgress): Promise<void> {
  await apiFetch<void, ResetProgress>("/api/quizzes/progress/reset", {
    method: "POST",
    body,
  });
}
