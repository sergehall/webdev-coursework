import { AccountErrorFilter } from "../accounts/account-error.filter";
import { UseFilters } from "@nestjs/common";
import {
  BadRequestException,
  ServiceUnavailableException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";
import {
  AuditQueryDto,
  AccountRoleDto,
  OwnerLoginDto,
  OwnerPasswordDto,
  OwnerPreferencesDto,
  OwnerProfileDto,
  QrEventDto,
} from "./analytics.dto";

@UseFilters(AccountErrorFilter)
@Controller("api/analytics")
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Post("qr-events")
  @HttpCode(202)
  async ingest(@Req() req: Request, @Body() dto: QrEventDto) {
    await this.analytics.ingest(req, dto);
    return { accepted: true };
  }
}

@UseFilters(AccountErrorFilter)
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
  async githubStart(@Req() req: Request, @Res() res: Response) {
    const { state, url } = await this.analytics.githubStart(req);
    res.cookie(this.analytics.githubCookieName, state, {
      ...this.githubCookieOptions(),
      maxAge: 600000,
    });
    res.redirect(303, url);
  }

  @Get("github/callback")
  async githubCallback(@Req() req: Request, @Res() res: Response) {
    if (!this.analytics.loginOptions().githubEnabled)
      throw new ServiceUnavailableException("GitHub sign-in is not configured");
    res.clearCookie(
      this.analytics.githubCookieName,
      this.githubCookieOptions()
    );
    try {
      const token = await this.analytics.githubCallback(req);
      res.cookie(this.analytics.cookieName, token, {
        ...this.cookieOptions(),
        maxAge: 3600000,
      });
      res.redirect(303, `${this.analytics.frontendOrigin}/account/overview`);
    } catch {
      res.redirect(
        303,
        `${this.analytics.frontendOrigin}/account/login?error=github`
      );
    }
  }

  @Get("accounts")
  accounts(@Req() req: Request) {
    return this.analytics.accounts(req);
  }
  @Put("accounts/:id/role")
  async accountRole(
    @Req() req: Request,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() dto: AccountRoleDto
  ) {
    await this.analytics.accountRole(req, id, dto.role);
    return { saved: true };
  }

  @Get("audit")
  audit(@Req() req: Request, @Query() query: AuditQueryDto) {
    return this.analytics.audits(req, query);
  }

  @Post("login")
  @HttpCode(200)
  async login(
    @Req() req: Request,
    @Body() dto: OwnerLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.analytics.login(req, dto.password, dto.identity);
    res.cookie(this.analytics.cookieName, token, {
      ...this.cookieOptions(),
      maxAge: 60 * 60 * 1000,
    });
    return { authenticated: true };
  }

  @Get("session")
  session(@Req() req: Request) {
    return this.analytics.session(req);
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.analytics.logout(req);
    res.clearCookie(this.analytics.cookieName, this.cookieOptions());
    return { authenticated: false };
  }

  @Get("analytics")
  dashboard(@Req() req: Request, @Query("days") raw?: string) {
    const days = raw === undefined ? 30 : Number(raw);
    if (![7, 30, 90].includes(days))
      throw new BadRequestException("Choose 7, 30, or 90 days");
    return this.analytics.dashboard(req, days);
  }

  @Put("profile")
  async profile(@Req() req: Request, @Body() dto: OwnerProfileDto) {
    await this.analytics.profile(req, dto.displayName);
    return { saved: true };
  }

  @Put("preferences")
  async preferences(@Req() req: Request, @Body() dto: OwnerPreferencesDto) {
    await this.analytics.preferences(req, dto);
    return { saved: true };
  }

  @Post("password")
  @HttpCode(200)
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
  async revokeSessions(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.analytics.revokeSessions(req);
    res.clearCookie(this.analytics.cookieName, this.cookieOptions());
    return { authenticated: false };
  }
}
