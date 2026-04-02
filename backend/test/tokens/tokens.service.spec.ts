import type { JwtService } from "@nestjs/jwt";

import { TokensService } from "../../src/tokens/service/tokens.service";

describe("TokensService", () => {
  let jwt: jest.Mocked<Pick<JwtService, "sign" | "verify">>;
  let service: TokensService;

  beforeEach(() => {
    jwt = {
      sign: jest.fn(),
      verify: jest.fn(),
    };
    service = new TokensService(jwt as unknown as JwtService);
  });

  it("issues a quiz answers token without ttl override by default", () => {
    jwt.sign.mockReturnValue("signed-token");

    const result = service.issueQuizAnswersToken("quiz-1");

    expect(result).toBe("signed-token");
    expect(jwt.sign).toHaveBeenCalledWith({ quizId: "quiz-1" }, undefined);
  });

  it("normalizes numeric string ttl overrides to numbers", () => {
    service.issueQuizAnswersToken("quiz-1", "3600");

    expect(jwt.sign).toHaveBeenCalledWith(
      { quizId: "quiz-1" },
      { expiresIn: 3600 }
    );
  });

  it("preserves ms-style ttl overrides as strings", () => {
    service.issueQuizAnswersToken("quiz-1", "30m");

    expect(jwt.sign).toHaveBeenCalledWith(
      { quizId: "quiz-1" },
      { expiresIn: "30m" }
    );
  });

  it("verifies quiz answers tokens through jwt service", () => {
    const payload = { quizId: "quiz-1" };
    jwt.verify.mockReturnValue(payload);

    expect(service.verifyQuizAnswersToken("token-123")).toEqual(payload);
    expect(jwt.verify).toHaveBeenCalledWith("token-123");
  });

  it("returns ok payload when token verification succeeds", () => {
    const payload = { quizId: "quiz-1" };
    jwt.verify.mockReturnValue(payload);

    expect(service.tryVerifyQuizAnswersToken("token-123")).toEqual({
      ok: true,
      payload,
    });
  });

  it("returns the thrown error message when verification fails", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("jwt expired");
    });

    expect(service.tryVerifyQuizAnswersToken("token-123")).toEqual({
      ok: false,
      error: "jwt expired",
    });
  });

  it("falls back to a generic message for non-error failures", () => {
    jwt.verify.mockImplementation(() => {
      throw "unexpected";
    });

    expect(service.tryVerifyQuizAnswersToken("token-123")).toEqual({
      ok: false,
      error: "Invalid or expired token",
    });
  });
});
