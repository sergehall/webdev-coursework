# Owner workspace

`OwnerPage.tsx` keeps route and access-state composition. Its public default
export and the account URL paths remain unchanged.

- `panels/ProfilePanel.tsx` owns display-name and username editing.
- `panels/SecurityPanel.tsx` owns password changes, MFA and session navigation,
  and session revocation confirmation.
- `panels/StatisticsPanel.tsx` owns QR reporting and administration content.
- `application/useOwnerResource.ts` owns report loading, retry, and clearing the
  account state on an expired session.
- `OwnerPageElements.tsx` holds the page heading and status/error message used
  by those panels.

Keep account API calls in the panel or hook that owns the interaction. Keep
`owner.css` as the ordered stylesheet entry point; its `styles/README.md`
describes the CSS groups.
