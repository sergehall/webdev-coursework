// Deployed CSP coverage; route exceptions are documented in docs/cloudflare-turnstile.md.
import { describe, expect, it } from "vitest";

import vercelConfig from "../../vercel.json";

describe("security headers", () => {
  const headersFor = (pathname: string): Record<string, string> => {
    const matchingEntries = vercelConfig.headers.filter((entry) =>
      new RegExp(`^${entry.source}$`).test(pathname)
    );
    expect(matchingEntries).toHaveLength(1);
    return Object.fromEntries(
      matchingEntries[0].headers.map(({ key, value }) => [key, value])
    );
  };
  const getDirective = (pathname: string, name: string): string => {
    const policy = headersFor(pathname)["Content-Security-Policy"] ?? "";
    return (
      policy
        .split("; ")
        .find((directive) => directive.startsWith(`${name} `)) ?? ""
    );
  };

  it("denies unlisted resource types by default on app and course routes", () => {
    for (const pathname of [
      "/",
      "/coursework/CS79C/assignment",
      "/course-materials/CS80/mod-5/form.html",
      "/code-playground",
    ]) {
      expect(getDirective(pathname, "default-src")).toBe("default-src 'none'");
      expect(getDirective(pathname, "object-src")).toBe("object-src 'none'");
      expect(getDirective(pathname, "frame-ancestors")).toBe(
        "frame-ancestors 'self'"
      );
    }
  });

  it("blocks inline styles in the app but preserves standalone course documents", () => {
    expect(getDirective("/", "style-src")).toBe("style-src 'self'");
    expect(getDirective("/coursework/CS80/assignment", "style-src")).toBe(
      "style-src 'self'"
    );
    for (const pathname of [
      "/course-materials/CS80/mod-5/form.html",
      "/code-playground",
    ]) {
      expect(getDirective(pathname, "style-src")).toBe(
        "style-src 'self' 'unsafe-inline'"
      );
    }
  });

  it("keeps script-src free of unsafe inline and data sources on every route", () => {
    for (const pathname of [
      "/",
      "/course-materials/CS80/mod-5/form.html",
      "/code-playground",
    ]) {
      const scriptSrc = getDirective(pathname, "script-src");
      expect(scriptSrc).toContain(
        "'sha256-mqaaJKyEBAtrHnTmEqRs3kIzLcqrfe/bwtUYbNSfq2s='"
      );
      expect(scriptSrc).not.toContain("'unsafe-inline'");
      expect(scriptSrc).not.toContain("data:");
    }
  });

  it("allows the production API origin for progress writes", () => {
    expect(getDirective("/", "connect-src")).toContain(
      "https://api.webdev-coursework.com"
    );
  });

  it("allows the official Turnstile script and frame without relaxing inline scripts", () => {
    expect(getDirective("/", "script-src")).toContain(
      "https://challenges.cloudflare.com"
    );
    expect(getDirective("/", "frame-src")).toContain(
      "https://challenges.cloudflare.com"
    );
  });

  it("publishes hardening headers on every route group", () => {
    for (const pathname of [
      "/",
      "/course-materials/CS80/mod-5/form.html",
      "/code-playground",
    ]) {
      const headers = headersFor(pathname);
      expect(headers["X-Content-Type-Options"]).toBe("nosniff");
      expect(headers["X-Frame-Options"]).toBe("SAMEORIGIN");
      expect(headers["Cross-Origin-Resource-Policy"]).toBe("same-origin");
    }
    expect(headersFor("/")["Cross-Origin-Opener-Policy"]).toBe("same-origin");
    expect(
      headersFor("/course-materials/CS80/mod-5/form.html")[
        "Cross-Origin-Opener-Policy"
      ]
    ).toBeUndefined();
    expect(
      headersFor("/code-playground")["Cross-Origin-Opener-Policy"]
    ).toBeUndefined();
  });
});
