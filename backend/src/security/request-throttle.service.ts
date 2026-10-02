import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac } from "crypto";
import { isIP } from "net";
import { DataSource } from "typeorm";

// Aggregate IPv6 privacy addresses within a /64; mapped IPv4 shares its IPv4 bucket.
export function throttleAddress(address: string): string {
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i.exec(address);
  if (mapped && isIP(mapped[1]) === 4) return mapped[1];
  if (isIP(address) !== 6) return address;
  const canonical = new URL(`http://[${address}]/`).hostname.slice(1, -1);
  if (canonical.startsWith("::ffff:")) {
    const words = canonical
      .slice(7)
      .split(":")
      .map((word) => parseInt(word, 16));
    return [words[0] >> 8, words[0] & 255, words[1] >> 8, words[1] & 255].join(
      "."
    );
  }
  const [left, right] = canonical.split("::");
  const start = left ? left.split(":") : [];
  const end = right ? right.split(":") : [];
  const words =
    right === undefined
      ? start
      : [
          ...start,
          ...Array<string>(8 - start.length - end.length).fill("0"),
          ...end,
        ];
  return (
    words
      .slice(0, 4)
      .map((word) => word.padStart(4, "0"))
      .join(":") + "::/64"
  );
}

@Injectable()
export class RequestThrottleService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RequestThrottleService.name);
  private readonly secret: string;
  private cleanup?: ReturnType<typeof setInterval>;
  private cleaning = false;

  constructor(
    config: ConfigService,
    private readonly db: DataSource
  ) {
    this.secret =
      config.get<string>("API_THROTTLE_SECRET") ||
      config.get<string>("OWNER_SESSION_SECRET") ||
      config.get<string>("QUIZ_ANSWERS_JWT_SECRET") ||
      "local-development-throttle-key-only";
    if (
      config.get<string>("NODE_ENV") === "production" &&
      (this.secret.length < 32 ||
        this.secret === "local-development-throttle-key-only")
    ) {
      throw new Error(
        "API throttling requires a server-only secret of at least 32 characters in production"
      );
    }
  }

  async onModuleInit(): Promise<void> {
    // All environments use the same shared PostgreSQL counters, independently of analytics.
    await this.db.query("SELECT key FROM webdev_runtime_state LIMIT 0");
    this.cleanup = setInterval(() => void this.retain(), 60000);
    this.cleanup.unref();
  }

  onModuleDestroy(): void {
    if (this.cleanup) clearInterval(this.cleanup);
  }

  private async retain(): Promise<void> {
    if (this.cleaning) return;
    this.cleaning = true;
    try {
      await this.db.query(
        "DELETE FROM webdev_runtime_state WHERE key IN (SELECT key FROM webdev_runtime_state WHERE key LIKE 'webdev:api-throttle:%' AND expires_at<=now() ORDER BY expires_at LIMIT 1000)"
      );
    } catch {
      this.logger.warn("API throttle retention unavailable");
    } finally {
      this.cleaning = false;
    }
  }

  async consume(
    address: string,
    bucket: string,
    limit: number,
    seconds: number
  ): Promise<{ count: number; retryAfter: number }> {
    const digest = createHmac("sha256", this.secret)
      .update(throttleAddress(address))
      .digest("hex");
    const key = `webdev:api-throttle:${bucket}:${digest}`;
    try {
      const [row]: { count: number; retryAfter: number }[] =
        await this.db.query(
          `
        INSERT INTO webdev_runtime_state(key,value,expires_at) VALUES($1,'1',now()+$2*interval '1 second')
        ON CONFLICT(key) DO UPDATE SET
          value=CASE WHEN webdev_runtime_state.expires_at<=now() THEN '1' ELSE LEAST(webdev_runtime_state.value::integer+1,$3+1)::text END,
          expires_at=CASE WHEN webdev_runtime_state.expires_at<=now() THEN EXCLUDED.expires_at ELSE webdev_runtime_state.expires_at END
        RETURNING value::integer AS count, GREATEST(1,ceil(extract(epoch FROM expires_at-now())))::integer AS "retryAfter"`,
          [key, seconds, limit]
        );
      if (!row) throw new Error("Missing throttle counter");
      return row;
    } catch {
      throw new ServiceUnavailableException(
        "Request protection is temporarily unavailable"
      );
    }
  }
}
