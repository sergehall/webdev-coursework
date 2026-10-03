import { questions01To34 } from "./module04-midterm/questions-01-34";
import { questions35To67 } from "./module04-midterm/questions-35-67";

import type { UIQuestion } from "@/features/quiz/types/UIQuestion.type";

export const cs79dModule04MidtermQuizQuestions = [
  ...questions01To34,
  ...questions35To67,
] satisfies readonly UIQuestion[];
