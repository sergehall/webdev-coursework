import {
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import type { Request } from "express";
import { AnalyticsService } from "../../analytics/analytics.service";
import { mentorAudienceAllows } from "./mentor-audience";

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
    if (process.env.NODE_ENV === "production") {
      if (process.env.AI_MENTOR_ENABLED !== "true")
        throw new ServiceUnavailableException({ code: "MENTOR_DISABLED" });
      if (!mentorAudienceAllows(session.accountId))
        throw new ForbiddenException({ code: "BETA_ACCESS_REQUIRED" });
    }
    return session.accountId;
  }
}
