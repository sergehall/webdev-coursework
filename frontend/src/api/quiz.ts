// src/api/quiz.ts
import { apiFetch } from "./client";

import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { QuestionDto } from "@/components/quiz/types/QuestionDto.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

export interface FetchQuizResponse {
  questions: UIQuestion[];
  answers: CorrectAnswerDto[];
}

/**
 * Request a short-lived token from the server for the given quizId.
 * The token is used in Authorization: Bearer <token> when calling /answers.
 */
async function fetchAnswersToken(quizId: string): Promise<string> {
  const { token } = await apiFetch<{ token: string }>(
    `/api/quizzes/${quizId}/answers-token`,
    { method: "POST" }
  );
  return token;
}

/**
 * Fetch quiz questions and correct answers.
 * - Questions are public
 * - Answers require a short-lived token (Authorization: Bearer)
 */
export async function fetchQuiz(quizId: string): Promise<FetchQuizResponse> {
  // 1) Get a short-lived token from the server (no secrets on the client)
  const token = await fetchAnswersToken(quizId);

  // 2) Fetch questions and answers in parallel
  const [questionDtos, answers] = await Promise.all([
    apiFetch<QuestionDto[]>(`/api/quizzes/${quizId}/questions`),
    apiFetch<CorrectAnswerDto[]>(`/api/quizzes/${quizId}/answers`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  // 3) Build answer map (questionId -> correct indexes)
  const answerMap: Record<number, number[]> = {};
  for (const ans of answers) {
    answerMap[ans.questionId] = ans.correctAnswer;
  }

  // 4) Map to UIQuestion; if UI type uses a single image field, adjust accordingly
  const questions: UIQuestion[] = questionDtos.map((q) => ({
    id: q.questionId,
    question: q.questionText,
    options: q.options,
    // If UIQuestion expects an array, keep "imageUrls".
    // If it expects a single string, pick the first: q.images?.[0] ?? null
    imageUrls: q.images ?? [],
    multiple: (answerMap[q.questionId]?.length ?? 0) > 1,
  }));

  return { questions, answers };
}

// // src/api/quiz.ts
// import { apiFetch } from "./client";
//
// import { generateQuizToken } from "@/utils/generateToken";
// import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
// import type { QuestionDto } from "@/components/quiz/types/QuestionDto.type";
// import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";
//
// export interface FetchQuizResponse {
//   questions: UIQuestion[];
//   answers: CorrectAnswerDto[];
// }
//
// export async function fetchQuiz(quizId: string): Promise<FetchQuizResponse> {
//   const secret = import.meta.env.VITE_QUIZ_SECRET;
//   const token = await generateQuizToken(quizId, secret);
//
//   const [questionDtos, answers] = await Promise.all([
//     apiFetch<QuestionDto[]>(`/api/quizzes/${quizId}/questions`),
//     apiFetch<CorrectAnswerDto[]>(
//       `/api/quizzes/${quizId}/answers?token=${token}`
//     ),
//   ]);
//
//   const answerMap: Record<number, number[]> = {};
//   for (const ans of answers) {
//     answerMap[ans.questionId] = ans.correctAnswer;
//   }
//
//   const questions: UIQuestion[] = questionDtos.map((q) => ({
//     id: q.questionId,
//     question: q.questionText,
//     options: q.options,
//     imageUrl: q.images ?? [],
//     multiple: (answerMap[q.questionId]?.length ?? 0) > 1,
//   }));
//
//   return { questions, answers };
// }
