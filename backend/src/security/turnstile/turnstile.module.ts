import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TurnstileService } from "./turnstile.service";

/** Shared provider verification; account and documentation domains consume this module. */
@Module({
  imports: [ConfigModule],
  providers: [TurnstileService],
  exports: [TurnstileService],
})
export class TurnstileModule {}
