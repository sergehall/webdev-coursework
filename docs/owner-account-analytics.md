# Accounts and presentation analytics

Account UI uses the profile, preferences, security and popup-menu patterns from
Serge's `usacosmetologist`, adapted to the portfolio theme. No booking or email
inbox is included. Authentication emails use the existing SMTP provider.

## Routes and roles

- `/account/login`: GitHub or username/email plus password.
- `/account/register`: GitHub signup or email/password registration.
- `/account/verify-email`, `/account/resend-verification`.
- `/account/forgot-password`, `/account/reset-password`.
- `/account/overview`, `/account/profile`, `/account/preferences`, `/account/security`.
- `/account/administration`: administrator reports and security activity.

Old `/owner/*` UI/API routes remain compatible aliases. New accounts are `client`
and never choose their own role. Serge's fixed primary administrator account is
`admin`, identified by the configured stable GitHub ID. Only this account can
list clients and change roles; assigned admins can view reports but cannot manage
roles. The primary account cannot be demoted. Role changes, password changes and
session revocation invalidate existing sessions on the next request.

All protected requests check the authoritative database role, account ID, session
revision and expiry. Clients can update only their own profile/preferences.
Sessions are random opaque HttpOnly, SameSite=Strict cookies lasting one hour.
The cookie path is `/api`. Mutations require an exact trusted Origin. Auth routes
return `Cache-Control: no-store`; logs exclude bodies, query values, IPs and UA.
Unexpected account errors omit database/provider details. Sentry excludes account
pages/breadcrumbs to avoid retaining email confirmation URLs.

## Database and queue

Migrations create only `webdev_` account, mail, runtime and QR tables. They do not
change `usacosmetologist` data. `synchronize` stays disabled. The old singleton
owner table is preserved and its profile/password is copied into the new account.
A follow-up migration converts legacy role labels to `admin`/`client`.

Leave `REDIS_URL` empty to use the existing PostgreSQL for durable sessions, TTL
rate limits and bounded event batches. A PostgreSQL advisory lock serializes
flush workers across instances. Redis/BullMQ remains an optional local setup.
PostgreSQL is the documented exception to the analytics skill's default Redis
runtime, required by the user's instruction not to buy additional services.
This adds small transient runtime writes to the existing database.

## Email security and delivery

Configure server-only `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`,
`SMTP_FROM_EMAIL`, `SMTP_USE_SSL`. Port 465 uses implicit TLS; port 587 requires
STARTTLS. TLS certificates are verified. The existing sender address remains
configured for the SMTP service; the display name is Web Engineering Portfolio.

Registration and its email intent commit in one transaction. Accounts stay
unverified until the user submits the confirmation page. Password login requires
confirmed email, except the primary administrator's pre-existing backup password.
GitHub creates a separate account by GitHub numeric ID, never auto-links by email,
and requests no email/repository scopes. GitHub-only accounts manage their password
through GitHub; session controls remain available.

Verification links expire in 24 hours, reset links in one hour. Tokens are random,
hashed in the token table, used once with row locks and encrypted with AES-256-GCM
in the outbox. Links carry the token in a URL fragment; the UI removes it from the
address bar, then submits a POST only after an explicit click. Email scanners'
GET requests do not consume links. Reset changes the account's revision, invalidating
sessions and other old reset links. Unknown/existing email requests get the same
response; IP/global/email rate limits constrain abuse.

A PostgreSQL worker claims outbox rows with SKIP LOCKED leases. SMTP runs outside
HTTP requests, retries transient failures with bounded backoff, stops after five
attempts and records only a categorical failure kind. Sent/failed rows scrub token
ciphertext. SMTP is at-least-once delivery: a crash after accepted SMTP submission
can resend the same link. Stable Message-ID helps threading but is not provider
idempotency. No claim of exactly-once email delivery is made. Outbox statuses are
available for support in `webdev_mail_outbox`; automatic replay of terminal failures
is deliberately absent.

## Enable and production configuration

1. Build the backend and run `migration:run:accounts` in the named Heroku app.
   This script applies only the account/QR migrations and the activity pagination index with SQL parameter logging disabled;
   it does not run unrelated course migrations. Locally use `migration:run:local`.
2. Set `QR_ANALYTICS_ENABLED=true`, a random `OWNER_SESSION_SECRET` (32+ characters),
   an initial scrypt `OWNER_PASSWORD_HASH`, and exact `OWNER_ALLOWED_ORIGINS`.
   The first origin is the fixed OAuth/email return destination; HTTPS in production.
3. Set the four GitHub variables and SMTP variables. Set `ALLOWED_ORIGINS` for
   credentialed CORS. Frontend/backend must share a site for SameSite cookies.
4. Set frontend `VITE_QR_ANALYTICS_ENABLED=true` and `VITE_OWNER_API_URL` to the
   backend API origin in production. Never put server secrets in Vite variables.
5. Deploy code, apply migrations before enabling accounts, then verify real login.
   Configuration synchronization alone does not deploy the feature.

| Environment | OAuth settings | Callback |
| --- | --- | --- |
| Local | https://github.com/settings/applications/3895888 | http://127.0.0.1:3000/api/owner/github/callback |
| Production | https://github.com/settings/applications/3895889 | https://api.webdev-coursework.com/api/owner/github/callback |

Separate GitHub secrets are stored in ignored backend `.env.local` and
`.env.production.local`, permissions 600. The latter is staging only, never loaded
by development or committed. SMTP/OAuth values have been synchronized to Heroku;
no database URL was copied. SMTP TLS/authentication was verified without sending
an email.

### Production rollout — 2026-10-01 UTC

- Backend code `2aae82d` was released to the existing Heroku app as v209.
- All four account migrations were applied, including the security activity index;
  unrelated quiz and reference application migrations were excluded.
- Account/QR features are enabled. `/health` and `/api/account/login-options`
  returned 200, with registration and GitHub sign-in available.
- Production frontend configuration points account requests to
  `https://api.webdev-coursework.com`. The existing Vercel project deploys the
  GitHub `main` branch to `https://webdev-coursework.com`.
- MFA remains the next stage. No production MFA enrollment is enabled by this release.

## Local runtime and validation

`yarn workspace backend owner:configure:local` creates ignored local config.
Start `docker compose --env-file backend/.env.local -f compose.local.yml up -d --wait`,
run `yarn workspace backend migration:run:local`, then start backend and Vite.
Dedicated local PostgreSQL uses port 55432. Account requests go through Vite's
local `/api` proxy using `VITE_OWNER_API_URL=`; course API configuration stays intact.
Local volumes persist; do not erase them with `down -v`.

Unit tests: `yarn workspace backend test --runInBand --testPathPattern='analytics.service.spec.ts|auth-mail.spec.ts'`.
The integration suite uses only a disposable PostgreSQL container at port 55439,
database `owner_test`, password `test-local-only`. It truncates its own test tables;
never point it at local application data or production. Run with
`OWNER_INTEGRATION_TEST=true yarn workspace backend test --runInBand --testPathPattern=analytics.integration.spec.ts`.
It checks registration/confirmation/reset, replay, transactional rollback, SMTP
retry/claims, account isolation, role restrictions, session invalidation, anonymous
QR deduplication and preservation of another application's sentinel table.

## QR collection and retention

Only the QR URL marker `source=esl10g-presentation-qr` sends events. Shared links
also count; this is not proof of a physical scan or unique visitor. The server
records UUID, campaign, server time and coarse device/OS/browser categories.
No names, raw IP/UA, precise model or user account identifiers enter QR data.
IP/email HMAC keys exist only in TTL rate-limit state; they are not reported.
Reports query UTC daily aggregates. Event retries cannot inflate counts. Failed
batches remain staged. Events retain 30 days; aggregates/access audits 365 days;
mail history 30 days and expired token records seven additional days.

On Heroku, only the router hop is trusted (`trust proxy=1`, gated by `DYNO`),
using the rightmost client address appended by [Heroku routing](https://devcenter.heroku.com/articles/http-routing)
with [Express trusted-hop handling](https://expressjs.com/en/guide/behind-proxies.html).
Other deployments must explicitly configure their trusted infrastructure. Monitor failed outbox rows and queue
capacity. MFA is the next stage, documented in [account-plan.md](account-plan.md).

Security activity loads 10 records by default, with server-side period, result and action-group filters. Keyset pagination fetches only the requested page (10/25/50), with a stable timestamp/UUID cursor and an indexed order. No bulk history request is used.
