import { useMemo } from "react";

import AssessmentRunner from "@/features/assessment/components/AssessmentRunner";
import { toPracticeDefinition } from "@/features/quiz/adapters/toPracticeDefinition";
import type { CorrectAnswerDto } from "@/features/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/features/quiz/types/UIQuestion.type";

type LegacyChoicePracticeQuizProps = {
  readonly title: string;
  readonly eyebrow: string;
  readonly questions: readonly UIQuestion[];
  readonly answers: readonly CorrectAnswerDto[];
  readonly durationSeconds?: number;
};

export default function LegacyChoicePracticeQuiz(
  props: LegacyChoicePracticeQuizProps
) {
  const { title, eyebrow, questions, answers, durationSeconds } = props;
  const definition = useMemo(
    () =>
      toPracticeDefinition({
        title,
        eyebrow,
        questions,
        answers,
        durationSeconds,
      }),
    [title, eyebrow, questions, answers, durationSeconds]
  );

  return <AssessmentRunner definition={definition} />;
}
