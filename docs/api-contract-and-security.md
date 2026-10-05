# API contract and abuse protection

The generated OpenAPI document is the runtime API contract. Swagger is
configured in `backend/src/bootstrap/configure-swagger.ts`. Controllers declare
business operations; request DTOs describe validation, response DTOs describe
safe output, and reusable decorators describe errors and authentication.

## Documentation access

| Environment      | Default  | Explicit enablement                                     |
| ---------------- | -------- | ------------------------------------------------------- |
| Development/test | Enabled  | `SWAGGER_ENABLED=false` disables it                     |
| Production       | Disabled | `SWAGGER_ENABLED=true` plus dedicated Basic credentials |

Production enablement requires `SWAGGER_USERNAME` (no colon) and a separate
`SWAGGER_PASSWORD` of at least 24 characters. Use a random password, HTTPS and
the deployment's secret manager. Do not reuse an account password, admin API key
or JWT signing secret. The same access control protects `/docs`, its assets,
`/openapi.json` and `/openapi.yaml`, including trailing-slash variants.
Responses are marked `no-store` and `noindex, nofollow`; Basic-protected
documentation has an additional 30-requests/minute/IP budget, including
unsuccessful authentication. Missing required production configuration fails
startup. `/info.docsEnabled` reports the actual policy, and the API landing page
hides a disabled docs link.

Swagger does not persist authorization in localStorage. Requests in the UI are
disabled by default until explicitly enabled by the reader. Browser cookie
authentication uses the browser's cookie jar; Swagger cannot manufacture an
HttpOnly session cookie through its Authorize dialog.

## Route groups and authentication

The API includes the following route groups and system operations. `/api/owner`
is a compatibility alias for the corresponding account and MFA operations; it
does not grant administrative privileges. Aliases have distinct stable operation
IDs for generated clients and share request budgets.

| Routes                                                                                                           | Authentication and behavior                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/account/register`, `/resend-verification`, `/forgot-password`                                              | Public, trusted Origin; asynchronous email intent; non-enumerating 202                                                                         |
| `/api/account/verify-email`, `/reset-password`                                                                   | Public, trusted Origin; single-use email token                                                                                                 |
| `/api/account/login-options`, `/login`, `/github/start`, `/github/callback`                                      | Public sign-in; login requires trusted Origin and shared IP, account and global attempt budgets; OAuth uses single-use cookie-bound state      |
| `/api/account/session`, `/sessions`, `/profile`, `/preferences`, `/password`, `/revoke-sessions`                 | Account session; writes require trusted Origin; sensitive changes require fresh MFA when enabled                                               |
| `/api/account/logout`                                                                                            | Active account session and trusted Origin; revokes the current session                                                                         |
| `/api/account/providers` and provider mutations                                                                  | Account session; identity changes require recent sign-in/fresh MFA; completed changes revoke sessions                                          |
| `/api/account/providers/github/connect`                                                                          | Account session; cookie-bound OAuth intent; provider URL response                                                                              |
| `/api/account/mfa/status`, `/enroll`, `/cancel`, `/verify-enrollment`, `/disable`, `/recovery-codes`, `/step-up` | Account session; writes require trusted Origin; enrollment requires recent sign-in                                                             |
| `/api/account/mfa/challenge` GET/POST                                                                            | MFA challenge cookie; POST requires trusted Origin; five failed proofs exhaust a challenge                                                     |
| `/api/account/mfa/cancel-challenge`                                                                              | Trusted Origin; idempotent cookie cleanup                                                                                                      |
| `/api/account/analytics`, `/audit`                                                                               | Administrator session; fresh MFA when enabled                                                                                                  |
| `/api/account/accounts`, `/accounts/:id/role`                                                                    | Primary administrator only; role changes invalidate affected sessions                                                                          |
| `/api/analytics/qr-events`                                                                                       | Anonymous 202 intake; event ID deduplication; aggregation is asynchronous                                                                      |
| `/quizzes/*`, `/tokens/*`                                                                                        | Public practice reads/progress/token issuance; answers require quiz-bound bearer token; quiz creation/token verification require `x-admin-key` |
| `/health`, `/info`, `/`, `/robots.txt`                                                                           | System operations; outside the API throttle; health uses the existing circuit breaker                                                          |

New passwords must have at least 15 characters and are checked server-side
against a local common-password blocklist and current account identifiers at
registration, password setup and authenticated password change. Password reset
checks the common-password blocklist. Rejected passwords return the stable
`PASSWORD_TOO_COMMON` error code; existing passwords remain valid. Password
candidates never leave the backend for this check.

The account session cookie is `webdev_owner` locally and `__Secure-webdev_owner`
in production. The MFA challenge cookie is `webdev_mfa` locally and
`__Secure-webdev_mfa` in production. Both are opaque HttpOnly cookies scoped to
`/api`, with SameSite Strict and Secure in production. OAuth state uses a
separate SameSite Lax cookie for the provider redirect. OpenAPI names these
security schemes `account-session`, `mfa-challenge`, `answersToken` and
`adminKey`; account authentication is not JWT bearer auth.

Practice JWTs default to a five-minute expiry; configured TTLs must be positive
seconds or s/m/h durations up to one hour. Verification allows HS256 only,
checks configured issuer/audience and caps token age at one hour, including
previously issued tokens without an explicit expiry. Production signing secrets
require at least 32 characters.

Public answer-token issuance is a **client-practice** contract. It does not
protect a graded exam; anyone can request a practice token. The canonical
[assessment standard](quiz-assessment-standard.md) defines the separate graded
assessment boundary. This change does not migrate assessments or alter content.

## Throttling and bot abuse controls

`SecurityModule` registers `ApiAbuseGuard` as a global guard. All matched
`/api/*`, `/quizzes/*` and `/tokens/*` requests share these fixed windows.
Bootstrap middleware runs the same protection before JSON/body parsing; the
global guard reuses that result. Unknown API paths and malformed JSON therefore
consume budgets too, before controller guards, DTO validation and uploads:

| Bucket    | Limit                 | Scope                                                                                                                           |
| --------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Burst     | 20 requests / second  | All API operations per IP                                                                                                       |
| API       | 120 requests / minute | All API operations per IP                                                                                                       |
| Writes    | 30 requests / minute  | POST/PUT/PATCH/DELETE together per IP                                                                                           |
| Sensitive | 10 requests / minute  | Token routes, login, registration, email/password links, MFA, provider, OAuth and session-revocation operations together per IP |

Requests rejected by validation or authorization still count. Rotating
endpoints, aliases, session cookies or forged forwarding headers does not reset
these budgets. IPv4-mapped IPv6 shares its IPv4 bucket; IPv6 privacy addresses
share a `/64` bucket. Shared-office/NAT clients also share their IP's budget.
OPTIONS preflight requests are exempt. Existing service limits remain in force:
password login 5/IP/15 minutes and 100/global/15 minutes; public authentication
10/IP/15 minutes and 200/global/hour; email delivery 3/address/hour; MFA actions
and challenges have additional account/IP limits and proof-attempt limits.

Public `/uploads/*` image reads (including HEAD and cache-busting queries) also
consume the shared burst/API budgets before contacting object storage. Image
storage allows at most eight concurrent reads per backend process, rejects
additional work with 503 instead of queuing it, and aborts reads after ten seconds.
The existing 5 MiB per-image limit remains in effect. A CDN can cache successful
immutable responses; limits still protect direct origin requests.

Global rejections return 429 with `Retry-After` seconds and
`Cache-Control: no-store`. Existing account-specific limit errors also return
429 but may omit Retry-After. CORS exposes this header to trusted frontend
origins. Clients must back off and should not automatically repeat
email/password/provider mutations.

Counters use atomic PostgreSQL upserts in the existing `webdev_runtime_state`
table. They do not depend on `QR_ANALYTICS_ENABLED`. No process-local production
counters or per-process fallbacks are used. Replicas must share storage and the
same HMAC secret. Storage failure returns 503 instead of allowing unmetered
requests. PostgreSQL counters cap denied counts to prevent integer overflow;
bounded expiration cleanup runs every minute even when QR analytics is disabled.
Counter keys contain HMAC address digests, never raw IPs.

Set a dedicated `API_THROTTLE_SECRET` of at least 32 characters, or use the
existing server-only `OWNER_SESSION_SECRET`/`QUIZ_ANSWERS_JWT_SECRET` fallback.
Apply the repository's account/runtime-state migrations before starting the API,
even when account features are disabled. The PostgreSQL startup probe verifies
that the runtime-state table exists. No new migration is required by this
change.

Heroku continues to trust exactly one router hop. Elsewhere proxy trust is off
unless `TRUST_PROXY_CIDRS` lists the actual infrastructure proxy networks. Never
configure all addresses as trusted. Restrict direct access around that proxy so
client-supplied headers cannot impersonate its source address.

Untrusted Origin headers and cross-site Fetch Metadata are rejected on writes.
Configured trusted cross-site frontends remain supported. These headers are
browser CSRF signals, not evidence that a caller is human. Account services also
enforce their existing exact Origin allowlist. CORS requires explicit
`ALLOWED_ORIGINS` in production; an empty allowlist cannot expose credentialed
responses to arbitrary websites. Non-browser clients without Origin remain
supported by public practice endpoints.

These controls constrain automated bursts, credential guessing and repeated
mail/MFA abuse. They do not establish human identity or stop distributed,
low-rate botnets or network-level DDoS. A deployment requiring that boundary
needs edge bot management/WAF and/or a separately integrated human challenge.
Cloudflare Turnstile can provide a human challenge for configured account and
API documentation flows; see [the Turnstile guide](cloudflare-turnstile.md). A
User-Agent blocklist is not used.

Security headers include no-referrer, nosniff, the existing CSP/frame
protections, and HSTS on HTTPS responses. Express's X-Powered-By header is
disabled.

## Contract structure and examples

```text
backend/src/bootstrap/configure-swagger.ts       # OpenAPI and protected UI
backend/src/swagger/api-contract.decorator.ts   # shared success/auth/errors
backend/src/swagger/api-error.dto.ts            # error shape
backend/src/accounts/*response.dto.ts           # account/provider/session output
backend/src/accounts/mfa/mfa-response.dto.ts     # MFA output
backend/src/analytics/analytics-response.dto.ts  # report/activity output
backend/src/security/                           # guard and shared counters
```

New operations use a concrete response DTO and the reusable decorator:

```ts
@ApiContract(
  "Get provider availability and pending email",
  "Requires an active account session.",
  ProviderStatusDto,
  { auth: "session" }
)
@Get()
status(@Req() req: Request) {
  return this.providers.status(req);
}
```

Request fields declare their runtime limits and OpenAPI metadata together:

```ts
@IsString()
@MinLength(15)
@MaxLength(128)
@ApiProperty({ minLength: 15, maxLength: 128, writeOnly: true,
  example: "example-passphrase-2026" })
password!: string;
```

Account errors always include `statusCode`; `message` is a string or an array of
field-validation errors. `error` and actionable `code` are optional.
Provider/database failures use generic 503 responses without private details.
Success contracts do not expose entities, password/session hashes, account
revisions, encryption envelopes or queue internals. MFA enrollment secret and
recovery codes are intentional one-time business outputs to the signed-in user:
render/store them locally and never log them or send them to a remote QR
service.

Sessions use cursor pagination (up to five visible active records), optional
`device`/`authMethod` filters and nullable `nextCursor`. Activity supports exact
`limit`, `days`, `result`, `group` and `cursor` query enums documented in
Swagger. QR reports accept `days=7|30|90` (default 30) and return typed numeric
maps. Quiz progress mutations have empty success bodies. Multipart quiz creation
documents five images maximum, 5 MiB each and the runtime MIME allowlist; the
current implementation ignores unsupported MIME types. The route quiz ID wins
over the required body quiz ID.

## Frontend integration

`VITE_API_URL` and `VITE_OWNER_API_URL` accept an empty same-origin value or an
HTTP(S) origin without credentials, path, query or fragment. Production requires
HTTPS. The request helpers normalize a trailing slash, reject endpoint traversal
and protocol-relative URLs, use `no-store`/`no-referrer`, and refuse redirects so
password/MFA bodies cannot be replayed to a different endpoint. Progress query
values and quiz route identifiers are encoded separately from URL syntax.

All progress reads, writes and resets require bounded nonempty `clientId`,
`appId` and `courseId` strings (128, 128 and 32 characters respectively), using
letters, digits, dots, underscores, colons and hyphens, starting with a letter or
digit. Module mutations require a JSON integer from 1 to 1000. Missing, repeated,
oversized or unexpected query fields are rejected before storage access.
These identifiers remain anonymous practice selectors, not account authorization.

Use the runtime `/openapi.json` (authenticated in production) for client
generation, for example `openapi-typescript` or Orval. Operation IDs are stable
and unique for every path/method alias; nested DTO references and arrays are
explicit. No generator dependency is added to the application.

```ts
const response = await fetch("/api/account/session", {
  credentials: "include",
});
if (response.status === 429) {
  const delaySeconds = Number(response.headers.get("Retry-After") || 60);
  // Display backoff feedback; schedule reads only after this delay.
}
```

On 401, return to sign-in. On `MFA_STEP_UP_REQUIRED` or
`RECENT_SIGN_IN_REQUIRED`, follow the existing verification/re-authentication
flow. Never put server admin/Swagger credentials or throttle secrets in Vite
environment variables. Do not cache account, MFA enrollment or recovery output.

## Verification and production checklist

- Configure trusted CORS/account origins and infrastructure-only proxy trust.
- Apply account/runtime-state migrations; configure shared PostgreSQL.
- Keep HMAC secrets identical across replicas and private on the server.
- Keep production Swagger disabled, or configure dedicated Basic credentials and
  HTTPS before explicitly enabling it.
- Inspect the generated document and verify protected UI/assets/JSON/YAML.
- Verify 429/backoff, invalid requests counting, alias sharing, IPv6 grouping,
  spoofed forwarding headers, origin rejection and 503 storage failure.
- Verify counters atomically across replicas on PostgreSQL.
- Run account/MFA/provider regressions to preserve existing authorization.

Focused checks:

```sh
yarn workspace backend test --runInBand test/bootstrap/configure-swagger.spec.ts test/security/api-abuse.spec.ts
yarn workspace backend test:e2e --runInBand
yarn workspace backend check
```

The existing account integration suite and the new storage suite use disposable
test services only. Start PostgreSQL on `127.0.0.1:55439` with database
`owner_test` and password `test-local-only`:

```sh
API_SECURITY_INTEGRATION_TEST=true OWNER_INTEGRATION_TEST=true \
  yarn workspace backend test --runInBand \
  test/security/request-throttle.integration.spec.ts \
  src/analytics/analytics.integration.spec.ts
```

The storage suite creates/removes an isolated test schema. The account suite
truncates its own test tables; never route these fixed test ports to production.
Real SMTP/GitHub delivery and production edge protections require deployment
verification and are not claimed by these local tests.
