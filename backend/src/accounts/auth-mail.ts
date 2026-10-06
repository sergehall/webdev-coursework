import {
  Injectable,
  ServiceUnavailableException,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  randomUUID,
} from "crypto";
import { DataSource, type EntityManager } from "typeorm";
import * as nodemailer from "nodemailer";
import {
  AUTH_MAIL_BRAND,
  AUTH_MAIL_TTL_SECONDS,
  type AuthMailPurpose,
  type MailProvider,
} from "./mail/auth-mail.contract";
import { SmtpProvider } from "./mail/smtp-mail.provider";
import { renderAuthMail } from "./mail/templates/auth-mail.templates";

// Preserve the existing imports while keeping rendering and SMTP independent.
export type { AuthMail, MailProvider } from "./mail/auth-mail.contract";
export { SmtpProvider } from "./mail/smtp-mail.provider";
export { renderAuthMail } from "./mail/templates/auth-mail.templates";
export function mailFailure(error: unknown): "transient" | "permanent" {
  const code = (error as { responseCode?: number })?.responseCode;
  return code && code >= 500 ? "permanent" : "transient";
}

@Injectable()
export class AuthMailService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AuthMailService.name);
  private timer?: ReturnType<typeof setInterval>;
  private busy = false;
  private provider?: MailProvider;
  constructor(
    private readonly config: ConfigService,
    private readonly db: DataSource
  ) {}
  get enabled(): boolean {
    return !!this.provider;
  }
  assertAvailable(): void {
    if (!this.enabled)
      throw new ServiceUnavailableException("Email delivery is unavailable");
  }
  private key(): Buffer {
    const secret = this.config.get<string>("OWNER_SESSION_SECRET") ?? "";
    if (secret.length < 32)
      throw new Error("Account encryption key is unavailable");
    return createHash("sha256")
      .update(`webdev-auth-mail-v1:${secret}`)
      .digest();
  }
  encrypt(token: string): string {
    const iv = randomBytes(12),
      cipher = createCipheriv("aes-256-gcm", this.key(), iv);
    const body = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
    return [
      "v1",
      iv.toString("base64url"),
      cipher.getAuthTag().toString("base64url"),
      body.toString("base64url"),
    ].join(".");
  }
  decrypt(envelope: string): string {
    const [version, iv, tag, body] = envelope.split(".");
    if (version !== "v1") throw new Error("Unsupported encrypted token");
    const cipher = createDecipheriv(
      "aes-256-gcm",
      this.key(),
      Buffer.from(iv, "base64url")
    );
    cipher.setAuthTag(Buffer.from(tag, "base64url"));
    return Buffer.concat([
      cipher.update(Buffer.from(body, "base64url")),
      cipher.final(),
    ]).toString("utf8");
  }
  onModuleInit(): void {
    if (this.config.get<string>("QR_ANALYTICS_ENABLED") !== "true") return;
    const host = this.config.get<string>("SMTP_HOST"),
      user = this.config.get<string>("SMTP_USERNAME"),
      pass = this.config.get<string>("SMTP_PASSWORD"),
      from = this.config.get<string>("SMTP_FROM_EMAIL");
    if (!host || !user || !pass || !from) return;
    const port = Number(this.config.get<string>("SMTP_PORT") ?? 587);
    const secure = this.config.get<string>("SMTP_USE_SSL") === "true";
    if (!Number.isInteger(port) || port < 1 || port > 65535)
      throw new Error("Invalid SMTP port");
    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: !secure,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
      tls: { rejectUnauthorized: true },
    });
    this.provider = new SmtpProvider(transport, {
      address: from,
      name: AUTH_MAIL_BRAND,
    });
    this.timer = setInterval(() => {
      if (this.busy) return;
      this.busy = true;
      void this.deliverOne()
        .catch(() =>
          this.logger.warn("Auth mail worker deferred; pending mail retained")
        )
        .finally(() => {
          this.busy = false;
        });
    }, 2000);
    this.timer.unref();
  }
  onModuleDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }
  async enqueue(
    q: EntityManager,
    accountId: string,
    revision: string,
    purpose: AuthMailPurpose,
    recipient?: string
  ): Promise<void> {
    const token = randomBytes(32).toString("base64url"),
      expires = new Date(Date.now() + AUTH_MAIL_TTL_SECONDS[purpose] * 1000);
    await q.query(
      "INSERT INTO webdev_account_tokens(token_hash,account_id,purpose,expires_at,revision,target_email) VALUES($1,$2,$3,$4,$5,$6)",
      [
        createHash("sha256").update(token).digest("hex"),
        accountId,
        purpose,
        expires,
        revision,
        recipient ?? null,
      ]
    );
    await q.query(
      "INSERT INTO webdev_mail_outbox(id,account_id,template,token_ciphertext,expires_at,recipient) VALUES($1,$2,$3,$4,$5,$6)",
      [
        randomUUID(),
        accountId,
        purpose,
        this.encrypt(token),
        expires,
        recipient ?? null,
      ]
    );
  }
  async deliverOne(): Promise<void> {
    if (!this.provider) return;
    const rows = await this.db.query(
      `WITH due AS (SELECT id FROM webdev_mail_outbox WHERE (status='pending' AND next_attempt_at<=now()) OR (status='sending' AND lease_until<now()) ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 1), claimed AS (UPDATE webdev_mail_outbox m SET status='sending',attempts=attempts+1,lease_until=now()+interval '60 seconds' FROM due WHERE m.id=due.id RETURNING m.*) SELECT * FROM claimed`
    );
    const mail = rows[0];
    if (!mail) return;
    try {
      if (mail.attempts > 5 || Date.parse(mail.expires_at) <= Date.now()) {
        await this.db.query(
          "UPDATE webdev_mail_outbox SET status='failed',failure_kind='expired',token_ciphertext=NULL,lease_until=NULL WHERE id=$1 AND attempts=$2",
          [mail.id, mail.attempts]
        );
        return;
      }
      const [account] = await this.db.query(
        "SELECT email,display_name,revision FROM webdev_accounts WHERE id=$1",
        [mail.account_id]
      );
      const token = this.decrypt(mail.token_ciphertext);
      const active = await this.db.query(
        "SELECT token_hash FROM webdev_account_tokens WHERE token_hash=$1 AND revision=$2 AND account_id=$3 AND used_at IS NULL AND expires_at>now()",
        [
          createHash("sha256").update(token).digest("hex"),
          account?.revision,
          mail.account_id,
        ]
      );
      if (!account || !active.length || !(mail.recipient ?? account.email)) {
        await this.db.query(
          "UPDATE webdev_mail_outbox SET status='failed',failure_kind='stale',token_ciphertext=NULL,lease_until=NULL WHERE id=$1 AND attempts=$2",
          [mail.id, mail.attempts]
        );
        return;
      }
      const origin = (this.config.get<string>("OWNER_ALLOWED_ORIGINS") ?? "")
        .split(",")[0]
        .trim();
      const url = new URL(
        `/account/${mail.template !== "reset" ? "verify-email" : "reset-password"}`,
        origin
      );
      url.hash = `token=${token}`;
      await this.provider.send({
        id: mail.id,
        recipient: mail.recipient ?? account.email,
        ...renderAuthMail(
          mail.template,
          account.display_name,
          url.href,
          new Date(mail.expires_at)
        ),
      });
      await this.db.query(
        "UPDATE webdev_mail_outbox SET status='sent',sent_at=now(),lease_until=NULL,token_ciphertext=NULL WHERE id=$1 AND attempts=$2",
        [mail.id, mail.attempts]
      );
    } catch (error) {
      const kind = mailFailure(error),
        terminal = kind === "permanent" || mail.attempts >= 5;
      const delay = Math.min(900, 30 * 2 ** (mail.attempts - 1));
      await this.db.query(
        "UPDATE webdev_mail_outbox SET status=$1,failure_kind=$2,lease_until=NULL,next_attempt_at=now()+$3*interval '1 second',token_ciphertext=CASE WHEN $4 THEN NULL ELSE token_ciphertext END WHERE id=$5 AND attempts=$6",
        [
          terminal ? "failed" : "pending",
          kind,
          delay,
          terminal,
          mail.id,
          mail.attempts,
        ]
      );
      this.logger.warn(
        `Auth mail ${terminal ? "failed" : "retry scheduled"}: ${kind}`
      );
    }
  }
}
