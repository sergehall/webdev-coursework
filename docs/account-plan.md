# Account development notes

This is a dated record of the account implementation work around October
1–2, 2026. It is not a live deployment status page. For current source
boundaries and local setup, use [system architecture](architecture.md),
[accounts and analytics](owner-account-analytics.md), [MFA](account-mfa.md), and
[connected providers](account-providers.md).

The account work added registration and confirmed email, password and GitHub
sign-in, opaque database-backed sessions, account profile and preferences, an
administrator role, presentation QR reporting, and a security activity journal.
Account and analytics persistence use `webdev_` PostgreSQL tables. The
[account design standard](account-design-standard.md) documents the shared
visual rules.

The subsequent MFA work added authenticator enrollment, recovery codes, a
restricted sign-in challenge, recent proof for sensitive actions, and a
dedicated encryption key. The connected-provider work added explicit GitHub
connection and disconnection, verified email addition, and a backup password
path. These are implementation descriptions; configuration controls whether a
particular environment exposes each flow. The source of truth for routes and
policy is `backend/src/accounts/`, `backend/src/analytics/`, and
`frontend/src/features/account/`.

The October 1 read-only production observation in
[the MFA guide](account-mfa.md) recorded an applied MFA migration but no
configured MFA key and no enrolled accounts at that time. The October 2 provider
review in [the provider guide](account-providers.md) recorded local tests and a
pending production rollout at that time. Recheck remote release, migrations,
configuration presence, and enrollment state before acting on either
observation.
