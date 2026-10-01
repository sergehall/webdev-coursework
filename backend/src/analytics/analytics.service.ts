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
import { createHash, createHmac, randomBytes, randomUUID } from "crypto";
import { Queue, Worker } from "bullmq";
import Redis from "ioredis";
import { PostgresState } from "./postgres-state";
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
  QrEventDto,
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
  get frontendOrigin(): string {
    return this.origins[0];
  }
  loginOptions() {
    return {
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
    private readonly store: AnalyticsStore
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
    identity?: string
  ): Promise<string> {
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
    return this.createSession(account);
  }

  async createSession(account: OwnerAccount): Promise<string> {
    const token = randomBytes(32).toString("base64url");
    const session: OwnerSession = {
      accountId: account.id,
      role: account.role,
      revision: account.revision,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SESSION_SECONDS * 1000).toISOString(),
    };
    await this.connection().set(
      `${PREFIX}:session:${this.digest(token)}`,
      JSON.stringify(session),
      "EX",
      SESSION_SECONDS
    );
    return token;
  }

  async githubStart(req: Request) {
    this.connection();
    if (!this.github)
      throw new ServiceUnavailableException("GitHub sign-in is not configured");
    await this.rateLimit(`github:${this.digest(req.ip ?? "unknown")}`, 10, 900);
    const state = randomBytes(32).toString("base64url");
    const verifier = randomBytes(32).toString("base64url");
    await this.connection().set(
      `${PREFIX}:oauth:${this.digest(state)}`,
      verifier,
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
      allow_signup: "true",
    }).toString();
    return { state, url: url.href };
  }

  async githubCallback(req: Request): Promise<string> {
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
      const verifier = await this.connection().eval(
        "local v=redis.call('GET',KEYS[1]); redis.call('DEL',KEYS[1]); return v",
        1,
        `${PREFIX}:oauth:${this.digest(state)}`
      );
      if (typeof verifier !== "string") throw new UnauthorizedException();
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
      const account = await this.store.githubAccount(
        identity,
        this.github.ownerId
      );
      await this.audit("account.github.login", true, account.role === "admin");
      return await this.createSession(account);
    } catch {
      if (this.redis?.status === "ready")
        await this.audit("owner.github.login", false, false);
      throw new UnauthorizedException("Unable to sign in through GitHub");
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
    await this.audit(action, true, account.role === "admin");
    const { displayName, timeZone, theme, reportDays } = account;
    return {
      token: token as string,
      accountId: account.id,
      role: session.role,
      issuedAt: session.issuedAt,
      expiresAt: session.expiresAt,
      canManageRoles: account.id === AnalyticsStore.ROOT_ID,
      profile: {
        displayName,
        timeZone,
        theme,
        reportDays,
        username: account.username,
        email: account.email,
        emailVerified: account.emailVerified,
        passwordEnabled: !!account.passwordHash,
        githubLinked: !!account.githubId,
      },
    };
  }

  async logout(req: Request): Promise<void> {
    this.assertOrigin(req);
    const session = await this.authorize(req, "owner.logout", false);
    await this.connection().del(
      `${PREFIX}:session:${this.digest(session.token)}`
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

  async profile(req: Request, displayName: string): Promise<void> {
    this.assertOrigin(req);
    const session = await this.authorize(req, "owner.profile.update", false);
    if (!displayName.trim())
      throw new BadRequestException("Display name is required");
    await this.store.profile(displayName, session.accountId);
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
