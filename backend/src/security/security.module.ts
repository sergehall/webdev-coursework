import { TurnstileModule } from "./turnstile/turnstile.module";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ApiAbuseGuard } from "./api-abuse.guard";
import { RequestThrottleService } from "./request-throttle.service";

// Expose shared security providers without moving account or Swagger flows here.
@Module({
  imports: [TurnstileModule],
  providers: [
    RequestThrottleService,
    ApiAbuseGuard,
    { provide: APP_GUARD, useExisting: ApiAbuseGuard },
  ],
  exports: [ApiAbuseGuard, RequestThrottleService, TurnstileModule],
})
export class SecurityModule {}
