# Connected sign-in providers

Implemented locally on 2026-10-02. Production rollout is pending.

## Account behavior

Security → Providers supports explicit GitHub connection/disconnection and adding
an email to accounts that do not have one. Confirmed email is immutable here.
GitHub usernames are displayed after a successful provider authentication; old
connections without a stored username remain usable.

- GitHub connection uses the existing OAuth application, state cookie and PKCE.
  The intent is bound to the originating authenticated session and account
  revision, expires after ten minutes, and can be consumed once. Logout, session
  expiry or account-wide revocation invalidates the connection intent. A GitHub
  identity already connected elsewhere cannot be moved by this flow.
- Email addition uses the existing transactional encrypted outbox and SMTP worker.
  The account email is unchanged until the user confirms a single-use 24-hour link
  delivered to the proposed address. Resending or cancelling invalidates earlier
  intents. Cancelled, expired and revision-stale intents cannot confirm an email;
  the worker drops stale mail instead of sending it. A unique index arbitrates
  competing confirmations for the same address.
- GitHub-only users confirm an email, sign in again through GitHub and set a site
  password under Security → Password. Passwords require 12–128 characters.
  GitHub can then be disconnected without losing password access. The primary
  administrator can retain its existing username/password login without email.
- Connecting/disconnecting GitHub, confirming a newly added email and setting a
  backup password rotate the account revision and end existing sessions.
  Existing MFA methods and recovery codes remain intact; a new sign-in still
  requires MFA. These changes require a sign-in from the last 15 minutes and,
  when MFA is enabled, an MFA proof from the last five minutes. Cancelling a
  pending email requires an active session and origin verification, without
  requiring fresh proof.
- Provider mutations require a trusted Origin, account-scoped authorization,
  rate limits and transactional revision checks. OAuth tokens are neither stored
  nor returned to the UI. Confirmation tokens are stored as hashes with encrypted
  outbox payloads; private database/provider errors are suppressed in logs.

The configured primary administrator GitHub ID is reserved. A normal OAuth
login no longer silently reconnects that identity after it was disconnected.
For an installation without that connection, sign in with the administrator
password and explicitly connect GitHub in Providers.

## Configuration and local operation

Use the existing account configuration, without replacing any secrets:

- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_OWNER_ID`,
  `GITHUB_CALLBACK_URL`. The callback path is `/api/owner/github/callback` and
  must also be registered on the GitHub OAuth application. Use a local callback
  for local development and an HTTPS production callback for production.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM_EMAIL`,
  `SMTP_USE_SSL`. TLS verification stays enabled. The worker uses the first
  `OWNER_ALLOWED_ORIGINS` entry for confirmation links; make that the intended
  public origin. Presence of configuration does not prove SMTP delivery.
- Preserve `OWNER_SESSION_SECRET`, `OWNER_PASSWORD_HASH`, exact
  `OWNER_ALLOWED_ORIGINS`, and the existing dedicated `MFA_ENCRYPTION_KEY` /
  `MFA_ENCRYPTION_KEY_ID`. Mail encryption depends on the session secret; changing
  it can invalidate pending outbox entries. MFA key replacement can lock enrolled
  users out. Follow [the MFA runbook](account-mfa.md).

`AddAccountProviders1790924400000` adds `github_username`, token `target_email`,
mail `recipient`, and the `add-email` token/template purpose. It does not
modify existing linked identities, emails or MFA material. The account-only
migration runner includes it. It was applied to the persistent local account
PostgreSQL instance; integration tests use a separate disposable database.

Local migration command, from the repository root:

```sh
yarn node --env-file=backend/.env.local backend/scripts/run-account-migrations.cjs
```

Open `/account/security#providers` in an authenticated session. Enter an address
you control, open the email confirmation, then sign in again. For GitHub, complete
provider authorization yourself. No real email was sent and no live GitHub
connection was changed during automated validation.

## Production rollout and rollback

Apply only after the owner separately approves the production change.

1. Back up the account database and record the currently deployed backend and
   frontend releases. Verify the existing GitHub binding and password login for
   the primary administrator. Inspect only configuration presence and trusted
   URLs, never print secret values.
2. Check migration history and pending account migrations. Use the account-only
   runner in the production release environment with `DATABASE_URL`; do not
   enable TypeORM synchronization or run migrations for unrelated applications.
   Apply `AddAccountProviders1790924400000` before starting code that queries
   its columns. If earlier migrations are pending, review them separately.
3. Verify production OAuth callback registration, mail sender/origin and SMTP
   readiness. Preserve existing session and MFA keys. Deploy backend and then
   frontend from the tested revision.
4. With a disposable production account and an owner-approved mailbox, check
   connect → sign in with MFA → add/confirm email → sign in again → set backup
   password → disconnect → password sign-in. Confirm session revocation and MFA
   preservation. Verify delivery and OAuth against the real services separately
   from local mocked-provider evidence.

For rollback, prefer restoring the previous application releases while retaining
this additive schema and existing verified identities/emails. Before starting an
older mail worker, pause mail processing and mark unconsumed `add-email` intents
used and their unsent outbox entries failed, clearing encrypted payloads; old
workers do not understand this template. Do not discard confirmed emails or
provider bindings. Keep keys unchanged. Migration `down` refuses while live
email confirmations remain; it deletes `add-email` history and should be used
only after backup and a separate approved data cleanup.

## Recovery and validation evidence

If an email is not received, check pending status, spam folder, SMTP delivery
and safe outbox status/failure kind. After cancellation or expiry, request a new
confirmation. For an occupied email, use another address or recover the account
that already owns it; avoid revealing the other account. Never manually mark a
new email verified to bypass ownership proof.

A user with only GitHub must retain it until a verified password login works.
Lost MFA follows the recovery-code and verified-owner procedures in
[account-mfa.md](account-mfa.md); provider changes do not bypass MFA.

Validation: 18 HTTP/PostgreSQL integration tests, including six new provider
scenarios (complete lifecycle, stale links/outbox, competing email confirmations,
security gates, transactional rollback, bound OAuth); 29 related backend unit
tests; 27 frontend tests, including six provider tests. Frontend typecheck,
backend build and scoped ESLint passed. Desktop and 390px mobile previews were
reviewed with fixture data, with no page-wide horizontal overflow. Provider HTTP
responses and SMTP sends were mocked; real external delivery/authorization and
the published site remain unverified for this change.
