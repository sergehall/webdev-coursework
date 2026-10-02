import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TurnstileService } from "../security/turnstile/turnstile.service";
import { createHash, createHmac, randomBytes, randomUUID } from "crypto";
import { Queue, Worker } from "bullmq";
import Redis from "ioredis";
import { PostgresState } from "./postgres-state";
import { MfaService, type LoginResult } from "../accounts/mfa/mfa.service";
import type { Request } from "express";
import {
  AnalyticsStore,
  type AccessAudit,
  type OwnerAccount,
} from "./analytics.store";
import { normalizeDevice, type QrEvent } from "./analytics.types";
import type {
  AuditQueryDto,
  OwnerPasswordDto,
  OwnerPreferencesDto,
  OwnerProfileDto,
  QrEventDto,
  SessionQueryDto,
} from "./analytics.dto";
import {
  hashOwnerPassword,
  OWNER_HASH_PATTERN,
  verifyOwnerPassword,
} from "./owner-password";

type OwnerSession = {
  accountId: string;
  role: "admin" | "client";
  revision: string;
  issuedAt: string;
  expiresAt: string;
  mfaVerifiedAt?: string;
  authMethod?: "password" | "github" | "unknown";
};

const PREFIX = "webdev:qr";
const SESSION_SECONDS = 60 * 60;
const MAX_BUFFER = 10_000;
const RATE_LIMIT = `local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return n`;
const BUFFER = `if redis.call('LLEN', KEYS[1]) >= tonumber(ARGV[2]) then return 0 end; redis.call('RPUSH', KEYS[1], ARGV[1]); return 1`;
const STAGE = `if redis.call('LLEN', KEYS[2]) == 0 then for i=1,500 do local v=redis.call('LPOP', KEYS[1]); if not v then break end; redis.call('RPUSH', KEYS[2], v) end end; return redis.call('LRANGE', KEYS[2], 0, -1)`;

@Injectable()
export class AnalyticsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AnalyticsService.name);
  private redis?: Redis | PostgresState;
  private timer?: ReturnType<typeof setInterval>;
  private flushing = false;
  private queue?: Queue;
  private worker?: Worker;
  private secret = "";
  private passwordHash = "";
  private origins: string[] = [];
  private nextRetention = 0;
  private github?: {
    clientId: string;
    clientSecret: string;
    ownerId: string;
    callback: string;
  };
  get githubCookieName(): string {
    return this.secureCookie
      ? "__Secure-webdev_github_state"
      : "webdev_github_state";
  }
  get mfaCookieName(): string {
    return this.secureCookie ? "__Secure-webdev_mfa" : "webdev_mfa";
  }
  get frontendOrigin(): string {
    return this.origins[0];
  }
  loginOptions() {
    return {
      // The frontend reads verification settings here; no build-time secret is needed.
      ...this.turnstile.publicOptions(),
      registrationEnabled:
        !!this.config.get<string>("SMTP_HOST") &&
        this.redis?.status === "ready",
      githubEnabled: !!this.github && this.redis?.status === "ready",
    };
  }

  readonly secureCookie: boolean;
  readonly cookieName: string;

  constructor(
    private readonly config: ConfigService,
    private readonly store: AnalyticsStore,
    private readonly mfa: MfaService,
    private readonly turnstile: TurnstileService
  ) {
    this.secureCookie = config.get<string>("NODE_ENV") === "production";
    this.cookieName = this.secureCookie
      ? "__Secure-webdev_owner"
      : "webdev_owner";
  }

  async onModuleInit(): Promise<void> {
    if (this.config.get<string>("QR_ANALYTICS_ENABLED") !== "true") return;
    this.secret = this.config.get<string>("OWNER_SESSION_SECRET") ?? "";
    this.passwordHash = this.config.get<string>("OWNER_PASSWORD_HASH") ?? "";
    const redisUrl = this.config.get<string>("REDIS_URL");
    this.origins = (this.config.get<string>("OWNER_ALLOWED_ORIGINS") ?? "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    if (
      this.secret.length < 32 ||
      !OWNER_HASH_PATTERN.test(this.passwordHash) ||
      !this.origins.length
    ) {
      throw new Error(
        "Accounts require OWNER_PASSWORD_HASH, OWNER_SESSION_SECRET (32+ characters), and OWNER_ALLOWED_ORIGINS"
      );
    }
    for (const origin of this.origins) {
      const parsed = new URL(origin);
      if (
        parsed.origin !== origin ||
        (this.secureCookie && parsed.protocol !== "https:")
      )
        throw new Error(
          "OWNER_ALLOWED_ORIGINS must contain exact trusted origins; production requires HTTPS"
        );
    }
    const githubKeys = [
      "GITHUB_CLIENT_ID",
      "GITHUB_CLIENT_SECRET",
      "GITHUB_OWNER_ID",
      "GITHUB_CALLBACK_URL",
    ];
    const githubValues = githubKeys.map(
      (key) => this.config.get<string>(key) ?? ""
    );
    if (githubValues.some(Boolean)) {
      if (!githubValues.every(Boolean) || !/^\d+$/.test(githubValues[2]))
        throw new Error(
          "Complete GitHub owner OAuth configuration is required"
        );
      const callback = new URL(githubValues[3]);
      if (
        callback.pathname !== "/api/owner/github/callback" ||
        callback.search ||
        callback.hash ||
        (this.secureCookie && callback.protocol !== "https:")
      )
        throw new Error("Invalid GitHub callback URL");
      this.github = {
        clientId: githubValues[0],
        clientSecret: githubValues[1],
        ownerId: githubValues[2],
        callback: callback.href,
      };
    }
    try {
      await this.store.initializeOwner(this.passwordHash, randomUUID());
    } catch {
      throw new Error(
        "Account storage initialization failed; apply account migrations first"
      );
    }
    if (!redisUrl) {
      this.redis = new PostgresState(this.store.db);
      this.timer = setInterval(() => {
        if (this.flushing) return;
        this.flushing = true;
        void this.flush()
          .catch(() =>
            this.logger.warn("Persistence deferred; buffered events retained")
          )
          .finally(() => {
            this.flushing = false;
          });
      }, 10_000);
      this.timer.unref();
      return;
    }
    const redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
      enableOfflineQueue: false,
      lazyConnect: true,
    });
    this.redis = redis;
    redis.on("error", () => this.logger.warn("Account state unavailable"));
    await redis.connect();
    const address = new URL(redisUrl);
    const connection = {
      host: address.hostname,
      port: Number(address.port || 6379),
      username: address.username
        ? decodeURIComponent(address.username)
        : undefined,
      password: address.password
        ? decodeURIComponent(address.password)
        : undefined,
      db: Number(address.pathname.slice(1) || 0),
      maxRetriesPerRequest: null,
      ...(address.protocol === "rediss:"
        ? { tls: { servername: address.hostname } }
        : {}),
    };
    this.queue = new Queue("webdev-qr-flush", { connection });
    this.queue.on("error", () =>
      this.logger.warn("QR analytics scheduler unavailable")
    );
    await this.queue.setGlobalConcurrency(1);
    this.worker = new Worker("webdev-qr-flush", () => this.flush(), {
      connection,
      concurrency: 1,
    });
    this.worker.on("failed", () =>
      this.logger.warn(
        "QR analytics persistence deferred; buffered events retained"
      )
    );
    this.worker.on("error", () =>
      this.logger.warn("QR analytics worker unavailable")
    );
    await this.queue.upsertJobScheduler(
      "flush-every-ten-seconds",
      { every: 10_000 },
      {
        name: "flush",
        opts: {
          attempts: 3,
          backoff: { type: "exponential", delay: 1000 },
          removeOnComplete: 10,
          removeOnFail: 20,
        },
      }
    );
  }

  async onModuleDestroy(): Promise<void> {
    if (this.timer) clearInterval(this.timer);
    await this.worker?.close();
    await this.queue?.close();
    this.redis?.disconnect();
  }

  private connection(): Redis | PostgresState {
    if (!this.redis || this.redis.status !== "ready")
      throw new ServiceUnavailableException("Owner statistics are unavailable");
    return this.redis;
  }

  digest(value: string): string {
    return createHmac("sha256", this.secret).update(value).digest("hex");
  }

  assertOrigin(req: Request): void {
    this.connection();
    if (!this.origins.includes(req.get("origin") ?? ""))
      throw new ForbiddenException("Untrusted origin");
  }

  async rateLimit(key: string, limit: number, seconds: number): Promise<void> {
    const count = Number(
      await this.connection().eval(
        RATE_LIMIT,
        1,
        `${PREFIX}:rate:${key}`,
        seconds
      )
    );
    if (count > limit) {
      await this.audit("rate.limit", false, false);
      throw new HttpException("Too many requests. Try again later.", 429);
    }
  }

  private async buffer(
    kind: "events" | "audit",
    value: QrEvent | AccessAudit
  ): Promise<void> {
    const accepted = await this.connection().eval(
      BUFFER,
      1,
      `${PREFIX}:${kind}:pending`,
      JSON.stringify(value),
      MAX_BUFFER
    );
    if (accepted !== 1)
      throw new ServiceUnavailableException("Statistics buffer is full");
  }

  async audit(action: string, allowed: boolean, owner: boolean): Promise<void> {
    await this.buffer("audit", {
      eventId: randomUUID(),
      occurredAt: new Date().toISOString(),
      actor: owner ? "site-owner" : "anonymous",
      action,
      allowed,
    });
  }

  async login(
    req: Request,
    password: string,
    identity?: string,
    turnstileToken?: string
  ): Promise<LoginResult> {
    try {
      this.assertOrigin(req);
    } catch (error) {
      if (this.redis?.status === "ready")
        await this.audit("owner.login.origin", false, false);
      throw error;
    }
    await this.rateLimit(
      `login:${this.digest(req.ip ?? req.socket.remoteAddress ?? "unknown")}`,
      5,
      900
    );
    await this.rateLimit("login-global", 100, 900);
    // Shared by account/owner aliases and reauthentication; protect credential lookup too.
    await this.turnstile.verify(turnstileToken, "account_login");
    const account = identity
      ? await this.store.byLogin(identity.trim())
      : await this.store.owner();
    const validPassword = await verifyOwnerPassword(
      password,
      account?.passwordHash ?? this.passwordHash
    );
    if (
      !account ||
      !account.passwordHash ||
      !validPassword ||
      (account.id !== AnalyticsStore.ROOT_ID && !account.emailVerified)
    ) {
      await this.audit("owner.login", false, false);
      throw new UnauthorizedException("Unable to sign in");
    }
    await this.audit("owner.login", true, true);
    return this.authenticate(account, "password", req);
  }

  async authenticate(
    account: OwnerAccount,
    method: "password" | "github",
    req?: Request
  ): Promise<LoginResult> {
    const challenge = await this.mfa.challenge(account, method);
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
    if ((await this.mfa.enabled(account.id)) && !mfaVerifiedAt)
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
    await this.connection().set(
      `${PREFIX}:session:${this.digest(token)}`,
      JSON.stringify(session),
      "EX",
      SESSION_SECONDS
    );
    try {
      await this.registerSession(session, token, context?.req);
    } catch (error) {
      await this.connection().del(`${PREFIX}:session:${this.digest(token)}`);
      throw error;
    }
    return token;
  }

  private async registerSession(
    session: OwnerSession,
    token: string,
    req?: Request
  ) {
    await this.store.recordSession({
      ...session,
      tokenHash: this.digest(token),
      authMethod: session.authMethod ?? "unknown",
      ...normalizeDevice(req?.get("user-agent") ?? ""),
    });
  }

  async sessions(req: Request, query: SessionQueryDto = {}) {
    const session = await this.authorize(req, "owner.sessions.view", false);
    const account = await this.store.account(session.accountId);
    if (!account) throw new UnauthorizedException("Sign in again");
    const page = await this.store.sessions(account.id, account.revision, query);
    const entries = await Promise.all(
      page.entries.map(async (entry) => {
        const raw = await this.connection().get(
          `${PREFIX}:session:${entry.tokenHash}`
        );
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
        return { ...safe, current: tokenHash === this.digest(session.token) };
      })
    );
    return {
      entries: entries.filter((entry) => entry !== null),
      nextCursor: page.nextCursor,
    };
  }

  async identitySession(req: Request, action: string, requireFresh = true) {
    this.assertOrigin(req);
    const session = await this.authorize(req, action, false);
    if (requireFresh) {
      this.mfa.assertRecentSignIn(session.issuedAt);
      this.assertRecentMfa(session);
    }
    await this.rateLimit(`identity:${session.accountId}`, 10, 900);
    const raw = await this.connection().get(
      `${PREFIX}:session:${this.digest(session.token)}`
    );
    if (!raw) throw new UnauthorizedException("Sign in again");
    const stored = JSON.parse(raw) as OwnerSession;
    return { ...session, revision: stored.revision };
  }

  async githubStart(req: Request, linking = false) {
    this.connection();
    if (!this.github)
      throw new ServiceUnavailableException("GitHub sign-in is not configured");
    await this.rateLimit(`github:${this.digest(req.ip ?? "unknown")}`, 10, 900);
    const state = randomBytes(32).toString("base64url");
    const verifier = randomBytes(32).toString("base64url");
    const session = linking
      ? await this.identitySession(req, "account.providers.github.start")
      : null;
    if (session?.profile.githubLinked)
      throw new BadRequestException("GitHub is already connected");
    await this.connection().set(
      `${PREFIX}:oauth:${this.digest(state)}`,
      session
        ? JSON.stringify({
            verifier,
            accountId: session.accountId,
            revision: session.revision,
            sessionHash: this.digest(session.token),
          })
        : verifier,
      "EX",
      600,
      "NX"
    );
    const url = new URL("https://github.com/login/oauth/authorize");
    url.search = new URLSearchParams({
      client_id: this.github.clientId,
      redirect_uri: this.github.callback,
      state,
      code_challenge: createHash("sha256").update(verifier).digest("base64url"),
      code_challenge_method: "S256",
      allow_signup: linking ? "false" : "true",
    }).toString();
    return { state, url: url.href };
  }

  async githubCallback(req: Request): Promise<LoginResult | { linked: true }> {
    let linking = false;
    try {
      const { code, state } = req.query;
      if (
        !this.github ||
        typeof code !== "string" ||
        !code ||
        code.length > 256 ||
        typeof state !== "string" ||
        !/^[A-Za-z0-9_-]{43}$/.test(state) ||
        req.cookies?.[this.githubCookieName] !== state
      )
        throw new UnauthorizedException();
      const stored = await this.connection().eval(
        "local v=redis.call('GET',KEYS[1]); redis.call('DEL',KEYS[1]); return v",
        1,
        `${PREFIX}:oauth:${this.digest(state)}`
      );
      if (typeof stored !== "string") throw new UnauthorizedException();
      const intent: {
        verifier: string;
        accountId?: string;
        revision?: string;
        sessionHash?: string;
      } = stored.startsWith("{") ? JSON.parse(stored) : { verifier: stored };
      const verifier = intent.verifier;
      linking = !!intent.accountId;
      const exchange = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: this.github.clientId,
            client_secret: this.github.clientSecret,
            code,
            redirect_uri: this.github.callback,
            code_verifier: verifier,
          }),
          signal: AbortSignal.timeout(10000),
        }
      );
      const credentials = (await exchange.json()) as {
        access_token?: unknown;
        token_type?: unknown;
      };
      if (
        !exchange.ok ||
        typeof credentials.access_token !== "string" ||
        credentials.token_type !== "bearer"
      )
        throw new UnauthorizedException();
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${credentials.access_token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "webdev-coursework-owner",
        },
        signal: AbortSignal.timeout(10000),
      });
      const identity = (await response.json()) as {
        id: number;
        login: string;
        name?: string | null;
      };
      if (
        !response.ok ||
        typeof identity.id !== "number" ||
        !Number.isSafeInteger(identity.id) ||
        identity.id <= 0 ||
        typeof identity.login !== "string" ||
        !/^[a-zA-Z0-9-]{1,39}$/.test(identity.login)
      )
        throw new UnauthorizedException();
      if (linking) {
        if (!intent.sessionHash || !intent.revision || !intent.accountId)
          throw new UnauthorizedException();
        const raw = await this.connection().get(
          `${PREFIX}:session:${intent.sessionHash}`
        );
        if (!raw) throw new UnauthorizedException();
        const source = JSON.parse(raw) as OwnerSession;
        if (
          source.accountId !== intent.accountId ||
          source.revision !== intent.revision ||
          !(Date.parse(source.expiresAt) > Date.now())
        )
          throw new UnauthorizedException();
        this.mfa.assertRecentSignIn(source.issuedAt);
        this.assertRecentMfa({
          mfaEnabled: await this.mfa.enabled(source.accountId),
          mfaVerifiedAt: source.mfaVerifiedAt,
        });
        await this.store.linkGithub(
          source.accountId,
          source.revision,
          identity,
          this.github.ownerId
        );
        return { linked: true };
      }
      const account = await this.store.githubAccount(
        identity,
        this.github.ownerId
      );
      await this.audit("account.github.login", true, account.role === "admin");
      return await this.authenticate(account, "github", req);
    } catch {
      if (this.redis?.status === "ready")
        await this.audit("owner.github.login", false, false);
      throw new UnauthorizedException({
        code: linking ? "GITHUB_LINK_FAILED" : "GITHUB_LOGIN_FAILED",
        message: linking
          ? "Unable to connect GitHub"
          : "Unable to sign in through GitHub",
      });
    }
  }

  private async principal(req: Request, action: string) {
    const session = await this.authorize(req, action);
    if (session.accountId !== AnalyticsStore.ROOT_ID) {
      await this.audit(action, false, false);
      throw new ForbiddenException(
        "Only the primary administrator can manage roles"
      );
    }
    return session;
  }
  async accounts(req: Request) {
    await this.principal(req, "accounts.list");
    return this.store.db.query(
      'SELECT id,username,display_name AS "displayName",role,email,email_verified_at IS NOT NULL AS "emailVerified",created_at AS "createdAt" FROM webdev_accounts ORDER BY created_at DESC LIMIT 100'
    );
  }
  async accountRole(
    req: Request,
    id: string,
    role: "admin" | "client"
  ): Promise<void> {
    this.assertOrigin(req);
    await this.principal(req, "accounts.role.change");
    if (id === AnalyticsStore.ROOT_ID)
      throw new BadRequestException(
        "The primary administrator role is protected"
      );
    const rows = await this.store.db.query(
      "WITH changed AS (UPDATE webdev_accounts SET role=$1,revision=$2,updated_at=now() WHERE id=$3 RETURNING id) SELECT id FROM changed",
      [role, randomUUID(), id]
    );
    if (!rows.length) throw new BadRequestException("Account not found");
  }

  async audits(req: Request, query: AuditQueryDto) {
    await this.authorize(req, "analytics.audit.view");
    return this.store.audits(query);
  }

  async authorize(req: Request, action: string, requireOwner = true) {
    await this.rateLimit(`access:${this.digest(req.ip ?? "unknown")}`, 120, 60);
    const token: unknown = req.cookies?.[this.cookieName];
    const valid =
      typeof token === "string" && /^[A-Za-z0-9_-]{43}$/.test(token);
    const raw = valid
      ? await this.connection().get(`${PREFIX}:session:${this.digest(token)}`)
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
        ? await this.store.account(session.accountId)
        : null;
    if (
      !session ||
      !account ||
      session.role !== account.role ||
      session.revision !== account.revision ||
      !(Date.parse(session.expiresAt) > Date.now())
    ) {
      await this.audit(action, false, false);
      throw new UnauthorizedException("Owner sign-in required");
    }
    if (requireOwner && account.role !== "admin") {
      await this.audit(action, false, false);
      throw new ForbiddenException("Owner access required");
    }
    const mfaEnabled = await this.mfa.enabled(account.id);
    if (
      mfaEnabled &&
      (!session.mfaVerifiedAt ||
        !Number.isFinite(Date.parse(session.mfaVerifiedAt)))
    ) {
      await this.audit(action, false, account.role === "admin");
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
        await this.audit(action, false, account.role === "admin");
        throw error;
      }
    }
    await this.registerSession(session, token as string, req);
    await this.audit(action, true, account.role === "admin");
    const { displayName, timeZone, theme, reportDays } = account;
    return {
      token: token as string,
      accountId: account.id,
      role: session.role,
      issuedAt: session.issuedAt,
      expiresAt: session.expiresAt,
      canManageRoles: account.id === AnalyticsStore.ROOT_ID,
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
          account.id === AnalyticsStore.ROOT_ID
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
    const key = `${PREFIX}:session:${this.digest(session.token)}`;
    const raw = await this.connection().get(key);
    if (!raw) throw new UnauthorizedException("Sign in again");
    const stored = JSON.parse(raw) as OwnerSession;
    const ttl = Math.floor((Date.parse(stored.expiresAt) - Date.now()) / 1000);
    if (ttl <= 0) throw new UnauthorizedException("Sign in again");
    await this.connection().set(
      key,
      JSON.stringify({ ...stored, mfaVerifiedAt: verifiedAt }),
      "EX",
      ttl
    );
  }

  async logout(req: Request): Promise<void> {
    this.assertOrigin(req);
    const session = await this.authorize(req, "owner.logout", false);
    await this.connection().del(
      `${PREFIX}:session:${this.digest(session.token)}`
    );
    await this.store.forgetSession(
      this.digest(session.token),
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
    this.assertOrigin(req);
    const session = await this.authorize(req, "owner.profile.update", false);
    if (dto.username && dto.username !== session.profile.username)
      this.assertRecentMfa(session);
    if (!dto.displayName.trim())
      throw new BadRequestException("Display name is required");
    await this.store.profile(dto.displayName, session.accountId, dto.username);
  }

  async preferences(req: Request, dto: OwnerPreferencesDto): Promise<void> {
    this.assertOrigin(req);
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
    await this.store.preferences(dto, session.accountId);
  }

  async changePassword(req: Request, dto: OwnerPasswordDto): Promise<void> {
    this.assertOrigin(req);
    const session = await this.authorize(req, "owner.password.change", false);
    await this.rateLimit(`password-change:${session.accountId}`, 5, 900);
    const account = (await this.store.account(session.accountId))!;
    if (
      !account.passwordHash ||
      !(await verifyOwnerPassword(dto.password, account.passwordHash))
    ) {
      await this.audit("owner.password.change", false, true);
      throw new UnauthorizedException("Current password is incorrect");
    }
    if (dto.password === dto.newPassword)
      throw new BadRequestException("Choose a different password");
    await this.store.password(
      await hashOwnerPassword(dto.newPassword),
      randomUUID(),
      account.revision,
      account.id
    );
  }

  async revokeSessions(req: Request): Promise<void> {
    this.assertOrigin(req);
    const session = await this.authorize(req, "owner.sessions.revoke", false);
    await this.store.revokeSessions(randomUUID(), session.accountId);
  }

  async ingest(req: Request, dto: QrEventDto): Promise<void> {
    this.connection();
    await this.rateLimit(
      `ingest:${this.digest(req.ip ?? req.socket.remoteAddress ?? "unknown")}`,
      120,
      60
    );
    await this.rateLimit("ingest-global", 2000, 60);
    const header = req.get("user-agent") ?? "";
    if (/bot|crawler|spider|preview|HeadlessChrome/i.test(header)) return;
    await this.buffer("events", {
      eventId: dto.eventId,
      campaign: dto.campaign,
      occurredAt: new Date().toISOString(),
      ...normalizeDevice(header),
    });
  }

  private async flush(): Promise<void> {
    if (this.redis instanceof PostgresState) {
      const runner = this.store.db.createQueryRunner();
      await runner.connect();
      let locked = false;
      try {
        const [row] = await runner.query(
          "SELECT pg_try_advisory_lock(1790902800) AS locked"
        );
        locked = row.locked;
        if (locked) await this.flushBatch();
      } finally {
        if (locked) await runner.query("SELECT pg_advisory_unlock(1790902800)");
        await runner.release();
      }
    } else await this.flushBatch();
  }

  private async flushBatch(): Promise<void> {
    const redis = this.connection();
    for (const kind of ["events", "audit"] as const) {
      const pending = `${PREFIX}:${kind}:pending`;
      const processing = `${PREFIX}:${kind}:processing`;
      const values = (await redis.eval(
        STAGE,
        2,
        pending,
        processing
      )) as string[];
      if (!values.length) continue;
      if (kind === "events")
        await this.store.persistEvents(
          values.map((x) => JSON.parse(x) as QrEvent)
        );
      else
        await this.store.persistAudits(
          values.map((x) => JSON.parse(x) as AccessAudit)
        );
      await redis.del(processing);
    }
    if (Date.now() >= this.nextRetention) {
      await this.store.retain();
      this.nextRetention = Date.now() + 60 * 60 * 1000;
    }
  }

  async dashboard(req: Request, days: number) {
    await this.authorize(req, "analytics.dashboard.view");
    return this.store.dashboard(days);
  }
}
