import { generationEnabled } from "./generation-config";

describe("mentor generation audience", () => {
  const keys = [
    "NODE_ENV",
    "AI_MENTOR_ENABLED",
    "AI_GENERATION_ENABLED",
    "AI_MENTOR_BETA_ACCOUNT_IDS",
    "AI_MENTOR_PUBLIC_ENABLED",
    "AI_PROVIDER_MODE",
    "AI_MODEL",
  ] as const;
  const previous = Object.fromEntries(
    keys.map((key) => [key, process.env[key]])
  );

  afterEach(() => {
    for (const key of keys) {
      const value = previous[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  it("keeps beta access until public launch and preserves the generation kill switch", () => {
    Object.assign(process.env, {
      NODE_ENV: "test",
      AI_MENTOR_ENABLED: "true",
      AI_GENERATION_ENABLED: "true",
      AI_MENTOR_BETA_ACCOUNT_IDS: "invited-account",
      AI_MENTOR_PUBLIC_ENABLED: "false",
      AI_PROVIDER_MODE: "mock",
    });
    delete process.env.AI_MODEL;
    expect(generationEnabled("invited-account")).toBe(true);
    expect(generationEnabled("regular-account")).toBe(false);
    expect(generationEnabled("")).toBe(false);

    process.env.AI_MENTOR_PUBLIC_ENABLED = "true";
    expect(generationEnabled("regular-account")).toBe(true);
    process.env.AI_GENERATION_ENABLED = "false";
    expect(generationEnabled("regular-account")).toBe(false);
  });
});
