export type PublicResourceSection = {
  readonly title: string;
  readonly summary: string;
  readonly highlights: readonly string[];
};

export type PublicProjectResource = {
  readonly kind: "documentation" | "architecture";
  readonly title: string;
  readonly eyebrow: string;
  readonly introduction: string;
  readonly sections: readonly PublicResourceSection[];
};

export const publicProjectDocsById: Readonly<
  Partial<Record<string, PublicProjectResource>>
> = {
  "lens-lounge": {
    kind: "documentation",
    title: "Lens Lounge documentation",
    eyebrow: "Public technical overview",
    introduction:
      "A portfolio-safe summary of the implemented product, service boundaries, and delivery practices. Source code and operational runbooks remain private.",
    sections: [
      {
        title: "Publishing experience",
        summary:
          "Lens Lounge combines public content discovery with authenticated creator and editorial workspaces.",
        highlights: [
          "Visitors can explore categories, creator profiles, blogs, posts, and published stories.",
          "Creators use a cabinet and editor for story composition, media, preview, publishing readiness, and lifecycle management.",
          "Comments, likes, bookmarks, reports, analytics, and moderation support governed audience engagement.",
        ],
      },
      {
        title: "Collaboration and accounts",
        summary:
          "Private account areas connect identity, profile management, realtime communication, and security settings.",
        highlights: [
          "The account system includes email flows, linked OAuth identities, MFA, recovery, and device-aware sessions.",
          "Realtime chat combines Socket.IO delivery with backend conversation history and resilient client-side states.",
          "Role-aware workspaces separate creator, moderator, administrator, owner, and root-owner responsibilities.",
        ],
      },
      {
        title: "Specialized services",
        summary:
          "The browser uses one main API while focused services own payment and file responsibilities.",
        highlights: [
          "A Go file service owns file metadata, presigned transfers, object-storage integration, and lifecycle events.",
          "A dedicated payment service owns Stripe integration, checkout state, webhook reconciliation, catalog data, and entitlements.",
          "The main NestJS API coordinates product workflows without exposing specialized services directly to the browser.",
        ],
      },
      {
        title: "Quality and delivery",
        summary:
          "Workspace checks and service-specific pipelines protect contracts, implementation quality, and deployability.",
        highlights: [
          "Frontend, backend, payment, file, and shared-package workspaces have dedicated lint, type, build, and test commands.",
          "The test strategy includes unit, integration, contract, end-to-end, smoke, and architecture checks.",
          "Container workflows support production builds and independently deployable service boundaries.",
        ],
      },
      {
        title: "Current delivery boundary",
        summary:
          "Implemented capabilities are separated from migration work that is intentionally not presented as fully active product behavior.",
        highlights: [
          "Publishing, editor, account security, moderation, governance, realtime, and file lifecycle foundations are implemented.",
          "The payment domain includes checkout, webhooks, catalog, outbox, projections, and entitlement foundations.",
          "Generic purchase activation remains intentionally gated while concrete product bindings and migration readiness are completed.",
        ],
      },
    ],
  },
  sergioartg: {
    kind: "documentation",
    title: "SERGIOARTG Platform documentation",
    eyebrow: "Public technical overview",
    introduction:
      "A curated summary of the platform's product design and engineering practices. The repository and operational runbooks remain private.",
    sections: [
      {
        title: "Product and marketplace",
        summary:
          "SERGIOARTG is evolving into a two-sided marketplace for creative and professional services.",
        highlights: [
          "One account can participate as a client, provider, studio owner, or team member.",
          "Providers publish standalone service listings with pricing, media, locations, packages, and booking rules.",
          "Guests receive a limited discovery view, while members can review complete published offers and booking details.",
        ],
      },
      {
        title: "Domain architecture",
        summary:
          "Clear ownership boundaries keep identity, provider profiles, catalog data, bookings, payments, and moderation independently maintainable.",
        highlights: [
          "Catalog owns the service lifecycle from draft and review through publication, suspension, and archival.",
          "Booking orchestrates availability and requests without writing directly into catalog-owned data.",
          "Payment and booking communicate through explicit ports and contract-tested boundaries.",
        ],
      },
      {
        title: "Security and governance",
        summary:
          "Authentication, privileged administration, messaging, and sensitive operations use layered security controls.",
        highlights: [
          "The sign-in system supports password, OAuth, passkey, MFA, recovery, and device-aware session flows.",
          "Administrative workspaces use role-aware access, step-up protection, audit records, and explicit governance boundaries.",
          "True end-to-end encrypted conversations keep message content and attachment plaintext outside backend storage.",
        ],
      },
      {
        title: "Quality and reliability",
        summary:
          "The delivery process combines a production-oriented test pyramid with architecture, security, and release gates.",
        highlights: [
          "Unit, integration, contract, and browser tests protect business-critical workflows across frontend and backend.",
          "CI includes dedicated checks for access control, API contracts, dependency security, and architecture boundaries.",
          "Service-level objectives cover availability, latency, authentication reliability, critical flows, and change failure rate.",
        ],
      },
      {
        title: "Responsible AI assistance",
        summary:
          "AI features improve user-authored drafts while keeping the user in control of every final action.",
        highlights: [
          "AI suggestions are advisory and never send messages, submit bookings, approve quotes, or change roles automatically.",
          "Provider credentials remain backend-only, while feature flags, quotas, and abuse controls govern each surface.",
          "Only the minimum task context is sent; unrelated conversations, tokens, cookies, and attachments stay outside the prompt.",
        ],
      },
    ],
  },
};

export const publicProjectArchitectureById: Readonly<
  Partial<Record<string, PublicProjectResource>>
> = {
  "lens-lounge": {
    kind: "architecture",
    title: "Lens Lounge architecture",
    eyebrow: "Public architecture overview",
    introduction:
      "A concise view of the platform's implemented system boundaries and engineering principles without exposing private endpoints, infrastructure identifiers, or operating procedures.",
    sections: [
      {
        title: "Browser-facing gateway",
        summary:
          "The Next.js application integrates through the main NestJS API instead of coupling the browser to every backend service.",
        highlights: [
          "The gateway owns browser-facing authentication, publishing, engagement, messaging, governance, and orchestration contracts.",
          "Payment and file-service details remain behind backend adapters and explicit application boundaries.",
          "This boundary centralizes policy enforcement while allowing specialized services to evolve independently.",
        ],
      },
      {
        title: "Service and data ownership",
        summary:
          "Each deployable service owns a focused domain and its persistence responsibilities.",
        highlights: [
          "The main API owns identity, content, engagement, messaging, and administrative governance data.",
          "The payment service owns provider state, webhook reconciliation, catalog records, and entitlement lifecycle.",
          "The Go file service owns file metadata and object-storage lifecycle instead of sharing backend persistence code.",
        ],
      },
      {
        title: "Contracts and event delivery",
        summary:
          "Explicit HTTP and event contracts connect services without sharing internal implementation details.",
        highlights: [
          "Shared TypeScript packages align configuration and contracts across the frontend and NestJS services.",
          "The Go boundary uses explicit JSON contracts and remains independent of the TypeScript runtime.",
          "Kafka events, payment outbox processing, and backend projections support asynchronous cross-service workflows.",
        ],
      },
      {
        title: "Media and realtime boundaries",
        summary:
          "Large media transfers and realtime collaboration follow dedicated paths rather than burdening ordinary API requests.",
        highlights: [
          "Presigned uploads move media directly between the browser and S3-compatible storage.",
          "The file service records metadata and publishes lifecycle events after transfer completion.",
          "Socket.IO handles realtime collaboration while durable backend reads preserve conversation continuity.",
        ],
      },
      {
        title: "Security and release governance",
        summary:
          "Identity, privileged operations, and releases use layered controls with auditable boundaries.",
        highlights: [
          "JWT sessions, MFA step-up, OAuth linking, CSRF protection, security headers, validation, and throttling protect account flows.",
          "Root-owner and administrative operations use capabilities, explicit policy checks, and persisted audit records.",
          "Dependency constraints, service CI, contract verification, and staged deployment checks guard architectural integrity.",
        ],
      },
    ],
  },
  sergioartg: {
    kind: "architecture",
    title: "SERGIOARTG Platform architecture",
    eyebrow: "Public architecture audit",
    introduction:
      "A portfolio-safe view of a measured architecture audit and the refactoring program that reduced runtime complexity while preserving external contracts.",
    sections: [
      {
        title: "Audit methodology",
        summary:
          "Runtime code was evaluated using a weighted model combining file size, import fan-in, and method density.",
        highlights: [
          "The baseline covered 940 frontend and backend runtime files.",
          "The initial report identified 59 oversized modules, including 3 critical and 4 high-risk hotspots.",
          "Risk was reviewed by both individual file and domain concentration to expose change coupling.",
        ],
      },
      {
        title: "Primary architecture risks",
        summary:
          "The highest-risk areas concentrated orchestration, policy, persistence coordination, mapping, and UI composition in the same modules.",
        highlights: [
          "Messaging and authentication carried the greatest backend orchestration concentration.",
          "Administrative routes combined too many endpoint and API-description concerns.",
          "Availability and administration screens mixed layout, state wiring, and behavior contracts.",
        ],
      },
      {
        title: "Refactoring strategy",
        summary:
          "Large modules were decomposed into bounded operations and focused leaf components behind stable composition roots.",
        highlights: [
          "Messaging was split into thread, write, discovery, moderation, attachment, and policy responsibilities.",
          "Authentication governance was separated into request, approval, lifecycle, and state-transition operations.",
          "Each change preserved public API behavior and required regression coverage plus an updated audit report.",
        ],
      },
      {
        title: "Measured improvements",
        summary:
          "Twelve focused iterations removed every critical hotspot and substantially reduced high-risk concentration.",
        highlights: [
          "Critical hotspots decreased from 3 to 0; the final high-risk queue contained one remaining module.",
          "Representative modules were reduced from 804 to 358 lines, 737 to 137 lines, and 592 to 173 lines.",
          "A 730-line availability composition file became a four-line stable export backed by focused components.",
        ],
      },
      {
        title: "Engineering outcome",
        summary:
          "The audit established a repeatable architecture governance loop rather than a one-time cleanup.",
        highlights: [
          "Smaller ownership boundaries reduce review scope, parallel-change conflicts, and regression risk.",
          "Architecture metrics turn maintainability concerns into measurable acceptance criteria.",
          "Stable contracts and automated gates allow internal structure to evolve without disrupting product behavior.",
        ],
      },
    ],
  },
};
