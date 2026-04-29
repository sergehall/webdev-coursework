import type { INestApplication } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import {
  configureSecurityHeaders,
  contentSecurityPolicy,
  securityHeaders,
} from "../../src/bootstrap/security-headers";

describe("security headers", () => {
  const getDirective = (name: string): string =>
    contentSecurityPolicy
      .split("; ")
      .find((directive) => directive.startsWith(`${name} `)) ?? "";

  it("defines security headers with defensive defaults", () => {
    expect(securityHeaders["X-Content-Type-Options"]).toBe("nosniff");
    expect(securityHeaders["X-Frame-Options"]).toBe("SAMEORIGIN");
    expect(securityHeaders["Cross-Origin-Resource-Policy"]).toBe("same-origin");
    expect(contentSecurityPolicy).toContain("default-src 'self'");
    expect(contentSecurityPolicy).toContain("object-src 'none'");
    expect(contentSecurityPolicy).toContain("frame-ancestors 'self'");
    expect(contentSecurityPolicy).toContain("script-src 'self'");
  });

  it("keeps script-src free of unsafe inline and data sources", () => {
    const scriptSrc = getDirective("script-src");

    expect(scriptSrc).toContain(
      "'sha256-mqaaJKyEBAtrHnTmEqRs3kIzLcqrfe/bwtUYbNSfq2s='"
    );
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(scriptSrc).not.toContain("data:");
  });

  it("attaches security headers to responses", () => {
    let middleware:
      | ((req: Request, res: Response, next: NextFunction) => void)
      | undefined;

    const app = {
      use: jest.fn((handler) => {
        middleware = handler;
      }),
    } as unknown as INestApplication;

    const setHeader = jest.fn();
    const next = jest.fn();

    configureSecurityHeaders(app);
    middleware?.({} as Request, { setHeader } as unknown as Response, next);

    expect(setHeader).toHaveBeenCalledWith("X-Content-Type-Options", "nosniff");
    expect(setHeader).toHaveBeenCalledWith("X-Frame-Options", "SAMEORIGIN");
    expect(setHeader).toHaveBeenCalledWith(
      "Cross-Origin-Resource-Policy",
      "same-origin"
    );
    expect(setHeader).toHaveBeenCalledWith(
      "Content-Security-Policy",
      contentSecurityPolicy
    );
    expect(next).toHaveBeenCalledTimes(1);
  });
});
