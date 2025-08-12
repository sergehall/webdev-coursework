// src/guards/admin-api-key.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  private readonly headerName = "x-admin-key";
  private readonly adminKey = process.env.ADMIN_API_KEY;

  canActivate(context: ExecutionContext): boolean {
    if (!this.adminKey) {
      throw new InternalServerErrorException("ADMIN_API_KEY is not configured");
    }
    const req = context.switchToHttp().getRequest<Request>();
    const key = req.headers[this.headerName] as string | undefined;
    if (!key || key !== this.adminKey) {
      throw new UnauthorizedException("Invalid admin key");
    }
    return true;
  }
}
