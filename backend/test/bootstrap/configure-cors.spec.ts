// The documentation exception is same-origin and route-specific; other API origins stay restricted.
import type { Request } from "express";
import { Logger } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";

import { configureCors } from "../../src/bootstrap/configure-cors";

type OriginCallback = (error: Error | null, allow?: boolean) => void;
type OriginValidator = (
  origin: string | undefined,
  callback: OriginCallback
) => void;
type CapturedCorsOptions = {
  origin: OriginValidator;
  credentials: boolean;
};

describe("configureCors", () => {
  let originalAllowedOrigins: string | undefined;
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    originalAllowedOrigins = process.env.ALLOWED_ORIGINS;
    originalNodeEnv = process.env.NODE_ENV;
    delete process.env.ALLOWED_ORIGINS;
    process.env.NODE_ENV = "test";
    jest.spyOn(Logger.prototype, "log").mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    restoreEnvironment("ALLOWED_ORIGINS", originalAllowedOrigins);
    restoreEnvironment("NODE_ENV", originalNodeEnv);
  });

  it("should allow non-browser clients without an Origin header", () => {
    const options = configureAndCaptureOptions();
    const callback = jest.fn<void, Parameters<OriginCallback>>();

    options.origin(undefined, callback);

    expect(callback).toHaveBeenCalledWith(null, true);
    expect(options.credentials).toBe(true);
  });

  it("should allow any origin when no allowlist is configured", () => {
    const options = configureAndCaptureOptions();
    const callback = jest.fn<void, Parameters<OriginCallback>>();

    options.origin("https://example.test", callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });

  it("should trim the allowlist and allow an exact trusted origin", () => {
    process.env.ALLOWED_ORIGINS =
      " https://app.example.test, ,https://admin.example.test ";
    const options = configureAndCaptureOptions();
    const callback = jest.fn<void, Parameters<OriginCallback>>();

    options.origin("https://admin.example.test", callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });

  it("should reject an origin that is not in the configured allowlist", () => {
    process.env.ALLOWED_ORIGINS = "https://app.example.test";
    const options = configureAndCaptureOptions();
    const callback = jest.fn<void, Parameters<OriginCallback>>();

    options.origin("https://attacker.example", callback);

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Not allowed by CORS" }),
      false
    );
  });

  it("allows only the documentation verification route to post from the API's own origin", () => {
    process.env.ALLOWED_ORIGINS = "https://frontend.example.test";
    const req = (path: string, origin: string) =>
      ({
        method: "POST",
        path,
        protocol: "https",
        get: (name: string) =>
          name === "origin" ? origin : "api.example.test",
      }) as unknown as Request;
    const callback = jest.fn<void, Parameters<OriginCallback>>();
    configureAndCaptureOptions(
      req("/docs/turnstile-verify", "https://api.example.test")
    ).origin("https://api.example.test", callback);
    expect(callback).toHaveBeenLastCalledWith(null, true);
    configureAndCaptureOptions(
      req("/api/account/login", "https://api.example.test")
    ).origin("https://api.example.test", callback);
    expect(callback).toHaveBeenLastCalledWith(expect.any(Error), false);
    configureAndCaptureOptions(
      req("/docs/turnstile-verify", "https://attacker.example")
    ).origin("https://attacker.example", callback);
    expect(callback).toHaveBeenLastCalledWith(expect.any(Error), false);
  });

  it("should reject production startup without an allowlist", () => {
    process.env.NODE_ENV = "production";
    expect(() => configureAndCaptureOptions()).toThrow(
      "ALLOWED_ORIGINS must be configured"
    );
  });
});

function configureAndCaptureOptions(
  req = {
    method: "GET",
    path: "/",
    protocol: "https",
    get: () => undefined,
  } as unknown as Request
): CapturedCorsOptions {
  const enableCors = jest.fn();
  const app = {
    enableCors,
  } as unknown as INestApplication;

  configureCors(app);

  const captured = jest.fn();
  enableCors.mock.calls[0]?.[0](req, captured);
  const options = captured.mock.calls[0]?.[1] as
    | CapturedCorsOptions
    | undefined;
  if (!options) {
    throw new Error("configureCors did not register CORS options");
  }
  return options;
}

function restoreEnvironment(name: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}
