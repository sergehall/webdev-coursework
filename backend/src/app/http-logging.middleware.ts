import {
  HttpException,
  Injectable,
  Logger,
  NestMiddleware,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class HttpLoggingMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  // Middleware entry point
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    // Query parameters may contain anonymous client IDs or other bearer-like values.
    // Never log them, including for quiz and token routes.
    const path = originalUrl.split("?")[0];
    if (
      path.startsWith("/api/owner") ||
      path.startsWith("/api/account") ||
      path.startsWith("/api/mentor") ||
      path.startsWith("/api/analytics")
    ) {
      const started = Date.now();
      let finished = false;
      const safePath = () => {
        const route = req.route?.path;
        return path.startsWith("/api/mentor")
          ? typeof route === "string" && route.startsWith("/api/mentor")
            ? route
            : "/api/mentor/*"
          : path;
      };
      res.on("finish", () => {
        finished = true;
        this.logger.log(
          `${method} ${safePath()} ${res.statusCode}${path.startsWith("/api/mentor") ? ` ${Date.now() - started}ms` : ""}`
        );
      });
      if (path.startsWith("/api/mentor"))
        res.on("close", () => {
          if (!finished)
            this.logger.warn(
              `${method} ${safePath()} aborted ${Date.now() - started}ms`
            );
        });
      next();
      return;
    }
    const userAgent = req.get("user-agent") || "";
    const ip = req.ip ? req.ip : "";
    const started = Date.now();

    // Log request details when response finishes
    res.on("finish", () => {
      this.logRequest(ip, method, path, userAgent, res, Date.now() - started);
    });

    // Handle errors and log details
    res.on("error", (error) => {
      this.handleError(ip, method, path, userAgent, error);
    });

    // Move to the next middleware or route handler
    next();
  }

  // Log request details when response finishes
  private logRequest(
    ip: string,
    method: string,
    url: string,
    userAgent: string,
    res: Response,
    durationMs: number
  ) {
    const { statusCode } = res;
    const statusMessage = res.statusMessage ?? "";
    const contentLength = res.getHeader("content-length");
    const size = contentLength === undefined ? "unknown" : `${contentLength} B`;
    const clientIp = ip.replace(/^::ffff:/, "") || "unknown";
    const agent = JSON.stringify(userAgent || "unknown");
    const logMessage = `${method} ${url} -> ${statusCode} ${statusMessage} | ${durationMs} ms | size: ${size} | IP: ${clientIp} | agent: ${agent}`;
    this.logger.log(logMessage);
  }

  // Handle errors and log HTTP exceptions
  private handleError(
    ip: string,
    method: string,
    url: string,
    userAgent: string,
    error: unknown
  ) {
    if (error instanceof HttpException) {
      const statusCode = error.getStatus(); // Get status code from HttpException
      const message = error.message || "Internal server error"; // Get error message
      const logMessage = `${method} ${url} ${statusCode} - ${message} - ${userAgent} ${ip}`;
      this.logger.error(logMessage);
    }
  }
}
