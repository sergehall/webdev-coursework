import { IndexSecurityActivity1790910000000 } from "../../../../src/db/migrations/2026/10/1790910000000-IndexSecurityActivity";
import { UseAdminAndClientRoles1790906400000 } from "../../../../src/db/migrations/2026/10/1790906400000-UseAdminAndClientRoles";
import { Test } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import type { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AccountController } from "../../../../src/accounts/account.controller";
import { TurnstileService } from "../../../../src/security/turnstile/turnstile.service";
import { AccountService } from "../../../../src/accounts/account.service";
import { AuthMailService } from "../../../../src/accounts/auth-mail";
import { AddPublicAccounts1790902800000 } from "../../../../src/db/migrations/2026/10/1790902800000-AddPublicAccounts";
import {
  AnalyticsController,
  OwnerController,
} from "../../../../src/analytics/analytics.controller";
import { AnalyticsStore } from "../../../../src/analytics/analytics.store";
import { AnalyticsService } from "../../../../src/analytics/analytics.service";
import { AddQrAnalytics1790899200000 } from "../../../../src/db/migrations/2026/10/1790899200000-AddQrAnalytics";
import { hashOwnerPassword } from "../../../../src/analytics/owner-password";
import { createApp } from "../../../../src/create-app";
import { MfaService } from "../../../../src/accounts/mfa/mfa.service";
import { MfaCrypto } from "../../../../src/accounts/mfa/mfa.crypto";
import { MfaController } from "../../../../src/accounts/mfa/mfa.controller";
import { AddAccountMfa1790913600000 } from "../../../../src/db/migrations/2026/10/1790913600000-AddAccountMfa";
import { AddAccountPreferences1790917200000 } from "../../../../src/db/migrations/2026/10/1790917200000-AddAccountPreferences";
import { AddAccountSessions1790920800000 } from "../../../../src/db/migrations/2026/10/1790920800000-AddAccountSessions";
import { AddAccountProviders1790924400000 } from "../../../../src/db/migrations/2026/10/1790924400000-AddAccountProviders";
import { AccountProvidersController } from "../../../../src/accounts/account-providers.controller";
import { AccountProvidersService } from "../../../../src/accounts/account-providers.service";
import { ApiAbuseGuard } from "../../../../src/security/api-abuse.guard";

export interface AnalyticsIntegrationContext {
  readonly app: INestApplication;
  readonly db: DataSource;
  readonly service: AnalyticsService;
  readonly password: string;
  readonly origin: string;
}

export type AnalyticsIntegrationContextProvider =
  () => AnalyticsIntegrationContext;

// Register one lifecycle for all scenarios. The database is disposable and shared
// only within this suite; splitting it into independent suites would race TRUNCATE.
export function setupAnalyticsIntegration(): AnalyticsIntegrationContextProvider {
  let app: INestApplication;
  let db: DataSource;
  let service: AnalyticsService;
  let context: AnalyticsIntegrationContext | undefined;
  const password = "private integration password";
  const origin = "http://127.0.0.1:3000";
  beforeAll(async () => {
    db = new DataSource({
      type: "postgres",
      url: `postgres://postgres:test-local-only@127.0.0.1:${Number(process.env.OWNER_INTEGRATION_PORT ?? 55439)}/owner_test`,
      migrations: [
        AddQrAnalytics1790899200000,
        AddPublicAccounts1790902800000,
        UseAdminAndClientRoles1790906400000,
        IndexSecurityActivity1790910000000,
        AddAccountMfa1790913600000,
        AddAccountPreferences1790917200000,
        AddAccountSessions1790920800000,
        AddAccountProviders1790924400000,
      ],
    });
    await db.initialize();
    await db.query(
      "CREATE TABLE IF NOT EXISTS reference_app_data (id integer PRIMARY KEY, value text); INSERT INTO reference_app_data VALUES(1, 'preserve me') ON CONFLICT DO NOTHING"
    );
    await db.runMigrations();
    // This database belongs exclusively to the temporary test container.
    await db.query(
      "TRUNCATE webdev_account_sessions, webdev_accounts, webdev_mfa_methods, webdev_mfa_recovery_codes, webdev_mfa_challenges, webdev_account_tokens, webdev_mail_outbox, webdev_runtime_state, webdev_runtime_queue, webdev_owner_account, webdev_qr_events, webdev_qr_daily_stats, webdev_analytics_access_audit"
    );
    const config = new ConfigService({
      QR_ANALYTICS_ENABLED: "true",

      OWNER_SESSION_SECRET: "test-secret-unique-to-temporary-integration-only",
      OWNER_PASSWORD_HASH: await hashOwnerPassword(password),
      OWNER_ALLOWED_ORIGINS: origin,
      NODE_ENV: "test",
      MFA_ENCRYPTION_KEY: Buffer.alloc(32, 7).toString("base64"),
    });
    const module = await Test.createTestingModule({
      controllers: [
        AnalyticsController,
        OwnerController,
        AccountController,
        MfaController,
        AccountProvidersController,
      ],
      providers: [
        // Account-service limits are exercised here; global budgets have a separate HTTP/storage suite.
        { provide: ApiAbuseGuard, useValue: { protect: async () => true } },
        AnalyticsService,
        AnalyticsStore,
        AccountService,
        TurnstileService,
        AuthMailService,
        MfaCrypto,
        MfaService,
        AccountProvidersService,
        { provide: ConfigService, useValue: config },
        { provide: DataSource, useValue: db },
      ],
    }).compile();
    app = createApp(module.createNestApplication());
    await app.init();
    service = app.get(AnalyticsService);
    Object.assign(app.get(AuthMailService), {
      provider: { send: jest.fn().mockResolvedValue(undefined) },
    });
    context = { app, db, service, password, origin };
  }, 15000);
  afterAll(async () => {
    await app?.close();
    if (db?.isInitialized) await db.destroy();
  });
  beforeEach(async () => {
    await db.query("DELETE FROM webdev_runtime_state");
  });

  return () => {
    if (!context) {
      throw new Error("Analytics integration context is not initialized");
    }
    return context;
  };
}
