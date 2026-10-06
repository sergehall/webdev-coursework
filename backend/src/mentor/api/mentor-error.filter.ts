import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { randomUUID } from "crypto";
import type { Request, Response } from "express";

const codes: Record<number, string> = {
  400: "INVALID_INPUT",
  401: "SIGN_IN_REQUIRED",
  403: "ORIGIN_REJECTED",
  404: "NOT_FOUND",
  409: "VERSION_CONFLICT",
  413: "MESSAGE_TOO_LARGE",
  429: "USER_LIMIT_REACHED",
  503: "STORAGE_UNAVAILABLE",
};
const messages: Record<number, string> = {
  400: "Check your input and try again.",
  401: "Sign in to continue.",
  403: "This request is not allowed.",
  404: "This item is not available.",
  409: "This changed in another tab. Reload and try again.",
  413: "The message is too long.",
  429: "Too many requests. Wait a moment and try again.",
  503: "The mentor workspace is temporarily unavailable.",
};
@Catch()
export class MentorErrorFilter implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const status = error instanceof HttpException ? error.getStatus() : 503;
    const publicStatus = codes[status] ? status : 503;
    const exceptionBody =
      error instanceof HttpException ? error.getResponse() : null;
    const explicitCode =
      typeof exceptionBody === "object" &&
      exceptionBody !== null &&
      "code" in exceptionBody &&
      exceptionBody.code === "GENERATION_DISABLED"
        ? "GENERATION_DISABLED"
        : null;
    const suppliedId = request.get("x-request-id");
    const requestId =
      suppliedId && /^[A-Za-z0-9_-]{1,80}$/.test(suppliedId)
        ? suppliedId
        : randomUUID();
    response.setHeader("Cache-Control", "no-store, private");
    response.status(publicStatus).json({
      code: explicitCode ?? codes[publicStatus],
      message: explicitCode
        ? "Mentor generation is not enabled."
        : messages[publicStatus],
      requestId,
    });
  }
}
