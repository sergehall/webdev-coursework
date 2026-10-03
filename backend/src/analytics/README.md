# Analytics domain

`analytics.controller.ts` accepts anonymous QR events. `analytics.service.ts`
owns the durable queue, audit buffering, dashboard access, and the shared
runtime used by account access. `analytics.store.ts` persists QR events and
audit batches, builds dashboard data, and performs retention cleanup.

Account routes, validation, security flows, and account SQL live in `accounts/`.
`AnalyticsModule` currently wires both domains because the existing account
session flow uses the analytics service's runtime and audit queue. Keep new
account behavior in `accounts/`; a separate Nest account module requires first
extracting that shared runtime boundary.
