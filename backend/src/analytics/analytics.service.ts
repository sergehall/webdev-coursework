import {
  ForbiddenException,
  HttpException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac, randomUUID } from "crypto";
import type { Request } from "express";

import type { GithubStartDto } from "../accounts/account.dto";
import { MfaService, type LoginResult } from "../accounts/mfa/mfa.service";
import { TurnstileService } from "../security/turnstile/turnstile.service";
import { GithubOAuth } from "../accounts/application/github-oauth";
import { OwnerAccess } from "../accounts/application/owner-access";
import {
  loadOwnerConfiguration,
  type GithubConfiguration,
} from "../accounts/application/owner-configuration";
import { MAX_BUFFER, PREFIX } from "./analytics.constants";
import type {
  AuditQueryDto,
  OwnerPasswordDto,
  OwnerPreferencesDto,
  OwnerProfileDto,
  SessionQueryDto,
} from "../accounts/account-access.dto";
import type { QrEventDto } from "./analytics.dto";
import { AnalyticsStore } from "./analytics.store";
import {
  AccountStore,
  type OwnerAccount,
} from "../accounts/store/account.store";
import type { QrEvent, AccessAudit } from "./analytics.types";
import { normalizeDevice } from "../security/device";
import { PostgresState } from "./postgres-state";

@Injectable()
export class AnalyticsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AnalyticsService.name);
  private runtimeState?: PostgresState;
  private timer?: ReturnType<typeof setInterval>;
  private flushing = false;
  private secret = "";
  private passwordHash = "";
  private origins: string[] = [];
  private nextRetention = 0;
  private github?: GithubConfiguration;
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
        !!this.runtimeState &&
        [
          "SMTP_HOST",
          "SMTP_USERNAME",
          "SMTP_PASSWORD",
          "SMTP_FROM_EMAIL",
        ].every((key) => !!this.config.get<string>(key)),
      githubEnabled: !!this.github && !!this.runtimeState,
    };
  }

  readonly secureCookie: boolean;
  readonly cookieName: string;

  constructor(
    private readonly config: ConfigService,
    private readonly store: AnalyticsStore,
    private readonly accountStore: AccountStore,
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
    const owner = loadOwnerConfiguration(this.config, this.secureCookie);
    this.secret = owner.secret;
    this.passwordHash = owner.passwordHash;
    this.origins = owner.origins;
    this.github = owner.github;
    try {
      await this.accountStore.initializeOwner(this.passwordHash, randomUUID());
    } catch {
      throw new Error(
        "Account storage initialization failed; apply account migrations first"
      );
    }
    // One shared durable state and queue implementation for local and Heroku deployments.
    this.runtimeState = new PostgresState(this.store.db);
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
  }

  onModuleDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private stateStore(): PostgresState {
    if (!this.runtimeState)
      throw new ServiceUnavailableException("Owner statistics are unavailable");
    return this.runtimeState;
  }

  digest(value: string): string {
    return createHmac("sha256", this.secret).update(value).digest("hex");
  }

  assertOrigin(req: Request): void {
    this.stateStore();
    if (!this.origins.includes(req.get("origin") ?? ""))
      throw new ForbiddenException("Untrusted origin");
  }

  async rateLimit(key: string, limit: number, seconds: number): Promise<void> {
    const count = Number(
      await this.stateStore().increment(`${PREFIX}:rate:${key}`, seconds)
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
    const accepted = await this.stateStore().enqueue(
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

  private ownerAccess(): OwnerAccess {
    return new OwnerAccess({
      store: this.accountStore,
      mfa: this.mfa,
      turnstile: this.turnstile,
      passwordHash: this.passwordHash,
      cookieName: this.cookieName,
      runtimeAvailable: !!this.runtimeState,
      stateStore: () => this.stateStore(),
      digest: (value) => this.digest(value),
      assertOrigin: (req) => this.assertOrigin(req),
      rateLimit: (key, limit, seconds) => this.rateLimit(key, limit, seconds),
      audit: (action, allowed, owner) => this.audit(action, allowed, owner),
    });
  }

  private githubOAuth(): GithubOAuth {
    return new GithubOAuth({
      github: this.github,
      githubCookieName: this.githubCookieName,
      runtimeAvailable: !!this.runtimeState,
      store: this.accountStore,
      mfa: this.mfa,
      turnstile: this.turnstile,
      stateStore: () => this.stateStore(),
      digest: (value) => this.digest(value),
      assertOrigin: (req) => this.assertOrigin(req),
      rateLimit: (key, limit, seconds) => this.rateLimit(key, limit, seconds),
      audit: (action, allowed, owner) => this.audit(action, allowed, owner),
      identitySession: (req, action) => this.identitySession(req, action),
      authenticate: (account, method, req) =>
        this.authenticate(account, method, req),
      assertRecentMfa: (session) => this.assertRecentMfa(session),
    });
  }

  async login(
    req: Request,
    password: string,
    identity?: string,
    turnstileToken?: string
  ): Promise<LoginResult> {
    return this.ownerAccess().login(req, password, identity, turnstileToken);
  }

  async authenticate(
    account: OwnerAccount,
    method: "password" | "github",
    req?: Request
  ): Promise<LoginResult> {
    return this.ownerAccess().authenticate(account, method, req);
  }

  async createSession(
    account: OwnerAccount,
    mfaVerifiedAt?: string,
    context?: { req?: Request; method?: "password" | "github" | "unknown" }
  ): Promise<string> {
    return this.ownerAccess().createSession(account, mfaVerifiedAt, context);
  }

  async sessions(req: Request, query: SessionQueryDto = {}) {
    return this.ownerAccess().sessions(req, query);
  }

  async identitySession(req: Request, action: string, requireFresh = true) {
    return this.ownerAccess().identitySession(req, action, requireFresh);
  }

  async githubStart(
    req: Request,
    linking = false,
    verification: GithubStartDto = {}
  ) {
    return this.githubOAuth().githubStart(req, linking, verification);
  }

  async githubCallback(req: Request): Promise<LoginResult | { linked: true }> {
    return this.githubOAuth().githubCallback(req);
  }

  async accounts(req: Request) {
    return this.ownerAccess().accounts(req);
  }

  async accountPage(req: Request, search?: string, page?: string) {
    return this.ownerAccess().accountPage(req, search, page);
  }

  async accountRole(
    req: Request,
    id: string,
    role: "admin" | "client"
  ): Promise<void> {
    return this.ownerAccess().accountRole(req, id, role);
  }

  async audits(req: Request, query: AuditQueryDto) {
    return this.ownerAccess().audits(req, query);
  }

  async authorize(req: Request, action: string, requireOwner = true) {
    return this.ownerAccess().authorize(req, action, requireOwner);
  }

  assertRecentMfa(session: { mfaEnabled: boolean; mfaVerifiedAt?: string }) {
    return this.ownerAccess().assertRecentMfa(session);
  }

  async markMfaVerified(req: Request, verifiedAt: string) {
    return this.ownerAccess().markMfaVerified(req, verifiedAt);
  }

  async logout(req: Request): Promise<void> {
    return this.ownerAccess().logout(req);
  }

  async session(req: Request) {
    return this.ownerAccess().session(req);
  }

  async profile(req: Request, dto: OwnerProfileDto): Promise<void> {
    return this.ownerAccess().profile(req, dto);
  }

  async preferences(req: Request, dto: OwnerPreferencesDto): Promise<void> {
    return this.ownerAccess().preferences(req, dto);
  }

  async changePassword(req: Request, dto: OwnerPasswordDto): Promise<void> {
    return this.ownerAccess().changePassword(req, dto);
  }

  async revokeSessions(req: Request): Promise<void> {
    return this.ownerAccess().revokeSessions(req);
  }

  async ingest(req: Request, dto: QrEventDto): Promise<void> {
    this.stateStore();
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
    // The connection-scoped lock serializes flushes across all application replicas.
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
  }

  private async flushBatch(): Promise<void> {
    const state = this.stateStore();
    for (const kind of ["events", "audit"] as const) {
      const pending = `${PREFIX}:${kind}:pending`;
      const values = await state.stage(pending);
      if (!values.length) continue;
      if (kind === "events")
        await this.store.persistEvents(
          values.map((x) => JSON.parse(x) as QrEvent)
        );
      else
        await this.store.persistAudits(
          values.map((x) => JSON.parse(x) as AccessAudit)
        );
      await state.acknowledge(pending);
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
