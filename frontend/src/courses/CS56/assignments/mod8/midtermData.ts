import { midtermQuestions01To21 } from "./question-groups/questions-01-21";
import { midtermQuestions22To33 } from "./question-groups/questions-22-33";

import {
  getAssessmentTotalPoints,
  type AssessmentQuestion,
} from "@/features/assessment";

export const midtermQuestions: readonly AssessmentQuestion[] = [
  ...midtermQuestions01To21,
  ...midtermQuestions22To33,
];

export const midtermTotalPoints = getAssessmentTotalPoints(midtermQuestions);
