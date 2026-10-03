import type { CS79CModuleBlueprint } from "../types";

import { cs79cModule10QuizAnswers } from "./module10QuizAnswers";
import { cs79cModule10QuizQuestions } from "./module10QuizQuestions";

export const cs79cModule10Quiz = {
  title: "Final Exam",
  questions: cs79cModule10QuizQuestions,
  answers: cs79cModule10QuizAnswers,
} satisfies NonNullable<CS79CModuleBlueprint["quiz"]>;
