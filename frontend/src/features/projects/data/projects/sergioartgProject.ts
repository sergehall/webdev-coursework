import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase.types";

export const sergioartgProject: ProjectShowcaseItem = {
  id: "sergioartg",
  title: "SERGIOARTG Platform",
  category: "Creative services marketplace and booking platform",
  status: "published",
  filters: ["Fullstack", "AI", "Marketplace"],
  languages: ["TS"],
  frameworks: ["Next.js", "NestJS"],
  summary:
    "A production full-stack platform combining a photography portfolio with a two-sided services marketplace, authenticated workspaces, booking, Stripe payments, secure messaging, and admin operations.",
  imageUrl: "/screenshots/projects/sergioartg-homepage-portrait.webp",
  thumbnailUrl: "/screenshots/projects/sergioartg-homepage-card.webp",
  previewLabel: "Photography and creative services",
  previewDescription:
    "Explore Sergio's photography and discover creative professionals, services, and tools for managing bookings.",
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
};
