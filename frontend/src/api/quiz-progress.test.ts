import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { fetchProgress } from "./quiz-progress";

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test("validates module progress returned by the backend", async () => {
  fetchMock.mockResolvedValueOnce(new Response("[1,2,3]"));
  await expect(fetchProgress("client", "CS56")).resolves.toEqual([1, 2, 3]);

  vi.spyOn(console, "error").mockImplementation(() => {});
  fetchMock.mockResolvedValueOnce(new Response('[1,"2"]'));
  await expect(fetchProgress("client", "CS56")).rejects.toThrow();
});
