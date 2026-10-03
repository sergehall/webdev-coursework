// Deployed CSP coverage; route exceptions are documented in docs/cloudflare-turnstile.md.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it, vi } from "vitest";

import vercelConfig from "../../vercel.json";
import middleware, { config as middlewareConfig } from "../../middleware";
import { buildContentSecurityPolicy } from "../../content-security-policy";

vi.mock("@vercel/functions", () => ({
  next: ({ headers }: { headers: Record<string, string> }) =>
    new Response(null, { headers }),
}));

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
    const policy = pathname.startsWith("/course-materials/")
      ? headersFor(pathname)["Content-Security-Policy"]
      : (middleware(
          new Request(`https://webdev-coursework.com${pathname}`)
        ).headers.get("Content-Security-Policy") ?? "");
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

  it("gives each HTML response a fresh nonce for Cloudflare's injected script", () => {
    const first = middleware(new Request("https://webdev-coursework.com/"));
    const second = middleware(new Request("https://webdev-coursework.com/"));
    const firstNonce = first.headers
      .get("Content-Security-Policy")
      ?.match(/'nonce-([A-Za-z0-9+/=]+)'/)?.[1];
    const secondNonce = second.headers
      .get("Content-Security-Policy")
      ?.match(/'nonce-([A-Za-z0-9+/=]+)'/)?.[1];

    expect(firstNonce).toMatch(/^[A-Za-z0-9+/]{22}==$/);
    expect(secondNonce).toMatch(/^[A-Za-z0-9+/]{22}==$/);
    expect(firstNonce).not.toBe(secondNonce);
    expect(headersFor("/")["Content-Security-Policy"]).toBeUndefined();
    expect(
      headersFor("/code-playground")["Content-Security-Policy"]
    ).toBeUndefined();
    expect(middlewareConfig.matcher).toContain("/index.html");
  });

  it("keeps the standalone course policy equivalent to the app policy except inline CSS", () => {
    expect(
      headersFor("/course-materials/CS80/mod-5/form.html")[
        "Content-Security-Policy"
      ]
    ).toBe(buildContentSecurityPolicy({ allowInlineStyles: true }));
  });

  it("allows the exact early theme script without allowing arbitrary inline scripts", () => {
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    const script = html.match(/<script>(.*?)<\/script>/s)?.[1];
    expect(script).toBeTruthy();
    const hash = createHash("sha256").update(script!).digest("base64");
    expect(getDirective("/", "script-src")).toContain(`'sha256-${hash}'`);
  });

  it("allows the production API origin for progress writes", () => {
    expect(getDirective("/", "connect-src")).toContain(
      "https://api.webdev-coursework.com"
    );
    expect(getDirective("/", "img-src")).toContain(
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

  it("publishes the same agent catalog at the well-known and root paths", () => {
    const catalog = readFileSync(
      resolve(process.cwd(), "public/ai-catalog.json"),
      "utf8"
    );
    const wellKnownCatalog = readFileSync(
      resolve(process.cwd(), "public/.well-known/ai-catalog.json"),
      "utf8"
    );

    expect(JSON.parse(catalog)).toEqual(JSON.parse(wellKnownCatalog));
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
