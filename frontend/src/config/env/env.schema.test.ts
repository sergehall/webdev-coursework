import { describe, expect, test } from "vitest";

import { envSchema } from "./env.schema";

describe("envSchema", () => {
  test.each(["VITE_API_URL", "VITE_OWNER_API_URL"])(
    "validates the account and general API origins: %s",
    (key) => {
      for (const value of [
        "http://api.example",
        "HTTP://api.example",
        "ftp://api.example",
        "https://user:pass@api.example",
        "https://api.example/path",
      ]) {
        expect(() => envSchema.parse({ [key]: value })).toThrow();
      }
      expect(
        envSchema.parse({
          VITE_ENVIRONMENT: "development",
          [key]: "http://localhost:5050",
        })[key]
      ).toBe("http://localhost:5050");
    }
  );
  test("passes with all fields provided", () => {
    const result = envSchema.parse({
      VITE_ENVIRONMENT: "development",
      VITE_API_URL: "https://example.com",
    });

    expect(result.VITE_ENVIRONMENT).toBe("development");
    expect(result.VITE_API_URL).toBe("https://example.com");
  });

  test("VITE_ENVIRONMENT defaults to production when omitted", () => {
    const result = envSchema.parse({
      VITE_API_URL: "https://example.com",
    });

    expect(result.VITE_ENVIRONMENT).toBe("production");
  });

  test("VITE_API_URL defaults to empty string when omitted", () => {
    const result = envSchema.parse({});

    expect(result.VITE_API_URL).toBe("");
  });

  test("accepts empty string for VITE_API_URL (same-origin mode)", () => {
    const result = envSchema.parse({
      VITE_API_URL: "",
    });

    expect(result.VITE_API_URL).toBe("");
  });

  test("fails with invalid URL for VITE_API_URL", () => {
    expect(() =>
      envSchema.parse({
        VITE_ENVIRONMENT: "production",
        VITE_API_URL: "invalid-url",
      })
    ).toThrow(/API URL must be a valid URL/);
  });

  test("fails with invalid VITE_ENVIRONMENT value", () => {
    expect(() =>
      envSchema.parse({
        VITE_ENVIRONMENT: "staging",
        VITE_API_URL: "https://example.com",
      })
    ).toThrow(/VITE_ENVIRONMENT must be one of/);
  });
});
