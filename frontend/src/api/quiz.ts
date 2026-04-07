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
    `/tokens/${quizId}/answers-token`,
    { method: "POST" }
  );
  return token;
}

/**
 * Fetch quiz questions and correct answers.
 * - Questions are public
 * - Answers require a short-lived token (Authorization: Bearer)
 * - On 401 the token is refreshed once and the answers request is retried
 */
export async function fetchQuiz(quizId: string): Promise<FetchQuizResponse> {
  // 1) Get a short-lived token from the server (no secrets on the client)
  let token = await fetchAnswersToken(quizId);

  // 2) Fetch questions and answers in parallel
  let answers: CorrectAnswerDto[];
  const questionDtosPromise = apiFetch<QuestionDto[]>(
    `/quizzes/${quizId}/questions`
  );

  try {
    answers = await apiFetch<CorrectAnswerDto[]>(`/quizzes/${quizId}/answers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    // If the token expired mid-flight, refresh once and retry
    const isUnauthorized =
      err instanceof Error && err.message.toLowerCase().includes("401");
    if (!isUnauthorized) throw err;

    token = await fetchAnswersToken(quizId);
    answers = await apiFetch<CorrectAnswerDto[]>(`/quizzes/${quizId}/answers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  const [questionDtos] = await Promise.all([questionDtosPromise]);

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
