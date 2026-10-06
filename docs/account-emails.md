# Account email templates

Account emails use the renderer/transport separation from the local
`sergioartg-site` reference, adapted to this application's existing PostgreSQL
outbox. They use Web Engineering Portfolio branding and the account area's
green action color.

## Delivery boundaries

1. `AccountService` or `AccountProvidersService` calls `AuthMailService.enqueue`
   inside the account transaction. The token hash and encrypted outbox intent
   commit together.
2. The existing interval worker claims a due outbox row, checks token eligibility,
   and builds a fragment-based verification or password-reset URL using the first
   configured `OWNER_ALLOWED_ORIGINS` origin.
3. The pure renderer in
   [`auth-mail.templates.ts`](../backend/src/accounts/mail/templates/auth-mail.templates.ts)
   selects the intent and produces subject, HTML and plain text.
4. [`auth-mail.layout.ts`](../backend/src/accounts/mail/templates/auth-mail.layout.ts)
   supplies the shared presentation tables, inline styles, mobile layout,
   preheader, action button, copyable fallback link and security footer.
   Dynamic values are escaped, and the renderer rejects non-HTTP(S) action URLs
   and URLs with embedded credentials. Emails use no remote images or fonts.
5. [`SmtpProvider`](../backend/src/accounts/mail/smtp-mail.provider.ts) forwards
   the rendered message with the configured sender and stable Message-ID. The
   worker retains the existing retry, lease and encrypted-token cleanup behavior.

This is asynchronous, at-least-once delivery. The change adds no queue service,
database migration, provider configuration, or public API.

## Templates

| Intent      | Trigger                                     | Lifetime | Destination               |
| ----------- | ------------------------------------------- | -------- | ------------------------- |
| `verify`    | Registration or resend confirmation         | 24 hours | `/account/verify-email`   |
| `reset`     | Password-reset request                      | 1 hour   | `/account/reset-password` |
| `add-email` | Add a recovery email to an existing account | 24 hours | `/account/verify-email`   |

The lifetime constants in
[`auth-mail.contract.ts`](../backend/src/accounts/mail/auth-mail.contract.ts)
also control token creation. Delivered emails show the actual persisted expiry
in UTC, so delivery delays do not promise a fresh lifetime. Previews without a
persisted expiry explain that validity starts at the request.

Clicking a verification link opens the confirmation page. The user then explicitly
submits confirmation; scanner GETs do not consume tokens. Password-reset and
add-email templates describe their own next steps. Adding an email does not
claim that a new account was created.

## Editing and previewing

Edit copy in `mail/templates/auth-mail.templates.ts` and shared presentation in
`mail/templates/auth-mail.layout.ts`. Keep subject, HTML and plain text coherent.
The old exports from `auth-mail.ts` remain compatible.

From the repository root:

```sh
yarn workspace backend mail:preview /tmp/webdev-auth-mail-preview
```

Open `verify.html`, `reset.html`, and `add-email.html` at desktop and mobile
widths; the corresponding `.txt` files contain the plain-text variants.
Preview links use a reserved test domain and a nonfunctional `preview-only`
token. The preview command does not load environment files, connect to the
database, or send email.

Run focused validation with:

```sh
yarn workspace backend test --runInBand --testPathPattern='auth-mail|smtp-mail.provider|account.service.spec'
yarn workspace backend typecheck
```

Browser previews verify layout, not delivery or every email client's rendering.
SMTP delivery and client-specific behavior require controlled inbox checks.
See [account security and delivery](owner-account-analytics.md#email-security-and-delivery)
for configuration, token protections, retries and operational limits.
