import { describe, expect, it } from "vitest";

import {
  normalizePlaygroundRelativePath,
  toCodePlaygroundUrl,
} from "@/utils/playgroundPath";

describe("playgroundPath utilities", () => {
  it("accepts a normal relative path", () => {
    expect(normalizePlaygroundRelativePath("CS81/mod-3/B/math.js")).toBe(
      "CS81/mod-3/B/math.js"
    );
  });

  it("normalizes URL-encoded paths", () => {
    expect(normalizePlaygroundRelativePath("CS81%2Fmod-3%2FB%2Fmath.js")).toBe(
      "CS81/mod-3/B/math.js"
    );
  });

  it("rejects traversal and absolute paths", () => {
    expect(normalizePlaygroundRelativePath("../secret.js")).toBeNull();
    expect(normalizePlaygroundRelativePath("CS81/../secret.js")).toBeNull();
    expect(normalizePlaygroundRelativePath("/CS81/mod-1/a.js")).toBeNull();
  });

  it("builds encoded code-playground URLs", () => {
    expect(toCodePlaygroundUrl("CS81/mod 3/a.js")).toBe(
      "/code-playground/CS81/mod%203/a.js"
    );
  });
});
