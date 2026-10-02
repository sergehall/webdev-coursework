# Account design standard

The account workspace uses a quiet administrative interface: graphite surfaces,
neutral borders, readable text and one muted sage accent. This standard applies
to Overview, Profile, Preferences, Security, Administration, account access forms
and the signed-in header menu. It replaces the earlier neon-green and blue-border
experiments. Authorization, account data and security flows are independent of
these presentation rules.

## Theme tokens

The source of truth is
[`owner-theme.css`](../frontend/src/features/owner/owner-theme.css).
Tokens are scoped to `.owner-workspace` and `.owner-account-menu`, so the account
palette does not recolor the public portfolio. Use these tokens instead of adding
component-specific hex colors or unrelated green/blue utility classes.

| Token                    | Dark theme | Light theme | Purpose                                   |
| ------------------------ | ---------- | ----------- | ----------------------------------------- |
| `--owner-panel`          | `#151D29`  | `#FFFFFF`   | Cards, forms and dialogs                  |
| `--owner-card`           | `#1C2634`  | `#F5F7FA`   | Inputs and nested neutral surfaces        |
| `--owner-text`           | `#F1F5F9`  | `#202936`   | Main text, navigation and ordinary links  |
| `--owner-muted`          | `#9CA8B8`  | `#5E6B7C`   | Descriptions, icons and labels            |
| `--owner-border`         | `#2B3544`  | `#D9E0E8`   | Quiet card borders and dividers           |
| `--owner-control-border` | `#637287`  | `#7D8C9E`   | Visible input/select boundaries           |
| `--owner-accent`         | `#A4D8B9`  | `#38664C`   | Focus, icons and interactive hover        |
| `--owner-soft`           | `#20352B`  | `#E8F1EB`   | Selected navigation and avatar background |
| `--owner-hover`          | `#243040`  | `#EDF1F5`   | Neutral secondary-button and row hover    |
| `--owner-primary`        | `#A4D8B9`  | `#38664C`   | Primary action fill                       |
| `--owner-primary-text`   | `#13261B`  | `#FFFFFF`   | Primary action text                       |

`--owner-bg` follows the input surface for access forms. Error and destructive
action colors use `--owner-danger`, `--owner-danger-bg` and
`--owner-danger-border`; error copy and confirmation remain explicit. Color alone
must not communicate a security state. QR images retain their white background
and dark modules for scanning.

## Layout and hierarchy

- One centered workspace, at most `68.75rem` (1100 CSS pixels at the default root
  font size), with equal small side gutters on narrower screens.
- Keep the workspace transparent. Fill individual cards and forms; do not
  restore a large account background rectangle.
- Navigation, full-width panels and grid rows share the same outer edges.
  Profile panels have no independent narrow-width cap.
- The navigation row is transparent. Only selected items have a filled surface.
- Keep summary tiles and related settings in responsive equal-width grids.
  On small screens, stack forms and scroll navigation within its own row.
- Use flat surfaces, thin neutral borders and modest rounding. Do not add
  gradients, glowing borders or decorative shadows to content cards.
- Page titles carry the strongest text hierarchy. `MY ACCOUNT`, helper text and
  icons are muted; account branding does not compete with the page title.
- Overview shortcuts are compact text/icon links, not a second row of large
  navigation cards. Their destinations and role visibility match the main tabs.
- Keep Security sections as the navigation block. Below it, Overview uses one
  compact status panel with actionable setup reminders, followed by separate
  GitHub and recovery-email cards. Do not repeat password or MFA settings in the
  provider group. Site username/password controls belong to Password; authenticator
  and recovery-code controls belong to Two-factor; device controls belong to Sessions.
  Keep existing `#providers` links compatible with Overview. Signals reflect known
  account data; loading or unavailable status must not be shown as disabled or safe.

## Color and interaction rules

- Reserve accent-filled buttons for the primary action of each form/window.
  Refresh, cancel, copy and pagination actions use neutral secondary buttons.
- Ordinary links use the text color. Hover may use sage and an underline;
  keyboard focus always has a visible sage outline/ring.
- Selected navigation uses a soft sage surface and the main text color, without
  a bright bottom stripe. Keep `aria-current`/`aria-expanded` state semantics.
- A green border on hover identifies clickable cards. Static report/form cards
  keep neutral borders and do not suggest that the whole card is clickable.
- Inputs are slightly lighter than dark form panels, with more visible neutral
  boundaries than decorative cards. Preserve disabled, read-only and focus states.
- Chart bars use muted sage. Tables use quiet dividers and neutral row hover.
- Status messages and connected-provider/session surfaces are neutral by
  default. Red is reserved for errors and destructive actions.
- Authentication forms and the signed-in menu use the same tokens; the public
  portfolio header, site background and course pages retain their own style.

## Verification for future changes

Review all five account sections, the Security subwindows, access forms and the
header menu in both themes. Check a wide desktop viewport and a narrow mobile
viewport: equal outer edges, the 1100px cap, readable controls, visible keyboard
focus, navigation scrolling and no page-level horizontal overflow.

Use synthetic data for visual previews; never expose live passwords, MFA secrets,
recovery codes or session tokens in screenshots. Keep non-destructive navigation
and form behavior covered by the existing account tests. Check text contrast
against panel/input/selected surfaces (at least 4.5:1 for ordinary text) and input
boundaries/focus against adjacent surfaces (at least 3:1). Run frontend typecheck,
focused lint/format checks and the affected account tests. Run a bundle build
when changing CSS imports or Tailwind classes.
