import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase.types";

export const hexGateProject: ProjectShowcaseItem = {
  id: "hex-gate",
  title: "Hex Gate",
  category: "Defensive security knowledge and validation platform",
  status: "published",
  filters: ["Fullstack", "Security"],
  languages: ["TS", "Go"],
  frameworks: ["Next.js"],
  summary:
    "A local-first security engineering platform combining a searchable knowledge workbench, protected operator cabinet, persisted identity controls, and bounded scanner validation workflows.",
  imageUrl: "/screenshots/projects/defensive-engineering-hub.png",
  previewLabel: "Defensive security workbench",
  previewDescription:
    "Searchable security standards and playbooks, protected operations, audit evidence, and controlled Kali lab validation in one operator-focused experience.",
  architectureTags: [
    "Local-first trust boundary",
    "Content as code",
    "Next.js / Go split",
    "Contract-first security",
    "PostgreSQL identity state",
    "Fail-closed scanner controls",
    "Append-only audit evidence",
    "Approval-gated execution",
  ],
  contributions: [
    {
      area: "Frontend",
      detail:
        "Built the Next.js knowledge catalog and Markdown reader, terminal-style identity flows, role-aware cabinet, account security, material-access review, audit, and Kali status surfaces.",
    },
    {
      area: "Backend",
      detail:
        "Implemented a Go API for document delivery, PostgreSQL-backed accounts and sessions, TOTP, passkeys, GitHub OAuth, email workflows, audit verification, and bounded scanner state.",
    },
    {
      area: "Infrastructure",
      detail:
        "Structured a pnpm monorepo with local and production runtime modes, PostgreSQL migrations, cached and embedded content fallbacks, Render deployment, observability, and layered quality gates.",
    },
    {
      area: "Security",
      detail:
        "Enforced role and material-clearance boundaries, secure session controls, rate limits, idempotency, hash-linked audit evidence, signed scanner jobs, allowlists, replay checks, and default-deny modes.",
    },
  ],
  highlights: [
    "Turns versioned Markdown standards, playbooks, request maps, audits, and checklists into a searchable defensive-engineering workbench with cached and embedded delivery fallbacks.",
    "Connects a Next.js cabinet to persisted Go identity, session, MFA, passkey, OAuth, mail, material-access, and audit boundaries through shared contracts.",
    "Constrains Kali validation to approved profiles, signed jobs, allowlisted targets, redacted evidence, and replay-resistant state instead of accepting arbitrary remote commands.",
    "Keeps staging approvals and production scanner transport deliberately fail-closed while their contracts, tests, and activation gates are reviewed separately.",
  ],
  techStack: [
    "Next.js 16.2",
    "React 19.2",
    "TypeScript 5.9",
    "Go 1.26",
    "PostgreSQL",
    "pgx 5.9",
    "WebAuthn",
    "OpenTelemetry",
    "Markdown / GFM",
    "Tailwind CSS 4.3",
    "pnpm 10.33",
  ],
  liveUrl: "https://6b616c69.com",
};
