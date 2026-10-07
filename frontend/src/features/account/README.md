# Account domain

This feature contains sign-in, sign-up, recovery, sessions, profile, security,
and owner-only administration. `OwnerPage.tsx` composes public authentication
and authenticated account routes. The legacy `Owner*` file and CSS names remain
internal while those responsibilities share the account domain.

Use `/account/sign-in` and `/account/sign-up` for new links. The old
`/account/login` and `/account/register` paths redirect to the canonical pages,
preserving query, hash, and navigation state. The API endpoints and Turnstile
action names retain `login` and `register` for compatibility.

- `panels/ProfilePanel.tsx` owns display-name and username editing.
- `panels/SecurityPanel.tsx` owns password changes, MFA and session navigation,
  and session revocation confirmation.
- `panels/StatisticsPanel.tsx` owns QR reporting and administration content.
- `application/useOwnerResource.ts` owns report loading, retry, and clearing the
  account state on an expired session.
- `AccountMentorCard.tsx` shows a client-only AI Pathway status and a direct
  link to the saved path or first-plan setup. It reads the account-scoped,
  no-store Mentor summary; an unavailable response is shown as unavailable.
- `OwnerPageElements.tsx` holds the page heading and status/error message used
  by those panels.
- `auth/AccountAuthFields.tsx` renders the fields shared by account auth modes;
  `AccountAuthPage.tsx` owns requests, verification, and navigation.
- `mfa/MfaEnrollmentSection.tsx` renders authenticator setup;
  `MfaSettingsPanel.tsx` owns MFA requests, expiry, and recovery-code state.

Keep account API calls in the panel or hook that owns the interaction. Keep
`owner.css` as the ordered stylesheet entry point; its `styles/README.md`
describes the CSS groups.
