import {
  projectFilters,
  projectLanguageFilters,
  projectShowcaseItems,
  type ProjectFilterOption,
  type ProjectLanguageFilterOption,
  type ProjectShowcaseItem,
  type ProjectStatus,
} from "@/data/projectShowcase";

export const projectStatusLabels = {
  featured: "Featured",
  published: "Published",
  paused: "Paused",
  draft: "Ready to fill",
  local: "Local",
} satisfies Record<ProjectStatus, string>;

export const projectStatusStyles = {
  featured: "border-emerald-300/40 bg-emerald-400/15 text-emerald-100",
  published: "border-sky-300/40 bg-sky-400/15 text-sky-100",
  paused: "border-slate-300/40 bg-slate-400/15 text-slate-100",
  draft: "border-amber-300/40 bg-amber-400/15 text-amber-100",
  local: "border-violet-300/40 bg-violet-400/15 text-violet-100",
} satisfies Record<ProjectStatus, string>;

const publishedProjectCount = projectShowcaseItems.filter(
  ({ status }) => status === "published"
).length;

const localProjectCount = projectShowcaseItems.filter(
  ({ status }) => status === "local"
).length;

const representedLanguages = projectLanguageFilters
  .filter((language) => language !== "All")
  .join(" / ");

export const projectShowcaseStats = [
  {
    value: String(projectShowcaseItems.length),
    label: "Projects documented",
    description: "Production platforms and applied learning labs.",
  },
  {
    value: `${publishedProjectCount} live`,
    label: "Published systems",
    description: `${localProjectCount} local Java lab with source and architecture notes.`,
  },
  {
    value: representedLanguages,
    label: "Languages represented",
    description: "Frontend, backend, and systems work in one portfolio.",
  },
] as const;

export const projectTimeline = [
  {
    period: "2025",
    title: "Coursework foundations",
    detail:
      "HTML, CSS, JavaScript, databases, AWS labs, and applied web fundamentals.",
  },
  {
    period: "2026",
    title: "Production-grade platforms",
    detail:
      "Full-stack systems with auth, payments, admin tooling, cloud infrastructure, and security gates.",
  },
  {
    period: "Now",
    title: "Independent product engineering",
    detail:
      "Microservices, marketplaces, security workbenches, cloud portals, and client-ready business platforms.",
  },
] as const;

export const architectureFootprint = Array.from(
  new Set(
    projectShowcaseItems.flatMap(({ architectureTags }) => architectureTags)
  )
).slice(0, 8);

export const orderedProjectShowcaseItems = [
  ...projectShowcaseItems.filter(({ id }) => id === "sergioartg"),
  ...projectShowcaseItems.filter(({ id }) => id !== "sergioartg"),
] satisfies readonly ProjectShowcaseItem[];

export function projectMatchesType(
  project: ProjectShowcaseItem,
  filter: ProjectFilterOption
) {
  return (
    filter === "All" ||
    project.filters.some((projectFilter) => projectFilter === filter)
  );
}

export function projectMatchesLanguage(
  project: ProjectShowcaseItem,
  filter: ProjectLanguageFilterOption
) {
  return (
    filter === "All" ||
    project.languages.some((language) => language === filter)
  );
}

export function hasMatchingProject(
  typeFilter: ProjectFilterOption,
  languageFilter: ProjectLanguageFilterOption
) {
  return projectShowcaseItems.some(
    (project) =>
      projectMatchesType(project, typeFilter) &&
      projectMatchesLanguage(project, languageFilter)
  );
}

export function getAvailableProjectFilters(
  languageFilter: ProjectLanguageFilterOption
) {
  return new Set(
    projectFilters.filter((filter) =>
      hasMatchingProject(filter, languageFilter)
    )
  );
}

export function getAvailableLanguageFilters(typeFilter: ProjectFilterOption) {
  return new Set(
    projectLanguageFilters.filter((filter) =>
      hasMatchingProject(typeFilter, filter)
    )
  );
}
