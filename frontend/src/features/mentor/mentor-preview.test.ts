import { afterEach, describe, expect, it, vi } from "vitest";

import {
  clearMentorReturn,
  hasMentorReturn,
  rememberMentorReturn,
} from "./mentor-preview";

import { accountReturn } from "@/features/account/auth-return";

afterEach(() => {
  vi.useRealTimers();
  sessionStorage.clear();
});
describe("mentor auth return", () => {
  it("expires after 30 minutes and can be consumed without storing a return URL", () => {
    vi.useFakeTimers();
    expect(hasMentorReturn()).toBe(false);
    rememberMentorReturn();
    expect(hasMentorReturn()).toBe(true);
    vi.advanceTimersByTime(30 * 60 * 1000);
    expect(hasMentorReturn()).toBe(false);
    rememberMentorReturn();
    clearMentorReturn();
    expect(hasMentorReturn()).toBe(false);
  });
  it("chooses only allowed account destinations", () => {
    rememberMentorReturn();
    expect(accountReturn("https://attacker.example/collect")).toBe(
      "/web-developer-path/mentor"
    );
    expect(accountReturn("/account/security#mfa")).toBe(
      "/account/security#mfa"
    );
  });
});
