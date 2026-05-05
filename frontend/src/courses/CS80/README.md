# CS 80 – Internet Programming

_Santa Monica College, Summer 2025_

Welcome! This project contains my assignments and coursework for **CS 80 – Internet Programming** at **Santa Monica College**, Summer 2025.

## Live Preview

🌐&nbsp;[View deployed site on Vercel](https://smc-2025-cs80-internet-programming.vercel.app)

---

## Course Overview

> _“This course covers the basic technologies used to program Web-based applications, including HTML5, CSS, JavaScript, XML, PHP, and modern web extensions.”_  
> — SMC Course Syllabus

- **Instructor**: Anthony Wang ([wang_anthony@smc.edu](mailto:wang_anthony@smc.edu))
- **Term**: June 23 – August 1, 2025
- **Section**: 1239 (Online via Canvas)
- **Textbook**: Internet and WWW How to Program (_5th Edition_)
- **Units**: 3 • Transferable to CSU • Part of Web Programmer Certificate

---

## Student Learning Outcomes

- Define key internet and programming terms (e.g., Web Server, PHP, JavaScript, AJAX)
- Create structured websites with **HTML5**, **CSS3**, **JavaScript**, and **XML**
- Build interactive web components using **client-side** and **server-side** scripting
- Apply Web 2.0 methodologies and best practices
- Structure and submit professional assignments in modern frontend architecture

---

## Technologies Used

| Category   | Stack / Tools                       |
| ---------- | ----------------------------------- |
| Languages  | TypeScript, HTML5, CSS3, JavaScript |
| Frameworks | React 19, Tailwind CSS              |
| Tooling    | Vite, Yarn (Berry v4)               |
| Quality    | ESLint, Prettier, TypeScript        |

---

## Getting Started

<details>
<summary> Getting Started – Expand to view setup instructions</summary>

1. **Clone the repository**

   ```bash
   git clone https://github.com/sergehall/smc-2025-cs80-internet-programming-assignments
   cd smc-2025-cs80-internet-programming-assignments
   ```

2. **Install Node.js** (if not already installed)  
   Visit [https://nodejs.org](https://nodejs.org) and install **Node.js ≥ 18**

3. **Install Yarn 4 (if needed)**  
   To check if Yarn 4 is installed globally, run the following command. If it's not, install it:

   ```bash
   corepack enable
   corepack prepare yarn@4.9.2 --activate
   ```

4. **Install project dependencies**

   ```bash
   yarn install
   ```

5. **Start the development server**

   ```bash
   yarn dev
   ```

6. **Open in browser**  
   Visit [http://localhost:3000](http://localhost:3000) or the URL shown in your terminal

</details>

## Project Structure

<details>
<summary>Click to expand project structure</summary>

```text
/
├── .yarn/                         # Yarn v4 cache and metadata
├── node_modules/                  # Installed dependencies
├── public/
│   ├── images/                    # Image assets
│   ├── sandbox/                   # Module assignments
│   │   ├── mod-1/                 # Assignment 1 (campus-feedback-form.html, client-vs-server.html, etc.)
│   │   ├── mod-2/                 # Assignment 2 (assignment2.html, etc.)
│   │   ├── mod-3/                 # Assignment 3 (assignment3.html, etc.)
│   │   ├── mod-4/                 # Assignment 4 (assignment-mod-4-dom.html, etc.)
│   │   ├── mod-5/                 # Assignment 5 (form.html, nutrition.xml, etc.)
│   │   ├── mod-6/                 # Bonus Assignment
│   │   └── finaltest/             # CS 80  Final Test
│   ├── my-new-favicon.ico         # Custom favicon
│   └── syllabus_CS_80_1239.pdf    # Course syllabus PDF
├── src/
│   ├── assignments/               # Assignment components (e.g. Assignments tasks)
│   ├── components/                # Reusable UI components
│   ├── context/                   # React context providers
│   ├── data/                      # Static or dynamic data
│   ├── hooks/                     # Custom React hooks
│   ├── layout/                    # App layout structure
│   ├── pages/                     # Page components (for routing)
│   ├── routes/                    # Route definitions
│   ├── styles/                    # Tailwind/global styles
│   └── utils/                     # Utility functions
│     ├── App.css                        # Main CSS (can be Tailwind-based)
│     ├── App.tsx                        # Root App component
│     ├── App.tsx                        # Root App component│
│     ├── AppProviders.tsx               # Global providers for theme, progress, and error boundaries
│     ├── index.css                      # Global base CSS
│     ├── main.tsx                       # App entry point│
│     ├── vite-env.d.ts                  # TypeScript environment types
├── index.html                     # App root HTML template
├── .editorconfig                  # Editor config rules
├── .gitignore                     # Git ignore file
├── .yarnrc.yml                    # Yarn configuration
├── eslint.config.js               # ESLint config
├── postcss.config.js              # Tailwind/PostCSS config
├── prettier.config.cjs            # Prettier formatting rules
├── README.md                      # Project documentation
├── tailwind.config.js             # TailwindCSS config
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.tsbuildinfo           # TS incremental build cache
├── vite.config.ts                 # Vite build tool config
├── vercel.json                    # Vercel deployment settings
└── yarn.lock                      # Yarn dependency lockfile

```

</details>

---

## Scripts

| Script               | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `yarn dev`           | Start development server with Vite                             |
| `yarn build`         | Build TypeScript and production bundle with Vite               |
| `yarn preview`       | Preview production build locally                               |
| `yarn lint`          | Run ESLint on entire project (all files)                       |
| `yarn lint:fix`      | Auto-fix lint issues in all files                              |
| `yarn lint:src`      | Run ESLint only on the `src` directory                         |
| `yarn lint:src:fix`  | Auto-fix lint issues in the `src` directory                    |
| `yarn tailwind:init` | Generate Tailwind & PostCSS config files                       |
| `yarn build:css`     | Watch and compile Tailwind CSS separately to `dist/output.css` |

---

## Assignments Covered

| Module    | Title / Description                                       | Status      |
| --------- | --------------------------------------------------------- | ----------- |
| **Mod 1** | Introduction to Computers and the Internet - HTML5        | ✅ complete |
| **Mod 2** | Cascading Style Sheets (CSS)                              | ✅ complete |
| **Mod 3** | Introduction to Scripting - JavaScript Control Statements | ✅ complete |
| **Mod 4** | Document Object Model (DOM)                               | ✅ complete |
| **Mod 5** | jQuery - XML and JSON                                     | ✅ complete |
| **Mod 6** | Ajax and jQuery (Bonus assignment)                        | ✅ complete |

---

### Final Deliverables

| Type           | Description                                             | Status      |
| -------------- | ------------------------------------------------------- | ----------- |
| **Final Test** | CS 80 Final Test                                        | ✅ complete |
| **Project**    | Interactive Coursework Viewer & Final Assignment Portal | ✅ complete |

---

## Final Project

This interactive frontend web application was developed as the Final Project for **CS 80 – Internet Programming** at Santa Monica College.  
It brings together all course modules in a modular, assignment-based viewer that showcases **HTML**, **CSS**, **JavaScript**, **DOM scripting**, **XML/JSON**, and **form handling**.

---

### Core Stack

- **Frontend**: `React 19` + `Vite` + `Tailwind CSS`
- Component-based architecture using `React Router` for navigation
- Smooth UI interactions and animations powered by `Framer Motion`
- Fully typed with `TypeScript` and styled with Tailwind utility classes

---

### Project: `smc-2025-cs80-internet-programming-assignments`

Built with:

![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite&style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?logo=react&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-7.6-CA4245?logo=react-router&style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-black?logo=framer&style=flat-square)

#### Key Features

- **Modular assignment viewer**: Each course module (Mod1 to Mod6) is a self-contained sandboxed unit, with static files and/or dynamic UI representations.
- **Routing system** via `react-router-dom` with centralized route definitions and page components
- **Global state management** using React Context to track navigation and user activity
- **Interactive UI/UX enhancements**:
  - Confetti animations using `canvas-confetti`
  - Toast feedback via `react-hot-toast`
  - Visual charts using `react-circular-progressbar`
  - Icon support with `lucide-react` and `react-icons`
  - Accordion-style assignment sections via `AnimatedAccordionItem`
  - Modal previews using secure `<iframe>` containers with toggling and overlays
- **Reusable component architecture**: Assignments use shared components (buttons, modals, accordions) to ensure UI consistency and minimize duplication
- **Form validation** and input handling using custom logic and optional `Zod` schemas
- **Robust SandboxPage**: a dynamic and secure environment that allows loading and executing external or internal `.js` files in a sandboxed `<iframe>`, with real-time console logging, upload support, and replay functionality
- **Testing ready** with `Vitest`, `@testing-library/react`, and `jsdom`

> This project demonstrates how modular academic assignments can be elevated into a well-designed, interactive portfolio, applying modern frontend tooling and best practices.

---

### Developer Tooling

- Monorepo using `Yarn 4` with Plug and Play
- `ESLint`, `Prettier`, and strict `TypeScript` for consistent, error-free code
- `Vitest` and Testing Library for component testing
- CI-ready via scripts for linting, formatting, testing, and coverage
- Dev server powered by `yarn dev` with hot module reload

---

### Deployment

- [Open Project on Vercel](https://smc-2025-cs80-internet-programming.vercel.app/)
- Deployed via `vercel.json` configuration, optimized for fast production builds

---

## Author

**Serge Hall**  
GitHub: [@SergeHall](https://github.com/SergeHall)  
Email: `serge.hall.dev@gmail.com`

---

## License

This repository is for **educational purposes only**, as part of coursework at **Santa Monica College**.  
Not intended for production or commercial use.
