import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase.types";

export const javaStartProject: ProjectShowcaseItem = {
  id: "java-start",
  title: "Java Start",
  category: "CS56 coursework and full-stack Java learning platform",
  status: "local",
  filters: ["Fullstack", "Security"],
  languages: ["TS", "Java"],
  frameworks: ["Next.js", "Spring Boot"],
  summary:
    "A local-first CS56 learning platform that connects structured Java coursework, checked assignment submissions, progress tracking, and a standalone JavaFX lab to a secure Next.js and Spring Boot application.",
  imageUrl: "/screenshots/projects/java-start.png",
  previewLabel: "CS56 learning workspace",
  previewDescription:
    "Explore mapped course modules, inspect assignment source, track reviewed submissions, and launch a standalone JavaFX event-handling project.",
  architectureTags: [
    "Next.js BFF boundary",
    "Layered Spring modules",
    "Server-validated sessions",
    "Flyway-owned schema",
    "Catalog-driven learning",
    "Standalone JavaFX module",
    "Risk-tiered quality gates",
  ],
  contributions: [
    {
      area: "Frontend",
      detail:
        "Built the Next.js coursework workspace with module maps, Java concept pages, assignment previews and downloads, checked submissions, progress views, profiles, and account security screens.",
    },
    {
      area: "Backend",
      detail:
        "Implemented layered Spring Boot APIs for identity, profiles, learning progress, and assignment review with JPA repositories, GitHub OAuth, TOTP MFA, and revocable JWT sessions.",
    },
    {
      area: "Infrastructure",
      detail:
        "Added Docker-backed PostgreSQL 17, Flyway migrations, one-command local and production-like workflows, Actuator health endpoints, request correlation, and separate CI integration gates.",
    },
    {
      area: "Security",
      detail:
        "Protected account flows with BCrypt, email verification and recovery, encrypted MFA secrets, rate limits, httpOnly BFF cookies, unsafe-secret startup guards, and security-focused tests.",
    },
  ],
  highlights: [
    "Maps 16 CS56 modules into a navigable workspace; backend progress and static review currently track the implemented Expense Tracker and JavaFX group deliverables.",
    "Ships a standalone JavaFX 21 application with FXML, button, keyboard, mouse, resize, reset, and exit interactions backed by focused JUnit tests.",
    "Supports email/password and local GitHub OAuth, verification and recovery, optional TOTP MFA, encrypted MFA secrets, and server-side session revocation.",
    "Uses four GitHub Actions workflows for formatting, linting, types, frontend and backend tests, builds, and PostgreSQL Testcontainers validation; deployment remains intentionally local.",
  ],
  techStack: [
    "Next.js 16.2",
    "React 19.2",
    "TypeScript 5.7",
    "Tailwind CSS 4.3",
    "Zod 4.1",
    "Java 21",
    "Spring Boot 3.5.12",
    "Spring Security",
    "Spring Data JPA",
    "Flyway",
    "PostgreSQL 17",
    "JavaFX 21.0.10",
    "Testcontainers",
    "Vitest 2.1",
    "Docker Compose",
  ],
  sourceUrl: "https://github.com/sergehall/java-start",
  docsUrl: "https://github.com/sergehall/java-start/blob/main/README.md",
  architectureUrl:
    "https://github.com/sergehall/java-start/blob/main/README.md#learning-map",
};
