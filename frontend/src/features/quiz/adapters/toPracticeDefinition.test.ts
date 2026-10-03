import { describe, expect, it } from "vitest";

import { cs79cModuleBlueprints } from "@/courses/CS79C/data/moduleBlueprints";
import { cs79dModuleBlueprints } from "@/courses/CS79D/data/moduleBlueprints";
import {
  quizAnswers as cs85OneAnswers,
  quizQuestions as cs85OneQuestions,
} from "@/courses/CS85/assignments/mod1/quizData";
import {
  quizAnswers as cs85TwoAnswers,
  quizQuestions as cs85TwoQuestions,
} from "@/courses/CS85/assignments/mod2/quizData";
import {
  quizAnswers as cs85ThreeAnswers,
  quizQuestions as cs85ThreeQuestions,
} from "@/courses/CS85/assignments/mod3/quizData";
import {
  quizAnswers as cs85FourAnswers,
  quizQuestions as cs85FourQuestions,
} from "@/courses/CS85/assignments/mod4/quizData";
import {
  quizAnswers as cs85FiveAnswers,
  quizQuestions as cs85FiveQuestions,
} from "@/courses/CS85/assignments/mod5/quizData";
import {
  quizAnswers as cs85SixAnswers,
  quizQuestions as cs85SixQuestions,
} from "@/courses/CS85/assignments/mod6/quizData";
import { toPracticeDefinition } from "@/features/quiz/adapters/toPracticeDefinition";
import type { CorrectAnswerDto } from "@/features/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/features/quiz/types/UIQuestion.type";

const staticQuizzes: {
  name: string;
  questions: readonly UIQuestion[];
  answers: readonly CorrectAnswerDto[];
}[] = [
  ...cs79cModuleBlueprints.flatMap((module) =>
    module.quiz ? [{ name: `CS79C module ${module.id}`, ...module.quiz }] : []
  ),
  ...cs79dModuleBlueprints.flatMap((module) =>
    module.quiz ? [{ name: `CS79D module ${module.id}`, ...module.quiz }] : []
  ),
  {
    name: "CS85 module 1",
    questions: cs85OneQuestions,
    answers: cs85OneAnswers,
  },
  {
    name: "CS85 module 2",
    questions: cs85TwoQuestions,
    answers: cs85TwoAnswers,
  },
  {
    name: "CS85 module 3",
    questions: cs85ThreeQuestions,
    answers: cs85ThreeAnswers,
  },
  {
    name: "CS85 module 4",
    questions: cs85FourQuestions,
    answers: cs85FourAnswers,
  },
  {
    name: "CS85 module 5",
    questions: cs85FiveQuestions,
    answers: cs85FiveAnswers,
  },
  {
    name: "CS85 module 6",
    questions: cs85SixQuestions,
    answers: cs85SixAnswers,
  },
];

describe("legacy choice practice adapter", () => {
  it.each(staticQuizzes)(
    "preserves all $name questions and answers",
    (quiz) => {
      const definition = toPracticeDefinition({
        title: quiz.name,
        eyebrow: "PRACTICE",
        questions: quiz.questions,
        answers: quiz.answers,
      });

      expect(definition.questions).toHaveLength(quiz.questions.length);
      expect(
        definition.questions.reduce((sum, question) => sum + question.points, 0)
      ).toBe(quiz.questions.length);
      for (const [index, sourceQuestion] of quiz.questions.entries()) {
        const migrated = definition.questions[index];
        expect(migrated.id).toBe(sourceQuestion.id);
        expect(migrated.prompt).toBe(sourceQuestion.question);
        expect(migrated.kind).toBe(
          sourceQuestion.multiple ? "multiple" : "single"
        );
        if (migrated.kind === "single" || migrated.kind === "multiple") {
          expect(migrated.options).toEqual(sourceQuestion.options);
          expect(migrated.answer).toEqual(
            quiz.answers.find(
              (answer) => answer.questionId === sourceQuestion.id
            )?.correctAnswer
          );
        }
      }
    }
  );

  it("rejects an incomplete answer key", () => {
    expect(() =>
      toPracticeDefinition({
        title: "broken",
        eyebrow: "PRACTICE",
        questions: [{ id: 1, question: "Question", options: ["A", "B"] }],
        answers: [],
      })
    ).toThrow("incomplete answer key");
  });
});
