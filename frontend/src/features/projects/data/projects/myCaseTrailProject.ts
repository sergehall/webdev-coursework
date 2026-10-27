import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase.types";

// Bump when replacing these public assets so browser and CDN caches refresh.
const screenshotVersion = "51a7a3b";

export const myCaseTrailProject: ProjectShowcaseItem = {
  id: "mycasetrail",
  title: "MyCaseTrail",
  category: "Immigration preparation and private document workspace",
  status: "published",
  filters: ["Fullstack", "Security"],
  languages: ["TS"],
  frameworks: ["Next.js", "NestJS"],
  summary:
    "A full-stack immigration preparation workspace that brings separate form drafts, supporting-document packages, citizenship study, and notes together in a private account, with multilingual navigation and original-PDF previews.",
  imageUrl: `/screenshots/projects/mycasetrail-1.webp?v=${screenshotVersion}`,
  thumbnailUrl: `/screenshots/projects/mycasetrail-card.webp?v=${screenshotVersion}`,
  galleryImages: [
    {
      src: `/screenshots/projects/mycasetrail-2.webp?v=${screenshotVersion}`,
      caption: "Citizenship study flashcards with illustrated civics questions",
    },
    {
      src: `/screenshots/projects/mycasetrail-3.webp?v=${screenshotVersion}`,
      caption:
        "My forms overview with applicant details and separate form progress",
    },
    {
      src: `/screenshots/projects/mycasetrail-4.webp?v=${screenshotVersion}`,
      caption: "Citizenship study chapters with individual practice progress",
    },
    {
      src: `/screenshots/projects/mycasetrail-5.webp?v=${screenshotVersion}`,
      caption:
        "Filing Packages with fictional demo documents and preparation statuses",
    },
    {
      src: `/screenshots/projects/mycasetrail-6.webp?v=${screenshotVersion}`,
      caption:
        "Case overview with separate form and citizenship-study progress",
    },
  ],
  previewLabel: "Your immigration preparation workspace",
  previewDescription:
    "Explore the public website, form overview, citizenship study, document packages, and case progress across six application views.",
  architectureTags: [
    "TypeScript pnpm monorepo",
    "Next.js gateway / NestJS services",
    "Shared domain contracts",
    "Account-scoped PostgreSQL RLS",
    "Revision-checked saving",
    "Immutable document originals",
    "Private object-storage adapters",
    "Build-time runtime isolation",
  ],
  contributions: [
    {
      area: "Frontend",
      detail:
        "Built the responsive public website and private preparation workspace with four interface languages, separate I-589, I-765, I-485, and N-400 editors, side-by-side PDF previews, filing packages, citizenship study, and Notes & Reminders.",
    },
    {
      area: "Backend",
      detail:
        "Implemented NestJS services and shared validated contracts for account-scoped cases, document metadata and attachments, revision-aware saving, version history, PDF exports, learning progress, notes, and subscription entitlements.",
    },
    {
      area: "Infrastructure",
      detail:
        "Structured a pnpm workspace with local and hosted runtime adapters, a standalone backend, TypeORM migrations, Docker-based PostgreSQL, private object-storage support, and separately configured email and billing workers.",
    },
    {
      area: "Security",
      detail:
        "Enforced server-derived account ownership, transaction-scoped row-level security, session and request validation, immutable document originals, and revision conflicts, with build checks that keep backend dependencies and private data out of the hosted frontend.",
    },
  ],
  highlights: [
    "Keeps each form draft, its original PDF, supporting documents, and review progress connected while requiring confirmation before transferring shared answers between forms.",
    "Separates English form answers and official source text from English, Belarusian, Russian, and Ukrainian interface explanations; personal facts and No or N/A answers are never filled automatically.",
    "Preserves original document bytes and reusable attachment relationships; form answers, package items, display preferences, and note cards each retain explicit saving and conflict behavior.",
    "Provides preparation tools rather than legal advice, eligibility decisions, or application submission. Registration, Checkout, email delivery, and background jobs depend on separate deployment activation.",
  ],
  techStack: [
    "Next.js 16.4",
    "React 19.3",
    "TypeScript 5.9",
    "Tailwind CSS 4.3",
    "NestJS 12",
    "TypeORM / PostgreSQL",
    "Zod 4 / next-intl",
    "PDF.js / pdf-lib",
    "Cloudflare R2",
    "Stripe adapters",
    "Redis / BullMQ",
    "Node.js 24 / pnpm",
    "Docker / Playwright",
  ],
  liveUrl: "https://mycasetrail.com",
};
