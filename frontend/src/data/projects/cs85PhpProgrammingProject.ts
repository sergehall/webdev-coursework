import type { ProjectShowcaseItem } from "@/data/projectShowcase.types";

export const cs85PhpProgrammingProject = {
  id: "cs85-php-programming",
  title: "PHP Programming",
  category: "Laravel coursework and hybrid AI study platform",
  status: "local",
  filters: ["Fullstack", "AI"],
  languages: ["PHP"],
  frameworks: ["Vite", "Laravel"],
  summary:
    "A completed twelve-module CS85 Laravel portfolio that progresses from PHP fundamentals through databases, authentication, and APIs into a secure hybrid AI learning workspace.",
  imageUrl: "/screenshots/projects/cs85-php-programming.webp",
  previewLabel: "Laravel hybrid AI workspace",
  previewDescription:
    "Route persistent study conversations across three private LM Studio specialists and OpenAI GPT-4o mini from one authenticated Laravel cabinet.",
  architectureTags: [
    "Laravel modular monolith",
    "Provider-neutral AI boundary",
    "Conversation-scoped routing",
    "Application-owned history",
    "Streaming response lifecycle",
    "Read-only tool allowlist",
    "Local-first inference",
    "Security-governed cabinet",
  ],
  contributions: [
    {
      area: "Frontend",
      detail:
        "Built a Blade and Tailwind coursework portal, contact workbench, protected user and admin cabinets, provider health cards, conversation history, model selection, and progressively rendered AI responses.",
    },
    {
      area: "Backend",
      detail:
        "Implemented Laravel services for four explicit AI modes, provider routing, bounded conversation history, persistent messages, request telemetry, sanitized Markdown, retries, and allowlisted course tools.",
    },
    {
      area: "Infrastructure",
      detail:
        "Created one-command local workflows around PHP, Vite, MySQL, Redis, Mailpit, Adminer, and LM Studio, with SQLite test isolation and GitHub Actions gates for PHP, Node, builds, and dependency audits.",
    },
    {
      area: "Security",
      detail:
        "Added verified session authentication, GitHub OAuth, TOTP MFA and recovery codes, recent-authentication step-up, authorization boundaries, throttling, strict security headers, audit events, and server-only AI credentials.",
    },
  ],
  highlights: [
    "Organizes all twelve CS85 modules and their assignment evidence inside one Laravel application, preserving the progression from PHP basics to a portfolio-ready final project.",
    "Routes three private LM Studio models and OpenAI GPT-4o mini through one provider contract while keeping model selection explicit and conversation-scoped.",
    "Streams provider output through Laravel, persists user and assistant messages, records metadata-only telemetry, sanitizes rendered Markdown, and allows at most one tool follow-up round.",
    "Keeps the browser behind Laravel for authentication, authorization, provider health, prompts, history, and credentials; local or online provider outages remain isolated from the rest of the application.",
  ],
  techStack: [
    "PHP 8.5",
    "Laravel 13.16",
    "Blade",
    "Tailwind CSS 4.3",
    "Vite 8.0",
    "MySQL 9",
    "SQLite",
    "Redis",
    "LM Studio",
    "OpenAI API",
    "GPT-4o mini",
    "Eloquent / Migrations",
    "PHPUnit 12.5",
    "Larastan / PHPStan",
    "Docker Compose",
  ],
  videoUrl: "https://sergehall.github.io/cs85-php-programming/",
  sourceUrl: "https://github.com/sergehall/cs85-php-programming",
  docsUrl: "https://github.com/sergehall/cs85-php-programming/tree/main/docs",
  architectureUrl:
    "https://github.com/sergehall/cs85-php-programming/blob/main/docs/architecture/ai-architecture.md",
} satisfies ProjectShowcaseItem;
