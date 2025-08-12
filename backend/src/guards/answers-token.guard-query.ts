import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { createHash } from "crypto";

@Injectable()
export class AnswersTokenGuardQuery implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const quizId = request.params.quizId;
    const token = request.query.token as string;

    if (!quizId || !token) {
      throw new UnauthorizedException("Missing quizId or token");
    }

    const secret = this.configService.get<string>("QUIZ_SECRET_KEY");
    if (!secret) {
      throw new InternalServerErrorException(
        "QUIZ_SECRET_KEY is not defined in the environment"
      );
    }

    const expectedToken = createHash("sha256")
      .update(`${quizId}:${secret}`)
      .digest("hex");

    if (process.env.NODE_ENV === "development") {
      console.debug(
        `[Token Debug] quizId=${quizId}, token=${token}, expected=${expectedToken}`
      );
    }

    if (token !== expectedToken) {
      throw new UnauthorizedException("Invalid token");
    }

    return true;
  }
}
