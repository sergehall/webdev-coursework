import type { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";

import { AnswersTokenGuard } from "../../src/guards/answers-token.guard";
import type {
  QuizAnswersTokenPayload,
  TokensService,
} from "../../src/tokens/service/tokens.service";

type TokensVerifier = jest.Mocked<
  Pick<TokensService, "verifyQuizAnswersToken">
>;
type RequestWithPayload = Request & {
  quizAnswersTokenPayload?: QuizAnswersTokenPayload;
};

describe("AnswersTokenGuard", () => {
  let tokensService: TokensVerifier;

  beforeEach(() => {
    tokensService = {
      verifyQuizAnswersToken: jest.fn(),
    };
  });

  it("should reject a request without a bearer token", () => {
    const guard = createGuard(tokensService);
    const { context } = createContext("quiz-1");

    expect(() => guard.canActivate(context)).toThrow(
      new UnauthorizedException("Missing or invalid Authorization header")
    );
    expect(tokensService.verifyQuizAnswersToken).not.toHaveBeenCalled();
  });

  it("should reject a non-bearer authorization scheme", () => {
    const guard = createGuard(tokensService);
    const { context } = createContext("quiz-1", "Basic credential");

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(tokensService.verifyQuizAnswersToken).not.toHaveBeenCalled();
  });

  it("should reject a token that cannot be verified", () => {
    tokensService.verifyQuizAnswersToken.mockImplementation(() => {
      throw new Error("jwt expired");
    });
    const guard = createGuard(tokensService);
    const { context } = createContext("quiz-1", "Bearer expired-token");

    expect(() => guard.canActivate(context)).toThrow(
      new UnauthorizedException("Invalid or expired token")
    );
  });

  it("should reject a valid token issued for a different quiz", () => {
    tokensService.verifyQuizAnswersToken.mockReturnValue({
      quizId: "quiz-2",
    });
    const guard = createGuard(tokensService);
    const { context } = createContext("quiz-1", "Bearer valid-token");

    expect(() => guard.canActivate(context)).toThrow(
      new UnauthorizedException("Token quizId mismatch")
    );
  });

  it("should attach the verified payload and allow a matching quiz token", () => {
    const payload = { quizId: "quiz-1" };
    tokensService.verifyQuizAnswersToken.mockReturnValue(payload);
    const guard = createGuard(tokensService);
    const { context, request } = createContext(
      "quiz-1",
      "Bearer   valid-token   "
    );

    expect(guard.canActivate(context)).toBe(true);
    expect(tokensService.verifyQuizAnswersToken).toHaveBeenCalledWith(
      "valid-token"
    );
    expect(request.quizAnswersTokenPayload).toEqual(payload);
  });
});

function createGuard(tokensService: TokensVerifier): AnswersTokenGuard {
  return new AnswersTokenGuard(tokensService as unknown as TokensService);
}

function createContext(
  quizId: string,
  authorization?: string
): { context: ExecutionContext; request: RequestWithPayload } {
  const request = {
    headers: authorization ? { authorization } : {},
    params: { quizId },
  } as unknown as RequestWithPayload;

  const context = {
    switchToHttp: () => ({
      getRequest: () => request,
    }),
  } as unknown as ExecutionContext;

  return { context, request };
}
