export type ProjectStatus = "featured" | "published" | "draft" | "local";
export type ProjectFilter =
  | "Fullstack"
  | "Cloud"
  | "Security"
  | "Marketplace"
  | "Microservices";

export type ProjectLanguage = "JS" | "TS" | "Java" | "Go";

export type BuildContribution = {
  readonly area: "Frontend" | "Backend" | "Infrastructure" | "Security";
  readonly detail: string;
};

export type ProjectShowcaseItem = {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly status: ProjectStatus;
  readonly filters: readonly ProjectFilter[];
  readonly languages: readonly ProjectLanguage[];
  readonly summary: string;
  readonly imageUrl: string;
  readonly previewLabel: string;
  readonly previewDescription: string;
  readonly architectureTags: readonly string[];
  readonly contributions: readonly BuildContribution[];
  readonly highlights: readonly string[];
  readonly techStack: readonly string[];
  readonly liveUrl?: string;
  readonly sourceUrl?: string;
  readonly docsUrl?: string;
  readonly architectureUrl?: string;
};

export const projectFilters = [
  "All",
  "Fullstack",
  "Cloud",
  "Security",
  "Marketplace",
  "Microservices",
] as const;

export type ProjectFilterOption = (typeof projectFilters)[number];

export const projectLanguageFilters = [
  "All",
  "JS",
  "TS",
  "Java",
  "Go",
] as const;

export type ProjectLanguageFilterOption =
  (typeof projectLanguageFilters)[number];

export const projectShowcaseItems = [
  {
    id: "lens-lounge",
    title: "Lens Lounge",
    category: "Content and commerce platform",
    status: "published",
    filters: ["Fullstack", "Microservices"],
    languages: ["TS", "Go"],
    summary:
      "A microservices content and commerce platform built around service boundaries, shared contracts, event-driven communication, and production-oriented deployment workflows.",
    imageUrl: "/screenshots/projects/lens-lounge-microservices.png",
    previewLabel: "Microservices platform",
    previewDescription:
      "A production-style content platform preview with commerce flows, realtime features, and service-oriented architecture.",
    architectureTags: [
      "Microservices",
      "Event-driven",
      "Payments",
      "Realtime",
      "File service",
      "Local Kubernetes",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built a Next.js app surface for content, account, chat, and commerce workflows.",
      },
      {
        area: "Backend",
        detail:
          "Separated the main API, payment service, shared contracts, and Go file service boundaries.",
      },
      {
        area: "Infrastructure",
        detail:
          "Configured Docker, Kafka, PostgreSQL, MinIO, and local Kubernetes development modes.",
      },
      {
        area: "Security",
        detail:
          "Implemented authentication, moderation paths, payment webhooks, and file lifecycle controls.",
      },
    ],
    highlights: [
      "Combines a Next.js frontend, main NestJS API, dedicated payment service, and Go file service in one workspace.",
      "Supports authentication, blog/content flows, moderation, realtime chat, payments, and file lifecycle events.",
      "Uses Kafka, PostgreSQL, MinIO/S3, Docker, and local Kubernetes tooling for realistic platform engineering practice.",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "NestJS 11",
      "Go",
      "PostgreSQL",
      "Kafka",
      "Stripe",
      "MinIO/S3",
      "Docker",
      "Kubernetes",
    ],
    liveUrl: "https://lens-lounge.com",
    sourceUrl: "https://github.com/sergehall/lens-lounge-microservices",
    docsUrl:
      "https://github.com/sergehall/lens-lounge-microservices/tree/main/docs",
    architectureUrl:
      "https://github.com/sergehall/lens-lounge-microservices/blob/main/docs/monorepo-migration-plan.md",
  },
  {
    id: "sergioartg",
    title: "SERGIOARTG Platform",
    category: "Portfolio and booking platform",
    status: "published",
    filters: ["Fullstack"],
    languages: ["TS"],
    summary:
      "A production portfolio platform with a public site and private application surface for auth, booking, messaging, content, media, and payments.",
    imageUrl: "/screenshots/projects/sergioartg-site.png",
    previewLabel: "Creative business platform",
    previewDescription:
      "A public portfolio and private booking system built for real client workflows, payments, messaging, and media operations.",
    architectureTags: [
      "Booking workflow",
      "Payments",
      "Messaging",
      "Admin security",
      "Media storage",
      "Release gates",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built the public portfolio, booking UX, protected app surfaces, and media-facing flows.",
      },
      {
        area: "Backend",
        detail:
          "Implemented NestJS modules for auth, booking, messages, content, media, and payments.",
      },
      {
        area: "Infrastructure",
        detail:
          "Wired Vercel, Heroku, PostgreSQL, Redis/BullMQ, Cloudflare media, and release gates.",
      },
      {
        area: "Security",
        detail:
          "Added admin security governance, account flows, payment boundaries, and operational runbooks.",
      },
    ],
    highlights: [
      "Separates a Next.js App Router frontend from a NestJS API for business and operational workflows.",
      "Includes booking, messages, content, media, payments, admin security, and release governance documentation.",
      "Runs with production deployment targets across Vercel, Heroku, and Cloudflare media/storage services.",
    ],
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Stripe",
      "Cloudflare R2",
      "Vercel",
      "Heroku",
    ],
    liveUrl: "https://sergioartg.com",
    sourceUrl: "https://github.com/sergehall/sergioartg-site",
    docsUrl: "https://github.com/sergehall/sergioartg-site/tree/main/docs",
    architectureUrl:
      "https://github.com/sergehall/sergioartg-site/blob/main/docs/architecture-hotspots-professional-audit-2026-03-01.md",
  },
  {
    id: "hex-gate",
    title: "Hex Gate",
    category: "Defensive engineering workbench",
    status: "published",
    filters: ["Fullstack", "Security"],
    languages: ["TS", "Go"],
    summary:
      "A secure developer site for defensive engineering content, protected cabinet routes, audit-oriented workflows, and security playbooks.",
    imageUrl: "/screenshots/projects/defensive-engineering-hub.png",
    previewLabel: "Security workbench",
    previewDescription:
      "A terminal-inspired defensive engineering hub with protected cabinet routes, audit surfaces, and Markdown-based playbooks.",
    architectureTags: [
      "Auth/RBAC",
      "Audit trail",
      "MFA-ready",
      "Markdown CMS",
      "Protected routes",
      "Security policy",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built the terminal-style login, role-aware dashboard, docs workbench, and security panels.",
      },
      {
        area: "Backend",
        detail:
          "Created Go API foundations for auth, audit, documents, security settings, and storage.",
      },
      {
        area: "Infrastructure",
        detail:
          "Designed local/prod runtime modes, schema validation, and content import/index tooling.",
      },
      {
        area: "Security",
        detail:
          "Modeled roles, immutable audit verification, protected-route policy, and logging controls.",
      },
    ],
    highlights: [
      "Publishes Markdown playbooks, lab notes, request maps, audits, and security checklists from a docs content source.",
      "Provides a terminal-inspired login gate, role-aware dashboard, security controls, logging policy, and immutable audit viewer.",
      "Models auth, session, MFA, role, audit, and API-error contracts across a Next.js frontend and Go API.",
    ],
    techStack: [
      "Next.js App Router",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Markdown",
      "pnpm",
      "Shared contracts",
      "Audit logs",
      "Role-based access",
    ],
    liveUrl: "https://6b616c69.com",
    sourceUrl: "https://github.com/sergehall/defensive-engineering-hub",
    docsUrl:
      "https://github.com/sergehall/defensive-engineering-hub/tree/main/content/docs",
    architectureUrl:
      "https://github.com/sergehall/defensive-engineering-hub/blob/main/README.md#auth-and-security-foundation",
  },
  {
    id: "lavoval",
    title: "Lavoval",
    category: "Skill-exchange marketplace",
    status: "published",
    filters: ["Fullstack", "Marketplace"],
    languages: ["TS", "Go"],
    summary:
      "A fullstack product foundation for a skill-exchange marketplace where people publish expertise, discover practical knowledge, and build around human context in AI-heavy workflows.",
    imageUrl: "/screenshots/projects/lavoval.png",
    previewLabel: "Skill marketplace",
    previewDescription:
      "A marketplace foundation for publishing skills, discovering practical expertise, and managing creator/admin workflows.",
    architectureTags: [
      "Marketplace",
      "Auth/RBAC",
      "Skill runtime",
      "Admin governance",
      "Async email",
      "CLI/SDK",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built marketplace discovery, account areas, admin screens, auth flows, and reusable UI primitives.",
      },
      {
        area: "Backend",
        detail:
          "Designed a layered Go REST API with handlers, services, repositories, JWT auth, and pgx.",
      },
      {
        area: "Infrastructure",
        detail:
          "Added PostgreSQL migrations, seeds, Docker Compose, Makefile flows, and CLI/SDK foundations.",
      },
      {
        area: "Security",
        detail:
          "Implemented RBAC, session controls, OAuth paths, MFA settings, and mail delivery operations.",
      },
    ],
    highlights: [
      "Includes public marketplace discovery, authentication, personal account flows, and admin governance surfaces.",
      "Uses a layered Go REST API with handlers, services, repositories, JWT auth, RBAC, and PostgreSQL persistence.",
      "Adds shared contracts, migrations, seeds, Docker-backed local infrastructure, tests, and an early CLI/SDK surface.",
    ],
    techStack: [
      "Next.js App Router",
      "React 19",
      "TypeScript",
      "Server Actions",
      "Go 1.26",
      "Chi",
      "JWT",
      "pgx",
      "PostgreSQL 17",
      "pnpm",
      "Docker Compose",
    ],
    liveUrl: "https://lavoval.com",
    sourceUrl: "https://github.com/sergehall/lavoval",
    docsUrl: "https://github.com/sergehall/lavoval/tree/main/docs",
    architectureUrl:
      "https://github.com/sergehall/lavoval/blob/main/docs/architecture.md",
  },
  {
    id: "java-start",
    title: "Java Start",
    category: "Java fullstack learning lab",
    status: "local",
    filters: ["Fullstack", "Security"],
    languages: ["TS", "Java"],
    summary:
      "A local fullstack learning lab where Next.js and Java work together through registration, email verification, JWT authentication, private dashboard flows, PostgreSQL, Docker, tests, and Spring Security.",
    imageUrl: "/screenshots/projects/java-start.png",
    previewLabel: "Java learning lab",
    previewDescription:
      "A local Next.js and Spring Boot project focused on auth, sessions, email verification, profiles, and practical Java backend foundations.",
    architectureTags: [
      "Spring Boot",
      "Spring Security",
      "JWT",
      "Email verification",
      "httpOnly cookies",
      "PostgreSQL",
      "Docker",
      "Next.js BFF",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built a Next.js App Router frontend with forms, route handlers, dashboard screens, and an httpOnly session cookie.",
      },
      {
        area: "Backend",
        detail:
          "Implemented a Spring Boot API with Spring Security, JWT auth, revocable sessions, validation, mail providers, and JPA repositories.",
      },
      {
        area: "Infrastructure",
        detail:
          "Added Docker-backed PostgreSQL profiles, local scripts, Maven Wrapper flows, and production-like local runtime commands.",
      },
      {
        area: "Security",
        detail:
          "Modeled email verification, server-side session revocation, JWT validation, private dashboard access, and auth test coverage.",
      },
    ],
    highlights: [
      "Connects a Next.js BFF-style frontend with a Java 21 Spring Boot backend instead of treating them as separate demos.",
      "Covers registration, email verification, sign in, JWT sessions, private dashboard state, and profile persistence.",
      "Uses PostgreSQL locally with Docker, H2 for lightweight tests, Vitest for frontend checks, and Spring Boot Test for backend validation.",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zod",
      "React Hook Form",
      "Java 21",
      "Spring Boot 3.5",
      "Spring Security",
      "Spring Data JPA",
      "PostgreSQL 17",
      "Docker Compose",
      "Maven",
      "Vitest",
    ],
    sourceUrl: "https://github.com/sergehall/java-start",
    docsUrl: "https://github.com/sergehall/java-start/blob/main/README.md",
    architectureUrl:
      "https://github.com/sergehall/java-start/blob/main/README.md#learning-map",
  },
  {
    id: "aws-learning-portal",
    title: "AWS Learning Portal",
    category: "Cloud security learning portal",
    status: "published",
    filters: ["Fullstack", "Cloud", "Security"],
    languages: ["JS", "TS"],
    summary:
      "A full-stack educational portal that demonstrates AWS security and cloud services through interactive modules, live demo actions, uploads, logging, and architecture documentation.",
    imageUrl: "/screenshots/projects/final-project-CS79D.png",
    previewLabel: "AWS learning portal",
    previewDescription:
      "A cloud security portal showing live AWS integrations, architecture documentation, uploads, logs, and assessment modules.",
    architectureTags: [
      "AWS",
      "EC2",
      "S3 uploads",
      "Lambda",
      "API Gateway",
      "DynamoDB",
      "CloudWatch",
      "Bedrock",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built the portal, module pages, uploads UI, API demo, dashboard, and final assessment flow.",
      },
      {
        area: "Backend",
        detail:
          "Implemented NestJS APIs for modules, auth, uploads, logs, AWS demos, and AI security advice.",
      },
      {
        area: "Infrastructure",
        detail:
          "Deployed EC2/Nginx, S3, Lambda, API Gateway, DynamoDB, CloudWatch, and Elastic IP routing.",
      },
      {
        area: "Security",
        detail:
          "Added JWT auth, request throttling, Cloudflare Turnstile, IAM roles, and WAF/CloudFront lab assets.",
      },
    ],
    highlights: [
      "Deploys a Next.js frontend and NestJS backend behind Nginx on an EC2 host with a custom domain and Elastic IP.",
      "Demonstrates S3 uploads, Lambda actions, API Gateway routing, DynamoDB activity logs, CloudWatch monitoring, and Bedrock-powered security advice.",
      "Includes JWT auth, request throttling, Cloudflare Turnstile, course modules, final assessment flows, screenshots, and a walkthrough asset.",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "NestJS 11",
      "AWS SDK v3",
      "EC2",
      "S3",
      "Lambda",
      "API Gateway",
      "DynamoDB",
      "CloudWatch",
      "Amazon Bedrock",
    ],
    liveUrl: "https://awsawesome.com",
    sourceUrl: "https://github.com/sergehall/final-project-CS79D",
    docsUrl: "https://sergehall.github.io/final-project-CS79D/",
    architectureUrl:
      "https://github.com/sergehall/final-project-CS79D/blob/main/docs/architecture.md",
  },
] satisfies readonly ProjectShowcaseItem[];
