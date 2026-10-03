# Analytics module

`analytics.service.ts` is the Nest entry point. It keeps the existing public API,
module lifecycle, durable event queue, audit buffering, and dashboard access.

The `application/` directory separates owner-facing behavior:

- `owner-configuration.ts` validates the required owner settings, trusted origins,
  and optional GitHub callback during module initialization.
- `owner-access.ts` handles sign-in, sessions, authorization, account changes,
  and profile preferences.
- `github-oauth.ts` handles GitHub authorization, callback verification, sign-in,
  and account linking.

`analytics.constants.ts` holds shared queue and session constants. The service
passes these helpers the current store and security callbacks for each call, so
they use the same runtime state, audit path, and origin and MFA checks. Keep
database queries in `analytics.store.ts`; keep request contracts in the service
and controller. The `store/` directory owns pagination cursor decoding and
audit action groups. Cursor validation retains the existing session and activity
formats; SQL pagination and account/revision filters stay in `AnalyticsStore`.
