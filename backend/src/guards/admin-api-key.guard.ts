// src/guards/admin-api-key.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { timingSafeEqual } from "crypto";

@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  private readonly headerName = "x-admin-key";
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const adminKey = this.configService.get<string>("ADMIN_API_KEY");

    const req = context.switchToHttp().getRequest<Request>();
    const rawHeader = req.headers[this.headerName];
    const key = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader;

    if (!adminKey) {
      throw new InternalServerErrorException("ADMIN_API_KEY is not configured");
    }
    if (typeof key !== "string" || key.length === 0) {
      throw new UnauthorizedException("Invalid admin key");
    }

    const expected = Buffer.from(adminKey, "utf8");
    const received = Buffer.from(key, "utf8");
    const isMatch =
      expected.length === received.length &&
      timingSafeEqual(expected, received);

    if (!isMatch) {
      throw new UnauthorizedException("Invalid admin key");
    }
    return true;
  }
}
