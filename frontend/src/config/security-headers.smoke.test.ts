import { describe, expect, it } from "vitest";

import vercelConfig from "../../vercel.json";

describe("security headers", () => {
  const headers =
    vercelConfig.headers
      ?.flatMap((entry) => entry.headers)
      .reduce<Record<string, string>>((acc, header) => {
        acc[header.key] = header.value;
        return acc;
      }, {}) ?? {};

  it("publishes a Content Security Policy through Vercel", () => {
    expect(headers["Content-Security-Policy"]).toContain("default-src 'self'");
    expect(headers["Content-Security-Policy"]).toContain("object-src 'none'");
    expect(headers["Content-Security-Policy"]).toContain(
      "frame-ancestors 'self'"
    );
    expect(headers["Content-Security-Policy"]).toContain("script-src 'self'");
  });

  it("publishes hardening headers through Vercel", () => {
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["X-Frame-Options"]).toBe("SAMEORIGIN");
    expect(headers["Cross-Origin-Resource-Policy"]).toBe("same-origin");
  });
});
