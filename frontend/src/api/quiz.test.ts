import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { fetchQuiz } from "./quiz";

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test("refreshes an expired answers token using the HTTP status", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  fetchMock
    .mockResolvedValueOnce(new Response('{"token":"first"}'))
    .mockResolvedValueOnce(
      new Response(
        '[{"questionId":1,"questionText":"Question","options":["A","B"],"images":[]}]'
      )
    )
    .mockResolvedValueOnce(
      new Response('{"message":"Token expired"}', { status: 401 })
    )
    .mockResolvedValueOnce(new Response('{"token":"second"}'))
    .mockResolvedValueOnce(
      new Response('[{"quizId":"quiz","questionId":1,"correctAnswer":[0]}]')
    );

  await expect(fetchQuiz("quiz")).resolves.toMatchObject({
    questions: [{ id: 1, question: "Question" }],
    answers: [{ questionId: 1, correctAnswer: [0] }],
  });
  expect(fetchMock).toHaveBeenCalledTimes(5);
});
