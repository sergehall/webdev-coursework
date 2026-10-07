# Mentor operations

## Production status at the 2026-10-06 P9 rollout

The owner approved public access for registered accounts and enabled the
backend/frontend public switches. A client outside the former beta allowlist
received an English answer, saved a four-week draft with reviewed coursework
links, and saw both after a page reload. The draft remains unaccepted for
review. Reload in one browser does not verify recovery in a second browser or
on another device; final acceptance is still open. The daily limits are 15
accepted generations per account and 8,000 reserved/accounted Mentor Neurons
globally. The shared Cloudflare account can have other Workers AI usage.

The quota-pause/outbox path was tested against a disposable database and fake
provider. A separate owner delivery test confirmed SMTP delivery, but no live
quota-exhaustion event was forced. Do not infer that the live pause-to-email
chain was exercised. The private local acceptance record and product plan are
ignored by Git. The public rollout can be reversed using the flags below.

Current regression evidence: Mentor integration covers account isolation,
versioned acceptance, revision progress, SSE/Stop, idempotency, retention, and
the last daily request across two independent database pools. Account
integration covers MFA/OAuth and revoked sessions. The 40-case pre-beta model
review passed its 90% quality threshold; a later CSS origin scenario still
fails for the raw model, so the production application answers that narrow case
from a verified reference without calling Workers AI. The raw model failure is
not a model pass. A goal change retains progress for unchanged milestone IDs;
different milestones do not inherit completion. Previous accepted revisions
remain listed, but completion of removed milestones is not shown in the
current path. Cross-device restoration and owner acceptance of the production
draft require separate user checks.

## Closed-beta release order

Keep `AI_MENTOR_ENABLED` and `AI_GENERATION_ENABLED` unset during the backend
release. The account release hook runs only the allowlisted account and Mentor
migrations. Verify that `AddMentorGenerationPause1791255600000` was applied and
that no Mentor migration is pending before enabling the workspace.

Set `AI_MENTOR_BETA_ACCOUNT_IDS` to the selected production account UUIDs,
`AI_PROVIDER_MODE=cloudflare`, and `AI_MODEL=@cf/openai/gpt-oss-20b`. The
backend requires both flags to be `true` for generation; every Mentor API route
also requires `AI_MENTOR_ENABLED=true` and a signed-in account permitted by the
beta allowlist or the explicit public switch. Enable the frontend route with
`VITE_AI_MENTOR_ENABLED=true` in its
production build and share its direct URL only with beta testers. The public
entry card stays hidden until the separate public launch.

## Public launch (P9)

The owner approved the existing release limits: 15 accepted generations per
account per UTC day and 8,000 reserved/accounted Neurons for Mentor per UTC day.
The global cap covers this app, not other workloads in the Cloudflare account.
These are daily limits; credential expiration is managed separately.

Ship the public-audience code with `AI_MENTOR_PUBLIC_ENABLED` unset on Heroku
and `VITE_AI_MENTOR_PUBLIC_ENABLED` unset in the Vercel production build. The
existing beta allowlist stays in force. The public switches are independent:
the backend switch controls access to private APIs; the frontend switch only
shows the home and Roadmap entry cards. Neither switch overrides
`AI_MENTOR_ENABLED`, `AI_GENERATION_ENABLED`, the account session check, or the
budget ledger.

For a future rollout or repeat verification, check current
Workers AI billing/usage and the rollback path. Enable
`AI_MENTOR_PUBLIC_ENABLED=true` for the backend and
`VITE_AI_MENTOR_PUBLIC_ENABLED=true` in a new frontend build. Verify the
home → sign-in → Mentor path with an ordinary client account outside the beta
allowlist, then check a bounded chat, plan acceptance, saved-work reload,
generation limits, and the account-wide Cloudflare usage. Keep the beta
allowlist configured until the rollout is stable. If access or cost is
unexpected, set `AI_GENERATION_ENABLED=false` first so saved work remains
readable; then turn off the public switches to return to the closed beta.

Before enabling generation, inspect Cloudflare's current account-wide Workers
AI usage, Workers plan, token status, and other workloads. Confirm the SMTP
variables are present without printing their values. Start with one account and
one real request. Check API `Cache-Control: no-store`, cookies and origin
behavior, SSE completion and Stop, latency, terminal state, and the budget
ledger against Cloudflare usage. If quota is exhausted, verify persistent mute,
saved-work reads, one outbox event, and receipt of the owner email. Set
`AI_GENERATION_ENABLED=false` if results are unexpected; leave the workspace
available for saved work while investigating.

The backend runs `MentorMaintenanceService` at startup and hourly only when `AI_MENTOR_ENABLED=true`. It reaps expired generation leases, then uses a PostgreSQL transaction advisory lock so only one instance performs retention at a time. Each run deletes at most 500 rows per category. Inactive conversations expire after 90 days; active generations protect their conversations. Unaccepted/discarded proposals and terminal generation metadata expire after 30 days. Old minute/day budget buckets are pruned. The service logs counts, never content or account identifiers.

## Read-only daily report

Run the following against the intended database using the operator's existing read-only database access. It returns aggregate values only. Do not export message text, profiles, email, or account IDs.

```sql
SELECT intent, state, coalesce(failure_kind, 'none') AS failure,
       count(*) AS requests,
       round(percentile_cont(0.95) WITHIN GROUP
         (ORDER BY extract(epoch FROM updated_at-created_at))::numeric, 2)
         AS p95_seconds,
       coalesce(sum(input_tokens),0) AS input_tokens,
       coalesce(sum(output_tokens),0) AS output_tokens,
       coalesce(sum(accounted_neurons),0) AS reserved_charge_neurons,
       round(coalesce(sum(reported_neurons),0),2) AS provider_reported_neurons
FROM webdev_mentor_generations
WHERE created_at >= now() - interval '24 hours'
GROUP BY intent, state, failure_kind ORDER BY intent, state, failure;

SELECT period_start, request_count, reserved_neurons, consumed_neurons
FROM webdev_ai_budget_buckets
WHERE scope='global-day' AND subject_key='all'
  AND period_start >= now() - interval '7 days'
ORDER BY period_start DESC;
```

The first query measures total request duration, not time to first text. `accounted_neurons` conservatively charges a full reservation after dispatch even when provider usage is unknown. Compare the second query with Cloudflare's usage page before widening beta. HTTP mentor logs contain route templates, status, elapsed milliseconds, and an `aborted` line for disconnected requests; they omit prompts, cookies, email, IP, and user agent. Do not paste token-bearing provider URLs or response bodies into incident logs.

## Incident and rollback

If error rate, latency, or charged usage rises unexpectedly, set `AI_GENERATION_ENABLED=false` in the active backend environment and verify that new generation is denied while saved plans/history remain readable. Existing in-flight requests should be allowed to settle or be stopped; monitor terminal generation states and the next maintenance run. Keep `AI_MENTOR_ENABLED=true` while investigating so account access and retention continue. Restore generation only after checking the provider, database health, daily budget, and a limited real request. Backend and frontend feature flags are independent; hide the frontend entry only when rolling back the UI.

## Automatic free-allocation pause and owner email

The app protects itself at 8,000 reserved/accounted Neurons per UTC day, before Cloudflare's account-wide 10,000 free Neurons. A denied request at this boundary persists `webdev_ai_generation_control.muted_at` and queues one `webdev_ai_budget_alerts` row. A Cloudflare HTTP/SSE error with code `3036` does the same even if the app ledger is below 8,000; ordinary `429` and `3040` capacity responses do not. Chat and plan creation stop on every dyno. Saved work stays readable. The pause persists across a dyno restart and UTC midnight.

The alert worker sends the dedicated HTML/plain-text template to `serge.hall.dev@gmail.com` using the existing SMTP environment and stable Message-ID. It retries pending rows with backoff after a transient failure. If SMTP is absent, the pause remains active and the alert stays pending; configure SMTP and restart the backend to deliver it. Inspect `status`, `attempts`, and `next_attempt_at` in `webdev_ai_budget_alerts` without exposing message bodies or credentials. A process crash after SMTP accepted a message but before marking it sent can produce a duplicate delivery with the same Message-ID; the outbox guarantees one logical alert per pause transition, not physical exactly-once SMTP delivery.

The 8,000 limit only counts this Mentor app. Other Workers AI uses on the same Cloudflare account can spend the remaining allocation. On a Workers Paid account, usage above 10,000 is billed, so verify the actual account plan and all workloads before enabling a broader beta. The email is informational and cannot be the spending control.

To resume, first inspect Cloudflare usage/billing and decide that new calls are acceptable. Run the following transaction only against the intended database as an authorized operator; record your operator ID in place of `operator-name`. Do not expose a public unmute endpoint:

```sql
BEGIN;
SELECT pg_advisory_xact_lock(1791248400);
WITH resumed AS (
  UPDATE webdev_ai_generation_control
  SET muted_at=NULL, reason=NULL
  WHERE id=1 AND muted_at IS NOT NULL
  RETURNING id
)
INSERT INTO webdev_ai_control_audit(id,action,reason,actor)
SELECT gen_random_uuid(),'resume','owner_reviewed','operator-name'
FROM resumed;
COMMIT;
```

An unmute before the same day's protective limit is reset will pause again on the next new request. The alert is sent once per subsequent pause transition. Keep `AI_GENERATION_ENABLED=false` until an intentional reopen if a manual environment-level stop is also in place.
