import { ApiTags } from "@nestjs/swagger";
import { ApiContract } from "../swagger/api-contract.decorator";
import {
  AcceptedDto,
  SavedDto,
  VerifiedEmailDto,
} from "./account-response.dto";
import { AccountErrorFilter } from "./account-error.filter";
import { UseFilters } from "@nestjs/common";
import { Body, Controller, HttpCode, Post, Req } from "@nestjs/common";
import type { Request } from "express";
import { AccountService } from "./account.service";
import { EmailDto, RegisterDto, ResetDto, TokenDto } from "./account.dto";
@UseFilters(AccountErrorFilter)
@ApiTags("Accounts \u2014 public")
@Controller("api/account")
export class AccountController {
  constructor(private readonly accounts: AccountService) {}
  @Post("register")
  @HttpCode(202)
  @ApiContract(
    "Register an email/password account",
    "Accepts registration without revealing existing identities. Verification email is queued; delivery is asynchronous. Requires a trusted Origin. Public-auth IP/global and per-email limits apply.",
    AcceptedDto,
    { status: 202 }
  )
  async register(@Req() req: Request, @Body() dto: RegisterDto) {
    await this.accounts.register(req, dto);
    return { accepted: true };
  }
  @Post("resend-verification")
  @HttpCode(202)
  @ApiContract(
    "Resend verification email",
    "Accepts the request without account enumeration. Requires a trusted Origin; per-email delivery limits apply.",
    AcceptedDto,
    { status: 202 }
  )
  async resend(@Req() req: Request, @Body() dto: EmailDto) {
    await this.accounts.requestEmail(req, dto.email, "verify");
    return { accepted: true };
  }
  @Post("forgot-password")
  @HttpCode(202)
  @ApiContract(
    "Request password reset email",
    "Accepts the request without revealing whether an email is registered. Requires a trusted Origin; mail delivery is asynchronous.",
    AcceptedDto,
    { status: 202 }
  )
  async forgot(@Req() req: Request, @Body() dto: EmailDto) {
    await this.accounts.requestEmail(req, dto.email, "reset");
    return { accepted: true };
  }
  @Post("verify-email")
  @HttpCode(200)
  @ApiContract(
    "Verify an email link",
    "Consumes a single-use email token. Provider-email confirmation can revoke existing sessions and require sign-in. Requires a trusted Origin.",
    VerifiedEmailDto,
    {}
  )
  async verify(@Req() req: Request, @Body() dto: TokenDto) {
    const result = await this.accounts.consume(req, dto.token, "verify");
    return { verified: true, ...result };
  }
  @Post("reset-password")
  @HttpCode(200)
  @ApiContract(
    "Reset password using an email link",
    "Consumes a single-use reset token, changes password and revokes existing sessions. Requires a trusted Origin.",
    SavedDto,
    {}
  )
  async reset(@Req() req: Request, @Body() dto: ResetDto) {
    await this.accounts.consume(req, dto.token, "reset", dto.password);
    return { saved: true };
  }
}
