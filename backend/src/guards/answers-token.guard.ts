// src/guards/answers-token.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import {
  QuizAnswersTokenPayload,
  TokensService,
} from "../tokens/service/tokens.service";

type RequestWithQuizAnswersPayload = Request & {
  quizAnswersTokenPayload?: QuizAnswersTokenPayload;
};

@Injectable()
export class AnswersTokenGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithQuizAnswersPayload>();

    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Missing or invalid Authorization header"
      );
    }

    const token = authHeader.substring(7).trim(); // remove "Bearer "

    let payload;
    try {
      payload = this.tokensService.verifyQuizAnswersToken(token);
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired token");
    }

    // Optional: extra safety check that token matches the quizId in route
    const quizIdFromRoute = request.params.quizId;
    if (payload.quizId !== quizIdFromRoute) {
      throw new UnauthorizedException("Token quizId mismatch");
    }

    // You could attach payload to request for later use in handlers
    request.quizAnswersTokenPayload = payload;

    return true;
  }
}
