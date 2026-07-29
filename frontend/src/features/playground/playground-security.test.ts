import { describe, expect, it } from "vitest";

import {
  PLAYGROUND_MAX_LOG_ENTRIES,
  PLAYGROUND_MAX_LOG_LENGTH,
  boundPlaygroundLogs,
  isSafeSidecarName,
  isSupportedPlaygroundFile,
} from "@/features/playground/playground-security";

describe("playground security boundaries", () => {
  it("accepts only executable playground formats", () => {
    expect(isSupportedPlaygroundFile("course/demo.js")).toBe(true);
    expect(isSupportedPlaygroundFile("course/demo.PY")).toBe(true);
    expect(isSupportedPlaygroundFile("course/report.pdf")).toBe(false);
  });

  it("rejects unsafe sidecar names", () => {
    expect(isSafeSidecarName("student_data.py")).toBe(true);
    expect(isSafeSidecarName("grades.tab")).toBe(true);
    expect(isSafeSidecarName("../secret.py")).toBe(false);
    expect(isSafeSidecarName("nested/module.py")).toBe(false);
  });

  it("bounds both log count and individual message size", () => {
    const oversized = "x".repeat(PLAYGROUND_MAX_LOG_LENGTH + 20);
    const logs = Array.from(
      { length: PLAYGROUND_MAX_LOG_ENTRIES + 5 },
      (_, index) => `${index}-${oversized}`
    );
    const bounded = boundPlaygroundLogs(logs);

    expect(bounded).toHaveLength(PLAYGROUND_MAX_LOG_ENTRIES);
    expect(bounded[0]).toMatch(/^5-/);
    expect(bounded.at(-1)?.length).toBe(PLAYGROUND_MAX_LOG_LENGTH);
  });
});
