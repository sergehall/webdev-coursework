# Account MFA

## User flows

Open `/account/security#mfa`, then **Start 2FA setup** after a recent sign-in.
Scan the QR in an authenticator app, enter its current six-digit code and save
the ten recovery codes. The manual secret and QR are generated locally in the
browser from the enrollment response; no external QR provider receives them.
The secret disappears after confirmation/cancellation. Recovery codes are shown
once and held only in component memory, never in browser storage.

Both password and GitHub login require the second factor once enabled. A pending
HttpOnly cookie is valid for five minutes and grants no account access. Only a
successful challenge sets a full account session. Each TOTP time step and recovery
code can succeed once; concurrent requests are serialized by the account row.
Five invalid attempts lock factor verification for fifteen minutes. Repeated
requests have additional server rate limits.

Security's **Verify current session** refreshes the MFA proof without extending
the one-hour login session. Enrolled accounts need a proof from the last five
minutes for administrator access and sensitive account changes. Setup requires
a sign-in from the last five minutes. Use the explicit sign-in-again link if the
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
OAuth/session/JWT secret. Local and production keys must be independent. Keep
an encrypted, access-controlled key backup: removing a key needed by active
enrollments prevents their authenticator verification. Rotation permits one old
key for reading; this release does not automatically rewrap existing secrets.
Keep that key until every stored envelope using it has been safely migrated.
Missing configuration disables new setup; verification never bypasses an active
method because its key is unavailable.

`yarn workspace backend owner:configure:local` creates a local key only if missing,
preserving the existing key in ignored `backend/.env.local` with permissions 600.
No encryption key belongs in a `VITE_` variable, Git, logs or screenshots.

Migration `AddAccountMfa1790913600000` creates:

- `webdev_mfa_methods`: encrypted secret, pending/verified/disabled state, expiry,
  accepted time step and account-level attempt lock.
- `webdev_mfa_recovery_codes`: bcrypt hashes and single-use timestamps.
- `webdev_mfa_challenges`: hashed pending tokens bound to account revision,
  login method, attempt count, expiry and consumed state.

Use the account-only migration runner. For the dedicated local database:

```sh
yarn workspace backend build
yarn node --env-file=backend/.env.local backend/scripts/run-account-migrations.cjs
```

It accepts only the known local database or a Heroku dyno and applies its explicit
`webdev_` whitelist. It never runs unrelated course/reference migrations.

## HTTP routes

All routes are under `/api/account/mfa` (legacy `/api/owner/mfa` alias).
JSON bodies are strictly validated and never accept an account ID or role.

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
HttpOnly, SameSite=Strict, with `/api` path; OAuth state remains Lax for the normal
provider callback. Secrets/codes/tokens are excluded from account telemetry and
private error logs. Security lifecycle audit outcomes contain no code or secret.

## Validation and production status

RFC 6238 SHA-1 vectors, encryption/account binding, key rotation, replay windows,
and missing-key failure are covered by crypto unit tests. HTTP integration uses
only disposable `owner_test` PostgreSQL on port 55439; it verifies enrollment,
expiry, password/GitHub challenges, concurrency, recovery regeneration, locks,
step-up, disabling and old-session revocation, preserving another application's
sentinel data. UI tests cover the actual security windows, enrollment, one-time
code display, confirmation, pending login, recovery and expired challenges.

Local migration and configuration are applied. Production MFA code, migration
and dedicated key are **not deployed**. After explicit approval for this stage:

1. Securely provision an independent production key and its version label on
   the backend; synchronize only to the ignored production configuration file.
2. Build the reviewed code and apply the account-only migration runner from its
   Heroku release artifact before serving new backend requests.
3. Release backend, then frontend. Confirm existing unenrolled sign-in still works,
   MFA status is configured, and protected routes reject anonymous/pending access.
4. Have the user enroll their own account and save their recovery codes privately.

Do not copy Lens Lounge's live credentials, secrets, codes, tables or MFA settings.
