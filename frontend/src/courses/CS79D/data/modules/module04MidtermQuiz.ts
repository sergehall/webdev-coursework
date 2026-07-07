import type { CS79DModuleBlueprint } from "../types";

import { cs79dModule04MidtermQuizAnswers } from "./module04MidtermQuizAnswers";
import { cs79dModule04MidtermQuizQuestions } from "./module04MidtermQuizQuestions";

export const cs79dModule04MidtermQuiz = {
  title: "Cloud Practitioner Practice Exam",
  dueLabel:
    "Due May 17, 2026 at 11:59 pm — 65 min limit — Access code: cppe2026",
  questions: cs79dModule04MidtermQuizQuestions,
  answers: cs79dModule04MidtermQuizAnswers,
} satisfies NonNullable<CS79DModuleBlueprint["midtermQuiz"]>;
