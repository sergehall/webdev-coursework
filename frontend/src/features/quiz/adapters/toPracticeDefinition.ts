import { assertAssessmentDefinition } from "@/features/assessment/domain/assessmentEngine";
import type {
  AssessmentDefinition,
  ChoiceQuestion,
} from "@/features/assessment/domain/types";
import type { CorrectAnswerDto } from "@/features/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/features/quiz/types/UIQuestion.type";

type LegacyChoicePracticeInput = {
  readonly title: string;
  readonly eyebrow: string;
  readonly questions: readonly UIQuestion[];
  readonly answers: readonly CorrectAnswerDto[];
  readonly durationSeconds?: number;
};

/** Keeps the original prompts, options, answer indexes, and one-point scoring. */
export function toPracticeDefinition({
  title,
  eyebrow,
  questions,
  answers,
  durationSeconds = 60 * 60,
}: LegacyChoicePracticeInput): AssessmentDefinition {
  const id = answers[0]?.quizId;
  if (!id || questions.length !== answers.length) {
    throw new Error(`Quiz ${title} has an incomplete answer key.`);
  }

  const answerByQuestionId = new Map<number, CorrectAnswerDto>();
  for (const answer of answers) {
    if (answer.quizId !== id || answerByQuestionId.has(answer.questionId)) {
      throw new Error(`Quiz ${title} has mixed or duplicate answers.`);
    }
    answerByQuestionId.set(answer.questionId, answer);
  }

  const assessmentQuestions: ChoiceQuestion[] = questions.map((question) => {
    if (question.imageUrl?.length) {
      throw new Error(
        `Quiz ${title} contains images that need a visual adapter.`
      );
    }
    const answer = answerByQuestionId.get(question.id)?.correctAnswer;
    if (!answer || Boolean(question.multiple) !== answer.length > 1) {
      throw new Error(
        `Quiz ${title} has an incompatible answer for question ${question.id}.`
      );
    }
    return {
      id: question.id,
      kind: question.multiple ? "multiple" : "single",
      points: 1,
      prompt: question.question,
      options: question.options,
      answer,
    };
  });

  const definition: AssessmentDefinition = {
    id,
    delivery: "client-practice",
    eyebrow,
    title,
    summary: "Practice this quiz before submitting your work on SMC Canvas.",
    accessCode: "START",
    accessHint: "Access code: START",
    durationSeconds,
    storageKey: `assessment:${id}:v1`,
    questions: assessmentQuestions,
  };
  assertAssessmentDefinition(definition);
  return definition;
}
