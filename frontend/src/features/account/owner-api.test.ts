import { afterEach, expect, it, vi } from "vitest";

import { ownerRequest } from "./owner-api";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

it("sends account credentials only to the configured API without redirect following", async () => {
  vi.stubEnv("VITE_OWNER_API_URL", "https://accounts.example.test/");
  const fetchMock = vi.fn().mockResolvedValue(new Response('{"ok":true}'));
  vi.stubGlobal("fetch", fetchMock);
  await ownerRequest("login", {
    method: "POST",
    body: { password: "test-only" },
  });
  expect(fetchMock).toHaveBeenCalledWith(
    "https://accounts.example.test/api/account/login",
    expect.objectContaining({
      credentials: "include",
      redirect: "error",
      cache: "no-store",
      referrerPolicy: "no-referrer",
    })
  );
});

it("rejects account path traversal and credential-bearing origins before fetch", async () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("VITE_OWNER_API_URL", "https://accounts.example.test");
  await expect(ownerRequest("../../other")).rejects.toThrow();
  vi.stubEnv("VITE_OWNER_API_URL", "https://user:pass@accounts.example.test");
  await expect(
    ownerRequest("login", { method: "POST", body: {} })
  ).rejects.toThrow();
  expect(fetchMock).not.toHaveBeenCalled();
});
