# WebDev Coursework Platform

_Modular full-stack monorepo for multiple Computer Science courses at Santa Monica College._

---

## Courses Included

This platform supports multiple SMC Web Programming courses, including:

- **CS 60** – Database Concepts and Applications  
- **CS 70** – Network Fundamentals and Architecture  
- **CS 73A** – Fundamentals of Computer Security  
- **CS 79A** – Introduction to Cloud Computing  
- **CS 79E** – Best Practices in Amazon Web Services  
- **CS 80** – Internet Programming  
- **CS 81** – JavaScript Programming  
- **CS 83** – Server-Side Java Web Programming  
- **CS 87A** – Python Programming  

Each module demonstrates core skills, including:

- HTML, CSS, JavaScript
- React 19, TypeScript, Vite, Tailwind CSS
- Backend with NestJS, PostgreSQL, TypeORM
- REST API development & testing (Jest, Supertest)
- Cloud, database & security fundamentals
- Modular architecture, state management, animation, routing
- Zod validation, E2E progress tracking
- Yarn 4 workspaces with Plug'n'Play (PnP)

---

## Getting Started
<details>
<summary> Getting Started – Expand to view setup instructions</summary>

1. **Clone the repository**
   ```bash
   git clone https://github.com/sergehall/webdev-coursework
   cd webdev-coursework
   ```

2. **Install Node.js** (if not already installed)  
   Visit [https://nodejs.org](https://nodejs.org) and install **Node.js ≥ 18**

3. **Install Yarn 4** (if needed)
   ```bash
   corepack enable
   corepack prepare yarn@4.9.2 --activate
   ```

4. **Install project dependencies**
   > You can install strictly or with relaxed mode:
   ```bash
   yarn install:strict     # preferred (immutable)
   # or
   yarn install:fresh      # fresh install
   ```

5. **Start development servers (frontend + backend concurrently)**
   ```bash
   yarn dev
   ```

6. **Individual workspace development (optional)**  
   To run only one part:
   ```bash
   yarn dev:frontend   # frontend only
   yarn dev:backend    # backend only
   ```

7. **Lint, format, and test**
   ```bash
   yarn lint          # run ESLint on both workspaces
   yarn format        # run Prettier on both workspaces
   yarn test:frontend # run tests in frontend
   yarn test:backend  # run tests in backend
   ```

8. **Build for production**
   ```bash
   yarn build
   ```

9. **Clean all artifacts**
   ```bash
   yarn clean:meta   # clean cache and install state
   yarn clean:full   # full wipe (including dist folders)
   ```

> This project uses **Yarn 4 Workspaces** with **Plug'n'Play (PnP)** and concurrent dev servers powered by `concurrently`.  
> All commands are defined in the root `package.json`.

> **Having issues with PnP or workspace resolution?**  
> Try running `yarn install:strict` again, or delete `.yarn`, `.pnp.*`, and `yarn.lock`, then reinstall with:  
> `corepack prepare yarn@4.9.2 --activate && yarn install`
---
</details>

## Monorepo Structure

<details>
<summary>Click to expand project structure</summary>

```text
├── backend/                     # NestJS backend API
│   ├── src/                     # Application modules, controllers, services
│   ├── test/                    # Unit and E2E tests
│   ├── uploads/                 # File uploads directory
│   ├── .env                     # Backend environment variables
│   ├── eslint.config.js         # Lint configuration
│   ├── jest.config.js           # Jest config for unit/e2e tests
│   ├── nest-cli.json            # NestJS CLI config
│   ├── package.json             # Backend dependencies and scripts
│   ├── prettier.config.cjs      # Prettier configuration
│   ├── tsconfig.json            # TypeScript config
│   └── tsconfig.build.json      # TS config for production builds
├── frontend/                    # Vite + React frontend
│   ├── assets/                  # Static assets
│   ├── node_modules/            # Frontend dependencies (ignored)
│   ├── public/                  # Public assets
│   ├── src/                     # Frontend source code
│   │   ├── api/                 # API functions
│   │   ├── components/          # Reusable UI components
│   │   ├── config/              # App configuration
│   │   ├── constants/           # Constant values
│   │   ├── context/             # React context providers
│   │   ├── courses/             # Course modules
│   │   │   ├── CS80/            # JavaScript Programming
│   │   │   └── CS81/            # Internet Programming
│   │   ├── data/                # Static/local data
│   │   ├── hooks/               # Custom React hooks
│   │   ├── layout/              # Page layout components
│   │   ├── pages/               # Route-level pages
│   │   ├── routes/              # App routing
│   │   ├── styles/              # Global and component styles
│   │   ├── test/                # Frontend tests
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Utility functions
│   │   ├── App.css              # App-wide CSS
│   │   ├── App.test.tsx         # App test file
│   │   ├── App.tsx              # Main App component
│   │   ├── AppProviders.test.tsx # AppProviders test file
│   │   ├── AppProviders.tsx     # AppProviders component
│   │   ├── index.css            # Global CSS
│   │   ├── main.tsx             # React root entry
│   │   └── vite-env.d.ts        # Vite environment types
│   ├── .env                     # Frontend env vars
│   ├── .env.development         # Dev-specific env vars
│   ├── .env.test                # Test-specific env vars
│   ├── .env.test.example        # Example test env
│   ├── eslint.config.js         # ESLint rules for frontend
│   ├── index.html               # Vite entry point
│   ├── package.json             # Frontend dependencies and scripts
│   ├── postcss.config.js        # PostCSS config for Tailwind
│   ├── prettier.config.cjs      # Prettier configuration
│   ├── setupTests.ts            # Setup for frontend testing
│   ├── tailwind.config.js       # TailwindCSS configuration
│   ├── tsconfig.json            # TypeScript config
│   ├── tsconfig.tsbuildinfo     # TS build metadata (ignored)
│   ├── vercel.json              # Vercel deployment config
│   └── vite.config.ts           # Vite configuration
├── .editorconfig                # Editor formatting rules
├── .gitignore                   # Ignored files list
├── .pnp.cjs                     # Yarn Plug'n'Play entry
├── .pnp.loader.mjs              # PnP module loader
├── .yarn/                       # Yarn PnP cache and metadata
├── .yarnrc.yml                  # Yarn 4 configuration
├── package.json                 # Root workspace config, scripts, workspaces
├── tsconfig.tsbuildinfo         # TS build metadata (ignored)
├── yarn.lock                    # Yarn lockfile
├── Procfile                     # Heroku process definition (for backend)
└── README.md                    # Project documentation
```

</details>

## Scripts

Run from root:

| Script              | Description                   |
| ------------------- | ----------------------------- |
| `yarn install`      | Install all dependencies      |
| `yarn dev`          | Run both frontend and backend |
| `yarn dev:frontend` | Run frontend only             |
| `yarn dev:backend`  | Run backend only              |
| `yarn lint`         | Run ESLint on all workspaces  |
| `yarn build`        | Build frontend and backend    |

---

## Course Module Architecture

- Each module (e.g. Mod 1–12) is fully encapsulated
- Follows assignment-based routing
- Module completion progress stored with backend API
- Celebratory animations and module feedback on completion

---
### Core Stack

- Frontend: React 19, Vite, Tailwind CSS
- Backend: NestJS 11, PostgreSQL, TypeORM
- Tooling: Yarn 4, TypeScript, ESLint, Prettier, CI

---

### Frontend

<details>
<summary> Frontend Overview – Built with React, Vite, Tailwind</summary>

Built with:

![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite&style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?logo=react&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-7.6-CA4245?logo=react-router&style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-black?logo=framer&style=flat-square)

- **Modular, assignment-based architecture**: Each course module (e.g., Mod3, Mod4, Mod12) has its own directory with independent logic, state, and UI components, promoting separation of concerns.
- **Routing system** powered by a centralized `<AppRoutes />` wrapper and `react-router-dom`, allowing nested dynamic routes per module.
- **Context-based global state** management via custom `ProgressProvider`, enabling user progress tracking across modules and views.
- **Advanced UI/UX effects**:
  - `canvas-confetti` for celebratory animations on achievements
  - Toasts via `react-hot-toast`
  - Visual dashboards using `react-circular-progressbar`
  - Smooth transitions and animations with `framer-motion`
- **Iconography and feedback**: rich visual communication using `lucide-react` and `react-icons`.
- **Type-safe forms and schema validation** with `Zod`, ensuring correctness before submission.
- **Test-ready environment** using `Vitest` and Testing Library setup via `setupTests.ts`.

This frontend is more than a UI — it is a structured learning platform simulating real-world patterns: modular assignments, custom layouts, state tracking, and animated interactivity.

</details>

### Backend

<details>
<summary> Backend API Stack – NestJS, PostgreSQL, Auth, Jest </summary>

Powered by:

![NestJS](https://img.shields.io/badge/NestJS-11-red?logo=nestjs&style=flat-square)
![TypeORM](https://img.shields.io/badge/ORM-TypeORM-262C63?logo=typeorm&style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&style=flat-square)
![Jest](https://img.shields.io/badge/Tested_with-Jest-C21325?logo=jest&style=flat-square)



- RESTful API with modular `Controllers`, `Services`, and `DTOs`
- Data validation using `class-validator`
- File uploads with `multer` and cookie/session handling
- Protected routes using a custom `AnswersTokenGuardQuery` that verifies secure quiz access tokens using HMAC-style SHA-256 hashing and environment-based secrets
- Secure API development with strict DTO validation and integration testing
- **Backend tests** written using [`Jest`](https://jestjs.io/) and [`Supertest`](https://github.com/ladjs/supertest) for unit and E2E coverage

</details>

---

### Developer Tooling

<details>
<summary> Developer Tooling – Monorepo Scripts, Testing, Linting, CI</summary>

- **Monorepo** powered by `Yarn 4 Workspaces` and Plug'n'Play (PnP).
- **Linting** and **code formatting** via `ESLint`, `Prettier`, and `TypeScript`.
- **Testing**:
  - Frontend: `Vitest`, `Testing Library`, `JSDOM`.
  - Backend: `Jest`, E2E tests with `Supertest`.
- Monorepo with `Yarn 4`, Plug'n'Play, and workspace scripts
- **CI-ready** scripts and consistency checks (`tsc`, `lint`, `format`, `test`, `coverage`).
- Custom build/dev scripts for both frontend and backend, run via `concurrently`.
- Unified development flow: `yarn dev` runs both frontend and backend with hot reload
- TypeScript project references and strict mode enforcement

</details>

## Deployment

- [Open Frontend on Vercel](https://webdev-coursework.com)
- [Open Backend API on Heroku](https://api.webdev-coursework.com)
- Environment-managed builds, optimized for production
## Author

**Serge Hall**  
GitHub: [@SergeHall](https://github.com/SergeHall)  
Email: `serge.hall.dev@gmail.com`

---

## License

Educational use only. Created for coursework at **Santa Monica College**, not for production use.
