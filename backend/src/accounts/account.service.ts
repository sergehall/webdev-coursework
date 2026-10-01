import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { createHash, randomUUID } from "crypto";
import type { Request } from "express";
import { AnalyticsService } from "../analytics/analytics.service";
import { AnalyticsStore } from "../analytics/analytics.store";
import { hashOwnerPassword } from "../analytics/owner-password";
import { AuthMailService } from "./auth-mail";
import type { RegisterDto } from "./account.dto";

@Injectable()
export class AccountService {
  constructor(
    private readonly auth: AnalyticsService,
    private readonly store: AnalyticsStore,
    private readonly mail: AuthMailService
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
    const passwordHash = await hashOwnerPassword(dto.password);
    await this.store.db.transaction(async (q) => {
      const id = randomUUID(),
        revision = randomUUID();
      const rows = await q.query(
        "INSERT INTO webdev_accounts(id,role,username,email,password_hash,revision,display_name) VALUES($1,'client',$2,$3,$4,$5,$2) ON CONFLICT DO NOTHING RETURNING id",
        [id, dto.username, email, passwordHash, revision]
      );
      // The same generic response is returned for existing email addresses/usernames.
      if (rows.length) await this.mail.enqueue(q, id, revision, "verify");
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
  ): Promise<void> {
    this.auth.assertOrigin(req);
    await this.auth.rateLimit(
      `token:${this.auth.digest(req.ip ?? "unknown")}`,
      20,
      900
    );
    const passwordHash = password ? await hashOwnerPassword(password) : null;
    await this.store.db.transaction(async (q) => {
      const [row] = await q.query(
        "SELECT t.account_id,t.revision,a.revision AS current_revision FROM webdev_account_tokens t JOIN webdev_accounts a ON a.id=t.account_id WHERE t.token_hash=$1 AND t.purpose=$2 AND t.used_at IS NULL AND t.expires_at>now() FOR UPDATE OF t,a",
        [createHash("sha256").update(token).digest("hex"), purpose]
      );
      if (!row || row.revision !== row.current_revision)
        throw new BadRequestException(
          "This link expired or was already used. Request a new email."
        );
      if (purpose === "verify")
        await q.query(
          "UPDATE webdev_accounts SET email_verified_at=now(),updated_at=now() WHERE id=$1",
          [row.account_id]
        );
      else
        await q.query(
          "UPDATE webdev_accounts SET password_hash=$1,revision=$2,updated_at=now() WHERE id=$3",
          [passwordHash, randomUUID(), row.account_id]
        );
      await q.query(
        "UPDATE webdev_account_tokens SET used_at=now() WHERE token_hash=$1",
        [createHash("sha256").update(token).digest("hex")]
      );
    });
  }
}
