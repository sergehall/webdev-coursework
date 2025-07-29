// backend/__tests__/guards/answers-token.guard.spec.ts
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { createHash } from "crypto";
import { AnswersTokenGuard } from "../../src/guards/answers-token.guard";

describe("AnswersTokenGuard", () => {
  const secret = "supersecret";
  const quizId = "quiz1";

  const token = createHash("sha256")
    .update(`${quizId}:${secret}`)
    .digest("hex");

  const configServiceMock = {
    get: jest.fn().mockReturnValue(secret),
  } as any;

  const createMockContext = (params: any, query: any) =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          params,
          query,
        }),
      }),
    }) as unknown as ExecutionContext;

  it("should allow access with valid token", () => {
    const guard = new AnswersTokenGuard(configServiceMock);
    const context = createMockContext({ quizId }, { token });

    expect(guard.canActivate(context)).toBe(true);
  });

  it("should throw if token is invalid", () => {
    const guard = new AnswersTokenGuard(configServiceMock);
    const context = createMockContext({ quizId }, { token: "invalid" });

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it("should throw if token is missing", () => {
    const guard = new AnswersTokenGuard(configServiceMock);
    const context = createMockContext({ quizId }, {});

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});
