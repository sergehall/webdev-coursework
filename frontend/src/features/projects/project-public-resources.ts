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
