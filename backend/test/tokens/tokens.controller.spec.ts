import { BadRequestException } from "@nestjs/common";

import { TokensController } from "../../src/tokens/api/tokens.controller";
import type { TokensService } from "../../src/tokens/service/tokens.service";

describe("TokensController", () => {
  let tokensService: jest.Mocked<
    Pick<
      TokensService,
      "issueQuizAnswersToken" | "tryVerifyQuizAnswersToken"
    >
  >;
  let controller: TokensController;

  beforeEach(() => {
    tokensService = {
      issueQuizAnswersToken: jest.fn(),
      tryVerifyQuizAnswersToken: jest.fn(),
    };
    controller = new TokensController(tokensService as unknown as TokensService);
  });

  it("returns a freshly issued answers token", () => {
    tokensService.issueQuizAnswersToken.mockReturnValue("signed-token");

    expect(controller.issueAnswersToken("quiz-1")).toEqual({
      token: "signed-token",
    });
    expect(tokensService.issueQuizAnswersToken).toHaveBeenCalledWith("quiz-1");
  });

  it("throws when verify token body is missing the token", () => {
    expect(() =>
      controller.verifyAnswersToken("quiz-1", {} as { token: string })
    ).toThrow(new BadRequestException("token is required"));
  });

  it("returns service verification errors", () => {
    tokensService.tryVerifyQuizAnswersToken.mockReturnValue({
      ok: false,
      error: "jwt expired",
    });

    expect(
      controller.verifyAnswersToken("quiz-1", { token: "bad-token" })
    ).toEqual({
      ok: false,
      error: "jwt expired",
    });
  });

  it("rejects tokens that belong to a different quiz", () => {
    tokensService.tryVerifyQuizAnswersToken.mockReturnValue({
      ok: true,
      payload: { quizId: "quiz-2" },
    });

    expect(
      controller.verifyAnswersToken("quiz-1", { token: "valid-token" })
    ).toEqual({
      ok: false,
      error: "Token quizId mismatch",
    });
  });

  it("returns ok payload when token matches the route quiz", () => {
    tokensService.tryVerifyQuizAnswersToken.mockReturnValue({
      ok: true,
      payload: { quizId: "quiz-1" },
    });

    expect(
      controller.verifyAnswersToken("quiz-1", { token: "valid-token" })
    ).toEqual({
      ok: true,
      payload: { quizId: "quiz-1" },
    });
  });
});
