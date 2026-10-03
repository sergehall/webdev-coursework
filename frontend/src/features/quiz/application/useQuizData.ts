// frontend/src/hooks/useQuizData.ts
import { useEffect, useState } from "react";

import type { UIQuestion } from "@/features/quiz/types/UIQuestion.type";
import type { CorrectAnswerDto } from "@/features/quiz/types/correct-answers-map.type";
import { fetchQuiz } from "@/features/quiz/infrastructure/quiz";
import type { FetchQuizResponse } from "@/features/quiz/infrastructure/quiz";

export function useQuizData(quizId: string) {
  const [questions, setQuestions] = useState<UIQuestion[]>([]);
  const [answers, setAnswers] = useState<CorrectAnswerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchQuiz(quizId)
      .then((res: FetchQuizResponse) => {
        setQuestions(res.questions);
        setAnswers(res.answers);
      })
      .catch((err) => {
        console.error(`❌ Failed to fetch quiz "${quizId}":`, err);
        const message =
          err instanceof Error ? err.message : JSON.stringify(err);
        setError(new Error(message));
      })
      .finally(() => setLoading(false));
  }, [quizId]);

  return { questions, answers, loading, error };
}
