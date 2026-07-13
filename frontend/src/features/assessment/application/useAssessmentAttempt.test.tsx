import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAssessmentAttempt } from "./useAssessmentAttempt";

import type { AssessmentDefinition } from "@/features/assessment/domain/types";

const definition = {
  id: "timer-test",
  delivery: "client-practice",
  eyebrow: "Test",
  title: "Timer Test",
  summary: "Timer behavior",
  accessCode: "START",
  accessHint: "Hint",
  durationSeconds: 10,
  storageKey: "assessment:timer-test:v1",
  questions: [
    {
      id: 1,
      kind: "single",
      points: 1,
      prompt: "Pick one",
      options: ["A", "B"],
      answer: [0],
    },
  ],
} satisfies AssessmentDefinition;

describe("useAssessmentAttempt", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-12T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("submits against the absolute deadline after a background-tab jump", () => {
    const { result } = renderHook(() => useAssessmentAttempt(definition));

    act(() => result.current.startAttempt());
    expect(result.current.attempt.status).toBe("active");
    expect(result.current.secondsRemaining).toBe(10);

    act(() => {
      vi.setSystemTime(new Date("2026-07-12T12:00:11.000Z"));
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(result.current.attempt).toMatchObject({
      status: "submitted",
      reason: "time-expired",
    });
    expect(result.current.secondsRemaining).toBe(0);
  });
});
