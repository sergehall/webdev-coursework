# Analytics and account integration tests

The Jest entry point remains `src/analytics/analytics.integration.spec.ts`.
It registers 19 scenarios in the original order and keeps the existing
`OWNER_INTEGRATION_TEST` opt-in.

## Structure

- `support/test-environment.ts`: PostgreSQL connection, migrations, test-only
  Nest application, mock mail provider, and shared setup/teardown hooks.
- `scenarios/mfa.scenarios.ts`: enrollment, login challenges, recovery codes,
  replay protection, step-up, and encryption-key failure.
- `scenarios/active-sessions.scenarios.ts`: pagination, filtering, account
  isolation, credential redaction, logout, and revocation.
- `scenarios/profile-preferences.scenarios.ts`: profile identity and validated
  account preferences with role restrictions.
- `scenarios/qr-reporting.scenarios.ts`: report access, QR deduplication,
  persistence retry, and owner password rotation.
- `scenarios/registration-mail.scenarios.ts`: registration, confirmation,
  password reset, durable mail rollback, and SMTP retry/claims.
- `scenarios/access-security.scenarios.ts`: primary-admin permissions, session
  invalidation, one-time OAuth state, proxy trust, and security audit pagination.
- `scenarios/account-providers.scenarios.ts`: recovery email, backup password,
  GitHub linking/unlinking, races, replay, and provider-specific access gates.
  Its local fixture functions belong only to these scenarios.

The context provider is called inside each test or fixture, after `beforeAll`
initializes the app. Scenario files register tests; they do not start their own
applications, connections, or Jest suites.

## Lifecycle and isolation

The suite uses one Nest application and one disposable PostgreSQL database.
Migrations and table truncation run once in `beforeAll`; `beforeEach` clears
runtime state, matching the original tests. Jest restores spies between tests.

Persisted accounts, mail, and analytics can survive between scenarios. Do not
run these scenario registrations concurrently or turn them into independent
`*.spec.ts` files sharing the same database. Independent execution requires
separate database/schema isolation and self-contained fixtures first.

The `reference_app_data` sentinel remains to verify preservation of unrelated
tables. Never point the suite at application or production data.

## Running

Use a disposable PostgreSQL container at `127.0.0.1:55439`, with database
`owner_test`, user `postgres`, and password `test-local-only`:

```sh
OWNER_INTEGRATION_TEST=true yarn workspace backend test --runInBand \
  --testPathPattern=analytics.integration.spec.ts
```

`OWNER_INTEGRATION_PORT` selects a different port on a separate disposable
container. The host, database, and credentials remain fixed. Without the opt-in,
all 19 scenarios are discovered and skipped.

These are integration tests against real PostgreSQL and HTTP endpoints. The
mail sender, GitHub network responses, and global abuse guard are test doubles;
account-service limits remain exercised. Global abuse budgets have their own
HTTP/storage suite.
