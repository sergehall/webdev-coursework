# Documentation guide

Use the [root README](../README.md) for local setup and common commands. This
index groups the maintained engineering guides by task. Course and feature
README files describe ownership close to their implementation; coursework
handouts under `frontend/public/course-materials/` are learning material rather
than deployment instructions.

## Understand the system

- [Architecture](architecture.md): runtime units, data ownership, trust
  boundaries, and a representative progress flow.
- [Frontend source layout](../frontend/src/ARCHITECTURE.md) and
  [backend source layout](../backend/src/ARCHITECTURE.md): where to put changes.
- [API contract and security](api-contract-and-security.md): route groups,
  authentication, OpenAPI access, and request protection.
- [Database migrations](database-migrations.md): source layout, generation,
  checks, and the account release allowlist.

## Work on a feature

- [Accounts and QR analytics](owner-account-analytics.md): account roles,
  sessions, mail delivery, reports, and local configuration.
- [Connected providers](account-providers.md), [MFA](account-mfa.md),
  [Turnstile](cloudflare-turnstile.md), and
  [account design](account-design-standard.md): specific account contracts.
- [Assessment standard](quiz-assessment-standard.md): canonical requirements
  before creating or migrating a quiz; the
  [shared assessment feature](../frontend/src/features/assessment/README.md)
  explains its client-practice implementation.
- [Quiz image storage](quiz-image-storage.md): private object storage and image
  delivery.

## Historical evidence

- [Account development notes](account-plan.md) record the October 2026
  implementation stages; consult the feature guides and code for present
  behavior.
- [Frontend performance baseline](frontend-performance-baseline.md) is a dated
  local measurement, not a current production score.
- [CI and deployment retrospective](retrospectives/2026-03-11-ci-and-deploy-retro.md)
  records a past incident and its context.

Deployment configuration and dated observations in these documents should be
rechecked against the target environment before an operational change.
