import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { apiFetch } from "./client";

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("apiFetch", () => {
  it("keeps read-only requests free of a JSON content type", async () => {
    fetchMock.mockResolvedValue(new Response("[1,2]", { status: 200 }));

    await expect(apiFetch<number[]>("/quizzes/progress")).resolves.toEqual([
      1, 2,
    ]);
    const options = fetchMock.mock.calls[0]?.[1];
    expect(new Headers(options?.headers).has("Content-Type")).toBe(false);
  });

  it("sends a JSON body even when its value is false", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));

    await expect(
      apiFetch<void, boolean>("/quizzes/progress", {
        method: "POST",
        body: false,
      })
    ).resolves.toBeUndefined();
    const options = fetchMock.mock.calls[0]?.[1];
    expect(options?.body).toBe("false");
    expect(new Headers(options?.headers).get("Content-Type")).toBe(
      "application/json"
    );
  });

  it("accepts an empty response from a mutation", async () => {
    fetchMock.mockResolvedValue(new Response("", { status: 201 }));

    await expect(
      apiFetch<void>("/quizzes/progress", { method: "POST" })
    ).resolves.toBeUndefined();
  });

  it("reports malformed success responses instead of returning an empty object", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockResolvedValue(new Response("not json", { status: 200 }));

    await expect(apiFetch<number[]>("/quizzes/progress")).rejects.toThrow(
      "Invalid JSON response from /quizzes/progress"
    );
  });

  it("distinguishes a caller cancellation from a timeout", async () => {
    fetchMock.mockImplementation(
      (_url, options) =>
        new Promise((_resolve, reject) => {
          options?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Cancelled", "AbortError"))
          );
        })
    );
    const caller = new AbortController();
    const request = apiFetch<number[]>("/quizzes/progress", {
      signal: caller.signal,
    });

    caller.abort();
    await expect(request).rejects.toMatchObject({ name: "AbortError" });

    vi.useFakeTimers();
    const timedRequest = apiFetch<number[]>("/quizzes/progress", {
      timeoutMs: 50,
    });
    const timedAssertion = expect(timedRequest).rejects.toThrow(
      "Request timed out after 50ms: /quizzes/progress"
    );
    await vi.advanceTimersByTimeAsync(50);
    await timedAssertion;
  });
});
