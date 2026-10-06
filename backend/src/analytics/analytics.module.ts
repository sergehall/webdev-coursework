import { AccountController } from "../accounts/account.controller";
import { AccountService } from "../accounts/account.service";
import { TurnstileModule } from "../security/turnstile/turnstile.module";
import { AuthMailService } from "../accounts/auth-mail";
import { MfaController } from "../accounts/mfa/mfa.controller";
import { MfaService } from "../accounts/mfa/mfa.service";
import { MfaCrypto } from "../accounts/mfa/mfa.crypto";
import { AccountProvidersController } from "../accounts/account-providers.controller";
import { AccountProvidersService } from "../accounts/account-providers.service";
import { OwnerController } from "../accounts/owner.controller";
import { Module } from "@nestjs/common";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsStore } from "./analytics.store";
import { MentorAccountAccess } from "../mentor/access/mentor-account-access";
import { AccountStore } from "../accounts/store/account.store";

// Account operations consume shared verification through the security module boundary.
@Module({
  imports: [TurnstileModule],
  controllers: [
    AnalyticsController,
    OwnerController,
    AccountController,
    MfaController,
    AccountProvidersController,
  ],
  providers: [
    AnalyticsService,
    MentorAccountAccess,
    AnalyticsStore,
    AccountStore,
    AccountService,
    AuthMailService,
    MfaService,
    MfaCrypto,
    AccountProvidersService,
  ],
  exports: [MentorAccountAccess],
})
export class AnalyticsModule {}
