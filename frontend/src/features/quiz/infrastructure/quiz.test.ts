import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { fetchQuiz, resolveQuizImageUrl } from "./quiz";

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
        '[{"questionId":1,"questionText":"Question","options":["A","B"],"images":["/quiz/image.png"]}]'
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
    questions: [{ id: 1, question: "Question", imageUrl: ["/quiz/image.png"] }],
    answers: [{ questionId: 1, correctAnswer: [0] }],
  });
  expect(fetchMock).toHaveBeenCalledTimes(5);
});

test("resolves backend upload paths against the API origin", () => {
  expect(
    resolveQuizImageUrl(
      "/uploads/00000000-0000-0000-0000-000000000000.png",
      "https://api.webdev-coursework.com"
    )
  ).toBe(
    "https://api.webdev-coursework.com/uploads/00000000-0000-0000-0000-000000000000.png"
  );
  expect(resolveQuizImageUrl("/quiz/legacy.png", "https://api.test")).toBe(
    "/quiz/legacy.png"
  );
});
