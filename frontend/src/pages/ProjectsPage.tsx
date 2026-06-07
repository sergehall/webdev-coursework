import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BookOpen,
  ExternalLink,
  GitBranch,
  Image as ImageIcon,
  Layers,
  PencilLine,
  X,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

import {
  projectFilters,
  projectLanguageFilters,
  projectShowcaseItems,
  type ProjectFilterOption,
  type ProjectLanguageFilterOption,
  type ProjectShowcaseItem,
  type ProjectStatus,
} from "@/data/projectShowcase";
import { cn } from "@/utils/cn";

const statusLabels = {
  featured: "Featured",
  published: "Published",
  draft: "Ready to fill",
  local: "Local",
} satisfies Record<ProjectStatus, string>;

const statusStyles = {
  featured:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200",
  published:
    "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-200",
  draft:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200",
  local:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200",
} satisfies Record<ProjectStatus, string>;

const publishedProjectCount = projectShowcaseItems.filter(
  (project) => project.status === "published"
).length;

const localProjectCount = projectShowcaseItems.filter(
  (project) => project.status === "local"
).length;

const representedLanguages = projectLanguageFilters
  .filter((language) => language !== "All")
  .join(" / ");

const showcaseStats = [
  {
    value: String(projectShowcaseItems.length),
    label: "Projects documented",
    description:
      "Current websites, platforms, and learning labs in one gallery.",
  },
  {
    value: `${publishedProjectCount} published`,
    label: "Production status",
    description: `${localProjectCount} local Java lab with source and architecture notes.`,
  },
  {
    value: representedLanguages,
    label: "Programming languages",
    description: "Language filters separate JS, TS, Java, and Go projects.",
  },
] as const;

const projectTimeline = [
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
      "Fullstack systems with auth, payments, admin tooling, cloud infrastructure, and security gates.",
  },
  {
    period: "Now",
    title: "Independent product engineering",
    detail:
      "Microservices, marketplaces, security workbenches, cloud portals, and client-ready business platforms.",
  },
] as const;

function projectMatchesType(
  project: ProjectShowcaseItem,
  filter: ProjectFilterOption
) {
  return (
    filter === "All" ||
    project.filters.some((projectFilter) => projectFilter === filter)
  );
}

function projectMatchesLanguage(
  project: ProjectShowcaseItem,
  filter: ProjectLanguageFilterOption
) {
  return (
    filter === "All" ||
    project.languages.some((language) => language === filter)
  );
}

function hasMatchingProject(
  typeFilter: ProjectFilterOption,
  languageFilter: ProjectLanguageFilterOption
) {
  return projectShowcaseItems.some(
    (project) =>
      projectMatchesType(project, typeFilter) &&
      projectMatchesLanguage(project, languageFilter)
  );
}

function ProjectLink({
  href,
  label,
  icon,
  tone = "default",
}: {
  readonly href: string;
  readonly label: string;
  readonly icon: ReactNode;
  readonly tone?: "default" | "dark";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded border px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2",
        tone === "dark"
          ? "border-gray-200 bg-white text-gray-800 hover:border-sky-300 hover:bg-sky-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-sky-700 dark:hover:bg-gray-800"
          : "border-gray-200 bg-white text-gray-800 hover:border-sky-300 hover:bg-sky-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-sky-700 dark:hover:bg-gray-800"
      )}
    >
      {icon}
      {label}
    </a>
  );
}

function ProjectPreviewButton({
  project,
  index,
  onPreview,
}: {
  readonly project: ProjectShowcaseItem;
  readonly index: number;
  readonly onPreview: (project: ProjectShowcaseItem) => void;
}) {
  const displayNumber = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={() => onPreview(project)}
      aria-label={`Preview ${project.title} screenshot`}
      className="group relative aspect-[500/380] min-h-[280px] w-full overflow-hidden border-b border-white/10 bg-slate-950 text-left text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 lg:min-h-[380px]"
    >
      <img
        src={project.imageUrl}
        alt={`${project.title} website preview`}
        width={500}
        height={380}
        loading={index === 0 ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-slate-950/45" />

      <span className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-5 lg:min-h-[380px]">
        <span className="flex items-center justify-between gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 bg-slate-950/45 text-sm font-bold shadow-sm backdrop-blur">
            {displayNumber}
          </span>
          <span
            className={cn(
              "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur",
              statusStyles[project.status]
            )}
          >
            {statusLabels[project.status]}
          </span>
        </span>

        <span className="max-w-sm space-y-2">
          <span className="block text-xs font-bold tracking-wide text-sky-100 uppercase">
            {project.previewLabel}
          </span>
          <span className="block text-sm leading-6 text-slate-100">
            {project.previewDescription}
          </span>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/85">
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            Click to enlarge
          </span>
        </span>
      </span>
    </button>
  );
}

function ProjectMediaPanel({ project, index, onPreview }: ProjectCardProps) {
  return (
    <div className="flex h-full flex-col border-b border-gray-200 bg-white lg:border-r lg:border-b-0 dark:border-gray-700 dark:bg-gray-800">
      <ProjectPreviewButton
        project={project}
        index={index}
        onPreview={onPreview}
      />

      <div className="flex flex-1 flex-col justify-between gap-5 p-5">
        <div className="space-y-5">
          <section aria-label={`${project.title} quick project facts`}>
            <h3 className="text-sm font-bold text-gray-950 dark:text-white">
              Project At A Glance
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.filters.map((filter) => (
                <span
                  key={filter}
                  className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-200"
                >
                  {filter}
                </span>
              ))}
            </div>
          </section>

          <section aria-label={`${project.title} featured stack`}>
            <h3 className="text-sm font-bold text-gray-950 dark:text-white">
              Core Stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-950 dark:text-white">
            Project Links
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <ProjectLink
                href={project.liveUrl}
                label="Live site"
                icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
                tone="dark"
              />
            )}
            {project.sourceUrl && (
              <ProjectLink
                href={project.sourceUrl}
                label="Source"
                icon={<SiGithub className="h-4 w-4" aria-hidden="true" />}
                tone="dark"
              />
            )}
            {project.docsUrl && (
              <ProjectLink
                href={project.docsUrl}
                label="Docs"
                icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
                tone="dark"
              />
            )}
            {project.architectureUrl && (
              <ProjectLink
                href={project.architectureUrl}
                label="Architecture"
                icon={<GitBranch className="h-4 w-4" aria-hidden="true" />}
                tone="dark"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onPreview }: ProjectCardProps) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-sky-200 hover:shadow-md lg:grid-cols-[minmax(18rem,500px)_minmax(0,1fr)] dark:border-gray-700 dark:bg-gray-800 dark:hover:border-sky-800">
      <ProjectMediaPanel
        project={project}
        index={index}
        onPreview={onPreview}
      />

      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              {project.category}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-950 dark:text-white">
            {project.title}
          </h2>
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {project.summary}
          </p>
        </div>

        <section aria-label={`${project.title} architecture tags`}>
          <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
            Architecture
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.architectureTags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section aria-label={`${project.title} build contributions`}>
          <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
            What I Built
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {project.contributions.map((item) => (
              <div
                key={`${project.id}-${item.area}`}
                className="rounded border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900/60"
              >
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  {item.area}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-300">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5">
          <section
            aria-label={`${project.title} highlights`}
            className="rounded border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/60"
          >
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <PencilLine className="h-4 w-4 text-sky-600" aria-hidden="true" />
              Showcase notes
            </h3>
            <ul className="space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}

function ScreenshotDialog({
  project,
  onClose,
}: {
  readonly project: ProjectShowcaseItem | null;
  readonly onClose: () => void;
}) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, project]);

  if (!project) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshot preview`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-lg border border-white/15 bg-white shadow-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-gray-950 dark:text-white">
              {project.title}
            </p>
            <p className="truncate text-xs text-gray-600 dark:text-gray-300">
              {project.previewDescription}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close screenshot preview"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-gray-200 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="max-h-[calc(92vh-4.5rem)] overflow-auto bg-slate-100 p-3 dark:bg-slate-950">
          <img
            src={project.imageUrl}
            alt={`${project.title} enlarged website preview`}
            width={500}
            height={380}
            className="mx-auto h-auto w-full max-w-[1000px] rounded border border-gray-200 bg-white object-contain dark:border-gray-700"
          />
        </div>
      </div>
    </div>
  );
}

type ProjectCardProps = {
  readonly project: ProjectShowcaseItem;
  readonly index: number;
  readonly onPreview: (project: ProjectShowcaseItem) => void;
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterOption>("All");
  const [activeLanguageFilter, setActiveLanguageFilter] =
    useState<ProjectLanguageFilterOption>("All");
  const [previewProject, setPreviewProject] =
    useState<ProjectShowcaseItem | null>(null);

  const visibleProjects = useMemo(() => {
    return projectShowcaseItems.filter(
      (project) =>
        projectMatchesType(project, activeFilter) &&
        projectMatchesLanguage(project, activeLanguageFilter)
    );
  }, [activeFilter, activeLanguageFilter]);

  const availableProjectFilters = useMemo(
    () =>
      new Set(
        projectFilters.filter((filter) =>
          hasMatchingProject(filter, activeLanguageFilter)
        )
      ),
    [activeLanguageFilter]
  );

  const availableLanguageFilters = useMemo(
    () =>
      new Set(
        projectLanguageFilters.filter((filter) =>
          hasMatchingProject(activeFilter, filter)
        )
      ),
    [activeFilter]
  );

  const closePreview = useCallback(() => {
    setPreviewProject(null);
  }, []);

  const globalArchitectureTags = useMemo(
    () =>
      Array.from(
        new Set(
          projectShowcaseItems.flatMap((project) => project.architectureTags)
        )
      ).slice(0, 14),
    []
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <header className="space-y-3 text-center sm:text-left">
        <h1 className="bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-4xl leading-tight font-extrabold text-transparent drop-shadow-lg sm:text-5xl">
          Project Showcase
        </h1>
        <p className="max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
          A focused gallery for current websites and applications I have built.
          Each entry includes live links, source code, architecture notes, stack
          details, and the engineering work behind the product.
        </p>
      </header>

      <section className="grid gap-5 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-3 dark:border-gray-700 dark:bg-gray-800">
        {showcaseStats.map((stat) => (
          <div key={stat.label} className="min-w-0 space-y-1">
            <p className="text-2xl leading-tight font-extrabold break-words text-gray-950 sm:text-3xl dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
              {stat.label}
            </p>
            <p className="text-xs leading-5 text-gray-600 dark:text-gray-300">
              {stat.description}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-3" aria-label="Project filters">
        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
          Project Type
        </h2>
        <div className="flex flex-wrap gap-2">
          {projectFilters.map((filter) => {
            const isActive = activeFilter === filter;
            const isDisabled = !availableProjectFilters.has(filter);

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                aria-disabled={isDisabled}
                disabled={isDisabled}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "min-h-10 rounded border px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40",
                  isActive
                    ? "border-sky-500 bg-sky-600 text-white shadow-sm dark:border-sky-400 dark:bg-sky-500 dark:text-slate-950"
                    : "border-gray-200 bg-white text-gray-700 hover:border-sky-300 hover:bg-sky-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-sky-700 dark:hover:bg-gray-700"
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3" aria-label="Programming language filters">
        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
          Programming Languages
        </h2>
        <div className="flex flex-wrap gap-2">
          {projectLanguageFilters.map((filter) => {
            const isActive = activeLanguageFilter === filter;
            const isDisabled = !availableLanguageFilters.has(filter);

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                aria-disabled={isDisabled}
                disabled={isDisabled}
                onClick={() => setActiveLanguageFilter(filter)}
                className={cn(
                  "min-h-10 rounded border px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40",
                  isActive
                    ? "border-emerald-500 bg-emerald-600 text-white shadow-sm dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-emerald-700 dark:hover:bg-gray-700"
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Showing {visibleProjects.length} of {projectShowcaseItems.length}{" "}
          projects.
        </p>
      </section>

      <section className="space-y-3" aria-label="Architecture tag overview">
        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
          Architecture Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {globalArchitectureTags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5" aria-label="Project list">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onPreview={setPreviewProject}
          />
        ))}
      </section>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
        <h2 className="text-xl font-bold text-emerald-950 dark:text-emerald-100">
          Built independently
        </h2>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-emerald-900 dark:text-emerald-100">
          Designed, implemented, tested, and deployed independently across
          frontend, backend, cloud infrastructure, authentication, payments,
          realtime systems, admin tooling, and security-focused workflows.
        </p>
      </section>

      <section className="space-y-4" aria-label="Project timeline">
        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
          Timeline
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {projectTimeline.map((item) => (
            <article
              key={item.period}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <p className="text-sm font-extrabold text-sky-700 dark:text-sky-300">
                {item.period}
              </p>
              <h3 className="mt-2 text-lg font-bold text-gray-950 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <ScreenshotDialog project={previewProject} onClose={closePreview} />
    </main>
  );
}
