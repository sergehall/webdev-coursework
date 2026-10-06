# Accounts domain

`owner.controller.ts` owns the existing `/api/owner` and `/api/account` routes.
`account-access.dto.ts` validates their transport input. `application/` owns
session access, GitHub OAuth, and owner configuration; `mfa/` owns authenticator
flows. `store/account.store.ts` owns account, session, and security activity SQL.

The account and analytics stores are separate injectable providers over the
same PostgreSQL data source. Their current Nest wiring remains in
`analytics/analytics.module.ts` while the account flow depends on the analytics
service's shared runtime and audit queue.

`auth-mail.ts` persists encrypted email intent in the caller's transaction and
processes the PostgreSQL outbox. `mail/auth-mail.contract.ts` defines delivery
contracts and token lifetimes; `mail/smtp-mail.provider.ts` adapts SMTP.
`mail/templates/` owns the shared responsive layout and the distinct verification,
password-reset, and recovery-email templates, each with HTML and plain text.
See [the account email guide](../../../docs/account-emails.md) for editing and previews.
