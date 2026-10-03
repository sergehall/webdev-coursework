import { finalExamQuestions01To20 } from "./question-groups/questions-01-20";
import { finalExamQuestions21To38 } from "./question-groups/questions-21-38";

import {
  getAssessmentTotalPoints,
  type AssessmentQuestion,
} from "@/features/assessment";

export const finalExamQuestions = [
  ...finalExamQuestions01To20,
  ...finalExamQuestions21To38,
] satisfies readonly AssessmentQuestion[];

export const finalExamTotalPoints =
  getAssessmentTotalPoints(finalExamQuestions);
