import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseFilters,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AnalyticsService } from "../../analytics/analytics.service";
import { AnalyticsStore } from "../../analytics/analytics.store";
import { AccountErrorFilter } from "../account-error.filter";
import { MfaEnrollmentDto, MfaProofDto } from "./mfa.dto";
import { MfaService } from "./mfa.service";

@UseFilters(AccountErrorFilter)
@Controller(["api/account/mfa", "api/owner/mfa"])
export class MfaController {
  constructor(
    private readonly auth: AnalyticsService,
    private readonly mfa: MfaService,
    private readonly store: AnalyticsStore
  ) {}
  private options() {
    return {
      httpOnly: true,
      secure: this.auth.secureCookie,
      sameSite: "strict" as const,
      path: "/api",
    };
  }
  private address(req: Request) {
    return this.auth.digest(req.ip ?? "unknown");
  }
  private async signed(req: Request, action: string) {
    this.auth.assertOrigin(req);
    const session = await this.auth.authorize(
      req,
      `account.mfa.${action}`,
      false
    );
    await this.auth.rateLimit(`mfa:${session.accountId}:${action}`, 10, 900);
    const account = await this.store.account(session.accountId);
    if (!account) throw new UnauthorizedException();
    return { session, account };
  }
  @Get("status")
  async status(@Req() req: Request) {
    const session = await this.auth.authorize(req, "account.mfa.status", false);
    return this.mfa.status(session.accountId, session.mfaVerifiedAt);
  }
  @Post("enroll")
  @HttpCode(200)
  async enroll(@Req() req: Request) {
    const { session, account } = await this.signed(req, "enroll");
    return this.mfa.enroll(account, session.issuedAt);
  }
  @Post("cancel")
  @HttpCode(200)
  async cancel(@Req() req: Request) {
    const { account } = await this.signed(req, "cancel");
    await this.mfa.cancel(account);
    return { mfa: await this.mfa.status(account.id) };
  }
  @Post("verify-enrollment")
  @HttpCode(200)
  async verifyEnrollment(
    @Req() req: Request,
    @Body() dto: MfaEnrollmentDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { account } = await this.signed(req, "verify-enrollment");
    const result = await this.mfa.verifyEnrollment(
      account,
      dto.enrollmentId,
      dto.code
    );
    const updated = await this.store.account(account.id);
    if (!updated || updated.revision !== result.revision)
      throw new UnauthorizedException("Sign in again");
    const verifiedAt = new Date().toISOString();
    const token = await this.auth.createSession(updated, verifiedAt);
    res.cookie(this.auth.cookieName, token, {
      ...this.options(),
      maxAge: 3600000,
    });
    return {
      mfa: await this.mfa.status(account.id, verifiedAt),
      recoveryCodes: result.recoveryCodes,
    };
  }
  @Post("disable")
  @HttpCode(200)
  async disable(
    @Req() req: Request,
    @Body() dto: MfaProofDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { account } = await this.signed(req, "disable");
    await this.mfa.action(account, dto.code, "disable");
    res.clearCookie(this.auth.cookieName, this.options());
    res.clearCookie(this.auth.mfaCookieName, this.options());
    return { authenticated: false };
  }
  @Post("recovery-codes")
  @HttpCode(200)
  async regenerate(@Req() req: Request, @Body() dto: MfaProofDto) {
    const { account } = await this.signed(req, "recovery-codes");
    const result = await this.mfa.action(account, dto.code, "regenerate");
    await this.auth.markMfaVerified(req, result.verifiedAt);
    return {
      mfa: await this.mfa.status(account.id, result.verifiedAt),
      recoveryCodes: result.recoveryCodes,
    };
  }
  @Post("step-up")
  @HttpCode(200)
  async stepUp(@Req() req: Request, @Body() dto: MfaProofDto) {
    const { account } = await this.signed(req, "step-up");
    const result = await this.mfa.action(account, dto.code, "step-up");
    await this.auth.markMfaVerified(req, result.verifiedAt);
    return { mfa: await this.mfa.status(account.id, result.verifiedAt) };
  }
  @Get("challenge")
  async challenge(@Req() req: Request) {
    await this.auth.rateLimit(`mfa-pending:${this.address(req)}`, 30, 60);
    return this.mfa.challengeStatus(req.cookies?.[this.auth.mfaCookieName]);
  }
  @Post("challenge")
  @HttpCode(200)
  async verifyChallenge(
    @Req() req: Request,
    @Body() dto: MfaProofDto,
    @Res({ passthrough: true }) res: Response
  ) {
    this.auth.assertOrigin(req);
    await this.auth.rateLimit(`mfa-login:${this.address(req)}`, 30, 900);
    const result = await this.mfa.verifyChallenge(
      req.cookies?.[this.auth.mfaCookieName],
      dto.code
    );
    const account = await this.store.account(result.accountId);
    if (!account || account.revision !== result.revision)
      throw new UnauthorizedException("Sign in again");
    const token = await this.auth.createSession(account, result.verifiedAt);
    res.clearCookie(this.auth.mfaCookieName, this.options());
    res.cookie(this.auth.cookieName, token, {
      ...this.options(),
      maxAge: 3600000,
    });
    return { authenticated: true };
  }
  @Post("cancel-challenge")
  @HttpCode(200)
  async cancelChallenge(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    this.auth.assertOrigin(req);
    await this.mfa.cancelChallenge(req.cookies?.[this.auth.mfaCookieName]);
    res.clearCookie(this.auth.mfaCookieName, this.options());
    return { authenticated: false };
  }
}
