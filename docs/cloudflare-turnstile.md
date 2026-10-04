# Cloudflare Turnstile

Password and GitHub sign-in (including owner aliases and reauthentication),
email registration and GitHub sign-up require a single-use Turnstile token when
configured. Tokens are verified by the backend before credential lookup,
password hashing or account persistence, and before issuing GitHub OAuth state.
Existing origin checks, rate limits, PKCE and MFA remain in place. Managed
widgets may verify automatically; a valid server-verified token is mandatory,
while a manual checkbox click is not.

## Code domains and ownership

| Domain                            | Files                                                                                                              | Responsibility                                                                                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend security                  | `backend/src/security/turnstile/turnstile.module.ts`, `turnstile.service.ts`                                       | Exports the shared verifier, validates provider configuration and calls Cloudflare Siteverify. No account persistence, UI or Swagger cookies.                       |
| Backend accounts                  | `backend/src/accounts/account.dto.ts`, `account-response.dto.ts`, `account.service.ts`, `account.controller.ts`    | Defines registration/OAuth proof DTOs, exposes browser-safe settings, applies existing account budgets and verifies before hashing/persistence.                     |
| Existing account/session adapter  | `backend/src/analytics/analytics.module.ts`, `analytics.service.ts`, `analytics.dto.ts`, `analytics.controller.ts` | Imports `TurnstileModule` and enforces password/OAuth login for both account/owner aliases and reauthentication. Session handlers remain in their existing adapter. |
| Backend API documentation         | `backend/src/swagger/turnstile/swagger-turnstile.middleware.ts`, `swagger-turnstile.view.ts`                       | Owns the documentation gate, short-lived clearance cookie and HTML/external JavaScript presentation.                                                                |
| Backend bootstrap                 | `backend/src/bootstrap/configure-swagger.ts`, `configure-cors.ts`, `security-headers.ts`                           | Composes Basic Auth → request throttling → Turnstile, permits the same-origin verification POST, and publishes CSP.                                                 |
| Frontend account authentication   | `frontend/src/features/account/auth/turnstile-client.ts`, `TurnstileWidget.tsx`                                    | Loads the official script once and manages each widget's callbacks, retries, theme, sizing and cleanup.                                                             |
| Frontend account forms            | `frontend/src/features/account/AccountAuthPage.tsx`, `owner-api.ts`                                                | Owns the in-memory token, submission lock, fresh challenge per request, GitHub POST initiation, and stable user-facing error messages.                              |
| Frontend deployment configuration | `frontend/vite.config.ts`, `frontend/vercel.json`                                                                  | Allows the official Cloudflare script/frame in preview and deployed CSP.                                                                                            |

Security verification has no dependency on account or Swagger implementation.
Account and Swagger callers share the exported provider; each owns its action
and workflow. Presentation markup is separate from server access-control logic.

Tests follow the same boundaries: security provider tests live next to the
verifier; registration tests in `accounts/account.service.spec.ts`; widget
lifecycle tests in
`frontend/src/features/account/auth/TurnstileWidget.test.tsx`; form integration
tests in `frontend/src/features/account/AccountAuthPage.test.tsx`; HTTP
documentation/CORS tests in `backend/test/bootstrap`. Existing account and
header-policy tests retain their original locations.

Comments explain security boundaries and lifecycle decisions beside the relevant
code. `frontend/vercel.json` stays strict JSON, which cannot contain comments;
its CSP responsibility is described here and tested by
`frontend/src/config/security-headers.smoke.test.ts`. Environment and Heroku
config values are configuration, never committed documentation or browser
secrets.

## Frontend Content Security Policy

The Vercel routing middleware and Vite production preview use
`default-src 'none'` as the fallback. Every resource type used by the
application has an explicit directive. The middleware adds a fresh script nonce
to HTML responses so Cloudflare JavaScript Detections can attach it to its
injected script without allowing arbitrary inline scripts. Static assets bypass
the middleware. Normal application routes use `style-src 'self'`, so inline
style blocks and attributes are not generally allowed. React's direct
`element.style` property updates for progress and animations continue to work
under this policy.

Two disjoint path groups retain `style-src 'self' 'unsafe-inline'`:

- `/course-materials/` serves standalone teaching HTML with embedded styles;
  students may download those files and open them without the application.
- `/code-playground` embeds user-provided HTML in an opaque-origin `srcdoc`
  iframe. That iframe inherits the parent CSP, so its embedded CSS requires the
  route exception. The iframe's own CSP still blocks network access and external
  resources.

The exception does not relax `script-src`. `frontend/vercel.json` retains the
standalone course-materials CSP and other hardening headers; the app and
playground CSP comes from `frontend/middleware.ts`. The shared policy builder in
`frontend/content-security-policy.ts` also drives the Vite production preview.
When changing a policy, check the response headers for `/`, `/code-playground`,
and one `/course-materials/` HTML file, and verify the HTML preview in a
browser. Re-scan the deployed hostname after the new Vercel deployment is live.

## Configuration and web hostnames

The October 2026 configuration review used a Managed widget named
`webdev-coursework-auth` for these hosts. Verify the current Cloudflare widget
and hostname settings before a deployment change:

| Hostname                                             | Purpose                              |
| ---------------------------------------------------- | ------------------------------------ |
| `webdev-coursework.com`, `www.webdev-coursework.com` | Production login and registration UI |
| `api.webdev-coursework.com`                          | Production Swagger gate              |
| `localhost`, `127.0.0.1`                             | Local forms and documentation        |

The backend allowlist matches the returned hostname exactly. Cloudflare accepts
subdomains of an allowed parent, but the backend still checks each intended host
explicitly. Actions keep account and documentation tokens separate even though
the reviewed widget/site key was shared. The October 2026 code change did not
change Cloudflare widgets or Heroku keys.

Set these backend environment variables in ignored local backend configuration
and in the target deployment configuration:

- `TURNSTILE_SITE_KEY`: public key, returned by `/api/account/login-options`.
- `TURNSTILE_SECRET_KEY`: secret key; never put it in a `VITE_*` variable or
  commit it.
- `TURNSTILE_ALLOWED_HOSTNAMES`: comma-separated exact hostnames. For this
  project:
  `webdev-coursework.com,www.webdev-coursework.com,api.webdev-coursework.com,localhost,127.0.0.1`.

The Managed Cloudflare widget must allow the same hostnames. Pre-clearance is
unnecessary. An entirely empty configuration disables the integration; a partial
configuration fails closed. Production rejects Cloudflare dummy keys. The
frontend gets its key from the backend, so a separate frontend environment
variable is not required. Deploy the changed frontend first, then the backend,
to activate the integration in production without blocking the old login form;
setting config vars alone does not deploy code.

The verifier checks `success`, the exact hostname and the action:
`account_login`, `account_register`, or `api_docs`. It uses a five-second
timeout and does not log secrets, tokens or provider error details. Forms clear
tokens on expiry and refresh verification after each submitted attempt. Narrow
forms use the compact widget. Production CSP allows Cloudflare's official script
and frame.

## GitHub OAuth initiation

The same widget protects both password and GitHub actions on login,
reauthentication and registration pages. GitHub initiation does not require
filling password fields. Its button stays disabled until configuration loads and
verification succeeds; expiry disables both actions again.

The browser sends `POST /api/account/github/start` (owner alias also supported)
with an in-memory `turnstileToken` and `intent: login|register`. The intent
selects `account_login` or `account_register`; it grants no privileges. The
backend checks Origin and existing request limits, then redeems proof before
creating OAuth state/PKCE or setting its cookie. Tokens never enter
authorization URLs. The response returns a validated GitHub authorization URL
for browser navigation.

The legacy `GET .../github/start` rejects requests when Turnstile is configured,
even if a token is supplied in the query. With no Turnstile configuration it
retains its previous navigation behavior. The callback consumes the existing
one-time, cookie-bound state and retains MFA enforcement; it does not redeem the
already consumed Turnstile token again. Connecting GitHub from an authenticated
account keeps its existing recent-sign-in, session binding and MFA controls.

HTTP regression coverage in `accounts/github-start.http.spec.ts` exercises both
aliases, direct-navigation rejection, Origin/DTO/action/hostname checks,
verified PKCE/cookie issuance and consumed-token rejection. Form tests cover the
shared button lock, expiry and refreshing proof after failed initiation.

## Runtime storage

The verifier calls Cloudflare directly. OAuth state, sessions and request
budgets use one shared PostgreSQL implementation in local development and
Heroku. OAuth state is atomically deleted on consumption and retains its
ten-minute expiry, so replicas share the same one-time proof. No Redis service
or credentials are required.

## API documentation

When Swagger is enabled, existing documentation Basic Auth is checked first.
`/docs` then presents Turnstile. Successful same-origin verification issues a
signed ten-minute HttpOnly, SameSite=Strict cookie; production uses Secure and
the `__Host-` prefix. Cookie signatures are scoped to documentation, hostname
and current Basic credentials. Expiry, changing credentials or rotating the
Turnstile secret invalidates access.

Swagger assets and JSON/YAML schema URLs require both protections. A schema
request without verification returns 403 and directs the user to `/docs`.
Documentation request throttling and no-store/noindex headers remain enabled.
The same-origin verification POST is allowed independently of frontend CORS;
other API routes and external origins retain their existing CORS allowlist. API
endpoints themselves retain their existing authentication and limits.

Cloudflare requires
[server-side Siteverify validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
Tokens expire after five minutes and can only be redeemed once. Browser and HTTP
tests use synthetic tokens and mocked verification responses; they do not bypass
live challenges.
