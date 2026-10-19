import type { PublicProjectResource } from "@/features/projects/project-public-resources";

export const infrastructureConsoleDocumentation = {
  kind: "documentation",
  title: "Infrastructure Console documentation",
  eyebrow: "Public technical overview",
  introduction:
    "A portfolio-safe overview of a private, local-only workspace for observing Vercel, Heroku, and Render. Source code, credentials, infrastructure identifiers, and operational instructions remain private.",
  sections: [
    {
      title: "Workspace and scope",
      summary:
        "The console brings observations from three independently running provider workspaces into one read-only view.",
      highlights: [
        "The overview separates local console connectivity, observed resources, items needing attention, and scoped verification results.",
        "A local launcher can manage the four known console processes without deploying or modifying cloud resources.",
        "The project is intended for one trusted local operator; it has no public site or remotely accessible administration surface.",
      ],
    },
    {
      title: "Inventory and topology",
      summary:
        "Provider observations are organized into searchable inventory, deployment, and relationship views.",
      highlights: [
        "The topology supports application, provider, resource-type, status, and text filters with a resource inspector.",
        "Application groups and documented relationships retain their provenance rather than becoming claims of verified network traffic.",
        "Observation times, stale states, and unavailable capabilities stay visible when a provider cannot supply fresh data.",
      ],
    },
    {
      title: "Health and evidence",
      summary:
        "Selected application paths can be checked separately from provider and deployment status.",
      highlights: [
        "Named checks report what was observed, when it was observed, and whether the result is verified, partial, failed, or expired.",
        "Automatic checks run while the page is visible; operators can pause or request an individual check.",
        "A responding local API or ready deployment is never treated as proof of an end-to-end healthy application.",
      ],
    },
    {
      title: "Quality and limitations",
      summary:
        "The project favors explicit evidence and bounded behavior over inferred operational certainty.",
      highlights: [
        "Typed contracts, runtime validation, tests, linting, and production builds cover the central console and provider bridges.",
        "Central snapshots are held in memory and reset when the console restarts; this is not a persistent monitoring history.",
        "Missing metrics, security findings, and unsupported provider data are presented as unavailable rather than zero or healthy.",
      ],
    },
  ],
} satisfies PublicProjectResource;

export const infrastructureConsoleArchitecture = {
  kind: "architecture",
  title: "Infrastructure Console architecture",
  eyebrow: "Public architecture overview",
  introduction:
    "A high-level view of the local federation, observation lifecycle, and trust boundaries without exposing private endpoints, credentials, resource identifiers, or runbooks.",
  sections: [
    {
      title: "Federated boundary",
      summary:
        "A central Next.js workspace reads narrow, versioned exports from three independently running local consoles.",
      highlights: [
        "Each source console reuses its own collector and provider access; the central workspace does not hold cloud credentials.",
        "Provider identity and response shape are validated before observations enter the shared model.",
        "One unavailable provider does not prevent the other provider views from updating.",
      ],
    },
    {
      title: "Normalized observations",
      summary:
        "Provider-specific resources are projected into a common inventory while retaining their original meaning and provenance.",
      highlights: [
        "Resource, deployment, relationship, capability, and freshness fields are modeled separately.",
        "Application membership organizes the display; declared relationships remain distinct from active connectivity evidence.",
        "A stale observation keeps its source timestamp instead of appearing newly verified after a refresh.",
      ],
    },
    {
      title: "Collection and failure handling",
      summary:
        "Bounded polling keeps the local interface responsive when provider consoles are slow or disconnected.",
      highlights: [
        "Independent collection, request deadlines, response limits, deduplication, caching, and backoff constrain each provider boundary.",
        "Last successful observations may remain visible with an explicit stale state during a source failure.",
        "The central cache is memory-only; it does not claim durable history or continuous background monitoring.",
      ],
    },
    {
      title: "Verification boundary",
      summary:
        "Selected health checks add scoped, expiring evidence without changing the underlying provider facts.",
      highlights: [
        "Checks use fixed server-side targets and bounded transport rather than browser-supplied destinations.",
        "Public reachability, service liveness, readiness, and protected forwarding are reported as different kinds of evidence.",
        "An application transaction, database state, or security posture remains unknown unless a check explicitly covers it.",
      ],
    },
    {
      title: "Local trust model",
      summary:
        "The console is a single-operator local tool with narrow read paths and explicit process controls.",
      highlights: [
        "Browser access is restricted to the local origin, and provider credentials stay inside their respective source consoles.",
        "Provider bridges export only approved fields; raw responses, environment values, logs, and secrets are not forwarded.",
        "Local process controls apply only to known consoles and do not mutate production cloud resources.",
      ],
    },
  ],
} satisfies PublicProjectResource;
