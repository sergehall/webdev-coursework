import {
  ForbiddenException,
  HttpException,
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";
import { RequestThrottleService } from "./request-throttle.service";

@Injectable()
export class ApiAbuseGuard implements CanActivate {
  private readonly checked = new WeakSet<Request>();
  private readonly origins: string[];
  constructor(
    private readonly throttle: RequestThrottleService,
    config: ConfigService
  ) {
    this.origins = [
      config.get<string>("ALLOWED_ORIGINS"),
      config.get<string>("OWNER_ALLOWED_ORIGINS"),
    ]
      .filter(Boolean)
      .join(",")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== "http") return true;
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    return this.protect(req, res);
  }

  async protect(req: Request, res: Response): Promise<boolean> {
    if (this.checked.has(req)) return true;
    // Shared buckets across endpoints and /account and /owner aliases.
    const path = req.path.toLowerCase();
    if (
      !/^\/(?:api|quizzes|tokens)(?:\/|$)/.test(path) ||
      req.method === "OPTIONS"
    )
      return true;
    const address = req.ip ?? req.socket.remoteAddress ?? "unknown";
    const write = !["GET", "HEAD"].includes(req.method);
    await this.check(address, "burst", 20, 1, res);
    await this.check(address, "api", 120, 60, res);
    if (write) await this.check(address, "write", 30, 60, res);
    if (
      /^\/tokens(?:\/|$)/.test(path) ||
      /\/(?:login|register|resend-verification|forgot-password|reset-password|verify-email|password|revoke-sessions|mfa|providers|github)(?:\/|$)/.test(
        path
      )
    ) {
      await this.check(address, "sensitive", 10, 60, res);
    }
    const origin = req.get("origin");
    if (
      write &&
      ((origin && this.origins.length > 0 && !this.origins.includes(origin)) ||
        (req.get("sec-fetch-site") === "cross-site" &&
          (!origin || !this.origins.includes(origin))))
    ) {
      throw new ForbiddenException("Untrusted request origin");
    }
    this.checked.add(req);
    return true;
  }

  private async check(
    address: string,
    bucket: string,
    limit: number,
    seconds: number,
    res: Response
  ): Promise<void> {
    const result = await this.throttle.consume(address, bucket, limit, seconds);
    if (result.count > limit) {
      res.setHeader("Retry-After", String(result.retryAfter));
      res.setHeader("Cache-Control", "no-store");
      throw new HttpException(
        {
          statusCode: 429,
          message: "Too many requests. Try again later.",
          error: "Too Many Requests",
        },
        429
      );
    }
  }
}
