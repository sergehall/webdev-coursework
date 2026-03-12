# WebDev Coursework Platform

A full-stack educational monorepo that documents my step-by-step journey through Santa Monica College Web Development coursework.

This project is both:

- a working learning platform (frontend + backend)
- a portfolio of real coursework artifacts, assignments, and technical growth

---

## Project Purpose

This repository tracks how I am building practical web development skills over time:

- designing frontend interfaces
- implementing backend APIs
- learning databases, networking, cloud, and security
- organizing coursework in a production-style monorepo

It is intentionally structured like a professional engineering project while staying true to its academic purpose.

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

- Course-centric UI with pathway and coursework views
- Assignment/module organization per class
- Code Playground for safe JS/Python practice
- Progress tracking flows and completion feedback
- Backend API for coursework-related data and quiz/progress logic
- Responsive interface for desktop and mobile

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Vitest + Testing Library

### Backend

- NestJS 11
- TypeScript
- TypeORM
- PostgreSQL
- Jest + Supertest

### Tooling

- Yarn 4 Workspaces (Plug'n'Play)
- ESLint
- Prettier
- Concurrent dev workflow

---

## Monorepo Layout

```text
webdev-coursework/
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   ├── courses/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── ...
│   └── public/
├── backend/                   # NestJS API
│   ├── src/
│   ├── test/
│   └── ...
├── package.json               # Root workspace scripts
└── README.md
```

---

## Getting Started

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

### 3. Run locally

Create backend environment file:

```bash
cp backend/.env.example backend/.env
```

```bash
yarn dev
```

Default local endpoints:

- Frontend dev: `http://localhost:5173`
- Frontend preview (optional): `http://localhost:4173`
- Backend dev: `http://localhost:5050`

### 4. Quality checks

```bash
yarn lint
yarn typecheck
yarn test:frontend
yarn test:backend
```

### 5. Production build

```bash
yarn build
```

---

## Root Scripts

| Script                | Description                         |
| --------------------- | ----------------------------------- |
| `yarn install:strict` | Install using immutable lockfile    |
| `yarn install:fresh`  | Standard install (non-immutable)    |
| `yarn dev`            | Run frontend + backend together     |
| `yarn dev:frontend`   | Run frontend only                   |
| `yarn dev:backend`    | Run backend only                    |
| `yarn lint`           | Lint both workspaces                |
| `yarn lint:fix`       | Auto-fix lint where possible        |
| `yarn typecheck`      | Type-check frontend + backend       |
| `yarn test:frontend`  | Run frontend tests                  |
| `yarn test:backend`   | Run backend tests                   |
| `yarn build`          | Build frontend + backend            |
| `yarn build:fast`     | Faster build flow                   |
| `yarn clean:meta`     | Clean cache/install metadata        |
| `yarn clean:full`     | Full cleanup of generated artifacts |

---

## Frontend Workspace Commands

Run from root using `yarn workspace frontend <script>`:

| Script         | Description                       |
| -------------- | --------------------------------- |
| `start:dev`    | Start Vite dev server             |
| `preview`      | Preview production frontend build |
| `typecheck`    | Run TypeScript checks             |
| `build:bundle` | Build frontend bundle with Vite   |
| `build:fast`   | Fast frontend build               |
| `build`        | Typecheck + build                 |
| `lint`         | Lint frontend code                |
| `lint:fix`     | Auto-fix lint issues              |
| `check`        | Typecheck + lint                  |
| `format`       | Run Prettier on frontend          |
| `test`         | Run Vitest in watch mode          |
| `test:run`     | Run Vitest once                   |
| `test:ci`      | Run tests with coverage           |
| `test:ui`      | Run Vitest UI                     |

---

## Backend Workspace Commands

Run from root using `yarn workspace backend <script>`:

| Script       | Description                        |
| ------------ | ---------------------------------- |
| `start:dev`  | Start backend in watch mode        |
| `start`      | Start backend normally             |
| `start:prod` | Run built backend from `dist/`     |
| `build`      | Build backend                      |
| `typecheck`  | Run TypeScript checks              |
| `lint`       | Lint backend code                  |
| `lint:fix`   | Auto-fix lint issues               |
| `check`      | Typecheck + lint                   |
| `format`     | Run Prettier on backend            |
| `test`       | Run backend unit/integration tests |
| `test:e2e`   | Run backend E2E tests              |
| `test:watch` | Run backend tests in watch mode    |
| `test:cov`   | Run tests with coverage            |
| `test:debug` | Debug backend tests                |

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

## Author

**Serge Hall**

- GitHub: [@SergeHall](https://github.com/SergeHall)
- Email: `serge.hall.dev@gmail.com`

---

## License

Educational use only. Created as coursework and learning portfolio content for Santa Monica College.
