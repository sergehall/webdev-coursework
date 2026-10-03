import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from "@nestjs/common";
import { randomBytes, randomUUID } from "crypto";
import type { Request } from "express";

import type { LoginResult, MfaService } from "../mfa/mfa.service";
import type { TurnstileService } from "../../security/turnstile/turnstile.service";
import { PREFIX, SESSION_SECONDS } from "../../analytics/analytics.constants";
import type {
  AuditQueryDto,
  OwnerPasswordDto,
  OwnerPreferencesDto,
  OwnerProfileDto,
  SessionQueryDto,
} from "../account-access.dto";
import { AccountStore, type OwnerAccount } from "../store/account.store";
import { normalizeDevice } from "../../security/device";
import { hashOwnerPassword, verifyOwnerPassword } from "../owner-password";
import { assertAcceptablePassword } from "../password-policy";
import type { PostgresState } from "../../analytics/postgres-state";

export type OwnerSession = {
  accountId: string;
  role: "admin" | "client";
  revision: string;
  issuedAt: string;
  expiresAt: string;
  mfaVerifiedAt?: string;
  authMethod?: "password" | "github" | "unknown";
};

export interface OwnerAccessContext {
  readonly store: AccountStore;
  readonly mfa: MfaService;
  readonly turnstile: TurnstileService;
  readonly passwordHash: string;
  readonly cookieName: string;
  readonly runtimeAvailable: boolean;
  stateStore(): PostgresState;
  digest(value: string): string;
  assertOrigin(req: Request): void;
  rateLimit(key: string, limit: number, seconds: number): Promise<void>;
  audit(action: string, allowed: boolean, owner: boolean): Promise<void>;
}

export class OwnerAccess {
  constructor(private readonly context: OwnerAccessContext) {}

  async login(
    req: Request,
    password: string,
    identity?: string,
    turnstileToken?: string
  ): Promise<LoginResult> {
    try {
      this.context.assertOrigin(req);
    } catch (error) {
      if (this.context.runtimeAvailable)
        await this.context.audit("owner.login.origin", false, false);
      throw error;
    }
    await this.context.rateLimit(
      `login:${this.context.digest(req.ip ?? req.socket.remoteAddress ?? "unknown")}`,
      5,
      900
    );
    await this.context.rateLimit("login-global", 100, 900);
    // Shared by account/owner aliases and reauthentication; protect credential lookup too.
    await this.context.turnstile.verify(turnstileToken, "account_login");
    const account = identity
      ? await this.context.store.byLogin(identity.trim())
      : await this.context.store.owner();
    // One account budget covers username/email aliases and requests from different IPs.
    // Unknown identities receive the same kind of budget without storing their raw value.
    const accountLimitKey = `login-account:${this.context.digest(
      account?.id ?? identity?.trim().toLowerCase() ?? AccountStore.ROOT_ID
    )}`;
    await this.context.rateLimit(accountLimitKey, 20, 900);
    const validPassword = await verifyOwnerPassword(
      password,
      account?.passwordHash ?? this.context.passwordHash
    );
    if (
      !account ||
      !account.passwordHash ||
      !validPassword ||
      (account.id !== AccountStore.ROOT_ID && !account.emailVerified)
    ) {
      await this.context.audit("owner.login", false, false);
      throw new UnauthorizedException("Unable to sign in");
    }
    await this.context.stateStore().remove(`${PREFIX}:rate:${accountLimitKey}`);
    await this.context.audit("owner.login", true, true);
    return this.authenticate(account, "password", req);
  }

  async authenticate(
    account: OwnerAccount,
    method: "password" | "github",
    req?: Request
  ): Promise<LoginResult> {
    const challenge = await this.context.mfa.challenge(account, method);
    return (
      challenge ?? {
        token: await this.createSession(account, undefined, { req, method }),
      }
    );
  }

  async createSession(
    account: OwnerAccount,
    mfaVerifiedAt?: string,
    context?: { req?: Request; method?: "password" | "github" | "unknown" }
  ): Promise<string> {
    if ((await this.context.mfa.enabled(account.id)) && !mfaVerifiedAt)
      throw new UnauthorizedException("Two-factor verification required");
    const token = randomBytes(32).toString("base64url");
    const session: OwnerSession = {
      accountId: account.id,
      role: account.role,
      revision: account.revision,
      authMethod: context?.method ?? "unknown",
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SESSION_SECONDS * 1000).toISOString(),
      ...(mfaVerifiedAt ? { mfaVerifiedAt } : {}),
    };
    await this.context
      .stateStore()
      .set(
        `${PREFIX}:session:${this.context.digest(token)}`,
        JSON.stringify(session),
        SESSION_SECONDS
      );
    try {
      await this.registerSession(session, token, context?.req);
    } catch (error) {
      await this.context
        .stateStore()
        .remove(`${PREFIX}:session:${this.context.digest(token)}`);
      throw error;
    }
    return token;
  }

  private async registerSession(
    session: OwnerSession,
    token: string,
    req?: Request
  ) {
    await this.context.store.recordSession({
      ...session,
      tokenHash: this.context.digest(token),
      authMethod: session.authMethod ?? "unknown",
      ...normalizeDevice(req?.get("user-agent") ?? ""),
    });
  }

  async sessions(req: Request, query: SessionQueryDto = {}) {
    const session = await this.authorize(req, "owner.sessions.view", false);
    const account = await this.context.store.account(session.accountId);
    if (!account) throw new UnauthorizedException("Sign in again");
    const page = await this.context.store.sessions(
      account.id,
      account.revision,
      query
    );
    const entries = await Promise.all(
      page.entries.map(async (entry) => {
        const raw = await this.context
          .stateStore()
          .get(`${PREFIX}:session:${entry.tokenHash}`);
        let cached: OwnerSession | null = null;
        try {
          cached = raw ? (JSON.parse(raw) as OwnerSession) : null;
        } catch {
          /* Invalid cache entries are not active sessions. */
        }
        if (
          !cached ||
          cached.accountId !== account.id ||
          cached.revision !== account.revision ||
          cached.role !== account.role ||
          !(Date.parse(cached.expiresAt) > Date.now())
        )
          return null;
        const { tokenHash, ...safe } = entry;
        return {
          ...safe,
          current: tokenHash === this.context.digest(session.token),
        };
      })
    );
    return {
      entries: entries.filter((entry) => entry !== null),
      nextCursor: page.nextCursor,
    };
  }

  async identitySession(req: Request, action: string, requireFresh = true) {
    this.context.assertOrigin(req);
    const session = await this.authorize(req, action, false);
    if (requireFresh) {
      this.context.mfa.assertRecentSignIn(session.issuedAt);
      this.assertRecentMfa(session);
    }
    await this.context.rateLimit(`identity:${session.accountId}`, 10, 900);
    const raw = await this.context
      .stateStore()
      .get(`${PREFIX}:session:${this.context.digest(session.token)}`);
    if (!raw) throw new UnauthorizedException("Sign in again");
    const stored = JSON.parse(raw) as OwnerSession;
    return { ...session, revision: stored.revision };
  }

  private async principal(req: Request, action: string) {
    const session = await this.authorize(req, action);
    if (session.accountId !== AccountStore.ROOT_ID) {
      await this.context.audit(action, false, false);
      throw new ForbiddenException(
        "Only the primary administrator can manage roles"
      );
    }
    return session;
  }
  async accounts(req: Request) {
    await this.principal(req, "accounts.list");
    return this.context.store.db.query(
      'SELECT id,username,display_name AS "displayName",role,email,email_verified_at IS NOT NULL AS "emailVerified",created_at AS "createdAt" FROM webdev_accounts ORDER BY created_at DESC LIMIT 100'
    );
  }
  async accountRole(
    req: Request,
    id: string,
    role: "admin" | "client"
  ): Promise<void> {
    this.context.assertOrigin(req);
    await this.principal(req, "accounts.role.change");
    if (id === AccountStore.ROOT_ID)
      throw new BadRequestException(
        "The primary administrator role is protected"
      );
    const rows = await this.context.store.db.query(
      "WITH changed AS (UPDATE webdev_accounts SET role=$1,revision=$2,updated_at=now() WHERE id=$3 RETURNING id) SELECT id FROM changed",
      [role, randomUUID(), id]
    );
    if (!rows.length) throw new BadRequestException("Account not found");
  }

  async audits(req: Request, query: AuditQueryDto) {
    await this.authorize(req, "analytics.audit.view");
    return this.context.store.audits(query);
  }

  async authorize(req: Request, action: string, requireOwner = true) {
    await this.context.rateLimit(
      `access:${this.context.digest(req.ip ?? "unknown")}`,
      120,
      60
    );
    const token: unknown = req.cookies?.[this.context.cookieName];
    const valid =
      typeof token === "string" && /^[A-Za-z0-9_-]{43}$/.test(token);
    const raw = valid
      ? await this.context
          .stateStore()
          .get(`${PREFIX}:session:${this.context.digest(token)}`)
      : null;
    let session: OwnerSession | null = null;
    try {
      session = raw ? (JSON.parse(raw) as OwnerSession) : null;
    } catch {
      session = null;
    }
    const account =
      session &&
      ["admin", "client"].includes(session.role) &&
      typeof session.accountId === "string"
        ? await this.context.store.account(session.accountId)
        : null;
    if (
      !session ||
      !account ||
      session.role !== account.role ||
      session.revision !== account.revision ||
      !(Date.parse(session.expiresAt) > Date.now())
    ) {
      await this.context.audit(action, false, false);
      throw new UnauthorizedException("Owner sign-in required");
    }
    if (requireOwner && account.role !== "admin") {
      await this.context.audit(action, false, false);
      throw new ForbiddenException("Owner access required");
    }
    const mfaEnabled = await this.context.mfa.enabled(account.id);
    if (
      mfaEnabled &&
      (!session.mfaVerifiedAt ||
        !Number.isFinite(Date.parse(session.mfaVerifiedAt)))
    ) {
      await this.context.audit(action, false, account.role === "admin");
      throw new UnauthorizedException("Two-factor verification required");
    }
    if (
      requireOwner ||
      ["owner.password.change", "owner.sessions.revoke"].includes(action)
    ) {
      try {
        this.assertRecentMfa({
          mfaEnabled,
          mfaVerifiedAt: session.mfaVerifiedAt,
        });
      } catch (error) {
        await this.context.audit(action, false, account.role === "admin");
        throw error;
      }
    }
    await this.registerSession(session, token as string, req);
    await this.context.audit(action, true, account.role === "admin");
    const { displayName, timeZone, theme, reportDays } = account;
    return {
      token: token as string,
      accountId: account.id,
      role: session.role,
      issuedAt: session.issuedAt,
      expiresAt: session.expiresAt,
      canManageRoles: account.id === AccountStore.ROOT_ID,
      mfaEnabled,
      mfaVerifiedAt: session.mfaVerifiedAt,
      authMethod: session.authMethod ?? "unknown",
      profile: {
        displayName,
        timeZone,
        theme,
        reportDays,
        dateFormat: account.dateFormat ?? "medium",
        clockFormat: account.clockFormat ?? "12h",
        activityDays: account.activityDays ?? 7,
        activityPageSize: account.activityPageSize ?? 10,
        username: account.username,
        email: account.email,
        emailVerified: account.emailVerified,
        passwordEnabled: !!account.passwordHash,
        githubLinked: !!account.githubId,
        githubUsername: account.githubUsername ?? null,
        registrationMethod:
          account.id === AccountStore.ROOT_ID
            ? "administrator"
            : account.githubId && !account.email
              ? "github"
              : "email",
      },
    };
  }

  assertRecentMfa(session: { mfaEnabled: boolean; mfaVerifiedAt?: string }) {
    if (
      session.mfaEnabled &&
      (!session.mfaVerifiedAt ||
        !Number.isFinite(Date.parse(session.mfaVerifiedAt)) ||
        Date.now() - Date.parse(session.mfaVerifiedAt) > 300000)
    )
      throw new HttpException(
        {
          code: "MFA_STEP_UP_REQUIRED",
          message:
            "Verify your authenticator in Security before retrying this action.",
        },
        403
      );
  }

  async markMfaVerified(req: Request, verifiedAt: string) {
    const session = await this.authorize(req, "account.mfa.session", false);
    const key = `${PREFIX}:session:${this.context.digest(session.token)}`;
    const raw = await this.context.stateStore().get(key);
    if (!raw) throw new UnauthorizedException("Sign in again");
    const stored = JSON.parse(raw) as OwnerSession;
    const ttl = Math.floor((Date.parse(stored.expiresAt) - Date.now()) / 1000);
    if (ttl <= 0) throw new UnauthorizedException("Sign in again");
    await this.context
      .stateStore()
      .set(key, JSON.stringify({ ...stored, mfaVerifiedAt: verifiedAt }), ttl);
  }

  async logout(req: Request): Promise<void> {
    this.context.assertOrigin(req);
    const session = await this.authorize(req, "owner.logout", false);
    await this.context
      .stateStore()
      .remove(`${PREFIX}:session:${this.context.digest(session.token)}`);
    await this.context.store.forgetSession(
      this.context.digest(session.token),
      session.accountId
    );
  }

  async session(req: Request) {
    const {
      token: _token,
      accountId: _accountId,
      ...session
    } = await this.authorize(req, "owner.session.view", false);
    return session;
  }

  async profile(req: Request, dto: OwnerProfileDto): Promise<void> {
    this.context.assertOrigin(req);
    const session = await this.authorize(req, "owner.profile.update", false);
    if (dto.username && dto.username !== session.profile.username)
      this.assertRecentMfa(session);
    if (!dto.displayName.trim())
      throw new BadRequestException("Display name is required");
    await this.context.store.profile(
      dto.displayName,
      session.accountId,
      dto.username
    );
  }

  async preferences(req: Request, dto: OwnerPreferencesDto): Promise<void> {
    this.context.assertOrigin(req);
    const session = await this.authorize(
      req,
      "owner.preferences.update",
      false
    );
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: dto.timeZone }).format();
    } catch {
      throw new BadRequestException("Choose a valid time zone");
    }
    if (
      session.role !== "admin" &&
      (dto.reportDays !== session.profile.reportDays ||
        (dto.activityDays !== undefined &&
          dto.activityDays !== session.profile.activityDays) ||
        (dto.activityPageSize !== undefined &&
          dto.activityPageSize !== session.profile.activityPageSize))
    )
      throw new ForbiddenException(
        "Report defaults are available to administrators"
      );
    await this.context.store.preferences(dto, session.accountId);
  }

  async changePassword(req: Request, dto: OwnerPasswordDto): Promise<void> {
    this.context.assertOrigin(req);
    const session = await this.authorize(req, "owner.password.change", false);
    await this.context.rateLimit(
      `password-change:${session.accountId}`,
      5,
      900
    );
    const account = (await this.context.store.account(session.accountId))!;
    if (
      !account.passwordHash ||
      !(await verifyOwnerPassword(dto.password, account.passwordHash))
    ) {
      await this.context.audit("owner.password.change", false, true);
      throw new UnauthorizedException("Current password is incorrect");
    }
    if (dto.password === dto.newPassword)
      throw new BadRequestException("Choose a different password");
    assertAcceptablePassword(dto.newPassword, [
      account.username ?? "",
      account.email ?? "",
    ]);
    await this.context.store.password(
      await hashOwnerPassword(dto.newPassword),
      randomUUID(),
      account.revision,
      account.id
    );
  }

  async revokeSessions(req: Request): Promise<void> {
    this.context.assertOrigin(req);
    const session = await this.authorize(req, "owner.sessions.revoke", false);
    await this.context.store.revokeSessions(randomUUID(), session.accountId);
  }
}
