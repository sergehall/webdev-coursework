# WebDev Coursework Platform

A full-stack academic portfolio and learning platform built around my Santa
Monica College Web Development coursework.

This project is both:

- a working full-stack platform with frontend and backend applications
- a documented record of coursework, assignments, and applied technical growth

---

## Project Purpose

This repository serves as a structured academic portfolio documenting my
progress through Santa Monica College Web Development coursework.

It brings together the knowledge, assignments, and practical outcomes from the
classes I have completed, while showing how that learning was applied in a real
project environment. The platform is designed to capture both the educational
journey and the hands-on implementation work behind it.

Through this project, I use a single application to:

- document coursework, assignments, and learning progress
- reinforce new concepts through practical implementation
- apply classroom knowledge across frontend, backend, databases, cloud,
  networking, and security
- organize academic work inside a production-style monorepo
- build a portfolio project that reflects both training and real development
  practice

Although this is an educational project, it is intentionally developed with
professional engineering structure and workflows so that it functions both as a
learning tool and as a long-term portfolio artifact.

---

## Current Course Track

The platform currently reflects this active SMC pathway:

- **CS 60** - Database Concepts & Applications
- **CS 70** - Network Fundamentals and Architecture
- **CS 79A** - Introduction to Cloud Computing
- **CS 80** - Internet Programming
- **CS 81** - JavaScript Programming
- **CS 85** - PHP Programming
- **CS 79D** - Security in Amazon Web Services
- **CS 79C** - Compute Engines in Amazon Web Services
- **CS 87A** - Python Programming

---

## What The Platform Includes

- Course-centered navigation with home, pathway, coursework, and resources views
- Per-course assignment and module organization with route-based loading
- Sandboxed Code Playground for JavaScript and Python practice
- Progress tracking, module completion flows, and end-of-course completion pages
- Backend API for coursework metadata, quiz delivery, answer-token flows, and progress persistence
- Responsive layout that adapts across desktop and mobile navigation patterns

---

## Tech Stack

### Frontend App

- React 19 + React DOM 19
- TypeScript 5
- Vite 7
- React Router 7
- Tailwind CSS 3 + PostCSS + Autoprefixer
- Framer Motion
- Lucide React + React Icons
- Zod environment validation
- Sentry browser instrumentation
- Vitest 3 + Testing Library + JSDOM

### Backend API

- NestJS 11
- TypeScript 5
- TypeORM 0.3
- PostgreSQL via `pg`
- JWT-based quiz token flows with `@nestjs/jwt`
- Swagger/OpenAPI via `@nestjs/swagger`
- `class-validator` + `class-transformer`
- Jest 29 + Supertest

### Tooling and Monorepo

- Yarn 4 workspaces with Plug'n'Play
- ESLint 9
- Prettier 3
- Concurrent frontend/backend local dev workflow
- Vercel frontend deployment and Heroku-oriented backend build flow

---

## Monorepo Layout

<details>
<summary><strong>Show monorepo layout</strong></summary>

```text
webdev-coursework/
├── .github/workflows/         # CI and deployment automation
├── docs/                      # Retrospectives and project notes
├── frontend/                  # React + Vite learning platform
│   ├── public/                # Static assets, icons, code-playground files
│   ├── assets/                # Local design/source assets
│   ├── src/
│   │   ├── api/               # Frontend API clients and config
│   │   ├── components/        # Shared UI components and buttons
│   │   ├── config/            # Environment validation and app config
│   │   ├── context/           # Theme and progress providers
│   │   ├── courses/           # Course/module content and assignment scaffolds
│   │   ├── data/              # Course metadata and static datasets
│   │   ├── hooks/             # Reusable React hooks
│   │   ├── layout/            # App shell layout
│   │   ├── pages/             # Route-level screens
│   │   ├── routes/            # Router wiring and lazy screen loading
│   │   ├── styles/            # Global CSS layers and resets
│   │   ├── test/              # Shared frontend test helpers
│   │   ├── ui/                # UI utilities, icons, theme helpers
│   │   └── utils/             # Sandbox, security, and helper utilities
│   ├── vite.config.ts
│   └── setupTests.ts
├── backend/                   # NestJS API and quiz/progress services
│   ├── public/                # Static assets served by Nest
│   ├── uploads/               # Uploaded/generated backend files
│   ├── src/
│   │   ├── app/               # Health/info endpoints and app DTOs
│   │   ├── bootstrap/         # CORS, Swagger, validation bootstrap helpers
│   │   ├── db/                # TypeORM/Postgres configuration
│   │   ├── guards/            # Admin and quiz auth guards
│   │   ├── middlewares/       # Request logging middleware
│   │   ├── quiz/              # Quiz API, DTOs, entities, repositories, service
│   │   ├── swagger/           # API documentation registry/builders
│   │   └── tokens/            # JWT answer-token issuance flow
│   ├── test/                  # Backend unit and e2e tests
│   ├── nest-cli.json
│   └── tsconfig*.json
├── package.json               # Root workspace orchestration scripts
├── yarn.lock
└── README.md
```

</details>

---

## Getting Started

<details>
<summary><strong>Show getting started</strong></summary>

### 1. Prerequisites

- **Node.js**: `24.14.0`
- **Yarn**: `4.12.0` (via Corepack)

```bash
node -v
yarn -v
```

### 2. Clone and install

```bash
git clone https://github.com/sergehall/webdev-coursework
cd webdev-coursework
corepack enable
corepack prepare yarn@4.12.0 --activate
yarn install:strict
```

If needed, you can use:

```bash
yarn install:fresh
```

### 3. Configure environment files

This repo does not currently include committed `.env.example` files, so create
the local env files manually.

<details>
<summary><strong>Show frontend/.env.local example</strong></summary>

Create `frontend/.env.local`:

```dotenv
VITE_ENVIRONMENT=development
VITE_API_URL=http://localhost:5050
VITE_QUIZ_SECRET=dev-quiz-secret
# Optional:
# VITE_SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```

</details>

<details>
<summary><strong>Show backend/.env example</strong></summary>

Create `backend/.env`:

```dotenv
PORT=5050
DATABASE_URL=postgres://postgres:postgres@localhost:5432/webdev_coursework
QUIZ_SECRET_KEY=dev-quiz-secret
QUIZ_ANSWERS_JWT_SECRET=replace-with-a-long-random-string
QUIZ_ANSWERS_JWT_TTL=1h
QUIZ_JWT_ISSUER=webdev-coursework
QUIZ_JWT_AUDIENCE=webdev-coursework-frontend
ADMIN_API_KEY=dev-admin-key
ALLOWED_ORIGINS=http://localhost:5173
POSTGRES_SSL=false
TYPEORM_SYNCHRONIZE=false
```

</details>

Notes:

- `VITE_API_URL` should point to the backend server.
- `VITE_QUIZ_SECRET` and `QUIZ_SECRET_KEY` should match.
- `DATABASE_URL` must be valid or the Nest app will fail during startup.
- `POSTGRES_SSL=false` is the typical local setting.

### 4. Run locally

Start both workspaces:

```bash
yarn dev
```

Or start each app independently:

```bash
yarn dev:frontend
yarn dev:backend
```

Default local endpoints:

- Frontend dev: `http://localhost:5173`
- Frontend preview: `http://localhost:4173`
- Backend API: `http://localhost:5050`

### 5. Quality checks

```bash
yarn lint
yarn typecheck
yarn test:frontend
yarn test:backend
```

For workspace-specific verification, you can also run:

```bash
yarn check:frontend
yarn check:backend
```

### 6. Production build

```bash
yarn build
```

</details>

---

## Root Scripts

<details>
<summary><strong>Show root scripts</strong></summary>

| Script                  | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `yarn install:strict`   | Install with immutable lockfile enforcement    |
| `yarn install:fresh`    | Standard workspace install                     |
| `yarn dev`              | Run frontend and backend together              |
| `yarn dev:frontend`     | Start only the frontend workspace              |
| `yarn dev:backend`      | Start only the backend workspace               |
| `yarn test:frontend`    | Run frontend tests from the root               |
| `yarn test:backend`     | Run backend tests from the root                |
| `yarn typecheck`        | Run frontend and backend TypeScript checks     |
| `yarn lint`             | Lint both workspaces                           |
| `yarn lint:fix`         | Auto-fix lint issues in both workspaces        |
| `yarn format`           | Run Prettier across both workspaces            |
| `yarn format:check`     | Check formatting across both workspaces        |
| `yarn check:frontend`   | Run frontend combined checks                   |
| `yarn check:backend`    | Run backend combined checks                    |
| `yarn clean:meta`       | Remove cache, lock metadata, and build outputs |
| `yarn clean:full`       | Run full cleanup for generated artifacts       |
| `yarn build:fast`       | Build frontend fast path + backend build       |
| `yarn build`            | Full frontend build + backend build            |
| `yarn heroku-postbuild` | Build the backend for Heroku-style deploys     |

</details>

---

## Learning Focus Areas

This project is designed to show growth across:

- full-stack application architecture
- code organization and maintainability
- safe defaults in frontend sandbox features
- test coverage and developer workflow quality
- practical cloud/security/database literacy for web development

---

## Deployment

- Frontend: [webdev-coursework.com](https://webdev-coursework.com)
- Backend API: [api.webdev-coursework.com](https://api.webdev-coursework.com)

---

## License

Educational use only. Created as coursework and learning portfolio content for Santa Monica College.
