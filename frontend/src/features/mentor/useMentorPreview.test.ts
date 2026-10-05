import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useMentorPreview } from "./useMentorPreview";
import type { LearnerProfile } from "./mentor-demo";

const profile: LearnerProfile = {
  goal: "frontend",
  level: "beginner",
  hours: 4,
  outcome: "Build a portfolio",
};
beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function start() {
  const hook = renderHook(() => useMentorPreview());
  act(() => hook.result.current.setProfile(profile));
  return hook;
}
function finish() {
  act(() => vi.runAllTimers());
}

describe("mentor preview state boundaries", () => {
  it("requires accepting a proposal and records only learner-reported progress", () => {
    const { result } = start();
    act(() => result.current.send("Create a plan", "plan"));
    finish();
    expect(result.current.path).toBeNull();
    expect(result.current.proposal).toHaveLength(8);
    expect(result.current.done).toEqual([]);
    act(() => result.current.accept());
    const path = result.current.path!;
    act(() => result.current.toggleDone(path[0].id));
    act(() => result.current.setProfile({ ...profile, goal: "backend" }));
    expect(result.current.path).toBe(path);
    expect(result.current.done).toEqual([path[0].id]);
    act(() => result.current.send("Update my plan", "plan"));
    finish();
    expect(result.current.path).toBe(path);
    act(() => result.current.discard());
    expect(result.current.path).toBe(path);
    expect(result.current.done).toEqual([path[0].id]);
  });

  it("Stop keeps a partial answer and prevents a late plan from being applied", () => {
    const { result } = start();
    act(() => result.current.send("Create a plan", "plan"));
    act(() => vi.advanceTimersByTime(500));
    const partial = result.current.messages[1].text;
    expect(partial.length).toBeGreaterThan(0);
    act(() => result.current.stop());
    finish();
    expect(result.current.messages[1]).toMatchObject({
      text: partial,
      partial: true,
    });
    expect(result.current.proposal).toBeNull();
    expect(result.current.busy).toBeNull();
  });

  it("failed generation preserves the accepted plan; retries happen only on request", () => {
    const { result } = start();
    act(() => result.current.send("Plan", "plan"));
    finish();
    act(() => result.current.accept());
    const path = result.current.path;
    act(() => result.current.setScenario("invalid-plan"));
    act(() => result.current.send("Revise", "plan"));
    finish();
    expect(result.current.error).toContain("could not be validated");
    expect(result.current.path).toBe(path);
    expect(result.current.proposal).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
    act(() => result.current.setScenario("normal"));
    act(() => result.current.retry());
    finish();
    expect(result.current.proposal).toHaveLength(8);
    expect(result.current.path).toBe(path);
  });

  it("starting a new conversation cancels pending work while keeping an accepted path", () => {
    const { result } = start();
    act(() => result.current.send("Plan", "plan"));
    finish();
    act(() => result.current.accept());
    const path = result.current.path;
    act(() => result.current.send("Explain"));
    act(() => result.current.clearConversation());
    finish();
    expect(result.current.messages).toEqual([]);
    expect(result.current.path).toBe(path);
    expect(result.current.busy).toBeNull();
  });
});
