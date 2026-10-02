# Account development plan

## Current stage: accounts and QR analytics

Account presentation follows [account-design-standard.md](account-design-standard.md):
graphite surfaces, neutral dividers, a muted sage accent and a centered 1100px
workspace. Shared theme tokens cover the account pages and signed-in header menu.

- Public GitHub sign-in and account creation, bound OAuth state and PKCE.
- Username/email and password sign-in; separate registration and email confirmation pages.
- Password reset, single-use expiring links, encrypted transactional email outbox.
- Reuse the existing SMTP configuration from `usacosmetologist`; no new paid services.
- Reuse its account layout/profile/preferences/security/menu patterns in the portfolio style.
- New accounts always have role `client`; privileged accounts have role `admin`.
- Only Serge's primary administrator can assign/revoke administrator roles; its own role is protected.
- Keep profile/preferences/session changes scoped to the signed-in account.
- Keep QR reports and security activity restricted to administrators.
- Load security activity in pages of 10 by default, with server-side period,
  action type and result filters and optional page sizes of 25 or 50.
- New tables use `webdev_`; preserve the other application's tables and database configuration.
- Verify locally; synchronize authorized SMTP/OAuth configuration to production.
- Production code rollout and migrations must be explicitly recorded as deployed or pending.

## Current local stage: MFA adapted from Lens Lounge

Serge updated the reference to `/Users/sergehall/WebstormProjects/lens-lounge-microservices`
and `https://lens-lounge.com/dashboard/security#mfa` on 2026-10-01 (America/Los_Angeles).
Its backend TOTP service, enrollment/recovery service, Security page/panel and MFA
challenge form were inspected. Lens Lounge and Lavoval accounts, keys and live
MFA settings are unchanged.

Implemented locally:

- Security opens Overview by default, with the account summary, setup signals and
  GitHub / recovery-email settings. The summary and reminders share one compact
  panel; sign-in and recovery use two standalone cards. Site username/password,
  authenticator/recovery codes and devices belong to Password / Two-factor / Sessions
  respectively. These subwindows contain their own settings
  without repeating the overview. Legacy `#providers` links still open Overview.
  The panels use actual account data and the shared account theme tokens.
- Local QR generation, temporary manual secret, expiring enrollment and confirmation.
- Password and GitHub login both stop at a restricted, expiring MFA challenge.
  A full opaque session is issued only after verification.
- Six-digit TOTP with replay protection and account-serialized verification.
- Ten bcrypt-hashed single-use recovery codes, shown once; explicit regeneration
  and disabling require a fresh code. Enabling and disabling revoke old sessions.
- Recent sign-in for enrollment and recent MFA proof for protected administrator
  access, username changes, password changes and session revocation.
- Dedicated versioned AES-GCM key and per-account binding; no key fallback to JWT
  or another application. Local configuration is ignored and mode 600.
- Migration `AddAccountMfa1790913600000` creates only three `webdev_mfa_` tables;
  the account-only migration runner includes it. Applied only to local data.
- Lifecycle outcomes appear in Security activity; history stays paginated.

Verification: frontend full suite (276 tests), backend unit suite (99 tests), and
HTTP e2e suite (13 tests), and isolated PostgreSQL integration suite (9 tests). Desktop/mobile Security
was reviewed with no live authenticator enrollment or recovery codes exposed.

Production MFA activation is pending. A read-only check on 2026-10-01
(America/Los_Angeles) confirmed Heroku v217 already includes the MFA migration
and its three tables, but no MFA encryption key is configured and no accounts
have verified MFA. The earlier migration-pending status was stale.

The development key is preserved; an independent production key is staged in
ignored mode-600 configuration. This review adds server enrollment deadlines,
automatic UI secret removal on expiry, copy/download for recovery codes and
network-error retry for pending login. It verifies 26 backend unit checks,
12 HTTP/PostgreSQL integration checks, eight MFA UI checks, typechecks, focused
lint, builds and desktop/mobile disabled-state UI. Production changes still
require the user's separate confirmation. See [account-mfa.md](account-mfa.md)
for the concrete release, migration, rollback and lost-device recovery procedure.

## Current local stage: connected providers

Security → Providers now supports explicit GitHub connection/disconnection,
verified email addition, and backup password setup for GitHub accounts. Account
revision changes invalidate earlier sessions while retaining MFA. The last
working sign-in method cannot be disconnected. The local provider migration
is applied; production deployment is pending.

Configuration, validation evidence, deployment and rollback are recorded in
[account-providers.md](account-providers.md).
