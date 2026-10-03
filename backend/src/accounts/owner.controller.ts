import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { ApiContract, ApiErrors } from "../swagger/api-contract.decorator";
import {
  SavedDto,
  LoginOptionsDto,
  ProviderRedirectDto,
  AdminAccountDto,
  LoginResponseDto,
  AccountSessionResponseDto,
  SessionsPageDto,
  SignedOutDto,
} from "./account-response.dto";
import {
  AnalyticsDashboardDto,
  AuditPageDto,
} from "../analytics/analytics-response.dto";
import { AccountErrorFilter } from "./account-error.filter";
import { GithubStartDto } from "./account.dto";
import { UseFilters } from "@nestjs/common";
import {
  BadRequestException,
  ServiceUnavailableException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Put,
  Query,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AnalyticsService } from "../analytics/analytics.service";
import {
  AuditQueryDto,
  SessionQueryDto,
  AccountRoleDto,
  OwnerLoginDto,
  OwnerPasswordDto,
  OwnerPreferencesDto,
  OwnerProfileDto,
} from "./account-access.dto";

@UseFilters(AccountErrorFilter)
@ApiTags("Account sessions")
@Controller(["api/owner", "api/account"])
export class OwnerController {
  constructor(private readonly analytics: AnalyticsService) {}

  private cookieOptions() {
    return {
      httpOnly: true,
      secure: this.analytics.secureCookie,
      sameSite: "strict" as const,
      path: "/api",
    };
  }

  @Get("login-options")
  @ApiContract(
    "Get available sign-in methods",
    "Public configuration for email registration, GitHub sign-in and required human verification. Includes only the public Turnstile site key; no provider secrets.",
    LoginOptionsDto,
    {}
  )
  // Keep browser configuration on the existing account API, separate from provider verification.
  loginOptions() {
    return this.analytics.loginOptions();
  }

  private githubCookieOptions() {
    return {
      httpOnly: true,
      secure: this.analytics.secureCookie,
      sameSite: "lax" as const,
      path: "/api",
    };
  }

  @Get("github/start")
  @ApiOperation({
    summary: "Start GitHub sign-in (legacy navigation)",
    deprecated: true,
    description:
      "Available only when Turnstile is unconfigured. Configured environments reject direct navigation; use POST with a single-use token. Disabled providers return 503.",
  })
  @ApiResponse({
    status: 303,
    description: "Browser redirect.",
    headers: {
      Location: {
        description: "Provider authorization or frontend account page.",
        schema: { type: "string", format: "uri" },
      },
    },
  })
  @ApiErrors(400, 403, 429, 503)
  async githubStart(@Req() req: Request, @Res() res: Response) {
    const { state, url } = await this.analytics.githubStart(req);
    res.cookie(this.analytics.githubCookieName, state, {
      ...this.githubCookieOptions(),
      maxAge: 600000,
    });
    res.redirect(303, url);
  }

  @Post("github/start")
  @HttpCode(200)
  @ApiContract(
    "Start verified GitHub sign-in or registration",
    "Requires trusted Origin and an action-bound Turnstile token when configured. Sets a ten-minute HttpOnly OAuth state cookie after verification and returns the GitHub authorization URL. Existing rate limits, PKCE and callback MFA remain enforced.",
    ProviderRedirectDto,
    {}
  )
  async githubStartVerified(
    @Req() req: Request,
    @Body() dto: GithubStartDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { state, url } = await this.analytics.githubStart(req, false, dto);
    res.cookie(this.analytics.githubCookieName, state, {
      ...this.githubCookieOptions(),
      maxAge: 600000,
    });
    return { url };
  }

  @Post("providers/github/connect")
  @HttpCode(200)
  @ApiContract(
    "Start connecting GitHub to this account",
    "Requires an active session, recent sign-in, fresh MFA when enabled and trusted Origin. Returns provider URL and sets an HttpOnly OAuth state cookie. Connection is bound to the originating session.",
    ProviderRedirectDto,
    { auth: "session" }
  )
  async githubConnect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const { state, url } = await this.analytics.githubStart(req, true);
    res.cookie(this.analytics.githubCookieName, state, {
      ...this.githubCookieOptions(),
      maxAge: 600000,
    });
    return { url };
  }

  @Get("github/callback")
  @ApiOperation({
    summary: "Complete GitHub authorization",
    description:
      "Validates and consumes OAuth state once. Establishes a session, starts MFA, completes provider linking or redirects to a safe error page. Browser navigation only.",
  })
  @ApiResponse({
    status: 303,
    description: "Browser redirect.",
    headers: {
      Location: {
        description: "Provider authorization or frontend account page.",
        schema: { type: "string", format: "uri" },
      },
    },
  })
  @ApiErrors(400, 403, 429, 503)
  @ApiQuery({
    name: "code",
    required: false,
    type: String,
    description: "OAuth authorization code supplied by GitHub.",
  })
  @ApiQuery({
    name: "state",
    required: false,
    type: String,
    description:
      "Single-use state supplied by GitHub; must match the OAuth state cookie.",
  })
  @ApiQuery({
    name: "error",
    required: false,
    type: String,
    description: "Provider authorization failure.",
  })
  async githubCallback(@Req() req: Request, @Res() res: Response) {
    if (!this.analytics.loginOptions().githubEnabled)
      throw new ServiceUnavailableException("GitHub sign-in is not configured");
    res.clearCookie(
      this.analytics.githubCookieName,
      this.githubCookieOptions()
    );
    try {
      const result = await this.analytics.githubCallback(req);
      if ("linked" in result) {
        res.clearCookie(this.analytics.cookieName, this.cookieOptions());
        res.clearCookie(this.analytics.mfaCookieName, this.cookieOptions());
        res.redirect(
          303,
          `${this.analytics.frontendOrigin}/account/login?notice=github-linked`
        );
        return;
      }
      if (result.mfaRequired) {
        res.clearCookie(this.analytics.cookieName, this.cookieOptions());
        res.cookie(this.analytics.mfaCookieName, result.challengeToken, {
          ...this.cookieOptions(),
          maxAge: 300000,
        });
        res.redirect(303, `${this.analytics.frontendOrigin}/account/mfa`);
        return;
      }
      res.clearCookie(this.analytics.mfaCookieName, this.cookieOptions());
      res.cookie(this.analytics.cookieName, result.token, {
        ...this.cookieOptions(),
        maxAge: 3600000,
      });
      res.redirect(303, `${this.analytics.frontendOrigin}/account/overview`);
    } catch (error) {
      const response =
        error instanceof HttpException ? error.getResponse() : null;
      if (
        typeof response === "object" &&
        response &&
        "code" in response &&
        response.code === "GITHUB_LINK_FAILED"
      ) {
        res.redirect(
          303,
          `${this.analytics.frontendOrigin}/account/security?providerError=github#providers`
        );
        return;
      }
      res.redirect(
        303,
        `${this.analytics.frontendOrigin}/account/login?error=github`
      );
    }
  }

  @Get("accounts")
  @ApiContract(
    "List accounts for primary administration",
    "Only the primary administrator with fresh MFA when enabled. Returns at most 100 accounts, newest first, with public administrative fields.",
    AdminAccountDto,
    { auth: "session", isArray: true }
  )
  @ApiTags("Administration")
  accounts(@Req() req: Request) {
    return this.analytics.accounts(req);
  }
  @Put("accounts/:id/role")
  @ApiContract(
    "Change an account role",
    "Only the primary administrator with fresh MFA when enabled. Requires trusted Origin. The primary administrator role is protected; role changes invalidate account sessions.",
    SavedDto,
    { auth: "session" }
  )
  @ApiParam({
    name: "id",
    format: "uuid",
    description: "Account UUID v4.",
    example: "ae2d9934-cf98-4d1a-9ce8-5150978b0b9c",
  })
  @ApiTags("Administration")
  async accountRole(
    @Req() req: Request,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() dto: AccountRoleDto
  ) {
    await this.analytics.accountRole(req, id, dto.role);
    return { saved: true };
  }

  @Get("audit")
  @ApiContract(
    "Read administrative security activity",
    "Administrator session and fresh MFA when enabled required. Cursor pagination with allowed group/result filters, ordered newest first.",
    AuditPageDto,
    { auth: "session" }
  )
  @ApiTags("Administration")
  audit(@Req() req: Request, @Query() query: AuditQueryDto) {
    return this.analytics.audits(req, query);
  }

  @Post("login")
  @HttpCode(200)
  @ApiContract(
    "Sign in with password",
    "Requires trusted Origin and a single-use account_login Turnstile token when configured. Password login is limited to five attempts per IP per 15 minutes plus a global budget. Sets an HttpOnly session cookie or a five-minute MFA challenge cookie.",
    LoginResponseDto,
    {}
  )
  async login(
    @Req() req: Request,
    @Body() dto: OwnerLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    // Both route aliases forward the token to the same rate-limited sign-in boundary.
    const result = await this.analytics.login(
      req,
      dto.password,
      dto.identity,
      dto.turnstileToken
    );
    if (result.mfaRequired) {
      res.clearCookie(this.analytics.cookieName, this.cookieOptions());
      res.cookie(this.analytics.mfaCookieName, result.challengeToken, {
        ...this.cookieOptions(),
        maxAge: 300000,
      });
      return { authenticated: false, mfaRequired: true };
    }
    res.cookie(this.analytics.cookieName, result.token, {
      ...this.cookieOptions(),
      maxAge: 60 * 60 * 1000,
    });
    res.clearCookie(this.analytics.mfaCookieName, this.cookieOptions());
    return { authenticated: true };
  }

  @Get("session")
  @ApiContract(
    "Get the current account profile and session",
    "Requires an active admin/client session. Returns safe profile and permission flags without the session token or internal account revision.",
    AccountSessionResponseDto,
    { auth: "session" }
  )
  session(@Req() req: Request) {
    return this.analytics.session(req);
  }

  @Get("sessions")
  @ApiContract(
    "List active sessions",
    "Requires an active account session. Returns up to five active sessions per page, newest first, with optional device and sign-in method filters. Identifies the current session without token hashes.",
    SessionsPageDto,
    { auth: "session" }
  )
  sessions(@Req() req: Request, @Query() query: SessionQueryDto) {
    return this.analytics.sessions(req, query);
  }

  @Post("logout")
  @HttpCode(200)
  @ApiContract(
    "Sign out the current session",
    "Requires an active account session and trusted Origin. Revokes the current session and clears the session cookie.",
    SignedOutDto,
    { auth: "session" }
  )
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.analytics.logout(req);
    res.clearCookie(this.analytics.cookieName, this.cookieOptions());
    return { authenticated: false };
  }

  @Get("analytics")
  @ApiContract(
    "Get aggregated anonymous QR reports",
    "Administrator session and fresh MFA when enabled required. Select 7, 30 or 90 UTC days; defaults to 30.",
    AnalyticsDashboardDto,
    { auth: "session" }
  )
  @ApiQuery({
    name: "days",
    required: false,
    enum: [7, 30, 90],
    schema: { type: "integer", enum: [7, 30, 90], default: 30 },
  })
  @ApiTags("Administration")
  dashboard(@Req() req: Request, @Query("days") raw?: string) {
    const days = raw === undefined ? 30 : Number(raw);
    if (![7, 30, 90].includes(days))
      throw new BadRequestException("Choose 7, 30, or 90 days");
    return this.analytics.dashboard(req, days);
  }

  @Put("profile")
  @ApiContract(
    "Update the current profile",
    "Requires an active session and trusted Origin. Username changes require fresh MFA when enabled.",
    SavedDto,
    { auth: "session", conflict: true }
  )
  async profile(@Req() req: Request, @Body() dto: OwnerProfileDto) {
    await this.analytics.profile(req, dto);
    return { saved: true };
  }

  @Put("preferences")
  @ApiContract(
    "Update account preferences",
    "Requires an active session and trusted Origin. Clients may change display preferences; report/activity defaults are administrator-only.",
    SavedDto,
    { auth: "session" }
  )
  async preferences(@Req() req: Request, @Body() dto: OwnerPreferencesDto) {
    await this.analytics.preferences(req, dto);
    return { saved: true };
  }

  @Post("password")
  @HttpCode(200)
  @ApiContract(
    "Change the current account password",
    "Requires an active session, current password, trusted Origin and fresh MFA when enabled. Revokes all sessions and clears the session cookie.",
    SignedOutDto,
    { auth: "session" }
  )
  async password(
    @Req() req: Request,
    @Body() dto: OwnerPasswordDto,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.analytics.changePassword(req, dto);
    res.clearCookie(this.analytics.cookieName, this.cookieOptions());
    return { authenticated: false };
  }

  @Post("revoke-sessions")
  @HttpCode(200)
  @ApiContract(
    "Revoke all account sessions",
    "Requires an active session, trusted Origin and fresh MFA when enabled. Revokes all account sessions including the current one and clears its cookie.",
    SignedOutDto,
    { auth: "session" }
  )
  async revokeSessions(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.analytics.revokeSessions(req);
    res.clearCookie(this.analytics.cookieName, this.cookieOptions());
    return { authenticated: false };
  }
}
