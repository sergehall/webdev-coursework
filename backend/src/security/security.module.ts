import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ApiAbuseGuard } from "./api-abuse.guard";
import { RequestThrottleService } from "./request-throttle.service";

@Module({
  providers: [
    RequestThrottleService,
    ApiAbuseGuard,
    { provide: APP_GUARD, useExisting: ApiAbuseGuard },
  ],
  exports: [ApiAbuseGuard, RequestThrottleService],
})
export class SecurityModule {}
