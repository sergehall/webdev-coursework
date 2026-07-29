import type { ProjectShowcaseItem } from "@/data/projectShowcase.types";

export const javaFxEventHandlingProject = {
  id: "javafx-event-handling",
  title: "JavaFX Event Handling",
  category: "JavaFX desktop and synchronized web task system",
  status: "local",
  filters: ["Fullstack"],
  languages: ["Java", "TS"],
  summary:
    "A desktop-first JavaFX assignment expanded into a local multi-application system where JavaFX and Next.js share one validated Spring Boot and PostgreSQL task workflow.",
  imageUrl: "/screenshots/projects/javafx-event-handling.webp",
  previewLabel: "JavaFX and web task workspace",
  previewDescription:
    "Create, prioritize, review, complete, and remove the same durable tasks from a native JavaFX interface or synchronized Next.js labs.",
  architectureTags: [
    "Desktop-first delivery",
    "Dual-client workflow",
    "Single API boundary",
    "Shared task contract",
    "Database ownership",
    "Same-origin web proxy",
    "Graceful offline mode",
    "Local orchestration",
  ],
  contributions: [
    {
      area: "Frontend",
      detail:
        "Built the JavaFX 21 and FXML desktop task manager plus matching Next.js Foundation and Advanced labs with priorities, workflow states, filters, progress, and five-second background synchronization.",
    },
    {
      area: "Backend",
      detail:
        "Implemented a Spring Boot 3.5 REST API as the only persistence boundary, with validated task and interaction contracts, transactional services, duplicate protection, and Flyway-managed PostgreSQL storage.",
    },
    {
      area: "Infrastructure",
      detail:
        "Created a Maven multi-module and npm-orchestrated workspace with Docker Compose PostgreSQL, readiness-aware startup, safe process shutdown, shared environment defaults, and unified verification commands.",
    },
    {
      area: "Security",
      detail:
        "Kept database credentials server-side, validated API URLs and browser payloads, bounded the JavaFX HTTP client with timeouts, and restricted the development-only desktop launcher to fixed loopback same-origin requests.",
    },
  ],
  highlights: [
    "Keeps JavaFX as the required reference deliverable while extending the same interaction model into an optional TypeScript web companion.",
    "Synchronizes both clients through one Spring Boot API and PostgreSQL source of truth; neither client receives database credentials or opens a direct database connection.",
    "Protects task integrity with case-insensitive duplicate detection, transactional writes, stable identifiers, and optimistic concurrency metadata.",
    "Provides deliberate failure behavior: JavaFX can start with an in-memory session when the API is unavailable, while the web labs become read-only and expose a retry path.",
  ],
  techStack: [
    "Java 21",
    "JavaFX 21.0.10",
    "FXML",
    "Spring Boot 3.5.12",
    "Spring Data JPA",
    "Flyway",
    "PostgreSQL",
    "Next.js 16.2.10",
    "React 19.2.7",
    "TypeScript 5.9.3",
    "Zod 4.4.3",
    "Docker Compose",
    "JUnit 5.12",
    "Vitest 4.1",
  ],
  videoUrl: "https://sergehall.github.io/javafx-event-handling-group-project/",
  sourceUrl: "https://github.com/sergehall/javafx-event-handling-group-project",
  docsUrl:
    "https://github.com/sergehall/javafx-event-handling-group-project/tree/main/docs",
  architectureUrl:
    "https://github.com/sergehall/javafx-event-handling-group-project?tab=readme-ov-file#architecture-boundaries",
} satisfies ProjectShowcaseItem;
