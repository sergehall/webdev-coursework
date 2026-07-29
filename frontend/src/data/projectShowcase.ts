import { cs85PhpProgrammingProject } from "@/data/projects/cs85PhpProgrammingProject";
import { javaFxEventHandlingProject } from "@/data/projects/javaFxEventHandlingProject";
import type { ProjectShowcaseItem } from "@/data/projectShowcase.types";

export type {
  BuildContribution,
  ProjectFilter,
  ProjectGalleryImage,
  ProjectLanguage,
  ProjectShowcaseItem,
  ProjectStatus,
} from "@/data/projectShowcase.types";

export const projectFilters = [
  "All",
  "Fullstack",
  "AI",
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
  "PHP",
  "Java",
  "Go",
] as const;

export type ProjectLanguageFilterOption =
  (typeof projectLanguageFilters)[number];

export const projectShowcaseItems = [
  {
    id: "lens-lounge",
    title: "Lens Lounge",
    category: "Publishing, collaboration, and commerce platform",
    status: "published",
    filters: ["Fullstack", "Microservices"],
    languages: ["TS", "Go"],
    summary:
      "A production-oriented learning platform combining public publishing, creator and editor workflows, realtime collaboration, governed administration, and independently deployable payment and file services.",
    imageUrl: "/screenshots/projects/lens-lounge-microservices.png",
    previewLabel: "Microservices publishing platform",
    previewDescription:
      "Public discovery, creator publishing, moderated engagement, realtime chat, and service-backed media workflows in one Next.js experience.",
    architectureTags: [
      "Browser-facing API gateway",
      "Service-owned data",
      "Contract-first integration",
      "Event-driven delivery",
      "Presigned media flow",
      "Realtime collaboration",
      "Governed access control",
      "Local Kubernetes",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built public discovery and story experiences, a creator cabinet and editor, realtime chat, account security, and governed admin workspaces with Next.js, Mantine, and RTK Query.",
      },
      {
        area: "Backend",
        detail:
          "Designed the main NestJS API as the browser-facing gateway for identity, publishing, engagement, messaging, governance, and adapters to dedicated payment and file services.",
      },
      {
        area: "Infrastructure",
        detail:
          "Created a Yarn workspace with PostgreSQL, Kafka, MinIO/S3, background workers, Docker/Colima, local Kubernetes, and container deployment workflows for Vercel, Heroku, and Render targets.",
      },
      {
        area: "Security",
        detail:
          "Implemented MFA step-up, OAuth linking, device-aware sessions, CSRF and security headers, audited root-owner governance, role capabilities, throttling, and moderation controls.",
      },
    ],
    highlights: [
      "Keeps browser integrations behind one NestJS API while dedicated services own payment state and file metadata.",
      "Moves media directly through presigned object-storage URLs while the Go service governs metadata and lifecycle events.",
      "Runs publishing, news-dispatch, and payment-event workers with shared contracts plus unit, integration, contract, smoke, and architecture checks.",
      "Implements Stripe checkout, webhook, catalog, outbox, and entitlement foundations while intentionally gating generic purchase activation during migration.",
    ],
    techStack: [
      "Next.js 16.2",
      "React 19.2",
      "TypeScript 5.9",
      "Mantine 9.2",
      "Redux Toolkit 2.12",
      "NestJS 11.1",
      "Go 1.26",
      "PostgreSQL",
      "Kafka",
      "Socket.IO 4.8",
      "Stripe 14",
      "MinIO/S3",
    ],
    liveUrl: "https://lens-lounge.com",
  },
  {
    id: "sergioartg",
    title: "SERGIOARTG Platform",
    category: "Creative services marketplace and booking platform",
    status: "published",
    filters: ["Fullstack", "Marketplace"],
    languages: ["TS"],
    summary:
      "A production full-stack platform combining a photography portfolio with a two-sided services marketplace, authenticated workspaces, booking, Stripe payments, secure messaging, and admin operations.",
    imageUrl: "/screenshots/projects/sergioartg-site.png",
    galleryImages: [
      {
        src: "/screenshots/projects/sergioartg-services-marketplace.webp",
        caption: "Professional services marketplace",
      },
      {
        src: "/screenshots/projects/sergioartg-service-categories.webp",
        caption: "Service category taxonomy",
      },
    ],
    previewLabel: "Professional services marketplace",
    previewDescription:
      "Professionals publish service offers while clients filter by profession, category, location, price, format, and provider availability.",
    architectureTags: [
      "TypeScript monorepo",
      "Domain-driven modules",
      "Contract-first APIs",
      "PostgreSQL source of truth",
      "Durable job processing",
      "Realtime + E2EE",
      "Storage abstraction",
      "Security governance",
      "CI quality gates",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built the Next.js 16 public portfolio, marketplace discovery and provider publishing flows, plus authenticated booking, payments, messages, account security, and admin workspaces.",
      },
      {
        area: "Backend",
        detail:
          "Designed NestJS bounded contexts for identity, catalog, booking, payments, realtime messaging, media, analytics, and privileged administration behind explicit ports and OpenAPI contracts.",
      },
      {
        area: "Infrastructure",
        detail:
          "Deployed Vercel and Heroku with PostgreSQL as source of truth, Redis/BullMQ workers, Socket.IO fanout, Cloudflare Images/Stream/R2, and GitHub Actions release gates.",
      },
      {
        area: "Security",
        detail:
          "Implemented passkeys and MFA, device-aware sessions, RBAC/permissions, privileged audit trails, true E2EE messaging, Turnstile protection, and security regression gates.",
      },
    ],
    highlights: [
      "Unifies a photography-first public experience, two-sided services marketplace, and private workspaces for clients, providers, studio staff, and administrators.",
      "Connects moderated service listings to availability, booking, quotes, orders, Stripe payments and provider payouts, realtime messaging, and media delivery.",
      "Protects critical workflows with shared contracts, architecture boundary tests, PostgreSQL-backed durable intake, idempotent jobs, SLOs, and staged release governance.",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "TanStack Query",
      "NestJS 11",
      "TypeORM",
      "PostgreSQL",
      "Redis/BullMQ",
      "Socket.IO",
      "Stripe/Connect",
      "Cloudflare Media/R2",
      "Vercel/Heroku",
    ],
    liveUrl: "https://sergioartg.com",
  },
  {
    id: "hex-gate",
    title: "Hex Gate",
    category: "Defensive security knowledge and validation platform",
    status: "published",
    filters: ["Fullstack", "Security"],
    languages: ["TS", "Go"],
    summary:
      "A local-first security engineering platform combining a searchable knowledge workbench, protected operator cabinet, persisted identity controls, and bounded scanner validation workflows.",
    imageUrl: "/screenshots/projects/defensive-engineering-hub.png",
    previewLabel: "Defensive security workbench",
    previewDescription:
      "Searchable security standards and playbooks, protected operations, audit evidence, and controlled Kali lab validation in one operator-focused experience.",
    architectureTags: [
      "Local-first trust boundary",
      "Content as code",
      "Next.js / Go split",
      "Contract-first security",
      "PostgreSQL identity state",
      "Fail-closed scanner controls",
      "Append-only audit evidence",
      "Approval-gated execution",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built the Next.js knowledge catalog and Markdown reader, terminal-style identity flows, role-aware cabinet, account security, material-access review, audit, and Kali status surfaces.",
      },
      {
        area: "Backend",
        detail:
          "Implemented a Go API for document delivery, PostgreSQL-backed accounts and sessions, TOTP, passkeys, GitHub OAuth, email workflows, audit verification, and bounded scanner state.",
      },
      {
        area: "Infrastructure",
        detail:
          "Structured a pnpm monorepo with local and production runtime modes, PostgreSQL migrations, cached and embedded content fallbacks, Render deployment, observability, and layered quality gates.",
      },
      {
        area: "Security",
        detail:
          "Enforced role and material-clearance boundaries, secure session controls, rate limits, idempotency, hash-linked audit evidence, signed scanner jobs, allowlists, replay checks, and default-deny modes.",
      },
    ],
    highlights: [
      "Turns versioned Markdown standards, playbooks, request maps, audits, and checklists into a searchable defensive-engineering workbench with cached and embedded delivery fallbacks.",
      "Connects a Next.js cabinet to persisted Go identity, session, MFA, passkey, OAuth, mail, material-access, and audit boundaries through shared contracts.",
      "Constrains Kali validation to approved profiles, signed jobs, allowlisted targets, redacted evidence, and replay-resistant state instead of accepting arbitrary remote commands.",
      "Keeps staging approvals and production scanner transport deliberately fail-closed while their contracts, tests, and activation gates are reviewed separately.",
    ],
    techStack: [
      "Next.js 16.2",
      "React 19.2",
      "TypeScript 5.9",
      "Go 1.26",
      "PostgreSQL",
      "pgx 5.9",
      "WebAuthn",
      "OpenTelemetry",
      "Markdown / GFM",
      "Tailwind CSS 4.3",
      "pnpm 10.33",
    ],
    liveUrl: "https://6b616c69.com",
  },
  {
    id: "lavoval",
    title: "Lavoval",
    category: "Executable skill marketplace and creator platform",
    status: "published",
    filters: ["Fullstack", "Marketplace"],
    languages: ["TS", "Go"],
    summary:
      "A production full-stack marketplace where creators publish versioned skill products, users discover and run supported tools, and operators govern identity, catalog, delivery, and platform health.",
    imageUrl: "/screenshots/projects/lavoval.png",
    previewLabel: "Executable skill marketplace",
    previewDescription:
      "Discover creator-led skills, run supported tools, revisit results, and move between public, account, creator, and governed admin workflows.",
    architectureTags: [
      "Server-action BFF",
      "Layered Go API",
      "Shared contracts and SDK",
      "Versioned skill definitions",
      "In-process executor registry",
      "PostgreSQL source of truth",
      "Durable mail processing",
      "Governed RBAC",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built Next.js public discovery, creator and agent profiles, account security, skill authoring, executable run history, and admin workspaces for users, skills, enrollments, mail, and runtime operations.",
      },
      {
        area: "Backend",
        detail:
          "Designed a layered Go API for identity, creator-owned and versioned skills, catalog taxonomy, agents, social activity, deterministic execution, governance, and PostgreSQL persistence.",
      },
      {
        area: "Infrastructure",
        detail:
          "Structured a pnpm monorepo with shared contracts, engine, registry, SDK, and CLI packages; added 30 PostgreSQL migrations, Docker Compose, Render deployment, and GitHub Actions quality gates.",
      },
      {
        area: "Security",
        detail:
          "Implemented HTTP-only session boundaries, JWT session versioning, TOTP and recovery codes, Google/GitHub OAuth, login throttling, account status enforcement, root-owner governance, and audit trails.",
      },
    ],
    highlights: [
      "Connects searchable skills, creator profiles, agents, reviews, saved items, collections, pricing, enrollments, and moderation through explicit catalog and governance boundaries.",
      "Treats each skill as a versioned executable asset with input, output, and error schemas, validated prompt variables, persisted runs, feedback, history, and replay.",
      "Runs transactional email through PostgreSQL-backed jobs with idempotency, retries, dead letters, suppressions, retention controls, operational history, alerts, and Prometheus metrics.",
      "Exposes auth, skills, runs, replay, and admin run inspection through a shared SDK and working CLI; the current runtime remains deterministic while external LLM providers stay on the roadmap.",
    ],
    techStack: [
      "Next.js 16.2",
      "React 19.2",
      "TypeScript 5.8",
      "Zod 3.24",
      "Go 1.26",
      "Chi 5.2",
      "pgx 5.7",
      "PostgreSQL 17",
      "pnpm 11",
      "Docker Compose",
      "Render",
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
    category: "CS56 coursework and full-stack Java learning platform",
    status: "local",
    filters: ["Fullstack", "Security"],
    languages: ["TS", "Java"],
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
  },
  {
    id: "aws-learning-portal",
    title: "AWS Learning Portal",
    category: "AWS cloud security, serverless, and operations portal",
    status: "paused",
    filters: ["Fullstack", "Cloud", "Security"],
    languages: ["JS", "TS"],
    summary:
      "A previously deployed CS79D full-stack learning portal that connects eight cloud security modules to AWS workflows, validated uploads, activity evidence, account security, and a Bedrock-backed assessment advisor. Its EC2 runtime is currently paused.",
    imageUrl: "/screenshots/projects/final-project-CS79D.png",
    previewLabel: "AWS security learning portal",
    previewDescription:
      "Explore course modules, invoke the Lambda logging path, upload validated files to S3, inspect DynamoDB activity, and review cloud security evidence.",
    architectureTags: [
      "Single-host deployment path",
      "Role-based AWS access",
      "Serverless activity pipeline",
      "AWS-managed evidence stores",
      "Layered account security",
      "Observable demo workflows",
      "IaC scaling path",
      "AI fallback boundary",
    ],
    contributions: [
      {
        area: "Frontend",
        detail:
          "Built the Next.js portal across eight course modules, live AWS dashboards, S3 uploads, activity logs, API demos, architecture evidence, final assessment, and an authenticated account cabinet.",
      },
      {
        area: "Backend",
        detail:
          "Implemented NestJS APIs for modules, S3, DynamoDB logs, Lambda invocation, profiles, JWT auth, TOTP MFA, GitHub OAuth, and a Bedrock advisor with deterministic fallback.",
      },
      {
        area: "Infrastructure",
        detail:
          "Deployed Next.js and NestJS with PM2, Nginx, HTTPS, and an Elastic IP on EC2; wired IAM, S3, API Gateway, Lambda, DynamoDB, and CloudWatch, then authored an ALB/Auto Scaling CloudFormation path.",
      },
      {
        area: "Security",
        detail:
          "Added nonce-based CSP and security headers, bcrypt, protected JWT routes, TOTP MFA, state-validated GitHub OAuth, Turnstile, throttling, IAM roles, and allowlisted 2 MB uploads.",
      },
    ],
    highlights: [
      "Uses a documented Nginx and PM2 deployment path on one EC2 host. The instance is currently stopped to control AWS costs; ALB/Auto Scaling and the CloudFront/WAF lab remain explicit infrastructure and review paths.",
      "Routes validated uploads to S3 and demo events through API Gateway or the AWS SDK to Lambda and DynamoDB, with shared and account-scoped activity views.",
      "Invokes Amazon Nova Micro through Bedrock when configured and returns a structured deterministic review when the model is unavailable.",
      "Maps eight CS79D modules into an evidence-driven portal while intentionally keeping demo user accounts in memory, so account data resets after a backend restart.",
    ],
    techStack: [
      "Next.js 16.2.7",
      "React 19.2.7",
      "TypeScript 5.7",
      "Tailwind CSS 4.2",
      "NestJS 11.1",
      "Node.js 24 / PM2",
      "AWS SDK v3",
      "EC2 / Nginx",
      "IAM",
      "S3",
      "Lambda / API Gateway",
      "DynamoDB",
      "CloudWatch",
      "Bedrock / Nova Micro",
      "CloudFormation",
    ],
    liveUrl: "https://awsawesome.com",
    videoUrl: "https://sergehall.github.io/final-project-CS79D/video.html",
    sourceUrl: "https://github.com/sergehall/final-project-CS79D",
    docsUrl: "https://sergehall.github.io/final-project-CS79D/",
    architectureUrl:
      "https://github.com/sergehall/final-project-CS79D/blob/main/docs/architecture.md",
  },
  javaFxEventHandlingProject,
  cs85PhpProgrammingProject,
] satisfies readonly ProjectShowcaseItem[];
