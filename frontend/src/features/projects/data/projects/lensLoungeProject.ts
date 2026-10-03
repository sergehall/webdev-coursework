import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase.types";

export const lensLoungeProject: ProjectShowcaseItem = {
  id: "lens-lounge",
  title: "Lens Lounge",
  category: "Publishing, collaboration, and commerce platform",
  status: "published",
  filters: ["Fullstack", "Microservices"],
  languages: ["TS", "Go"],
  frameworks: ["Next.js", "NestJS"],
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
};
