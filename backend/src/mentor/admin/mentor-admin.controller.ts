import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
} from "@nestjs/common";
import type { Request } from "express";
import { AnalyticsService } from "../../analytics/analytics.service";
import { AccountStore } from "../../accounts/store/account.store";
import { exact, record } from "../api/mentor-input";
import { MentorAdminStore } from "./mentor-admin.store";

@Controller("api/mentor/admin")
export class MentorAdminController {
  constructor(
    private readonly analytics: AnalyticsService,
    private readonly store: MentorAdminStore
  ) {}

  private async owner(req: Request, action: string, write = false) {
    if (write) this.analytics.assertOrigin(req);
    const session = await this.analytics.authorize(req, action, true);
    if (session.accountId !== AccountStore.ROOT_ID)
      throw new ForbiddenException("Primary administrator access required");
    return session.accountId;
  }

  @Get("usage")
  @Header("Cache-Control", "no-store, private")
  async usage(
    @Req() req: Request,
    @Query("days") rawDays?: string,
    @Query("page") rawPage?: string
  ) {
    await this.owner(req, "mentor.admin.usage");
    const days = rawDays === undefined ? 30 : Number(rawDays);
    const page = rawPage === undefined ? 1 : Number(rawPage);
    if (
      (days !== 7 && days !== 30) ||
      !Number.isInteger(page) ||
      page < 1 ||
      page > 1000
    )
      throw new BadRequestException("Invalid report period or page");
    return this.store.usage(days, page);
  }

  @Put("accounts/:id/generation")
  @Header("Cache-Control", "no-store, private")
  async setGenerationEnabled(
    @Req() req: Request,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() body: unknown
  ) {
    const actor = await this.owner(req, "mentor.admin.access.change", true);
    const input = record(body);
    exact(input, ["enabled"]);
    if (typeof input.enabled !== "boolean")
      throw new BadRequestException("enabled must be a boolean");
    return this.store.setGenerationEnabled(id, input.enabled, actor);
  }
}
