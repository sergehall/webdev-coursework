# WebDev Coursework Platform

**An academic portfolio and full-stack learning platform with personal accounts
and role-based administration.**

Built by **Serge Hall** around Santa Monica College Web Development coursework,
this project brings course materials, assignments, coding practice, and account
management into one application. It documents an educational journey while
putting frontend, backend, database, cloud, and security concepts into practice.

[Visit the platform](https://webdev-coursework.com) ·
[Backend API](https://api.webdev-coursework.com) ·
[Local setup](#getting-started) · [Account documentation](#documentation)

## Platform Highlights

| Area                     | What it includes                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| **Coursework**           | Course navigation, module materials, assignments, learning resources, and completion pages              |
| **Coding practice**      | Sandboxed Code Playground for JavaScript and Python                                                     |
| **Assessments**          | Shared assessment UI, quiz APIs, answer-token flows, and progress tracking                              |
| **Personal account**     | Overview, profile, preferences, sign-in settings, and active sessions                                   |
| **Administration**       | Presentation QR analytics, security activity, and account role management for the primary administrator |
| **Responsive interface** | Desktop and mobile navigation, light and dark themes, and account-aware menus                           |

## Personal Accounts and Roles

The platform now includes a dedicated account workspace at `/account/overview`.
Visitors can explore the public coursework, while registered users get access to
their own profile, preferences, and security settings.

### Account experience

- **Registration and sign-in:** username/email and password, or GitHub OAuth
  when configured. Email registration requires confirmation; confirmation
  resending, forgotten-password recovery, and password reset have dedicated
  screens. Accounts with MFA complete a separate verification step before access.
- **Overview:** personal shortcuts for regular users; presentation statistics
  and account shortcuts for administrators. The header menu provides account
  navigation and sign-out.
- **Profile:** editable display name and unique site username. The page shows
  registration source, GitHub connection, password sign-in availability, and
  email confirmation status. A stored email cannot be edited here; changing a
  site username does not change the GitHub identity.
- **Preferences:** portfolio/light/dark theme, time zone with device detection,
  three date formats, 12- or 24-hour clock, and a timestamp preview. Administrators
  can also save default QR report periods and security activity periods/page sizes.
- **Password:** change an existing password or create a site password after
  confirming an email on a GitHub-only account. New passwords require 12–128
  characters. Password changes and resets end existing account sessions.
- **Providers:** explicitly connect GitHub, or disconnect it when password
  sign-in remains available. Accounts without an email can add one through a
  confirmation link, resend the link, or cancel the pending request. Provider
  actions that change sign-in methods require a recent sign-in and fresh MFA proof when MFA
  is enabled; completed identity changes end existing sessions.
- **Two-factor authentication:** QR code or manual authenticator setup with a
  ten-minute enrollment window, setup cancellation, and code verification.
  Recovery codes appear once and can be copied or downloaded; the UI shows the
  remaining count and supports replacing the set, verifying the current session,
  and disabling MFA after confirmation. Authenticator or recovery codes protect
  both password and GitHub sign-in.
- **Sessions:** browser, operating system, coarse device category, sign-in method,
  sign-in time, last activity, and expiry, with the current session identified.
  Sessions load five at a time and can be refreshed. A confirmation dialog lets
  the user end all sessions, including the current one.

Feature availability depends on server configuration and deployment. The
[provider guide](docs/account-providers.md) and [MFA guide](docs/account-mfa.md)
describe prerequisites, validation, and rollout status.

### Access model

The application uses two roles: **`client`** for a regular user and **`admin`**
for an administrator. The primary administrator has additional role-management
permissions within the `admin` role.

| Capability                                              | Regular user (`client`) | Administrator (`admin`) | Primary administrator (`admin`) |
| ------------------------------------------------------- | ----------------------- | ----------------------- | ------------------------------- |
| Explore public coursework and resources                 | Yes                     | Yes                     | Yes                             |
| Manage own profile, preferences, and security           | Yes                     | Yes                     | Yes                             |
| View presentation QR reports                            | —                       | Yes                     | Yes                             |
| View administration security activity                   | —                       | Yes                     | Yes                             |
| List accounts and assign or remove administrator access | —                       | —                       | Yes                             |

New registrations always receive the `client` role; users cannot select their
own permissions. Only the primary administrator can change another account's
role, and the primary administrator cannot be demoted. Role changes invalidate
the affected account's existing sessions.

Authorization is enforced by the backend using the stored account role and
session revision. Account sessions last one hour and use opaque HttpOnly,
SameSite=Strict cookies with Secure enabled in production. Account mutations
require a trusted origin; sensitive actions also check recent authentication
and MFA where applicable. Authentication responses use `Cache-Control: no-store`,
and rate limits apply to account access and authentication flows.

Coursework progress currently uses a browser client ID stored in `localStorage`.
It is independent of the account session; account registration does not provide
account-based progress synchronization across devices. The administrative API
key used by coursework endpoints is also separate from account roles.

### Account navigation

| Route                          | Purpose                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| `/account/sign-up`             | Create an account                                                                           |
| `/account/sign-in`             | Sign in with an available method                                                            |
| `/account/verify-email`        | Confirm registration or a newly added email                                                 |
| `/account/resend-verification` | Request another registration confirmation link                                              |
| `/account/forgot-password`     | Request a password reset email                                                              |
| `/account/reset-password`      | Set a new password through a valid reset link                                               |
| `/account/reauthenticate`      | Confirm sign-in again before a sensitive action                                             |
| `/account/mfa`                 | Complete a pending sign-in with an authenticator or recovery code                           |
| `/account/overview`            | Open the personal workspace                                                                 |
| `/account/profile`             | Update profile details                                                                      |
| `/account/preferences`         | Configure appearance and date/time preferences                                              |
| `/account/security`            | Manage passwords, providers, MFA, and sessions                                              |
| `/account/administration`      | View administrator reports and security activity; manage roles as the primary administrator |

Legacy `/owner/*` routes remain compatibility aliases. Account API requests use
`/api/account/*`.

Security has four directly addressable windows:
`/account/security#password`, `/account/security#providers`,
`/account/security#mfa`, and `/account/security#sessions`.

### Administrator workspace

Overview and Administration offer presentation QR-link reports for the last
**7, 30, or 90 days**, including totals, device/OS/browser breakdowns, and daily
counts grouped in UTC. These are anonymous visits through the marked presentation
link; shared links also count, and totals do not identify unique people or prove
a physical QR scan.

Administration also includes a security activity journal with **1-, 7-, 30-, or
365-day** periods, allowed/denied results, action-group filters, and **10, 25, or
50 records per page**. Reports and activity can be refreshed. The primary
administrator additionally sees the account list and role-change confirmation
controls.

## Coursework

The portfolio covers the following Santa Monica College course track:

| Course     | Subject                                |
| ---------- | -------------------------------------- |
| **CS 56**  | Advanced Java Programming              |
| **CS 60**  | Database Concepts & Applications       |
| **CS 70**  | Network Fundamentals and Architecture  |
| **CS 79A** | Introduction to Cloud Computing        |
| **CS 79C** | Compute Engines in Amazon Web Services |
| **CS 79D** | Security in Amazon Web Services        |
| **CS 80**  | Internet Programming                   |
| **CS 81**  | JavaScript Programming                 |
| **CS 85**  | PHP Programming                        |
| **CS 87A** | Python Programming                     |

## Technology Stack

Dependency snapshot: **October 2, 2026**, from the resolved Yarn dependencies. Workspace
`package.json` files declare dependency ranges; `yarn.lock` pins resolutions.
The 15,262-line lockfile was reviewed in the large-file pass and stays generated
as one file. Update it through Yarn when dependencies change; do not partition or
edit its resolutions by hand.
The 940-line `.yarn/releases/yarn-4.14.1.cjs` is the pinned Yarn executable
selected by `.yarnrc.yml`. It was also reviewed and left intact; update it only
through an intentional Yarn version upgrade.

| Layer                                  | Technologies                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Frontend**                           | React 19.2.6, React Router 7.15.1, TypeScript 6.0.3, Vite 8.0.14                                                    |
| **Interface**                          | Tailwind CSS 4.3.0 via PostCSS 8.5.15, Framer Motion 12.40.0, Lucide React, React Icons                             |
| **Frontend validation and monitoring** | Zod 4.4.3, Sentry React 10.54.0                                                                                     |
| **Backend**                            | NestJS core 11.1.18 with Express 5.2.1, TypeScript 5.9.3, TypeORM 0.3.30, PostgreSQL (`pg` 8.21.0)                  |
| **Identity and delivery**              | GitHub OAuth with PKCE, opaque cookie sessions, TOTP MFA with QR setup, SMTP via Nodemailer 10.0.13                 |
| **API contracts**                      | Swagger/OpenAPI, class-validator, class-transformer; JWT for quiz answer tokens                                     |
| **Background processing**              | PostgreSQL-backed runtime state and transactional mail outbox; optional Redis with ioredis 5.11.1 and BullMQ 6.3.11 |
| **Frontend testing**                   | Vitest 4.1.7, Testing Library, JSDOM 29.1.1                                                                         |
| **Backend testing**                    | Jest 29.7.0, Supertest 7.2.2, disposable PostgreSQL integration database                                            |
| **Runtime and tooling**                | Node.js 24.15.0, Yarn 4.14.1 workspaces with Plug'n'Play, ESLint 9.39.4, Prettier 3.8.3                             |
| **Local services and deployment**      | Docker Compose with PostgreSQL 17 and Redis 7; GitHub Actions, Vercel frontend, Heroku backend                      |

## Repository Structure

```text
webdev-coursework/
├── .github/workflows/         # CI and frontend deployment
├── docs/                      # Architecture, account guides, and retrospectives
├── frontend/                  # React + Vite application
│   ├── public/                # Static assets and course materials
│   └── src/
│       ├── api/               # API clients and course configuration
│       ├── components/        # Shared interface components
│       ├── context/           # Theme and coursework progress
│       ├── courses/           # Course modules and assignments
│       ├── features/
│       │   ├── assessment/    # Shared assessment experience
│       │   └── owner/         # Accounts, security, and administration
│       ├── pages/             # Public screens
│       └── routes/            # Routing and lazy loading
├── backend/                   # NestJS API
│   ├── scripts/               # Configuration and migration tools
│   ├── src/
│   │   ├── accounts/          # Registration, email, providers, and MFA
│   │   ├── analytics/         # Sessions, roles, QR reports, and security activity
│   │   ├── db/                # PostgreSQL configuration and migrations
│   │   ├── guards/            # Coursework API authorization
│   │   ├── quiz/              # Assessments and progress services
│   │   └── tokens/            # Quiz answer-token issuance
│   └── test/                  # Backend unit and end-to-end tests
├── compose.local.yml          # Dedicated local PostgreSQL and Redis
├── package.json               # Workspace scripts
└── yarn.lock
```

The account implementation retains the internal `owner` naming for compatibility;
the public interface supports both regular users and administrators.

## Getting Started

### 1. Install prerequisites

- **Node.js 24.15.0**, matching `.nvmrc`.
- **Yarn 4.14.1**, managed through Corepack.
- **PostgreSQL** for the backend; Docker Compose for the dedicated local account
  environment described below.

```bash
git clone https://github.com/sergehall/webdev-coursework
cd webdev-coursework
nvm use
corepack enable
corepack prepare yarn@4.14.1 --activate
yarn runtime:check
yarn install:strict
```

### 2. Configure the applications

Create `frontend/.env.local`:

```dotenv
VITE_ENVIRONMENT=development
VITE_API_URL=
VITE_QUIZ_SECRET=dev-quiz-secret
VITE_OWNER_API_URL=
# Optional: collect marked presentation QR-link visits:
VITE_QR_ANALYTICS_ENABLED=true
# Optional monitoring:
# VITE_SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```

Empty API URLs use Vite's local proxy to `http://localhost:5050`. The root
`dev:frontend` script also clears `VITE_API_URL` for local development.

Create the backend configuration from the committed template:

```bash
cp backend/.env.example backend/.env
```

Set `DATABASE_URL` to your local PostgreSQL database, replace the placeholder
quiz/JWT/admin-key values, and keep `TYPEORM_SYNCHRONIZE=false`. Use
`POSTGRES_SSL=false` locally. `QUIZ_SECRET_KEY` must match `VITE_QUIZ_SECRET`.
Vite variables are included in the browser bundle; account, SMTP, OAuth, and MFA
secrets belong only in backend configuration.

### 3. Configure accounts locally

For the dedicated local account environment:

```bash
yarn workspace backend owner:configure:local
docker compose --env-file backend/.env.local -f compose.local.yml up -d --wait
yarn workspace backend migration:run:local
```

The configuration helper creates ignored `backend/.env.local`, generates missing
local credentials and an MFA key, and targets PostgreSQL on port `55432` and
Redis on port `56379`. Development loads this file before `backend/.env`.

Account activation requires `QR_ANALYTICS_ENABLED=true`, a valid
`OWNER_PASSWORD_HASH`, `OWNER_SESSION_SECRET`, and exact `OWNER_ALLOWED_ORIGINS`.
The backend flag currently gates both account services and QR analytics; the
frontend `VITE_QR_ANALYTICS_ENABLED` flag only controls QR event collection.
The helper leaves account activation disabled until a GitHub secret is present;
its GitHub settings are specific to this portfolio. Configure all four GitHub
OAuth variables for your own application, or clear all four for password-only
operation before enabling accounts. Email registration and password recovery
also require SMTP configuration.

Use `http://127.0.0.1:3000` with the helper's origin settings. Follow the
[account setup guide](docs/owner-account-analytics.md) for configuration details
and the [MFA guide](docs/account-mfa.md) for key management. Local database volumes
persist between runs.

### 4. Start development

```bash
yarn dev
```

To start the applications separately:

```bash
yarn dev:frontend
yarn dev:backend
```

To stop both applications and the local PostgreSQL container:

```bash
yarn stop:dev
```

This frees ports `3000` and `5050` and stops the `postgres` service in
`compose.local.yml`, preserving its container and database volume. Start the
database again with the Docker Compose command from step 3 before running
`yarn dev`.

| Service          | Local address           |
| ---------------- | ----------------------- |
| Frontend         | `http://127.0.0.1:3000` |
| Backend API      | `http://localhost:5050` |
| Frontend preview | `http://localhost:4173` |

### 5. Validate and build

```bash
yarn lint
yarn typecheck
yarn test:frontend
yarn test:backend
yarn build
```

Account HTTP integration tests use a separate disposable PostgreSQL database;
setup and execution are documented in the account guides.

<details>
<summary><strong>Additional workspace commands</strong></summary>

| Command                 | Purpose                                                         |
| ----------------------- | --------------------------------------------------------------- |
| `yarn check:frontend`   | Frontend TypeScript and lint checks                             |
| `yarn check:backend`    | Backend TypeScript, lint, and migration layout checks           |
| `yarn lint:fix`         | Apply available ESLint fixes                                    |
| `yarn format`           | Format supported repository files                               |
| `yarn format:check`     | Check repository formatting                                     |
| `yarn build:fast`       | Frontend bundle without its TypeScript gate, plus backend build |
| `yarn heroku-postbuild` | Build the backend for Heroku deployment                         |

</details>

## Documentation

Database migrations are organized as `backend/src/db/migrations/YYYY/MM` (UTC).
Use `yarn workspace backend migration:create AddUserPreferences` for an empty
migration or `yarn workspace backend migration:generate AddUserPreferences` for
an entity/schema diff. Both commands select the date and folder automatically.

| Guide                                                                  | Contents                                                                                              |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [API contracts and security](docs/api-contract-and-security.md)        | Swagger access, endpoint groups, DTOs, shared throttling, bot abuse controls and frontend integration |
| [Accounts and analytics](docs/owner-account-analytics.md)              | Roles, authentication, email delivery, local setup, and QR reporting                                  |
| [Connected providers](docs/account-providers.md)                       | GitHub linking, verified email addition, and provider lifecycle                                       |
| [Multi-factor authentication](docs/account-mfa.md)                     | Authenticator setup, recovery codes, encryption keys, and rollout procedures                          |
| [Account implementation plan](docs/account-plan.md)                    | Account design and implementation notes                                                               |
| [Database migrations](docs/database-migrations.md)                     | UTC year/month folders, creation commands, validation, and release allowlist                          |
| [Assessment standard](docs/quiz-assessment-standard.md)                | Canonical requirements for quizzes, practice assessments, and migrations                              |
| [Quiz image storage](docs/quiz-image-storage.md)                       | Private R2 setup, upload validation, and image delivery                                               |
| [Shared assessment module](frontend/src/features/assessment/README.md) | Assessment integration and frontend architecture                                                      |

The assessment standard remains one canonical document. `AGENTS.md` requires
reading it in full before assessment work, and existing guides link directly to
that file. It was reviewed during the large-file pass and kept intact at 507
lines; split it only alongside an update to those reading instructions and links.

## Deployment

The frontend is deployed through **Vercel** and the backend through **Heroku**.
The backend release process applies the explicit account migration set before
starting the application. Frontend and backend account configuration must use
compatible site origins for cookie sessions.

- **Platform:** [webdev-coursework.com](https://webdev-coursework.com)
- **API:** [api.webdev-coursework.com](https://api.webdev-coursework.com)

Deployment and feature activation are separate steps. Consult the account guides
for the rollout status of MFA and connected-provider features.

## Educational Use

Created as coursework and learning portfolio content for Santa Monica College.
The project demonstrates applied web engineering across application architecture,
account security, databases, cloud infrastructure, and developer workflows.
Educational use only.
