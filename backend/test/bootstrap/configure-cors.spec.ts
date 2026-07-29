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

  it("should emit a production warning when no allowlist is configured", () => {
    process.env.NODE_ENV = "production";
    const warning = jest.spyOn(Logger.prototype, "warn");

    configureAndCaptureOptions();

    expect(warning).toHaveBeenCalledWith(
      expect.stringContaining("ALLOWED_ORIGINS is not set")
    );
  });
});

function configureAndCaptureOptions(): CapturedCorsOptions {
  const enableCors = jest.fn();
  const app = {
    enableCors,
  } as unknown as INestApplication;

  configureCors(app);

  const options = enableCors.mock.calls[0]?.[0] as
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
