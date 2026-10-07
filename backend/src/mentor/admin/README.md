# Mentor administration

The primary administrator can view `GET /api/mentor/admin/usage?days=7|30&page=N`
and change another account's generation access with
`PUT /api/mentor/admin/accounts/:id/generation` and `{ "enabled": false|true }`.
Both routes require an administrator session and recent MFA when configured;
the write also requires a trusted Origin. Responses use private, no-store
caching. Neither route returns conversation text or provider credentials.

The report reads the generation ledger for the selected rolling period. A
request is counted when reserved, including failures and cancellations.
Input/output tokens are summed only when the provider reported them; the
coverage count is returned alongside the totals. Accounted Neurons are the
application's conservative budget charges, not Cloudflare's billed usage.
Terminal generation rows are retained for 30 days, so older token-level usage
is unavailable. Account rows are paginated 25 at a time.

Disabling an account records the state and an append-only audit event in
PostgreSQL. The change shares the generation admission lock, rejects future
starts, and requests cancellation of active generations. Existing messages,
profiles, and learning paths remain readable. Re-enabling does not reset
daily quotas or undo a global budget pause.

The release migration script creates the control and audit tables before the
new web code starts. Deploy the migration and code together through Heroku's
release phase. The migration only adds tables; rollback of the web code leaves
them intact. A later forward migration is required if their schema changes.
