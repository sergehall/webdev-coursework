import { z } from "zod";

import type {
  ActiveAttempt,
  AssessmentAttempt,
  SubmittedAttempt,
} from "@/features/assessment/domain/types";

const responseSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("choice"),
    selectedOptionIndexes: z.array(z.number().int().nonnegative()),
  }),
  z.object({ kind: z.literal("text"), value: z.string() }),
  z.object({
    kind: z.literal("completion"),
    values: z.record(z.string(), z.string()),
  }),
]);

const answerStateSchema = z.record(z.string(), responseSchema);

const activeAttemptSchema = z.object({
  schemaVersion: z.literal(1),
  assessmentId: z.string(),
  status: z.literal("active"),
  answers: answerStateSchema,
  startedAt: z.number().int().nonnegative(),
  deadlineAt: z.number().int().positive(),
});

const submittedAttemptSchema = z.object({
  schemaVersion: z.literal(1),
  assessmentId: z.string(),
  status: z.literal("submitted"),
  answers: answerStateSchema,
  startedAt: z.number().int().nonnegative(),
  deadlineAt: z.number().int().positive(),
  submittedAt: z.number().int().positive(),
  reason: z.enum(["manual", "time-expired"]),
});

const persistedAttemptSchema = z.discriminatedUnion("status", [
  activeAttemptSchema,
  submittedAttemptSchema,
]);

function removeStoredAttempt(storage: Storage, storageKey: string): void {
  try {
    storage.removeItem(storageKey);
  } catch {
    // Storage may be disabled by browser privacy settings.
  }
}

export function getBrowserLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadAssessmentAttempt(
  storage: Storage,
  storageKey: string,
  assessmentId: string
): ActiveAttempt | SubmittedAttempt | null {
  try {
    const serialized = storage.getItem(storageKey);
    if (!serialized) return null;
    const result = persistedAttemptSchema.safeParse(JSON.parse(serialized));
    if (!result.success || result.data.assessmentId !== assessmentId) {
      removeStoredAttempt(storage, storageKey);
      return null;
    }

    if (result.data.status === "active") {
      return {
        status: "active",
        answers: result.data.answers,
        startedAt: result.data.startedAt,
        deadlineAt: result.data.deadlineAt,
      };
    }
    return {
      status: "submitted",
      answers: result.data.answers,
      startedAt: result.data.startedAt,
      deadlineAt: result.data.deadlineAt,
      submittedAt: result.data.submittedAt,
      reason: result.data.reason,
    };
  } catch {
    removeStoredAttempt(storage, storageKey);
    return null;
  }
}

export function saveAssessmentAttempt(
  storage: Storage,
  storageKey: string,
  assessmentId: string,
  attempt: AssessmentAttempt
): boolean {
  try {
    if (attempt.status === "locked") {
      storage.removeItem(storageKey);
      return true;
    }

    storage.setItem(
      storageKey,
      JSON.stringify({
        schemaVersion: 1,
        assessmentId,
        ...attempt,
      })
    );
    return true;
  } catch {
    return false;
  }
}

export function clearAssessmentAttempt(
  storage: Storage,
  storageKey: string
): boolean {
  try {
    storage.removeItem(storageKey);
    return true;
  } catch {
    return false;
  }
}
