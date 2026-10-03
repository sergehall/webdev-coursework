import {
  BadRequestException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { createHash, randomBytes } from "crypto";
import type { Request } from "express";

import type { GithubStartDto } from "../account.dto";
import type { LoginResult, MfaService } from "../mfa/mfa.service";
import type { TurnstileService } from "../../security/turnstile/turnstile.service";
import { PREFIX } from "../../analytics/analytics.constants";
import type { AccountStore, OwnerAccount } from "../store/account.store";
import type { PostgresState } from "../../analytics/postgres-state";
import type { OwnerAccess, OwnerSession } from "./owner-access";
import type { GithubConfiguration } from "./owner-configuration";

export interface GithubOAuthContext {
  readonly github?: GithubConfiguration;
  readonly githubCookieName: string;
  readonly runtimeAvailable: boolean;
  readonly store: AccountStore;
  readonly mfa: MfaService;
  readonly turnstile: TurnstileService;
  stateStore(): PostgresState;
  digest(value: string): string;
  assertOrigin(req: Request): void;
  rateLimit(key: string, limit: number, seconds: number): Promise<void>;
  audit(action: string, allowed: boolean, owner: boolean): Promise<void>;
  identitySession(
    req: Request,
    action: string
  ): ReturnType<OwnerAccess["identitySession"]>;
  authenticate(
    account: OwnerAccount,
    method: "password" | "github",
    req?: Request
  ): Promise<LoginResult>;
  assertRecentMfa(session: {
    mfaEnabled: boolean;
    mfaVerifiedAt?: string;
  }): void;
}

export class GithubOAuth {
  constructor(private readonly context: GithubOAuthContext) {}

  async githubStart(
    req: Request,
    linking = false,
    verification: GithubStartDto = {}
  ) {
    // Browser POSTs must originate from our account UI. Legacy GETs cannot supply proof.
    if (!linking && req.method === "POST") this.context.assertOrigin(req);
    this.context.stateStore();
    if (!this.context.github)
      throw new ServiceUnavailableException("GitHub sign-in is not configured");
    await this.context.rateLimit(
      `github:${this.context.digest(req.ip ?? "unknown")}`,
      10,
      900
    );
    // Verify before issuing OAuth state/PKCE. The callback accepts only state created here.
    // Authenticated provider linking retains its existing recent-sign-in and MFA boundary.
    if (!linking)
      await this.context.turnstile.verify(
        verification.turnstileToken,
        verification.intent === "register"
          ? "account_register"
          : "account_login"
      );
    const state = randomBytes(32).toString("base64url");
    const verifier = randomBytes(32).toString("base64url");
    const session = linking
      ? await this.context.identitySession(
          req,
          "account.providers.github.start"
        )
      : null;
    if (session?.profile.githubLinked)
      throw new BadRequestException("GitHub is already connected");
    await this.context.stateStore().set(
      `${PREFIX}:oauth:${this.context.digest(state)}`,
      session
        ? JSON.stringify({
            verifier,
            accountId: session.accountId,
            revision: session.revision,
            sessionHash: this.context.digest(session.token),
          })
        : verifier,
      600,
      true
    );
    const url = new URL("https://github.com/login/oauth/authorize");
    url.search = new URLSearchParams({
      client_id: this.context.github.clientId,
      redirect_uri: this.context.github.callback,
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
        !this.context.github ||
        typeof code !== "string" ||
        !code ||
        code.length > 256 ||
        typeof state !== "string" ||
        !/^[A-Za-z0-9_-]{43}$/.test(state) ||
        req.cookies?.[this.context.githubCookieName] !== state
      )
        throw new UnauthorizedException();
      const stored = await this.context
        .stateStore()
        .take(`${PREFIX}:oauth:${this.context.digest(state)}`);
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
            client_id: this.context.github.clientId,
            client_secret: this.context.github.clientSecret,
            code,
            redirect_uri: this.context.github.callback,
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
        const raw = await this.context
          .stateStore()
          .get(`${PREFIX}:session:${intent.sessionHash}`);
        if (!raw) throw new UnauthorizedException();
        const source = JSON.parse(raw) as OwnerSession;
        if (
          source.accountId !== intent.accountId ||
          source.revision !== intent.revision ||
          !(Date.parse(source.expiresAt) > Date.now())
        )
          throw new UnauthorizedException();
        this.context.mfa.assertRecentSignIn(source.issuedAt);
        this.context.assertRecentMfa({
          mfaEnabled: await this.context.mfa.enabled(source.accountId),
          mfaVerifiedAt: source.mfaVerifiedAt,
        });
        await this.context.store.linkGithub(
          source.accountId,
          source.revision,
          identity,
          this.context.github.ownerId
        );
        return { linked: true };
      }
      const account = await this.context.store.githubAccount(
        identity,
        this.context.github.ownerId
      );
      await this.context.audit(
        "account.github.login",
        true,
        account.role === "admin"
      );
      return await this.context.authenticate(account, "github", req);
    } catch {
      if (this.context.runtimeAvailable)
        await this.context.audit("owner.github.login", false, false);
      throw new UnauthorizedException({
        code: linking ? "GITHUB_LINK_FAILED" : "GITHUB_LOGIN_FAILED",
        message: linking
          ? "Unable to connect GitHub"
          : "Unable to sign in through GitHub",
      });
    }
  }
}
