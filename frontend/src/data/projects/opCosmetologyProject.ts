import type { ProjectShowcaseItem } from "@/data/projectShowcase.types";

export const opCosmetologyProject: ProjectShowcaseItem = {
  id: "op-cosmetology",
  title: "OP Cosmetology",
  category: "Esthetics business platform and secure client portal",
  status: "published",
  filters: ["Fullstack", "Security"],
  languages: ["TS"],
  frameworks: ["Next.js", "NestJS"],
  summary:
    "A production full-stack platform for a Los Angeles esthetics practice, combining a responsive treatment and training website with secure identity, client account workflows, PostgreSQL persistence, and reliable transactional email.",
  imageUrl: "/screenshots/projects/op-cosmetology.webp",
  previewLabel: "Production esthetics business platform",
  previewDescription:
    "Explore consultation-led treatments and professional training, then use a protected account to manage profile details, preferences, inquiries, and personal offers.",
  architectureTags: [
    "TypeScript pnpm monorepo",
    "Next.js / NestJS boundary",
    "Modular monolith",
    "Shared transport contracts",
    "PostgreSQL source of truth",
    "Transactional email outbox",
    "Rotating session families",
    "Production security gates",
  ],
  contributions: [
    {
      area: "Frontend",
      detail:
        "Built the branded Next.js public experience for treatments, training, contact, privacy, and terms, plus accessible authentication and protected account pages for requests, profiles, preferences, and security.",
    },
    {
      area: "Backend",
      detail:
        "Implemented a versioned NestJS REST API for authentication, users, inquiries, subscriptions, discounts, administration, audit records, and health checks with shared contracts and Prisma persistence.",
    },
    {
      area: "Infrastructure",
      detail:
        "Structured a pnpm monorepo with Docker-backed PostgreSQL, reviewed Prisma migrations, a Heroku API release path, database readiness checks, provider-based email delivery, and GitHub Actions verification.",
    },
    {
      area: "Security",
      detail:
        "Added Argon2id credentials, short-lived JWT access tokens, rotating HttpOnly refresh sessions with replay revocation, Turnstile, throttling, server-side RBAC, audit trails, strict validation, and production secret safeguards.",
    },
  ],
  highlights: [
    "Combines a refined local-business website with treatment details, professional training, cautious service claims, structured SEO, and a protected client area without presenting unapproved testimonials or medical guarantees.",
    "Lets authenticated clients review inquiries and personal offers, maintain profile and communication preferences, change credentials, and request account deletion through user-scoped API operations.",
    "Processes verification, recovery, and account email through a PostgreSQL outbox with atomic concurrent claims, lease recovery, bounded retries, delivery history, and console, SMTP, or Resend adapters.",
    "Keeps booking, availability, payments, deposits, and certificates explicitly outside the current milestone instead of presenting roadmap functionality as already operational.",
  ],
  techStack: [
    "Next.js 16.2.12",
    "React 19.2.7",
    "TypeScript 5.9.3",
    "Tailwind CSS 4.3.3",
    "NestJS 11.1.28",
    "Express 5.2.1",
    "Prisma 7.9",
    "PostgreSQL 17",
    "Zod 4.4",
    "Argon2id",
    "Resend / SMTP",
    "Jest / Supertest / Vitest",
    "Docker Compose",
    "Heroku",
  ],
  liveUrl: "https://opcosmetology.com",
};
