import { ConfigService } from "@nestjs/config";
import { JwtService, type JwtModuleOptions } from "@nestjs/jwt";
import { QuizAnswersJwtConfig } from "../../src/tokens/config/quiz-answers-jwt.config";

describe("practice JWT configuration", () => {
  const secret = "test-signing-secret-at-least-thirty-two-characters";
  async function options(
    values: Record<string, string> = {}
  ): Promise<JwtModuleOptions> {
    return QuizAnswersJwtConfig.getAsyncConfig().useFactory!(
      new ConfigService({
        NODE_ENV: "test",
        QUIZ_ANSWERS_JWT_SECRET: secret,
        QUIZ_ANSWERS_JWT_TTL: "",
        QUIZ_JWT_ISSUER: "test-api",
        QUIZ_JWT_AUDIENCE: "test-client",
        ...values,
      })
    );
  }
  it("defaults to an expiring token and rejects expired claims", async () => {
    const jwt = new JwtService(await options());
    const token = jwt.sign({ quizId: "practice-1" });
    const claims = jwt.verify<{ exp: number; iat: number }>(token);
    expect(claims.exp - claims.iat).toBe(300);
    expect(() =>
      jwt.verify(jwt.sign({ quizId: "practice-1" }, { expiresIn: -1 }))
    ).toThrow("jwt expired");
  });
  it.each(["0", "-1", "2h", "7d", "invalid"])(
    "rejects invalid or excessive TTL %s",
    async (ttl) => {
      await expect(options({ QUIZ_ANSWERS_JWT_TTL: ttl })).rejects.toThrow(
        "QUIZ_ANSWERS_JWT_TTL"
      );
    }
  );
  it("validates configured issuer and audience and only permits HS256", async () => {
    const jwt = new JwtService(await options({ QUIZ_ANSWERS_JWT_TTL: "1h" }));
    const wrong = new JwtService({
      secret,
      signOptions: {
        issuer: "other-api",
        audience: "test-client",
        expiresIn: 300,
      },
    });
    expect(() => jwt.verify(wrong.sign({ quizId: "practice-1" }))).toThrow(
      "jwt issuer invalid"
    );
    expect(() =>
      jwt.verify(
        jwt.sign({ quizId: "practice-1" }, { audience: "other-client" })
      )
    ).toThrow("jwt audience invalid");
    expect(() =>
      jwt.verify(jwt.sign({ quizId: "practice-1" }, { algorithm: "HS384" }))
    ).toThrow("invalid algorithm");
  });
  it("requires a strong production signing secret", async () => {
    await expect(
      options({ NODE_ENV: "production", QUIZ_ANSWERS_JWT_SECRET: "short" })
    ).rejects.toThrow("at least 32 characters");
  });
  it("rejects legacy tokens older than one hour even without an expiry claim", async () => {
    const verifier = new JwtService(await options());
    const legacy = new JwtService({
      secret,
      signOptions: { issuer: "test-api", audience: "test-client" },
    });
    const token = legacy.sign({
      quizId: "practice-1",
      iat: Math.floor(Date.now() / 1000) - 3601,
    });
    expect(() => verifier.verify(token)).toThrow("maxAge exceeded");
  });
});
