import { ApiTags } from "@nestjs/swagger";
import { ApiContract } from "../swagger/api-contract.decorator";
import {
  AcceptedDto,
  CancelledDto,
  ProviderStatusDto,
  SignedOutDto,
} from "./account-response.dto";
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpCode,
  UseFilters,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AccountProvidersService } from "./account-providers.service";
import { AccountErrorFilter } from "./account-error.filter";
import { EmailDto, SetupPasswordDto } from "./account.dto";
import { AnalyticsService } from "../analytics/analytics.service";

@UseFilters(AccountErrorFilter)
@ApiTags("Account providers")
@Controller("api/account/providers")
export class AccountProvidersController {
  constructor(
    private readonly providers: AccountProvidersService,
    private readonly auth: AnalyticsService
  ) {}
  @Get()
  @ApiContract(
    "Get provider availability and pending email",
    "Requires an active account session. Returns provider availability and any pending confirmation, without provider credentials.",
    ProviderStatusDto,
    { auth: "session" }
  )
  status(@Req() req: Request) {
    return this.providers.status(req);
  }
  @Post("email")
  @HttpCode(202)
  @ApiContract(
    "Request an additional sign-in email",
    "Requires an active session, trusted Origin, recent sign-in and fresh MFA when enabled. Queues confirmation without revealing occupied emails.",
    AcceptedDto,
    { auth: "session", status: 202 }
  )
  async email(@Req() req: Request, @Body() dto: EmailDto) {
    await this.providers.addEmail(req, dto.email);
    return { accepted: true };
  }
  @Post("email/cancel")
  @HttpCode(200)
  @ApiContract(
    "Cancel pending email confirmation",
    "Requires an active session, trusted Origin and fresh MFA when enabled. Invalidates pending email confirmations.",
    CancelledDto,
    { auth: "session" }
  )
  async cancel(@Req() req: Request) {
    await this.providers.cancelEmail(req);
    return { cancelled: true };
  }
  private clear(res: Response) {
    const options = {
      httpOnly: true,
      secure: this.auth.secureCookie,
      sameSite: "strict" as const,
      path: "/api",
    };
    res.clearCookie(this.auth.cookieName, options);
    res.clearCookie(this.auth.mfaCookieName, options);
  }
  @Post("github/disconnect")
  @HttpCode(200)
  @ApiContract(
    "Disconnect GitHub sign-in",
    "Requires recent sign-in, fresh MFA when enabled and trusted Origin. A verified password sign-in must remain. Revokes sessions and clears authentication cookies.",
    SignedOutDto,
    { auth: "session" }
  )
  async disconnect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.providers.disconnectGithub(req);
    this.clear(res);
    return { authenticated: false };
  }
  @Post("password")
  @HttpCode(200)
  @ApiContract(
    "Set up password sign-in",
    "Requires recent sign-in, fresh MFA when enabled, trusted Origin and a verified email. Revokes sessions and clears authentication cookies.",
    SignedOutDto,
    { auth: "session" }
  )
  async password(
    @Req() req: Request,
    @Body() dto: SetupPasswordDto,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.providers.setupPassword(req, dto.newPassword);
    this.clear(res);
    return { authenticated: false };
  }
}
