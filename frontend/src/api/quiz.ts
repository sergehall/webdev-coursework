// src/api/quiz.ts
import { apiFetch } from "./client";

import { generateQuizToken } from "@/utils/generateToken";
import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { QuestionDto } from "@/components/quiz/types/QuestionDto.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

export interface FetchQuizResponse {
  questions: UIQuestion[];
  answers: CorrectAnswerDto[];
}

export async function fetchQuiz(quizId: string): Promise<FetchQuizResponse> {
  const secret = import.meta.env.VITE_QUIZ_SECRET;
  const token = await generateQuizToken(quizId, secret);

  const [questionDtos, answers] = await Promise.all([
    apiFetch<QuestionDto[]>(`/api/quizzes/${quizId}/questions`),
    apiFetch<CorrectAnswerDto[]>(
      `/api/quizzes/${quizId}/answers?token=${token}`
    ),
  ]);

  const answerMap: Record<number, number[]> = {};
  for (const ans of answers) {
    answerMap[ans.questionId] = ans.correctAnswer;
  }

  const questions: UIQuestion[] = questionDtos.map((q) => ({
    id: q.questionId,
    question: q.questionText,
    options: q.options,
    imageUrl: q.images ?? [],
    multiple: (answerMap[q.questionId]?.length ?? 0) > 1,
  }));

  return { questions, answers };
}
