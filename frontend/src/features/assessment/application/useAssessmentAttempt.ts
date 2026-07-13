import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getAssessmentMetrics } from "@/features/assessment/domain/assessmentEngine";
import type {
  AssessmentAttempt,
  AssessmentDefinition,
  AssessmentResponse,
  SubmissionReason,
} from "@/features/assessment/domain/types";
import {
  getBrowserLocalStorage,
  loadAssessmentAttempt,
  saveAssessmentAttempt,
} from "@/features/assessment/infrastructure/attemptStorage";

function createActiveAttempt(
  definition: AssessmentDefinition,
  startedAt: number
): AssessmentAttempt {
  return {
    status: "active",
    answers: {},
    startedAt,
    deadlineAt: startedAt + definition.durationSeconds * 1000,
  };
}

function submitActiveAttempt(
  attempt: AssessmentAttempt,
  submittedAt: number,
  reason: SubmissionReason
): AssessmentAttempt {
  if (attempt.status !== "active") return attempt;
  return {
    status: "submitted",
    answers: attempt.answers,
    startedAt: attempt.startedAt,
    deadlineAt: attempt.deadlineAt,
    submittedAt,
    reason,
  };
}

export function useAssessmentAttempt(definition: AssessmentDefinition) {
  const restoredAttemptRef = useRef(false);
  const [attempt, setAttempt] = useState<AssessmentAttempt>(() => {
    const storage = getBrowserLocalStorage();
    if (!storage) return { status: "locked" };
    const restored = loadAssessmentAttempt(
      storage,
      definition.storageKey,
      definition.id
    );
    if (!restored) return { status: "locked" };

    restoredAttemptRef.current = true;
    if (restored.status === "active" && restored.deadlineAt <= Date.now()) {
      return submitActiveAttempt(restored, Date.now(), "time-expired");
    }
    return restored;
  });
  const [now, setNow] = useState(() => Date.now());
  const [persistenceStatus, setPersistenceStatus] = useState<
    "saved" | "unavailable"
  >(() => (getBrowserLocalStorage() ? "saved" : "unavailable"));

  useEffect(() => {
    const storage = getBrowserLocalStorage();
    if (!storage) {
      setPersistenceStatus("unavailable");
      return;
    }
    const saved = saveAssessmentAttempt(
      storage,
      definition.storageKey,
      definition.id,
      attempt
    );
    setPersistenceStatus(saved ? "saved" : "unavailable");
  }, [attempt, definition.id, definition.storageKey]);

  useEffect(() => {
    if (attempt.status !== "active") return;

    const tick = () => {
      const timestamp = Date.now();
      setNow(timestamp);
      setAttempt((current) =>
        current.status === "active" && timestamp >= current.deadlineAt
          ? submitActiveAttempt(current, timestamp, "time-expired")
          : current
      );
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [attempt.status]);

  const startAttempt = useCallback(() => {
    const timestamp = Date.now();
    setNow(timestamp);
    setAttempt(createActiveAttempt(definition, timestamp));
  }, [definition]);

  const updateResponse = useCallback(
    (questionId: number, response: AssessmentResponse) => {
      setAttempt((current) => {
        if (current.status !== "active") return current;
        return {
          ...current,
          answers: {
            ...current.answers,
            [String(questionId)]: response,
          },
        };
      });
    },
    []
  );

  const submitAttempt = useCallback((reason: SubmissionReason = "manual") => {
    const timestamp = Date.now();
    setNow(timestamp);
    setAttempt((current) => submitActiveAttempt(current, timestamp, reason));
  }, []);

  const restartAttempt = useCallback(() => {
    const timestamp = Date.now();
    setNow(timestamp);
    setAttempt(createActiveAttempt(definition, timestamp));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [definition]);

  const metrics = useMemo(
    () =>
      getAssessmentMetrics(
        definition.questions,
        attempt.status === "locked" ? {} : attempt.answers
      ),
    [attempt, definition.questions]
  );
  const secondsRemaining =
    attempt.status === "active"
      ? Math.max(0, Math.ceil((attempt.deadlineAt - now) / 1000))
      : attempt.status === "submitted"
        ? Math.max(
            0,
            Math.ceil((attempt.deadlineAt - attempt.submittedAt) / 1000)
          )
        : definition.durationSeconds;

  return {
    attempt,
    metrics,
    secondsRemaining,
    persistenceStatus,
    hasRestoredAttempt: restoredAttemptRef.current,
    startAttempt,
    updateResponse,
    submitAttempt,
    restartAttempt,
  };
}
