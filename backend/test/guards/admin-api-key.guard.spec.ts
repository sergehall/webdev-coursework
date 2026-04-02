import {
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import { AdminApiKeyGuard } from "../../src/guards/admin-api-key.guard";

function createExecutionContext(
  headerValue?: string | string[]
): ExecutionContext {
  const req = {
    headers: headerValue ? { "x-admin-key": headerValue } : {},
  } as unknown as Request;

  return {
    switchToHttp: () => ({
      getRequest: () => req,
    }),
  } as unknown as ExecutionContext;
}

describe("AdminApiKeyGuard", () => {
  it("throws 500 when ADMIN_API_KEY is missing", () => {
    const cfg = {
      get: jest.fn().mockReturnValue(undefined),
    } as unknown as ConfigService;

    const guard = new AdminApiKeyGuard(cfg);

    expect(() => guard.canActivate(createExecutionContext("abc"))).toThrow(
      InternalServerErrorException
    );
  });

  it("throws 401 for missing request header", () => {
    const cfg = {
      get: jest.fn().mockReturnValue("secret"),
    } as unknown as ConfigService;

    const guard = new AdminApiKeyGuard(cfg);

    expect(() => guard.canActivate(createExecutionContext())).toThrow(
      UnauthorizedException
    );
  });

  it("throws 401 for invalid key", () => {
    const cfg = {
      get: jest.fn().mockReturnValue("secret"),
    } as unknown as ConfigService;

    const guard = new AdminApiKeyGuard(cfg);

    expect(() => guard.canActivate(createExecutionContext("bad"))).toThrow(
      UnauthorizedException
    );
  });

  it("allows request when key is valid", () => {
    const cfg = {
      get: jest.fn().mockReturnValue("secret"),
    } as unknown as ConfigService;

    const guard = new AdminApiKeyGuard(cfg);

    expect(guard.canActivate(createExecutionContext("secret"))).toBe(true);
  });
});
