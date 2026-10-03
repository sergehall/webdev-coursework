# Owner workspace styles

`../owner.css` is the single import used by `OwnerPage.tsx`. It loads the shared
theme tokens first, then these files in their original cascade order:

| File              | Responsibility                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `base.css`        | Workspace, navigation, cards, grids, typography, and shared form layout.                  |
| `account.css`     | Profile, security overview, providers, MFA, and their responsive layouts.                 |
| `controls.css`    | Workspace inputs, buttons, links, actions, and status messages.                           |
| `auth.css`        | Sign-in, registration, recovery, and password form presentation.                          |
| `dashboard.css`   | Administration reports, audit/activity, dialogs, and shared responsive/touch refinements. |
| `preferences.css` | Preference cards, theme preview, and preference actions.                                  |
| `sessions.css`    | Session status, filters, list, and responsive session layout.                             |

`../owner-theme.css` remains the source of light and dark account tokens.
`../account-overview.css` stays with `AccountOverviewPanel.tsx` and is loaded by
that component.

Place new rules with the feature they style. When moving existing rules between
files, check their position in the import order and any later overrides before
changing the cascade. Keep the established `.owner-*` selectors and design tokens
from `docs/account-design-standard.md`.
