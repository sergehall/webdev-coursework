import { AccountErrorFilter } from "./account-error.filter";
import { UseFilters } from "@nestjs/common";
import { Body, Controller, HttpCode, Post, Req } from "@nestjs/common";
import type { Request } from "express";
import { AccountService } from "./account.service";
import { EmailDto, RegisterDto, ResetDto, TokenDto } from "./account.dto";
@UseFilters(AccountErrorFilter)
@Controller("api/account")
export class AccountController {
  constructor(private readonly accounts: AccountService) {}
  @Post("register")
  @HttpCode(202)
  async register(@Req() req: Request, @Body() dto: RegisterDto) {
    await this.accounts.register(req, dto);
    return { accepted: true };
  }
  @Post("resend-verification")
  @HttpCode(202)
  async resend(@Req() req: Request, @Body() dto: EmailDto) {
    await this.accounts.requestEmail(req, dto.email, "verify");
    return { accepted: true };
  }
  @Post("forgot-password")
  @HttpCode(202)
  async forgot(@Req() req: Request, @Body() dto: EmailDto) {
    await this.accounts.requestEmail(req, dto.email, "reset");
    return { accepted: true };
  }
  @Post("verify-email")
  @HttpCode(200)
  async verify(@Req() req: Request, @Body() dto: TokenDto) {
    await this.accounts.consume(req, dto.token, "verify");
    return { verified: true };
  }
  @Post("reset-password")
  @HttpCode(200)
  async reset(@Req() req: Request, @Body() dto: ResetDto) {
    await this.accounts.consume(req, dto.token, "reset", dto.password);
    return { saved: true };
  }
}
