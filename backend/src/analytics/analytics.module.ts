import { AccountController } from "../accounts/account.controller";
import { AccountService } from "../accounts/account.service";
import { AuthMailService } from "../accounts/auth-mail";
import { Module } from "@nestjs/common";
import { AnalyticsController, OwnerController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsStore } from "./analytics.store";

@Module({
  controllers: [AnalyticsController, OwnerController, AccountController],
  providers: [
    AnalyticsService,
    AnalyticsStore,
    AccountService,
    AuthMailService,
  ],
})
export class AnalyticsModule {}
