import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase.types";

export const infrastructureConsoleProject: ProjectShowcaseItem = {
  id: "infrastructure-console",
  title: "Infrastructure Console",
  category: "Local cloud operations and infrastructure workspace",
  status: "local",
  filters: ["Fullstack", "Cloud", "Security"],
  languages: ["TS"],
  frameworks: ["Next.js"],
  summary:
    "A private, local-only workspace that brings Vercel, Heroku, and Render observations together in one read-only infrastructure console, with an interactive topology, deployment inventory, and scoped health checks.",
  imageUrl: "/screenshots/projects/infrastructure-ops-desk.webp",
  thumbnailUrl: "/screenshots/projects/infrastructure-ops-desk-card.webp",
  galleryImages: [
    {
      src: "/screenshots/projects/vercel-ops-desk.webp",
      caption: "Vercel projects, deployments, and analytics console",
    },
    {
      src: "/screenshots/projects/heroku-ops-desk.webp",
      caption: "Heroku application and runtime console",
    },
    {
      src: "/screenshots/projects/render-ops-desk.webp",
      caption: "Render services, configuration, and metrics console",
    },
  ],
  previewLabel: "Local infrastructure operations",
  previewDescription:
    "A local-only view across three provider consoles, with sourced observations and separate application health evidence.",
  architectureTags: [
    "Local-only control plane",
    "Versioned provider adapters",
    "Read-only federation",
    "Interactive topology",
    "Evidence-aware health checks",
    "Bounded polling and cache",
    "Source timestamps and freshness",
    "Loopback-only access",
  ],
  contributions: [
    {
      area: "Frontend",
      detail:
        "Built the infrastructure overview, searchable topology, provider lanes, resource inspector, inventory and deployment views, and evidence and security panels in Next.js.",
    },
    {
      area: "Backend",
      detail:
        "Integrated three versioned local HTTP adapters with runtime validation, provider identity checks, single-flight collection, backoff, stale-data retention, and scoped health verification.",
    },
    {
      area: "Infrastructure",
      detail:
        "Created a local launcher for the Vercel, Heroku, Render, and central consoles, with fixed loopback ports and individual start, stop, and restart controls.",
    },
    {
      area: "Security",
      detail:
        "Kept provider credentials in their source consoles, restricted central requests to fixed local targets, enforced local request guards, and separated reported deployment state from verified application health.",
    },
  ],
  highlights: [
    "Combines independently collected provider resources into one topology while preserving source timestamps, missing capabilities, and the provenance of declared relationships.",
    "Checks selected Lens Lounge and Webdev Coursework paths with bounded, expiring evidence; a ready deployment is never presented as proof of application health.",
    "Runs only on the local machine; this private project has no public domain or live-site link.",
  ],
  techStack: [
    "Next.js 16.4",
    "React 19.3",
    "TypeScript 5.9",
    "Tailwind CSS 4.3",
    "Zod 4",
    "Playwright 1.64",
    "Node.js 24",
    "pnpm 10.33",
    "Local HTTP adapters",
  ],
};
