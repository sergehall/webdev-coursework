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

test("encodes progress identifiers instead of interpreting them as query parameters", async () => {
  fetchMock.mockResolvedValueOnce(new Response("[]"));
  await fetchProgress("client&courseId=other#fragment", "CS56");
  const query = new URL(
    String(fetchMock.mock.calls[0]?.[0]),
    "https://example.test"
  ).searchParams;
  expect(query.get("clientId")).toBe("client&courseId=other#fragment");
  expect(query.getAll("courseId")).toEqual(["CS56"]);
});
