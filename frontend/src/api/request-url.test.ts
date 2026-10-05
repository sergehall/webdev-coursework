import { describe, expect, it } from "vitest";

import { buildApiUrl, normalizeApiOrigin } from "./request-url";

describe("API destination boundary", () => {
  it("supports same-origin and normalizes a configured origin", () => {
    expect(buildApiUrl("/api/account/session", "")).toBe(
      "/api/account/session"
    );
    expect(
      buildApiUrl(
        "/quizzes/progress?clientId=a%26b",
        "https://api.example.test/"
      )
    ).toBe("https://api.example.test/quizzes/progress?clientId=a%26b");
  });
  it.each([
    "//evil.example/path",
    "https://evil.example/path",
    "/\\evil.example",
    "/api/../private",
    "/api/%2e%2e/private",
    "/api/session#fragment",
    "/api/\nsession",
  ])("rejects ambiguous or external endpoints: %s", (path) => {
    expect(() => buildApiUrl(path, "")).toThrow();
  });
  it.each([
    "ftp://api.example",
    "https://user:password@api.example",
    "https://api.example/path",
    "https://api.example/?target=evil",
    "https://api.example/#fragment",
    "http://api.example",
  ])("rejects unsafe production configuration: %s", (origin) => {
    expect(() => normalizeApiOrigin(origin, true)).toThrow();
  });
  it("supports HTTP for local development only", () => {
    expect(normalizeApiOrigin("http://localhost:5050", false)).toBe(
      "http://localhost:5050"
    );
  });
});
