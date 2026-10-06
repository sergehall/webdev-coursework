# Mentor operations (private beta)

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
