import { AccountController } from "../accounts/account.controller";
import { AccountService } from "../accounts/account.service";
import { AuthMailService } from "../accounts/auth-mail";
import { MfaController } from "../accounts/mfa/mfa.controller";
import { MfaService } from "../accounts/mfa/mfa.service";
import { MfaCrypto } from "../accounts/mfa/mfa.crypto";
import { AccountProvidersController } from "../accounts/account-providers.controller";
import { AccountProvidersService } from "../accounts/account-providers.service";
import { Module } from "@nestjs/common";
import { AnalyticsController, OwnerController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsStore } from "./analytics.store";

@Module({
  controllers: [
    AnalyticsController,
    OwnerController,
    AccountController,
    MfaController,
    AccountProvidersController,
  ],
  providers: [
    AnalyticsService,
    AnalyticsStore,
    AccountService,
    AuthMailService,
    MfaService,
    MfaCrypto,
    AccountProvidersService,
  ],
})
export class AnalyticsModule {}
