// backend/__tests__/guards/answers-token.guard.spec.ts
import type { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { createHash } from "crypto";
import { AnswersTokenGuardQuery } from "../../src/guards/answers-token.guard-query";

describe("AnswersTokenGuardQuery", () => {
  const secret = "supersecret";
  const quizId = "quiz1";

  const token = createHash("sha256")
    .update(`${quizId}:${secret}`)
    .digest("hex");

  const configServiceMock: Pick<ConfigService, "get"> = {
    get: jest.fn().mockReturnValue(secret),
  };

  const createMockContext = (
    params: Record<string, string>,
    query: Record<string, string>
  ) =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          params,
          query,
        }),
      }),
    }) as unknown as ExecutionContext;

  it("should allow access with valid token", () => {
    const guard = new AnswersTokenGuardQuery(
      configServiceMock as ConfigService
    );
    const context = createMockContext({ quizId }, { token });

    expect(guard.canActivate(context)).toBe(true);
  });

  it("should throw if token is invalid", () => {
    const guard = new AnswersTokenGuardQuery(
      configServiceMock as ConfigService
    );
    const context = createMockContext({ quizId }, { token: "invalid" });

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it("should throw if token is missing", () => {
    const guard = new AnswersTokenGuardQuery(
      configServiceMock as ConfigService
    );
    const context = createMockContext({ quizId }, {});

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});
