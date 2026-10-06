import { Injectable } from "@nestjs/common";
import type { Request } from "express";
import { AnalyticsService } from "../../analytics/analytics.service";

@Injectable()
export class MentorAccountAccess {
  constructor(private readonly analytics: AnalyticsService) {}
  async accountId(
    req: Request,
    action: string,
    write = false
  ): Promise<string> {
    if (write) this.analytics.assertOrigin(req);
    const session = await this.analytics.authorize(
      req,
      `mentor.${action}`,
      false
    );
    return session.accountId;
  }
}
