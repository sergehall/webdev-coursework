import {
  ArgumentsHost,
  Catch,
  HttpException,
  Logger,
  type ExceptionFilter,
} from "@nestjs/common";
import type { Response } from "express";
@Catch()
export class AccountErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(AccountErrorFilter.name);
  catch(error: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    if (error instanceof HttpException) {
      const body = error.getResponse();
      response
        .status(error.getStatus())
        .json(
          typeof body === "string"
            ? { message: body, statusCode: error.getStatus() }
            : body
        );
      return;
    }
    // Database/provider errors can carry SQL parameters and recipient details.
    this.logger.error(
      "Account request failed; private error details suppressed"
    );
    response.status(503).json({
      message: "The account service is temporarily unavailable",
      statusCode: 503,
    });
  }
}
