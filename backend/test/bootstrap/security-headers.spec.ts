import type { INestApplication } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import {
  configureSecurityHeaders,
  contentSecurityPolicy,
  securityHeaders,
} from "../../src/bootstrap/security-headers";

describe("security headers", () => {
  it("defines security headers with defensive defaults", () => {
    expect(securityHeaders["X-Content-Type-Options"]).toBe("nosniff");
    expect(securityHeaders["X-Frame-Options"]).toBe("SAMEORIGIN");
    expect(securityHeaders["Cross-Origin-Resource-Policy"]).toBe("same-origin");
    expect(contentSecurityPolicy).toContain("default-src 'self'");
    expect(contentSecurityPolicy).toContain("object-src 'none'");
    expect(contentSecurityPolicy).toContain("frame-ancestors 'self'");
    expect(contentSecurityPolicy).toContain("script-src 'self'");
  });

  it("attaches the CSP header to responses", () => {
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
