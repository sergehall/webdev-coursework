import {
  BadRequestException,
  ConflictException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { createHash, randomUUID } from "crypto";
import type { Request } from "express";
import { AnalyticsService } from "../analytics/analytics.service";
import { AccountStore } from "./store/account.store";
import { hashOwnerPassword } from "./owner-password";
import { assertAcceptablePassword } from "./password-policy";
import { AuthMailService } from "./auth-mail";
import type { RegisterDto } from "./account.dto";
import { TurnstileService } from "../security/turnstile/turnstile.service";

@Injectable()
export class AccountService {
  constructor(
    private readonly auth: AnalyticsService,
    private readonly store: AccountStore,
    private readonly mail: AuthMailService,
    private readonly turnstile: TurnstileService
  ) {}
  private async gate(req: Request, email?: string): Promise<void> {
    this.auth.assertOrigin(req);
    if (!this.mail.enabled)
      throw new ServiceUnavailableException(
        "Email registration is unavailable"
      );
    await this.auth.rateLimit(
      `public-auth:${this.auth.digest(req.ip ?? "unknown")}`,
      10,
      900
    );
    await this.auth.rateLimit("public-auth-global", 200, 3600);
    if (email)
      await this.auth.rateLimit(`mail:${this.auth.digest(email)}`, 3, 3600);
  }
  private email(value: string): string {
    return value.trim().toLowerCase();
  }
  async register(req: Request, dto: RegisterDto): Promise<void> {
    const email = this.email(dto.email);
    await this.gate(req, email);
    // Apply origin/mail budgets first, then reject bots before password hashing or writes.
    await this.turnstile.verify(dto.turnstileToken, "account_register");
    assertAcceptablePassword(dto.password, [
      dto.username,
      email,
      email.split("@")[0],
    ]);
    const passwordHash = await hashOwnerPassword(dto.password);
    await this.store.db.transaction(async (q) => {
      const id = randomUUID(),
        revision = randomUUID();
      const rows = await q.query(
        "INSERT INTO webdev_accounts(id,role,username,email,password_hash,revision,display_name) VALUES($1,'client',$2,$3,$4,$5,$2) ON CONFLICT DO NOTHING RETURNING id",
        [id, dto.username, email, passwordHash, revision]
      );
      if (rows.length) {
        await this.mail.enqueue(q, id, revision, "verify");
        return;
      }
      // Local diagnostics clarify why no mail was queued. Production stays
      // indistinguishable to avoid exposing registered identities.
      if (process.env.NODE_ENV !== "development") return;
      const [existing] = await q.query(
        "SELECT EXISTS(SELECT 1 FROM webdev_accounts WHERE lower(email)=$1) AS email_taken, EXISTS(SELECT 1 FROM webdev_accounts WHERE lower(username)=$2) AS username_taken",
        [email, dto.username.toLowerCase()]
      );
      if (existing?.email_taken)
        throw new ConflictException({
          code: "EMAIL_ALREADY_REGISTERED",
          message: "This email is already registered locally.",
        });
      if (existing?.username_taken)
        throw new ConflictException({
          code: "USERNAME_TAKEN",
          message: "This username is already taken locally.",
        });
      throw new ConflictException({
        code: "REGISTRATION_CONFLICT",
        message: "No new account was created. Try another username or email.",
      });
    });
  }
  async requestEmail(
    req: Request,
    rawEmail: string,
    purpose: "verify" | "reset"
  ): Promise<void> {
    const email = this.email(rawEmail);
    await this.gate(req, email);
    await this.store.db.transaction(async (q) => {
      const [account] = await q.query(
        "SELECT id,revision,email_verified_at,password_hash FROM webdev_accounts WHERE lower(email)=$1 FOR UPDATE",
        [email]
      );
      if (
        !account ||
        (purpose === "verify" && account.email_verified_at) ||
        (purpose === "reset" &&
          (!account.email_verified_at || !account.password_hash))
      )
        return;
      await this.mail.enqueue(q, account.id, account.revision, purpose);
    });
  }
  async consume(
    req: Request,
    token: string,
    purpose: "verify" | "reset",
    password?: string
  ): Promise<{ signInRequired: boolean }> {
    this.auth.assertOrigin(req);
    await this.auth.rateLimit(
      `token:${this.auth.digest(req.ip ?? "unknown")}`,
      20,
      900
    );
    if (purpose === "reset") {
      if (!password)
        throw new BadRequestException("A new password is required");
      assertAcceptablePassword(password);
    }
    return this.store.db.transaction(async (q) => {
      const [row] = await q.query(
        "SELECT t.account_id,t.revision,t.purpose,t.target_email,a.email,a.role,a.revision AS current_revision FROM webdev_account_tokens t JOIN webdev_accounts a ON a.id=t.account_id WHERE t.token_hash=$1 AND t.purpose=ANY($2::varchar[]) AND t.used_at IS NULL AND t.expires_at>now() FOR UPDATE OF a,t",
        [
          createHash("sha256").update(token).digest("hex"),
          purpose === "verify" ? ["verify", "add-email"] : ["reset"],
        ]
      );
      if (!row || row.revision !== row.current_revision)
        throw new BadRequestException(
          "This link expired or was already used. Request a new email."
        );
      if (row.purpose === "add-email") {
        if (row.email || !row.target_email)
          throw new BadRequestException("This link is no longer eligible");
        try {
          await q.query(
            "UPDATE webdev_accounts SET email=$1,email_verified_at=now(),revision=$2,updated_at=now() WHERE id=$3",
            [row.target_email, randomUUID(), row.account_id]
          );
        } catch (error) {
          if ((error as { code?: string }).code === "23505")
            throw new BadRequestException({
              code: "EMAIL_UNAVAILABLE",
              message:
                "This email cannot be added. Request another confirmation.",
            });
          throw error;
        }
        await q.query(
          "UPDATE webdev_account_tokens SET used_at=now() WHERE account_id=$1 AND purpose='add-email' AND used_at IS NULL",
          [row.account_id]
        );
        await q.query(
          "INSERT INTO webdev_analytics_access_audit(event_id,occurred_at,actor,action,allowed) VALUES($1,now(),$2,'account.providers.email.confirm',true)",
          [randomUUID(), row.role === "admin" ? "site-owner" : "anonymous"]
        );
      } else if (purpose === "verify")
        await q.query(
          "UPDATE webdev_accounts SET email_verified_at=now(),updated_at=now() WHERE id=$1",
          [row.account_id]
        );
      else {
        // Invalid or expired links must not trigger an expensive scrypt derivation.
        const passwordHash = await hashOwnerPassword(password!);
        await q.query(
          "UPDATE webdev_accounts SET password_hash=$1,revision=$2,updated_at=now() WHERE id=$3",
          [passwordHash, randomUUID(), row.account_id]
        );
      }
      await q.query(
        "UPDATE webdev_account_tokens SET used_at=now() WHERE token_hash=$1",
        [createHash("sha256").update(token).digest("hex")]
      );
      return { signInRequired: row.purpose === "add-email" };
    });
  }
}
