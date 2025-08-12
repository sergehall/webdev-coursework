// src/tokens/tokens.service.ts
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export interface QuizAnswersTokenPayload {
  quizId: string;
}

@Injectable()
export class TokensService {
  constructor(private readonly jwt: JwtService) {}

  /**
   * Issue a short-lived token bound to a specific quizId.
   * TTL, issuer, audience, and algorithm are configured in JwtModule.registerAsync.
   *
   * @param quizId - Target quiz identifier the token is bound to.
   * @param overrideTtl - Optional per-call TTL override (e.g., '30s' | 30).
   * @returns Signed JWT string.
   */
  issueQuizAnswersToken(quizId: string, overrideTtl?: string | number): string {
    const payload: QuizAnswersTokenPayload = { quizId };
    const options = overrideTtl ? { expiresIn: overrideTtl } : undefined;

    // Optionally add subject: { subject: quizId }
    return this.jwt.sign(payload, options);
  }

  /**
   * Verify token validity and return decoded payload.
   * Throws on invalid signature or expiration.
   *
   * @param token - JWT string to verify.
   * @returns Decoded payload (quizId).
   */
  verifyQuizAnswersToken(token: string): QuizAnswersTokenPayload {
    return this.jwt.verify<QuizAnswersTokenPayload>(token);
  }

  /**
   * Non-throwing verification helper.
   * Useful for debugging or when you want a boolean-style result.
   *
   * @param token - JWT string to verify.
   * @returns { ok: true, payload } on success or { ok: false, error } on failure.
   */
  tryVerifyQuizAnswersToken(
    token: string
  ):
    | { ok: true; payload: QuizAnswersTokenPayload }
    | { ok: false; error: string } {
    try {
      const payload = this.verifyQuizAnswersToken(token);
      return { ok: true, payload };
    } catch (e: any) {
      return { ok: false, error: e?.message ?? "Invalid token" };
    }
  }
}
