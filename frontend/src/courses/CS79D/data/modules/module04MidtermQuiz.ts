import { cs79dModule04MidtermQuizAnswers } from "./module04MidtermQuizAnswers";
import { cs79dModule04MidtermQuizQuestions } from "./module04MidtermQuizQuestions";

import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";
import {
  assertAssessmentDefinition,
  type AssessmentDefinition,
  type AssessmentQuestion,
} from "@/features/assessment";

const answersByQuestionId = new Map(
  cs79dModule04MidtermQuizAnswers.map((answer) => [
    answer.questionId,
    answer.correctAnswer,
  ])
);

function toAssessmentQuestion(question: UIQuestion): AssessmentQuestion {
  const answer = answersByQuestionId.get(question.id);

  if (!answer) {
    throw new Error(
      `CS79D Cloud Practitioner midterm question ${question.id} is missing an answer.`
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
}

export const cs79dCloudPractitionerMidtermQuestions =
  cs79dModule04MidtermQuizQuestions.map(toAssessmentQuestion);

export const cs79dCloudPractitionerMidtermDefinition = {
  id: "cs79d-cloud-practitioner-midterm",
  delivery: "client-practice",
  eyebrow: "CS 79D · Module 4",
  title: "Midterm: Cloud Practitioner Practice Exam",
  summary:
    "A 67-question practice midterm covering AWS Cloud Practitioner material from Weeks 1–4.",
  accessCode: "cppe2026",
  accessHint: "Access code: cppe2026",
  durationSeconds: 2 * 60 * 60,
  storageKey: "assessment:cs79d-cloud-practitioner-midterm:v1",
  questions: cs79dCloudPractitionerMidtermQuestions,
} satisfies AssessmentDefinition;

assertAssessmentDefinition(cs79dCloudPractitionerMidtermDefinition);
