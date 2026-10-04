# Account MFA

## User flows

Open `/account/security#mfa`, then **Start 2FA setup** after a recent sign-in.
Scan the QR in an authenticator app, enter its current six-digit code and save
the ten recovery codes. The manual secret and QR are generated locally in the
browser from the enrollment response; no external QR provider receives them. The
secret disappears after confirmation, cancellation or the server's enrollment
deadline. Expired setup can be restarted; the API returns `setup.expiresAt` and
`MFA_ENROLLMENT_EXPIRED` for stale confirmation. Recovery codes are shown once
and held only in component memory, never in browser storage. **Copy codes**
writes them to the clipboard only on request; **Download codes** creates a
private text file locally. Neither action uploads the codes. Save them securely
and clear the clipboard after copying. The saved checkbox does not itself save
or back up codes.

Both password and GitHub login require the second factor once enabled. A pending
HttpOnly cookie is valid for five minutes and grants no account access. Only a
successful challenge sets a full account session. Each TOTP time step and
recovery code can succeed once; concurrent requests are serialized by the
account row. Five invalid attempts lock factor verification for fifteen minutes.
Repeated requests have additional server rate limits.

Security's **Verify current session** refreshes the MFA proof without extending
the one-hour login session. Enrolled accounts need a proof from the last five
minutes for administrator access and sensitive account changes. Setup requires a
sign-in from the last five minutes. Use the explicit sign-in-again link if the
session is older. This does not force enrollment for existing accounts.

Regenerate recovery codes with a fresh authenticator/recovery code; the previous
set becomes invalid. Disable MFA with a fresh code and explicit confirmation.
Enabling or disabling changes the account session revision, invalidating all old
sessions. Confirmation issues one fresh verified session; disabling requires a
new sign-in. Existing password reset does not remove an enrolled MFA method.

## Configuration and database

Server-only settings:

| Setting                          | Purpose                                     |
| -------------------------------- | ------------------------------------------- |
| `MFA_ENCRYPTION_KEY`             | Dedicated random 32 bytes, canonical Base64 |
| `MFA_ENCRYPTION_KEY_ID`          | Version label, default `v1`                 |
| `MFA_PREVIOUS_ENCRYPTION_KEY`    | Optional previous key during rotation       |
| `MFA_PREVIOUS_ENCRYPTION_KEY_ID` | Matching previous version label             |

Never reuse another application's enrollment keys or derive the key from an
OAuth/session/JWT secret. Local and production keys must be independent. Keep an
encrypted, access-controlled key backup: removing a key needed by active
enrollments prevents their authenticator verification. Rotation permits one old
key for reading; this release does not automatically rewrap existing secrets.
Keep that key until every stored envelope using it has been safely migrated.
Missing configuration disables new setup; verification never bypasses an active
method because its key is unavailable.

`yarn workspace backend owner:configure:local` creates a local key only if
missing, preserving the existing key in ignored `backend/.env.local` with
permissions 600. No encryption key belongs in a `VITE_` variable, Git, logs or
screenshots.

Migration `AddAccountMfa1790913600000` creates:

- `webdev_mfa_methods`: encrypted secret, pending/verified/disabled state,
  expiry, accepted time step and account-level attempt lock.
- `webdev_mfa_recovery_codes`: bcrypt hashes and single-use timestamps.
- `webdev_mfa_challenges`: hashed pending tokens bound to account revision,
  login method, attempt count, expiry and consumed state.

Use the account-only migration runner. For the dedicated local database:

```sh
yarn workspace backend build
yarn node --env-file=backend/.env.local backend/scripts/run-account-migrations.cjs
```

It accepts only the known local database or a Heroku dyno and applies its
explicit `webdev_` whitelist. It never runs unrelated course/reference
migrations.

## HTTP routes

All routes are under `/api/account/mfa` (legacy `/api/owner/mfa` alias). JSON
bodies are strictly validated and never accept an account ID or role.

| Route                    | Authorization / result                                                           |
| ------------------------ | -------------------------------------------------------------------------------- |
| `GET status`             | Current account; safe enrollment/code-count/session-proof state                  |
| `POST enroll`            | Current account + recent sign-in; pending QR data, ten-minute expiry             |
| `POST cancel`            | Current account; clears only pending setup                                       |
| `POST verify-enrollment` | Matching enrollment ID + code; enables, revokes old sessions, returns codes once |
| `POST step-up`           | Current account + fresh TOTP/recovery code                                       |
| `POST recovery-codes`    | Current account + fresh code; replaces recovery set                              |
| `POST disable`           | Current account + fresh code; clears factor and ends sessions                    |
| `GET challenge`          | Valid pending cookie; expiry only                                                |
| `POST challenge`         | Pending cookie + code; consumes challenge, creates full session                  |
| `POST cancel-challenge`  | Invalidates pending challenge and clears its cookie                              |

Mutations require an exact trusted Origin. Production cookies are Secure,
HttpOnly, SameSite=Strict, with `/api` path; OAuth state remains Lax for the
normal provider callback. Secrets/codes/tokens are excluded from account
telemetry and private error logs. Security lifecycle audit outcomes contain no
code or secret.

## Validation and production status

RFC 6238 SHA-1 vectors, encryption/account binding, key rotation, replay
windows, and missing-key failure are covered by crypto unit tests. HTTP
integration uses only disposable `owner_test` PostgreSQL on port 55439; it
verifies enrollment, expiry, password/GitHub challenges, concurrency, recovery
regeneration, locks, step-up, disabling and old-session revocation, preserving
another application's sentinel data. UI tests cover the actual security windows,
enrollment, one-time code display, confirmation, pending login, recovery and
expired challenges.

### Read-only production verification — 2026-10-01 (America/Los_Angeles)

At the October 1 review, the Heroku application `webdev-coursework` was at
release **v217**. The MFA route rejects anonymous access with 401. Migration
`AddAccountMfa1790913600000` is recorded and all three MFA tables exist. There
are zero verified methods. The configuration at that review had no current or
previous MFA encryption key and no key version label. This missing key prevents
setup; the earlier statement that the MFA migration had not been deployed was
stale.

The existing local development key was preserved. An independent production key
and `v1` label were staged in ignored local configuration at the time of the
review. Verify current key custody and configuration before using this
procedure. No remote configuration, schema or release was changed in that
review. The review did not establish whether those UI/API changes were
subsequently published.

### Rollout procedure from the October 1 review

Before an authorized production release, recheck live state and update these
dated steps:

1. Record the current backend release and frontend deployment immediately before
   release; retain the existing database backup and a secure key backup. Recheck
   live key presence and enrollment count. If someone configured a key since
   this review, preserve it and reconcile it with the staged key before
   proceeding.
2. Release the reviewed backend to the existing Heroku application. Its existing
   Procfile release hook runs `yarn --cwd backend migration:run:accounts`, using
   only the explicit account migration whitelist. The MFA migration was applied
   at the October 1 review; verify the current migration history before release.
   Do not drop/recreate its tables or run the general migration runner. The
   release must fail if any whitelisted migration remains pending.
3. Provision the reviewed `MFA_ENCRYPTION_KEY` and `MFA_ENCRYPTION_KEY_ID`
   securely, without putting values in terminal output, shell history or command
   arguments. Verify availability and preserve an access-controlled backup. Do
   not set any `VITE_` key variable. Key provisioning restarts the Heroku
   application.
4. Release frontend after backend, because the UI now expects `setup.expiresAt`.
   Verify ordinary sign-in, `configured: true` in an authenticated MFA status,
   no-store responses, Secure/HttpOnly cookies and rejected pending-session
   access.
5. The user enrolls their own authenticator and privately saves recovery codes.
   Verify password and GitHub continuation, a recovery sign-in, recent step-up,
   regeneration and session revocation using an authorized test account. Never
   capture live setup secrets or recovery codes in screenshots or logs.

### Rollback and lost-device recovery

For a frontend failure, restore the recorded previous frontend deployment first.
For a backend failure, roll back to a recorded MFA-capable release verified
immediately before the change, then verify both ordinary and enrolled sign-in.
Release v217 was the reference on October 1, 2026, not a permanent rollback
target. Keep the MFA schema and encryption key: rolling code back must not
remove protection or make enrolled secrets unreadable. Once any account enrolls,
removing the key is not a safe rollback. Do not restore a shared database
wholesale or run this migration's destructive `down` method as part of rollback.

A lost authenticator can be recovered by signing in with an unused recovery
code, then disabling MFA with another fresh recovery code and signing in again
before enrolling a replacement device. Regeneration invalidates the previous
set. A password reset never removes MFA. If both device and recovery codes are
lost, there is no self-service bypass: arrange a separately reviewed
identity-verification and audited recovery procedure. Do not change account rows
or replace the key to bypass verification.

### Evidence from this review

- 26 backend crypto/session unit checks and 12 isolated HTTP/PostgreSQL
  integration checks passed. Integration includes the complete MFA lifecycle,
  real HTTP GitHub callback with a mocked provider, CSRF, invalid DTOs, expiry,
  concurrency, missing encryption key, recovery, locks and session revocation.
  No live GitHub account or authenticator app was used.
- Eight focused UI tests passed, including expiry removal, network retry,
  one-time code display, copy/download and explicit disable confirmation.
- Both TypeScript checks, changed-file lint and backend/frontend production
  builds passed. Desktop (1280 px) and mobile (390 px) disabled-state Security
  UI were visually inspected on a disposable local account, with no horizontal
  overflow. Enrollment/recovery UI behavior was verified by component tests; a
  physical authenticator and live production enrollment remain for the approved
  rollout.
