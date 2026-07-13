import { beforeEach, describe, expect, it } from "vitest";

import { loadAssessmentAttempt, saveAssessmentAttempt } from "./attemptStorage";

import type { ActiveAttempt } from "@/features/assessment/domain/types";

const storageKey = "assessment:test:v1";
const assessmentId = "test-assessment";

describe("attemptStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("round-trips a validated active attempt", () => {
    const attempt = {
      status: "active",
      answers: {
        "1": { kind: "choice", selectedOptionIndexes: [0] },
      },
      startedAt: 100,
      deadlineAt: 1_000,
    } satisfies ActiveAttempt;

    expect(
      saveAssessmentAttempt(
        window.localStorage,
        storageKey,
        assessmentId,
        attempt
      )
    ).toBe(true);
    expect(
      loadAssessmentAttempt(window.localStorage, storageKey, assessmentId)
    ).toEqual(attempt);
  });

  it("discards malformed or mismatched persisted data", () => {
    window.localStorage.setItem(storageKey, "{not-json");
    expect(
      loadAssessmentAttempt(window.localStorage, storageKey, assessmentId)
    ).toBeNull();
    expect(window.localStorage.getItem(storageKey)).toBeNull();

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        schemaVersion: 1,
        assessmentId: "another-assessment",
        status: "active",
        answers: {},
        startedAt: 100,
        deadlineAt: 1_000,
      })
    );
    expect(
      loadAssessmentAttempt(window.localStorage, storageKey, assessmentId)
    ).toBeNull();
  });

  it("fails safely when browser storage is unavailable", () => {
    const unavailableStorage: Storage = {
      length: 0,
      clear() {
        throw new Error("unavailable");
      },
      getItem() {
        throw new Error("unavailable");
      },
      key() {
        return null;
      },
      removeItem() {
        throw new Error("unavailable");
      },
      setItem() {
        throw new Error("unavailable");
      },
    };

    expect(
      loadAssessmentAttempt(unavailableStorage, storageKey, assessmentId)
    ).toBeNull();
    expect(
      saveAssessmentAttempt(unavailableStorage, storageKey, assessmentId, {
        status: "locked",
      })
    ).toBe(false);
  });
});
