# Backend source layout

- `accounts/` owns account transport, validation, access policy, MFA, provider
  flows, and persistence.
- `analytics/` owns QR ingestion, report aggregation, the durable event queue,
  and audit batch persistence.
- `quiz/` owns questions, progress, and quiz routes; `tokens/` owns answer
  tokens and their guards. `security/` owns cross-domain request protection,
  API-key verification, and coarse device classification shared by sessions and
  QR events.
- `app/` contains system endpoints, the circuit breaker, and request logging.
  `bootstrap/` configures the Nest application; `swagger/` owns API docs;
  `db/` owns connection setup and migrations.

Keep database queries in their owning store and request validation in DTOs.
Do not move account logic into analytics merely because the current module wires
both sets of providers.
