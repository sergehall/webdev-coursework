// src/tokens/tokens.service.ts
import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import type { StringValue } from "ms";

export interface QuizAnswersTokenPayload {
  quizId: string;
}

function normalizeTtl(ttl: string | number): number | StringValue {
  if (typeof ttl === "number") return ttl;
  // "3600" -> 3600; "1h"/"30m" остаются строками (StringValue)
  return /^\d+$/.test(ttl) ? Number(ttl) : (ttl as unknown as StringValue);
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

    const options: JwtSignOptions | undefined =
      overrideTtl !== undefined
        ? { expiresIn: normalizeTtl(overrideTtl) }
        : undefined;

    return this.jwt.sign(payload, options);
  }

  verifyQuizAnswersToken(token: string): QuizAnswersTokenPayload {
    return this.jwt.verify<QuizAnswersTokenPayload>(token);
  }

  tryVerifyQuizAnswersToken(
    token: string
  ):
    | { ok: true; payload: QuizAnswersTokenPayload }
    | { ok: false; error: string } {
    try {
      const payload = this.verifyQuizAnswersToken(token);
      return { ok: true, payload };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Invalid or expired token";
      return { ok: false, error: message };
    }
  }
}
