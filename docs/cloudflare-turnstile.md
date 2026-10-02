# Cloudflare Turnstile

Password login (including `/api/owner/login` and reauthentication) and email
registration require a single-use Turnstile token when configured. Tokens are
verified by the backend before credential lookup, password hashing or account
persistence. Existing origin checks, rate limits, GitHub OAuth and MFA remain in
place. GitHub OAuth has its own existing provider flow.

## Code domains and ownership

| Domain                            | Files                                                                                                              | Responsibility                                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend security                  | `backend/src/security/turnstile/turnstile.module.ts`, `turnstile.service.ts`                                       | Exports the shared verifier, validates provider configuration and calls Cloudflare Siteverify. No account persistence, UI or Swagger cookies.                 |
| Backend accounts                  | `backend/src/accounts/account.dto.ts`, `account-response.dto.ts`, `account.service.ts`, `account.controller.ts`    | Receives registration tokens, exposes browser-safe settings, applies existing account budgets and verifies before hashing/persistence.                        |
| Existing account/session adapter  | `backend/src/analytics/analytics.module.ts`, `analytics.service.ts`, `analytics.dto.ts`, `analytics.controller.ts` | Imports `TurnstileModule` and enforces password login for both account/owner aliases and reauthentication. Session handlers remain in their existing adapter. |
| Backend API documentation         | `backend/src/swagger/turnstile/swagger-turnstile.middleware.ts`, `swagger-turnstile.view.ts`                       | Owns the documentation gate, short-lived clearance cookie and HTML/external JavaScript presentation.                                                          |
| Backend bootstrap                 | `backend/src/bootstrap/configure-swagger.ts`, `configure-cors.ts`, `security-headers.ts`                           | Composes Basic Auth → request throttling → Turnstile, permits the same-origin verification POST, and publishes CSP.                                           |
| Frontend account authentication   | `frontend/src/features/owner/auth/turnstile-client.ts`, `TurnstileWidget.tsx`                                      | Loads the official script once and manages each widget's callbacks, retries, theme, sizing and cleanup.                                                       |
| Frontend account forms            | `frontend/src/features/owner/AccountAuthPage.tsx`, `owner-api.ts`                                                  | Owns the in-memory token, submission lock, fresh challenge per request, and stable user-facing error messages.                                                |
| Frontend deployment configuration | `frontend/vite.config.ts`, `frontend/vercel.json`                                                                  | Allows the official Cloudflare script/frame in preview and deployed CSP.                                                                                      |

Security verification has no dependency on account or Swagger implementation.
Account and Swagger callers share the exported provider; each owns its action and
workflow. Presentation markup is separate from server access-control logic.

Tests follow the same boundaries: security provider tests live next to the
verifier; registration tests in `accounts/account.service.spec.ts`; widget
lifecycle tests in `owner/auth/TurnstileWidget.test.tsx`; form integration tests in
`owner/AccountAuthPage.test.tsx`; HTTP documentation/CORS tests in
`backend/test/bootstrap`. Existing account and header-policy tests retain their
original locations.

Comments explain security boundaries and lifecycle decisions beside the relevant
code. `frontend/vercel.json` stays strict JSON, which cannot contain comments;
its CSP responsibility is described here and tested by
`frontend/src/config/security-headers.smoke.test.ts`. Environment and Heroku config
values are configuration, never committed documentation or browser secrets.

## Configuration and web hostnames

The current Managed widget is `webdev-coursework-auth`. It is shared across the
following hosts; these are web hostnames, separate from the code domains above:

| Hostname                                             | Purpose                              |
| ---------------------------------------------------- | ------------------------------------ |
| `webdev-coursework.com`, `www.webdev-coursework.com` | Production login and registration UI |
| `api.webdev-coursework.com`                          | Production Swagger gate              |
| `localhost`, `127.0.0.1`                             | Local forms and documentation        |

The backend allowlist matches the returned hostname exactly. Cloudflare accepts
subdomains of an allowed parent, but the backend still checks each intended host
explicitly. Actions keep account and documentation tokens separate even though
the current widget/site key is shared. This refactor does not change Cloudflare
widgets or Heroku keys.

Set these backend environment variables in the ignored local `backend/.env` and
Heroku config vars:

- `TURNSTILE_SITE_KEY`: public key, returned by `/api/account/login-options`.
- `TURNSTILE_SECRET_KEY`: secret key; never put it in a `VITE_*` variable or commit it.
- `TURNSTILE_ALLOWED_HOSTNAMES`: comma-separated exact hostnames. For this project:
  `webdev-coursework.com,www.webdev-coursework.com,api.webdev-coursework.com,localhost,127.0.0.1`.

The Managed Cloudflare widget must allow the same hostnames. Pre-clearance is
unnecessary. An entirely empty configuration disables the integration; a partial
configuration fails closed. Production rejects Cloudflare dummy keys. The frontend
gets its key from the backend, so a separate frontend environment variable is not
required. Deploy the changed frontend first, then the backend, to activate the
integration in production without blocking the old login form; setting config
vars alone does not deploy code.

The verifier checks `success`, the exact hostname and the action:
`account_login`, `account_register`, or `api_docs`. It uses a five-second timeout
and does not log secrets, tokens or provider error details. Forms clear tokens on
expiry and refresh verification after each submitted attempt. Narrow forms use
the compact widget. Production CSP allows Cloudflare's official script and frame.

## API documentation

When Swagger is enabled, existing documentation Basic Auth is checked first.
`/docs` then presents Turnstile. Successful same-origin verification issues a
signed ten-minute HttpOnly, SameSite=Strict cookie; production uses Secure and the
`__Host-` prefix. Cookie signatures are scoped to documentation, hostname and
current Basic credentials. Expiry, changing credentials or rotating the Turnstile
secret invalidates access.

Swagger assets and JSON/YAML schema URLs require both protections. A schema
request without verification returns 403 and directs the user to `/docs`.
Documentation request throttling and no-store/noindex headers remain enabled.
The same-origin verification POST is allowed independently of frontend CORS;
other API routes and external origins retain their existing CORS allowlist.
API endpoints themselves retain their existing authentication and limits.

Cloudflare requires [server-side Siteverify validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
Tokens expire after five minutes and can only be redeemed once. Browser and HTTP
tests use synthetic tokens and mocked verification responses; they do not bypass
live challenges.
