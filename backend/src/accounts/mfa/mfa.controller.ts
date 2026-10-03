import { ApiTags } from "@nestjs/swagger";
import { ApiContract } from "../../swagger/api-contract.decorator";
import { SignedInDto, SignedOutDto } from "../account-response.dto";
import {
  MfaStatusDto,
  MfaEnrollmentResponseDto,
  MfaResponseDto,
  MfaRecoveryResponseDto,
  MfaChallengeResponseDto,
} from "./mfa-response.dto";
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
import { AccountStore } from "../store/account.store";
import { AccountErrorFilter } from "../account-error.filter";
import { MfaEnrollmentDto, MfaProofDto } from "./mfa.dto";
import { MfaService } from "./mfa.service";

@UseFilters(AccountErrorFilter)
@ApiTags("Account MFA")
@Controller(["api/account/mfa", "api/owner/mfa"])
export class MfaController {
  constructor(
    private readonly auth: AnalyticsService,
    private readonly mfa: MfaService,
    private readonly store: AccountStore
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
  @ApiContract(
    "Get authenticator status",
    "Requires an active account session. Returns enrollment state and remaining recovery-code count, never stored secrets.",
    MfaStatusDto,
    { auth: "session" }
  )
  async status(@Req() req: Request) {
    const session = await this.auth.authorize(req, "account.mfa.status", false);
    return this.mfa.status(session.accountId, session.mfaVerifiedAt);
  }
  @Post("enroll")
  @HttpCode(200)
  @ApiContract(
    "Start authenticator enrollment",
    "Requires an active session, trusted Origin and recent sign-in. Returns a private enrollment secret/URI valid for ten minutes. Render QR locally and never log enrollment data.",
    MfaEnrollmentResponseDto,
    { auth: "session", conflict: true }
  )
  async enroll(@Req() req: Request) {
    const { session, account } = await this.signed(req, "enroll");
    return this.mfa.enroll(account, session.issuedAt);
  }
  @Post("cancel")
  @HttpCode(200)
  @ApiContract(
    "Cancel pending authenticator enrollment",
    "Requires an active session and trusted Origin. Cancels a pending enrollment without disabling a verified authenticator.",
    MfaResponseDto,
    { auth: "session" }
  )
  async cancel(@Req() req: Request) {
    const { account } = await this.signed(req, "cancel");
    await this.mfa.cancel(account);
    return { mfa: await this.mfa.status(account.id) };
  }
  @Post("verify-enrollment")
  @HttpCode(200)
  @ApiContract(
    "Verify authenticator enrollment",
    "Requires an active session, trusted Origin and a six-digit authenticator code. Returns recovery codes once and replaces the session cookie; existing sessions are invalidated.",
    MfaRecoveryResponseDto,
    { auth: "session" }
  )
  async verifyEnrollment(
    @Req() req: Request,
    @Body() dto: MfaEnrollmentDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { session, account } = await this.signed(req, "verify-enrollment");
    const result = await this.mfa.verifyEnrollment(
      account,
      dto.enrollmentId,
      dto.code
    );
    const updated = await this.store.account(account.id);
    if (!updated || updated.revision !== result.revision)
      throw new UnauthorizedException("Sign in again");
    const verifiedAt = new Date().toISOString();
    const token = await this.auth.createSession(updated, verifiedAt, {
      req,
      method: session.authMethod,
    });
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
  @ApiContract(
    "Disable authenticator verification",
    "Requires an active session, trusted Origin and valid authenticator/recovery proof. Revokes sessions and clears authentication cookies.",
    SignedOutDto,
    { auth: "session" }
  )
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
  @ApiContract(
    "Replace recovery codes",
    "Requires an active session, trusted Origin and valid proof. Returns new codes once, invalidates old codes and refreshes MFA verification.",
    MfaRecoveryResponseDto,
    { auth: "session" }
  )
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
  @ApiContract(
    "Refresh MFA verification for sensitive actions",
    "Requires an active session, trusted Origin and valid proof. Refreshes the five-minute verification window.",
    MfaResponseDto,
    { auth: "session" }
  )
  async stepUp(@Req() req: Request, @Body() dto: MfaProofDto) {
    const { account } = await this.signed(req, "step-up");
    const result = await this.mfa.action(account, dto.code, "step-up");
    await this.auth.markMfaVerified(req, result.verifiedAt);
    return { mfa: await this.mfa.status(account.id, result.verifiedAt) };
  }
  @Get("challenge")
  @ApiContract(
    "Get pending sign-in challenge expiry",
    "Requires the short-lived MFA challenge cookie, not a full account session. Challenge expires after five minutes.",
    MfaChallengeResponseDto,
    { auth: "challenge" }
  )
  async challenge(@Req() req: Request) {
    await this.auth.rateLimit(`mfa-pending:${this.address(req)}`, 30, 60);
    return this.mfa.challengeStatus(req.cookies?.[this.auth.mfaCookieName]);
  }
  @Post("challenge")
  @HttpCode(200)
  @ApiContract(
    "Complete an MFA sign-in challenge",
    "Requires the challenge cookie, trusted Origin and valid proof. At most five failed proofs per challenge. Consumes the challenge and establishes the account session.",
    SignedInDto,
    { auth: "challenge" }
  )
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
    const token = await this.auth.createSession(account, result.verifiedAt, {
      req,
      method: result.authMethod,
    });
    res.clearCookie(this.auth.mfaCookieName, this.options());
    res.cookie(this.auth.cookieName, token, {
      ...this.options(),
      maxAge: 3600000,
    });
    return { authenticated: true };
  }
  @Post("cancel-challenge")
  @HttpCode(200)
  @ApiContract(
    "Cancel an MFA sign-in challenge",
    "Requires a trusted Origin. Idempotently consumes any pending challenge and clears its cookie; no challenge cookie is required.",
    SignedOutDto,
    {}
  )
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
