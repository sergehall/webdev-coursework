import { describe, expect, test } from "vitest";

import { envSchema } from "./env.schema";

describe("envSchema", () => {
  test("passes with all fields provided", () => {
    const result = envSchema.parse({
      VITE_ENVIRONMENT: "development",
      VITE_API_URL: "https://example.com",
      VITE_QUIZ_SECRET: "supersecret",
    });

    expect(result.VITE_ENVIRONMENT).toBe("development");
    expect(result.VITE_API_URL).toBe("https://example.com");
  });

  test("VITE_ENVIRONMENT defaults to production when omitted", () => {
    const result = envSchema.parse({
      VITE_API_URL: "https://example.com",
      VITE_QUIZ_SECRET: "supersecret",
    });

    expect(result.VITE_ENVIRONMENT).toBe("production");
  });

  test("VITE_API_URL defaults to empty string when omitted", () => {
    const result = envSchema.parse({
      VITE_QUIZ_SECRET: "supersecret",
    });

    expect(result.VITE_API_URL).toBe("");
  });

  test("accepts empty string for VITE_API_URL (same-origin mode)", () => {
    const result = envSchema.parse({
      VITE_QUIZ_SECRET: "supersecret",
      VITE_API_URL: "",
    });

    expect(result.VITE_API_URL).toBe("");
  });

  test("fails with invalid URL for VITE_API_URL", () => {
    expect(() =>
      envSchema.parse({
        VITE_ENVIRONMENT: "production",
        VITE_API_URL: "invalid-url",
        VITE_QUIZ_SECRET: "secret",
      })
    ).toThrow(/VITE_API_URL must be a valid URL/);
  });

  test("fails with missing VITE_QUIZ_SECRET", () => {
    expect(() =>
      envSchema.parse({
        VITE_ENVIRONMENT: "test",
        VITE_API_URL: "https://example.com",
        VITE_QUIZ_SECRET: "",
      })
    ).toThrow(/VITE_QUIZ_SECRET must be defined/);
  });

  test("fails with invalid VITE_ENVIRONMENT value", () => {
    expect(() =>
      envSchema.parse({
        VITE_ENVIRONMENT: "staging",
        VITE_API_URL: "https://example.com",
        VITE_QUIZ_SECRET: "valid",
      })
    ).toThrow(/VITE_ENVIRONMENT must be one of/);
  });
});
