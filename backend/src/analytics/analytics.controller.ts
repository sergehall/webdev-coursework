import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseFilters,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Request } from "express";

import { AccountErrorFilter } from "../accounts/account-error.filter";
import { AcceptedDto } from "../accounts/account-response.dto";
import { ApiContract } from "../swagger/api-contract.decorator";
import { AnalyticsService } from "./analytics.service";
import { QrEventDto } from "./analytics.dto";

@UseFilters(AccountErrorFilter)
@ApiTags("Analytics — public")
@Controller("api/analytics")
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Post("qr-events")
  @HttpCode(202)
  @ApiContract(
    "Record an anonymous QR visit",
    "Accepts a business event for asynchronous aggregation. Duplicate event IDs are deduplicated. No account is required. IP/global ingestion limits apply; 202 confirms acceptance, not persistence.",
    AcceptedDto,
    { status: 202 }
  )
  async ingest(@Req() req: Request, @Body() dto: QrEventDto) {
    await this.analytics.ingest(req, dto);
    return { accepted: true };
  }
}
