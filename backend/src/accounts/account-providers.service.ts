import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import type { Request } from "express";
import type { EntityManager } from "typeorm";
import { randomUUID } from "crypto";
import { AnalyticsService } from "../analytics/analytics.service";
import { AccountStore } from "./store/account.store";
import { AuthMailService } from "./auth-mail";
import { hashOwnerPassword } from "./owner-password";
import { assertAcceptablePassword } from "./password-policy";

@Injectable()
export class AccountProvidersService {
  constructor(
    private readonly auth: AnalyticsService,
    private readonly store: AccountStore,
    private readonly mail: AuthMailService
  ) {}
  async status(req: Request) {
    const session = await this.auth.authorize(
      req,
      "account.providers.view",
      false
    );
    const [pending]: { target_email: string; expires_at: Date }[] =
      await this.store.db.query(
        "SELECT target_email,expires_at FROM webdev_account_tokens WHERE account_id=$1 AND revision=(SELECT revision FROM webdev_accounts WHERE id=$1) AND purpose='add-email' AND used_at IS NULL AND expires_at>now() ORDER BY created_at DESC LIMIT 1",
        [session.accountId]
      );
    return {
      githubAvailable: this.auth.loginOptions().githubEnabled,
      emailAvailable: this.mail.enabled,
      pendingEmail: pending?.target_email ?? null,
      pendingEmailExpiresAt: pending?.expires_at.toISOString() ?? null,
    };
  }
  private async lock(q: EntityManager, id: string, revision: string) {
    const [account]: {
      revision: string;
      email: string | null;
      email_verified_at: Date | null;
      password_hash: string | null;
      github_id: string | null;
      role: string;
    }[] = await q.query(
      "SELECT revision,email,email_verified_at,password_hash,github_id,role FROM webdev_accounts WHERE id=$1 FOR UPDATE",
      [id]
    );
    if (!account || account.revision !== revision)
      throw new UnauthorizedException("Sign in again");
    return account;
  }
  private async audit(q: EntityManager, role: string, action: string) {
    await q.query(
      "INSERT INTO webdev_analytics_access_audit(event_id,occurred_at,actor,action,allowed) VALUES($1,now(),$2,$3,true)",
      [randomUUID(), role === "admin" ? "site-owner" : "anonymous", action]
    );
  }
  async disconnectGithub(req: Request) {
    const session = await this.auth.identitySession(
      req,
      "account.providers.github.disconnect"
    );
    const snapshot = await this.store.account(session.accountId);
    if (!snapshot) throw new UnauthorizedException();
    await this.store.db.transaction(async (q) => {
      const account = await this.lock(q, snapshot.id, session.revision);
      if (!account.github_id)
        throw new BadRequestException("GitHub is not connected");
      if (
        !account.password_hash ||
        (snapshot.id !== AccountStore.ROOT_ID && !account.email_verified_at)
      )
        throw new BadRequestException({
          code: "LAST_SIGN_IN_METHOD",
          message:
            "Set up a verified password sign-in before disconnecting GitHub",
        });
      await q.query(
        "UPDATE webdev_accounts SET github_id=NULL,github_username=NULL,revision=$1,updated_at=now() WHERE id=$2",
        [randomUUID(), snapshot.id]
      );
      await this.audit(q, account.role, "account.providers.github.disconnect");
    });
  }
  async addEmail(req: Request, email: string) {
    const session = await this.auth.identitySession(
      req,
      "account.providers.email.request"
    );
    const snapshot = await this.store.account(session.accountId);
    if (!snapshot) throw new UnauthorizedException();
    const target = email.trim().toLowerCase();
    // Reuse the existing mail gates, encrypted outbox and retry worker.
    this.mail.assertAvailable();
    await this.auth.rateLimit(`mail:${this.auth.digest(target)}`, 3, 3600);
    await this.store.db.transaction(async (q) => {
      const account = await this.lock(q, snapshot.id, session.revision);
      if (account.email)
        throw new ConflictException({
          code: "EMAIL_ALREADY_SET",
          message: "This account already has an email address",
        });
      const existing = await q.query(
        "SELECT id FROM webdev_accounts WHERE lower(email)=$1",
        [target]
      );
      if (existing.length) return; // Match public registration's non-enumerating response.
      await q.query(
        "UPDATE webdev_account_tokens SET used_at=now() WHERE account_id=$1 AND purpose='add-email' AND used_at IS NULL",
        [snapshot.id]
      );
      await this.mail.enqueue(
        q,
        snapshot.id,
        session.revision,
        "add-email",
        target
      );
      await this.audit(q, account.role, "account.providers.email.request");
    });
  }
  async cancelEmail(req: Request) {
    const session = await this.auth.identitySession(
      req,
      "account.providers.email.cancel",
      false
    );
    const snapshot = await this.store.account(session.accountId);
    if (!snapshot) throw new UnauthorizedException();
    await this.store.db.transaction(async (q) => {
      const account = await this.lock(q, snapshot.id, session.revision);
      await q.query(
        "UPDATE webdev_account_tokens SET used_at=now() WHERE account_id=$1 AND purpose='add-email' AND used_at IS NULL",
        [snapshot.id]
      );
      await this.audit(q, account.role, "account.providers.email.cancel");
    });
  }
  async setupPassword(req: Request, password: string) {
    const session = await this.auth.identitySession(
      req,
      "account.providers.password.setup"
    );
    const snapshot = await this.store.account(session.accountId);
    if (!snapshot) throw new UnauthorizedException();
    assertAcceptablePassword(password, [
      snapshot.username ?? "",
      snapshot.email ?? "",
    ]);
    const encoded = await hashOwnerPassword(password);
    await this.store.db.transaction(async (q) => {
      const account = await this.lock(q, snapshot.id, session.revision);
      if (account.password_hash)
        throw new ConflictException("Password sign-in is already configured");
      if (!account.email_verified_at || !account.github_id)
        throw new BadRequestException({
          code: "VERIFIED_EMAIL_REQUIRED",
          message: "Confirm your email before setting up password sign-in",
        });
      await q.query(
        "UPDATE webdev_accounts SET password_hash=$1,revision=$2,updated_at=now() WHERE id=$3",
        [encoded, randomUUID(), snapshot.id]
      );
      await this.audit(q, account.role, "account.providers.password.setup");
    });
  }
}
