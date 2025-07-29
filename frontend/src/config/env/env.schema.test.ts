import { describe, expect, test } from "vitest";

import { envSchema } from "./env.schema";

describe("envSchema", () => {
  test("passes with valid environment variables", () => {
    const result = envSchema.parse({
      VITE_ENVIRONMENT: "development",
      VITE_API_URL: "https://example.com/api",
      VITE_QUIZ_SECRET: "supersecret",
    });

    expect(result.VITE_ENVIRONMENT).toBe("development");
  });

  test("fails with invalid URL", () => {
    expect(() =>
      envSchema.parse({
        VITE_ENVIRONMENT: "production",
        VITE_API_URL: "invalid-url",
        VITE_QUIZ_SECRET: "secret",
      })
    ).toThrow(/VITE_API_URL must be a valid URL/);
  });

  test("fails with missing secret", () => {
    expect(() =>
      envSchema.parse({
        VITE_ENVIRONMENT: "test",
        VITE_API_URL: "https://example.com",
        VITE_QUIZ_SECRET: "",
      })
    ).toThrow(/VITE_QUIZ_SECRET must be defined/);
  });

  test("fails with invalid environment", () => {
    expect(() =>
      envSchema.parse({
        VITE_ENVIRONMENT: "staging", // not allowed
        VITE_API_URL: "https://example.com",
        VITE_QUIZ_SECRET: "valid",
      })
    ).toThrow(/VITE_ENVIRONMENT must be one of/);
  });
});
