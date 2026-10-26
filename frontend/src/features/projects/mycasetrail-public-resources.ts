import type { PublicProjectResource } from "@/features/projects/project-public-resources";

export const myCaseTrailDocumentation = {
  kind: "documentation",
  title: "MyCaseTrail documentation",
  eyebrow: "Public technical overview",
  introduction:
    "A public summary of the implemented preparation workflows and engineering practices. The repository, personal case materials, private configuration, and operational runbooks remain private.",
  sections: [
    {
      title: "Preparation workspace",
      summary:
        "MyCaseTrail brings separate immigration form drafts and their supporting work into one account-scoped workspace.",
      highlights: [
        "I-589, I-765, I-485, and N-400 have independent editors, progress, and original-PDF references; work on one form does not silently replace another draft.",
        "Shared information can be compared and explicitly approved before transfer between forms. Answers start blank, including No and N/A choices.",
        "Saved-answer previews and working PDF exports support review, while source editions and field mappings remain explicitly versioned.",
      ],
    },
    {
      title: "Documents and Filing Packages",
      summary:
        "A shared document library connects unchanged originals to form questions and reusable package attachments.",
      highlights: [
        "Document metadata, form folders, question links, and package uses remain separate so one original can support several preparation items.",
        "Working packages support preparation statuses, priorities, notes, search, ordering, archive and restore, and revision history. Uploading a document does not verify its contents or mark it ready.",
        "Demo I-589 uses fictional sample documents and in-memory content changes, providing an explorable package without personal uploads.",
      ],
    },
    {
      title: "Learning, notes, and sources",
      summary:
        "Study progress, contextual notes, and source review complement the form and document workflows.",
      highlights: [
        "Citizenship study includes chapter reading and practice modes with separate saved progress and resumable sessions.",
        "Private note cards support search, context and priority filters, recoverable trash, and one-time reminders shown while signed in and connected.",
        "Dated public USCIS sources and updates stay separate from personal receipt-status checks. Source updates do not transmit private answers or documents.",
      ],
    },
    {
      title: "Languages and saving",
      summary:
        "The interface supports English, Belarusian, Russian, and Ukrainian without translating personal answers automatically.",
      highlights: [
        "English remains the default interface and the language of official form answers; localized explanations are maintained separately.",
        "Form autosave follows the account preference, package items save independently, and note cards require explicit saving.",
        "Revision conflicts and visible save states help users resolve concurrent edits instead of silently overwriting saved work.",
      ],
    },
    {
      title: "Quality and product boundaries",
      summary:
        "The project combines behavior and isolation tests with separate local and hosted build checks.",
      highlights: [
        "Verification covers shared validation, account isolation, saving, document relationships, PDF contracts, and selected browser workflows.",
        "Public pages and a live URL do not establish open registration or active payments. Checkout, provider delivery, and scheduled work require separate activation and verification.",
        "The application supports preparation; it does not provide legal advice, determine eligibility, submit applications, or treat progress and exports as proof of filing readiness.",
      ],
    },
  ],
} satisfies PublicProjectResource;

export const myCaseTrailArchitecture = {
  kind: "architecture",
  title: "MyCaseTrail architecture",
  eyebrow: "Public architecture overview",
  introduction:
    "A high-level view of application ownership, persistence, and trust boundaries. It excludes private routes, infrastructure identifiers, credentials, personal records, and operational procedures.",
  sections: [
    {
      title: "One frontend, separate runtime adapters",
      summary:
        "One Next.js application serves the public website and private workspace, with local and hosted adapters selected at build time.",
      highlights: [
        "Local mode calls NestJS services in process; hosted mode forwards authenticated requests through a server-side gateway to the standalone backend.",
        "The same route tree and UI serve both modes. Browser state and request parameters cannot switch the runtime boundary.",
        "Import rules and hosted-bundle verification keep database clients, local backend modules, and private assets outside the frontend deployment.",
      ],
    },
    {
      title: "Domain and service ownership",
      summary:
        "Shared TypeScript contracts define validated data shapes while backend modules own business behavior and persistence.",
      highlights: [
        "Account, case, evidence, filing, learning, notes, billing, and update services have focused responsibilities within the NestJS backend.",
        "HTTP adapters validate requests and call services; database access stays behind scoped repositories and reviewed TypeORM migrations.",
        "Original public PDFs and form catalogs have explicit asset ownership, with edition changes requiring mapping review.",
      ],
    },
    {
      title: "Account isolation and concurrency",
      summary:
        "PostgreSQL is authoritative for private records, with server-derived identity and transaction-scoped row-level security.",
      highlights: [
        "Explicit ownership predicates complement database isolation; administrative privileges do not automatically grant access to another account's case contents.",
        "Revision checks and transactional history protect saved answers and package edits from silent concurrent overwrites.",
        "Display preferences use a separate revision from form answers, preserving the meaning of preparation history.",
      ],
    },
    {
      title: "Documents and PDF processing",
      summary:
        "Private storage adapters preserve original bytes while metadata and reusable relationships remain in PostgreSQL.",
      highlights: [
        "Originals can be stored in PostgreSQL or private object storage. Hosted object transfers use backend-issued temporary capabilities.",
        "Signature, size, and hash checks support type and integrity validation; they do not claim antivirus scanning, OCR, or document authenticity verification.",
        "The backend generates private PDFs from saved, owner-scoped answers and versioned templates; PDF.js renders previews without publishing case files as website assets.",
      ],
    },
    {
      title: "Background integrations and delivery",
      summary:
        "Billing, transactional email, and maintenance have explicit backend ownership and independent activation boundaries.",
      highlights: [
        "Stripe adapters use verified events, a durable PostgreSQL inbox, and Redis/BullMQ processing; server entitlements govern restricted workflows.",
        "Transactional email uses a durable outbox and separately configured delivery workers. Note reminders are in-app reminders rather than email or push delivery.",
        "Local builds, gateway builds, backend checks, and focused database tests verify different boundaries; configured integrations are not treated as evidence of successful live delivery.",
      ],
    },
  ],
} satisfies PublicProjectResource;
