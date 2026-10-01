# Account development plan

## Current stage: accounts and QR analytics

- Public GitHub sign-in and account creation, bound OAuth state and PKCE.
- Username/email and password sign-in; separate registration and email confirmation pages.
- Password reset, single-use expiring links, encrypted transactional email outbox.
- Reuse the existing SMTP configuration from `usacosmetologist`; no new paid services.
- Reuse its account layout/profile/preferences/security/menu patterns in the portfolio style.
- New accounts always have role `client`; privileged accounts have role `admin`.
- Only Serge's primary administrator can assign/revoke administrator roles; its own role is protected.
- Keep profile/preferences/session changes scoped to the signed-in account.
- Keep QR reports and security activity restricted to administrators.
- New tables use `webdev_`; preserve the other application's tables and database configuration.
- Verify locally; synchronize authorized SMTP/OAuth configuration to production.
- Production code rollout and migrations must be explicitly recorded as deployed or pending.

## Next stage: MFA from Lavoval

Requested by Serge after completion of the current stage. Reference:
`/Users/sergehall/GolandProjects/lavoval`.

1. Inspect Lavoval's MFA backend, frontend Security panel, migrations and tests.
2. Adapt its Authenticator App enrollment UI to this portfolio's style.
3. Add setup QR, six-digit TOTP verification and explicit enable/disable actions.
4. Integrate the challenge with both GitHub and password login before issuing a full session.
5. Port recovery-code handling and protect setup/reset with recent authentication.
6. Encrypt each new TOTP secret with this project's key; never copy Lavoval's live secrets,
   recovery codes or MFA enrollment data.
7. Use separate `webdev_` migrations and test enrollment, challenge, replay prevention,
   recovery, disable and session revocation.

MFA is not implemented as part of the current stage; no MFA settings are changed in Lavoval.

### Reference inspection completed

- `apps/api/internal/service/auth_mfa_totp.go`: six-digit TOTP, random Base32 secret,
  provisioning URI, constant-time comparison and AES-GCM encryption.
- `infrastructure/db/migrations/008_auth_mfa_totp.sql`: separate encrypted pending/active
  secrets and enrollment state.
- `infrastructure/db/migrations/009_auth_mfa_challenges_and_recovery_codes.sql`:
  expiring consumed challenges and hashed single-use recovery codes.
- `apps/web/src/features/auth/mfa-settings.tsx`: setup QR, confirmation, cancellation,
  recovery-code display/regeneration and disable UI.

Lavoval's backend is Go; this project's backend is NestJS. Port the behavior and
UI patterns with separate tests, rather than copying Go code or live credential data.
Use a dedicated MFA encryption key in the new project rather than JWT-key fallback.
