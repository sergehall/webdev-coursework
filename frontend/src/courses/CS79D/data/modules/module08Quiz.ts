import type { CS79DModuleBlueprint } from "../types";
import { cs79dModule08QuizAnswers } from "./module08QuizAnswers";
import { cs79dModule08QuizQuestions } from "./module08QuizQuestions";

export const cs79dModule08Quiz = {
  title: "Final Exam: Cloud Practitioner Practice Exam #2",
  dueLabel: "Module 8 final exam review - 66 questions",
  questions: cs79dModule08QuizQuestions,
  answers: cs79dModule08QuizAnswers,
} satisfies NonNullable<CS79DModuleBlueprint["quiz"]>;
