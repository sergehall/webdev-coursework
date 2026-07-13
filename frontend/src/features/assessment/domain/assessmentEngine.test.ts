import { describe, expect, it } from "vitest";

import {
  assertAssessmentDefinition,
  getAssessmentMetrics,
  isQuestionAnswered,
  isQuestionCorrect,
} from "./assessmentEngine";
import type {
  AssessmentAnswerState,
  AssessmentDefinition,
  AssessmentQuestion,
} from "./types";

const questions = [
  {
    id: 1,
    kind: "single",
    points: 2,
    prompt: "Pick one",
    options: ["A", "B"],
    answer: [1],
  },
  {
    id: 2,
    kind: "text",
    points: 3,
    prompt: "Type a declaration",
    instruction: "Enter Java.",
    answers: ["Locker<Item> locker;"],
  },
  {
    id: 3,
    kind: "completion",
    points: 5,
    prompt: "Complete code",
    instruction: "Select a keyword.",
    lines: [
      [
        { text: "class Child " },
        {
          blank: {
            id: "relationship",
            options: ["extends", "implements"],
            answer: "extends",
          },
        },
        { text: " Parent {}" },
      ],
    ],
  },
] satisfies readonly AssessmentQuestion[];

describe("assessmentEngine", () => {
  it("scores typed response variants and weighted points", () => {
    const answers = {
      "1": { kind: "choice", selectedOptionIndexes: [1] },
      "2": { kind: "text", value: " Locker <Item> locker; " },
      "3": { kind: "completion", values: { relationship: "extends" } },
    } satisfies AssessmentAnswerState;

    expect(getAssessmentMetrics(questions, answers)).toEqual({
      answeredCount: 3,
      correctCount: 3,
      earnedPoints: 10,
      totalPoints: 10,
      progressPercentage: 100,
      scorePercentage: 100,
    });
  });

  it("distinguishes incomplete completion responses from incorrect answers", () => {
    const question = questions[2];
    const incomplete = {
      kind: "completion",
      values: {},
    } as const;
    const incorrect = {
      kind: "completion",
      values: { relationship: "implements" },
    } as const;

    expect(isQuestionAnswered(question, incomplete)).toBe(false);
    expect(isQuestionAnswered(question, incorrect)).toBe(true);
    expect(isQuestionCorrect(question, incorrect)).toBe(false);
  });

  it("rejects invalid reusable definitions", () => {
    const invalidDefinition = {
      id: "invalid",
      delivery: "client-practice",
      eyebrow: "Test",
      title: "Invalid",
      summary: "Duplicate ids",
      accessCode: "START",
      accessHint: "Hint",
      durationSeconds: 60,
      storageKey: "invalid",
      questions: [questions[0], questions[0]],
    } satisfies AssessmentDefinition;

    expect(() => assertAssessmentDefinition(invalidDefinition)).toThrow(
      "duplicate question id"
    );
  });
});
