import {
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/** Shared Cloudflare verifier. Callers own their origin/rate-limit and domain workflows. */
@Injectable()
export class TurnstileService {
  constructor(private readonly config: ConfigService) {}

  private setting(name: string): string {
    return (this.config.get<string>(name) ?? "").trim();
  }

  /** Public browser contract: exposes the site key and requirement flag, never the secret. */
  publicOptions() {
    return {
      // Any configured setting enables enforcement; a partial setup must not bypass it.
      turnstileRequired: !!(
        this.setting("TURNSTILE_SECRET_KEY") ||
        this.setting("TURNSTILE_SITE_KEY") ||
        this.setting("TURNSTILE_ALLOWED_HOSTNAMES")
      ),
      turnstileSiteKey: this.setting("TURNSTILE_SITE_KEY"),
    };
  }

  async verify(
    token: string | undefined,
    action: "account_login" | "account_register" | "api_docs"
  ): Promise<void> {
    if (!this.publicOptions().turnstileRequired) return;
    const secret = this.setting("TURNSTILE_SECRET_KEY");
    const siteKey = this.setting("TURNSTILE_SITE_KEY");
    const hostnames = this.setting("TURNSTILE_ALLOWED_HOSTNAMES")
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean);
    if (
      !secret ||
      !siteKey ||
      !hostnames.length ||
      (this.setting("NODE_ENV") === "production" &&
        (/^[123]x/.test(secret) || /^[123]x/.test(siteKey)))
    ) {
      throw new ServiceUnavailableException({
        code: "TURNSTILE_UNAVAILABLE",
        message: "Human verification is unavailable. Please try again later.",
      });
    }
    if (typeof token !== "string" || !token.trim() || token.length > 2048) {
      throw this.rejected();
    }
    // Siteverify redeems the token once. Do not retry a consumed token after an upstream failure.
    let result: {
      success?: unknown;
      action?: unknown;
      hostname?: unknown;
    } | null;
    try {
      const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ secret, response: token }),
          signal: AbortSignal.timeout(5000),
        }
      );
      if (!response.ok) throw new Error("Siteverify unavailable");
      result = await response.json();
    } catch {
      throw new ServiceUnavailableException({
        code: "TURNSTILE_UNAVAILABLE",
        message: "Human verification is unavailable. Please try again.",
      });
    }
    // A valid token must belong to this caller's action and an explicitly allowed hostname.
    if (
      result?.success !== true ||
      result.action !== action ||
      typeof result.hostname !== "string" ||
      !hostnames.includes(result.hostname.toLowerCase())
    ) {
      throw this.rejected();
    }
  }

  private rejected() {
    return new ForbiddenException({
      code: "TURNSTILE_REJECTED",
      message: "Complete human verification and try again.",
    });
  }
}
