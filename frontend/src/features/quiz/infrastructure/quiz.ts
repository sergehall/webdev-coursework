// src/api/quiz.ts
import { ApiHttpError, apiFetch } from "@/api/client";
import { z } from "@/config/zod";
import type { CorrectAnswerDto } from "@/features/quiz/types/correct-answers-map.type";
import type { QuestionDto } from "@/features/quiz/types/QuestionDto.type";
import type { UIQuestion } from "@/features/quiz/types/UIQuestion.type";

export interface FetchQuizResponse {
  questions: UIQuestion[];
  answers: CorrectAnswerDto[];
}

export function resolveQuizImageUrl(
  path: string,
  apiBase = import.meta.env.VITE_API_URL ?? ""
): string {
  if (!path.startsWith("/uploads/") || !apiBase) return path;
  return `${apiBase.replace(/\/$/, "")}${path}`;
}

const tokenResponseSchema = z.object({ token: z.string().min(1) });
const questionDtosSchema = z.array(
  z.object({
    questionId: z.number().int(),
    questionText: z.string(),
    options: z.array(z.string()),
    images: z.array(z.string()),
  })
);
const correctAnswersSchema = z.array(
  z.object({
    quizId: z.string(),
    questionId: z.number().int(),
    correctAnswer: z.array(z.number().int().nonnegative()),
  })
);

/**
 * Request a short-lived token from the server for the given quizId.
 * The token is used in Authorization: Bearer <token> when calling /answers.
 */
async function fetchAnswersToken(quizId: string): Promise<string> {
  const { token } = await apiFetch<{ token: string }>(
    `/tokens/${encodeURIComponent(quizId)}/answers-token`,
    {
      method: "POST",
      parseResponse: (value) => tokenResponseSchema.parse(value),
    }
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
    `/quizzes/${encodeURIComponent(quizId)}/questions`,
    { parseResponse: (value) => questionDtosSchema.parse(value) }
  );

  try {
    answers = await apiFetch<CorrectAnswerDto[]>(
      `/quizzes/${encodeURIComponent(quizId)}/answers`,
      {
        headers: { Authorization: `Bearer ${token}` },
        parseResponse: (value) => correctAnswersSchema.parse(value),
      }
    );
  } catch (err) {
    // If the token expired mid-flight, refresh once and retry
    const isUnauthorized = err instanceof ApiHttpError && err.status === 401;
    if (!isUnauthorized) throw err;

    token = await fetchAnswersToken(quizId);
    answers = await apiFetch<CorrectAnswerDto[]>(
      `/quizzes/${encodeURIComponent(quizId)}/answers`,
      {
        headers: { Authorization: `Bearer ${token}` },
        parseResponse: (value) => correctAnswersSchema.parse(value),
      }
    );
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
    imageUrl: q.images?.map((path) => resolveQuizImageUrl(path)) ?? [],
    multiple: (answerMap[q.questionId]?.length ?? 0) > 1,
  }));

  return { questions, answers };
}
