import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMentorQuota } from "./useMentorQuota";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("mentor quota states", () => {
  it("refreshes the server limits after the daily reset", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-05T23:59:58Z"));
    const refresh = vi.fn();
    const hook = renderHook(() => useMentorQuota(refresh));
    act(() =>
      hook.result.current.load({
        dailyRemaining: 0,
        minuteRemaining: 0,
        resetAt: "2026-10-06T00:00:00Z",
      })
    );
    expect(hook.result.current.blocked).toBe(true);
    act(() => vi.advanceTimersByTime(2_000));
    expect(refresh).toHaveBeenCalledOnce();
    expect(hook.result.current.limits).toBeNull();
    expect(hook.result.current.blocked).toBe(false);
  });
});
