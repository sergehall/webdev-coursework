import type { PublicProjectResource } from "@/features/projects/project-public-resources";

export const opCosmetologyDocumentation = {
  kind: "documentation",
  title: "OP Cosmetology documentation",
  eyebrow: "Public technical overview",
  introduction:
    "A portfolio-safe summary of the implemented business platform, client workflows, and delivery practices. Source code, private configuration, and operational procedures remain private.",
  sections: [
    {
      title: "Public business experience",
      summary:
        "The public website presents the esthetics practice through clear service, education, and contact journeys.",
      highlights: [
        "Visitors can review treatment categories, individual treatment details, professional training, and business contact information.",
        "The content uses cautious service language, structured metadata, canonical URLs, and discoverable privacy and terms pages.",
        "Responsive navigation and accessible authentication dialogs keep the branded experience usable across desktop and mobile devices.",
      ],
    },
    {
      title: "Client account workflows",
      summary:
        "Authenticated clients receive a focused workspace for account information and practice-related requests.",
      highlights: [
        "Clients can review inquiry history and personal offers without receiving access to another account's records.",
        "Profile, communication preferences, password changes, active sessions, and account-deletion requests live behind protected routes.",
        "Email verification and recovery workflows support the account lifecycle without exposing provider credentials to the browser.",
      ],
    },
    {
      title: "Reliable communication",
      summary:
        "Transactional email is separated from request handling so delivery can be retried and reviewed safely.",
      highlights: [
        "Verification, recovery, and account notifications are recorded before background delivery begins.",
        "Concurrent workers claim bounded batches, recover interrupted work, and preserve delivery history without sending the same job twice intentionally.",
        "Provider adapters keep local development and production delivery behind one application boundary.",
      ],
    },
    {
      title: "Quality and delivery",
      summary:
        "The monorepo uses repeatable checks for frontend, backend, contracts, data migrations, and production builds.",
      highlights: [
        "Automated gates cover formatting, linting, strict types, unit and integration tests, builds, and dependency review.",
        "Database migrations and readiness checks make persistent state changes explicit and reviewable.",
        "Container-based local services and a documented API release path keep development and deployment concerns separated.",
      ],
    },
    {
      title: "Current product boundary",
      summary:
        "Implemented account and inquiry capabilities are distinguished from future commerce and scheduling work.",
      highlights: [
        "The public practice website, identity flows, protected client account, inquiries, preferences, discounts, and email delivery are implemented.",
        "Administrative authorization and audit foundations exist, while the complete administrative interface is still evolving.",
        "Online booking, availability, payments, deposits, refunds, gift cards, SMS, and certificates are not presented as active features.",
      ],
    },
  ],
} satisfies PublicProjectResource;

export const opCosmetologyArchitecture = {
  kind: "architecture",
  title: "OP Cosmetology architecture",
  eyebrow: "Public architecture overview",
  introduction:
    "A concise view of the implemented system boundaries and engineering principles without exposing private routes, credentials, infrastructure identifiers, or operational runbooks.",
  sections: [
    {
      title: "Application boundary",
      summary:
        "A Next.js frontend and NestJS API evolve in one TypeScript monorepo while retaining separate runtime responsibilities.",
      highlights: [
        "The browser owns presentation and user interaction; the API owns validation, authorization, persistence, and integration policy.",
        "Shared transport contracts align request and response shapes without sharing persistence models with the frontend.",
        "Public, authenticated, and administrative capabilities cross explicit server boundaries rather than relying on client-only checks.",
      ],
    },
    {
      title: "Modular backend",
      summary:
        "Business capabilities are grouped into focused NestJS modules inside a deployable modular monolith.",
      highlights: [
        "Identity, client profiles, inquiries, subscriptions, discounts, administration, audit records, and health concerns remain separately owned.",
        "Controllers delegate validated work to application services instead of coupling transport details directly to persistence.",
        "The modular shape supports independent testing and future extraction without adding premature distributed-system complexity.",
      ],
    },
    {
      title: "Persistence and delivery",
      summary:
        "PostgreSQL is the source of truth for business state, session state, audit evidence, and transactional communication.",
      highlights: [
        "Prisma migrations make schema changes versioned and reviewable across environments.",
        "Email work is committed with application state and processed asynchronously through leased, retryable jobs.",
        "Idempotency and delivery history protect the communication lifecycle from duplicate or interrupted processing.",
      ],
    },
    {
      title: "Identity and trust",
      summary:
        "Authentication and authorization combine short-lived access with server-governed session and role state.",
      highlights: [
        "Credentials use a memory-hard password hash, while refresh sessions rotate and revoke a replayed session family.",
        "HttpOnly cookies, origin controls, bot protection, throttling, validation, and production secret checks reduce common account abuse paths.",
        "User-scoped access rules, server-side roles, and audit records protect personal and privileged operations.",
      ],
    },
    {
      title: "Release governance",
      summary:
        "Automated verification and explicit configuration keep production behavior aligned with reviewed application boundaries.",
      highlights: [
        "Frontend and backend checks cover types, linting, tests, builds, security-sensitive behavior, and migration readiness.",
        "Environment validation fails early when production security requirements are not satisfied.",
        "Roadmap capabilities remain outside active routes until their persistence, policy, and verification boundaries are complete.",
      ],
    },
  ],
} satisfies PublicProjectResource;
