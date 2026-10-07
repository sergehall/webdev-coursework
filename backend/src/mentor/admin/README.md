# Mentor administration

The primary administrator can view `GET /api/mentor/admin/usage?days=7|30&page=N`
with optional `search` (username, display name, or email), `role`
(`all|admin|client`), `access` (`all|enabled|disabled`), and `activity`
(`all|used|never`) filters. Filters apply before pagination; the report returns
at most 10 accounts per page with a `hasMore` flag. Summary totals always
cover all accounts in the selected period. `used` and `never` refer to that
period, not the account's lifetime.

Generation access changes use `PUT /api/mentor/admin/accounts/:id/generation`.
Disabling requires `{ "enabled": false, "comment": "..." }` with a nonempty
administrator comment of at most 500 characters. Enabling uses
`{ "enabled": true }`.
Both routes require an administrator session and recent MFA when configured;
the write also requires a trusted Origin. Responses use private, no-store
caching. Neither route returns conversation text or provider credentials.

The report reads the generation ledger for the selected rolling period. A
request is counted when reserved, including failures and cancellations.
Input/output tokens are summed only when the provider reported them; the
coverage count is returned alongside the totals. Accounted Neurons are the
application's conservative budget charges, not Cloudflare's billed usage.
Terminal generation rows are retained for 30 days, so older token-level usage
is unavailable. Per-account rows distinguish completed, failed, cancelled,
and active requests as well as chat and plan requests.

Disabling an account records the comment with the disabled state and an
append-only audit event in PostgreSQL. The comment is visible only to the
primary administrator. The change shares the generation admission lock, rejects future
starts, and requests cancellation of active generations. Existing messages,
profiles, and learning paths remain readable. Re-enabling does not reset
daily quotas or undo a global budget pause.

The release migration script adds nullable comment columns to existing control
and audit tables before the new web code starts. Deploy the migration and code
together through Heroku's release phase. Existing disabled accounts retain a
null comment. Rolling back the web code leaves the additive columns intact;
new code requires this migration before handling access changes.
