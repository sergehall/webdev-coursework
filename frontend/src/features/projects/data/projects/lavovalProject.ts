import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase.types";

export const lavovalProject: ProjectShowcaseItem = {
  id: "lavoval",
  title: "Lavoval",
  category: "Executable skill marketplace and creator platform",
  status: "published",
  filters: ["Fullstack", "Marketplace"],
  languages: ["TS", "Go"],
  frameworks: ["Next.js"],
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
};
