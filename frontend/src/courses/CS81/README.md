# CS 81 – JavaScript Programming

_Santa Monica College, Summer 2025_

---

Welcome! This repository contains my coursework for **CS 81 – JavaScript Programming** at **Santa Monica College**, Summer 2025. It includes both the **frontend** (React + Vite) and **backend** (NestJS + PostgreSQL), organized as a modern **Yarn 4 monorepo** using **Plug'n'Play (PnP)**.

---

## Course Overview

> _“Computer Science 81 JavaScript Programming Summer 2025.”_  
> [View Syllabus in Browser](https://github.com/sergehall/smc-2025-cs81-javascript-programming/blob/main/frontend/public/CS81-Syllabus-Sum25-Seno.pdf)  
> [Download Syllabus (PDF)](https://github.com/sergehall/smc-2025-cs81-javascript-programming/raw/main/frontend/public/CS81-Syllabus-Sum25-Seno.pdf)

- **Instructor**: Vicky Tanya Seno ([seno_vicky@smc.edu](mailto:seno_vicky@smc.edu))
- **Term**: June 23 – August 1, 2025
- **Section**: 1240 (Online via Canvas)
- **Units**: 3 • Transferable to CSU • Part of Web Programmer Certificate

---

## Getting Started

<details>
<summary> Getting Started – Expand to view setup instructions</summary>

1. **Clone the repository**

   ```bash
   git clone https://github.com/sergehall/smc-2025-cs81-javascript-programming
   cd smc-2025-cs81-javascript-programming
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
/
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
│   ├── src/                     # Frontend source code
│   ├── assets/                  # Static assets
│   ├── public/                  # Public assets
│   ├── dist/                    # Build output (ignored)
│   ├── .env                     # Frontend env vars
│   ├── .env.development         # Dev-specific env vars
│   ├── index.html               # Vite entry point
│   ├── eslint.config.js         # ESLint rules for frontend
│   ├── tailwind.config.ts       # TailwindCSS configuration
│   ├── postcss.config.js        # PostCSS config for Tailwind
│   ├── prettier.config.cjs      # Prettier configuration
│   ├── setupTests.ts            # Setup for frontend testing
│   ├── vite.config.ts           # Vite configuration
│   ├── vercel.json              # Vercel deployment config
│   ├── tsconfig.json            # TypeScript config
│   └── tsconfig.tsbuildinfo     # TS build metadata (ignored)
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

---

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

## Course Coverage

| Module     | Description                                                   | Status      |
| ---------- | ------------------------------------------------------------- | ----------- |
| **Mod 1**  | Ch 1: Introduction to JavaScript Values, Types, and Operators | ✅ complete |
| **Mod 2**  | Ch 2: Program Structure                                       | ✅ complete |
| **Mod 3**  | Ch 3: Functions                                               | ✅ complete |
| **Mod 4**  | Ch 4: Data Structures: Objects and Arrays                     | ✅ complete |
| **Mod 5**  | Ch 5: Higher Order Functions                                  | ✅ complete |
| **Mod 6**  | Ch 13–14: JS and the Browser, The DOM                         | ✅ complete |
| **Mod 7**  | Introduction to React (OER)                                   | ✅ complete |
| **Mod 8**  | React State & Props (OER)                                     | ✅ complete |
| **Mod 9**  | React Events & Side Effects (OER)                             | ✅ complete |
| **Mod 10** | Building Forms in React (OER)                                 | ✅ complete |
| **Mod 11** | Public APIs (OER)                                             | 🔜 upcoming |
| **Mod 12** | Final Project (OER)                                           | 🔜 upcoming |

---

## Final Project

This full-stack monorepo web application was developed as the **Final Project** for _CS 81 – JavaScript Programming_ at Santa Monica College. It brings together all major course topics—DOM manipulation, component-based React, API interaction, and full-stack deployment—into one cohesive project.

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
- Protected routes using a custom `AnswersTokenGuard` that verifies secure quiz access tokens using HMAC-style SHA-256 hashing and environment-based secrets
- Secure API development with strict DTO validation and integration testing
- **Backend tests** written using [`Jest`](https://jestjs.io/) and [`Supertest`](https://github.com/ladjs/supertest) for unit and E2E coverage

</details>

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

- [Open Frontend on Vercel](https://smc-2025-cs81-javascript-programmin.vercel.app/)
- [Open Backend API on Heroku](https://smc-2025-cs81-b0c34ebeb88c.herokuapp.com/api)
- Environment-managed builds, optimized for production

### Highlights from Monorepo

- Unified dev workflow: `yarn dev` spins up both apps with hot-reload.
- Clean structure: clearly separated frontend/backend, typed configs, and build metadata.
- Shared tooling with strict versioning for Node (`20.x`), Yarn (`4.9.2`), and TypeScript (`5.8.x`).

---

This project demonstrates full-cycle development with modern web tooling, reflecting both the academic goals of **CS 81** and production-ready software engineering standards.

---

## Author

**Serge Hall**  
GitHub: [@SergeHall](https://github.com/SergeHall)  
Email: `serge.hall.dev@gmail.com`

---

## License

This repository is for **educational purposes only**, as part of coursework at **Santa Monica College**.  
Not intended for production or commercial use.
