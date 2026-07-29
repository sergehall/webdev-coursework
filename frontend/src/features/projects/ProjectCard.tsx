import {
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Layers3,
  PencilLine,
} from "lucide-react";

import type { ProjectShowcaseItem } from "@/data/projectShowcase";
import ProjectLinks from "@/features/projects/ProjectLinks";
import {
  projectStatusLabels,
  projectStatusStyles,
} from "@/features/projects/project-presentation";
import { cn } from "@/utils/cn";

export type ProjectCardProps = {
  readonly project: ProjectShowcaseItem;
  readonly index: number;
  readonly onPreview: (project: ProjectShowcaseItem) => void;
  readonly isCompactLayout: boolean;
  readonly isExpanded: boolean;
  readonly onToggleDetails: (projectId: string) => void;
};

function ProjectPreview({
  project,
  index,
  onPreview,
}: Pick<ProjectCardProps, "project" | "index" | "onPreview">) {
  const displayNumber = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={() => onPreview(project)}
      aria-label={`Preview ${project.title} screenshot`}
      className="group relative aspect-[16/10] w-full overflow-hidden bg-slate-950 text-left text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset"
    >
      <img
        src={project.imageUrl}
        alt={`${project.title} website preview`}
        width={800}
        height={500}
        loading={index === 0 ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-slate-950/45" />

      <span className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
        <span className="flex items-center justify-between gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-slate-950/45 text-sm font-black shadow-sm backdrop-blur">
            {displayNumber}
          </span>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur",
              projectStatusStyles[project.status]
            )}
          >
            {projectStatusLabels[project.status]}
          </span>
        </span>

        <span>
          <span className="block text-xs font-black tracking-[0.12em] text-sky-200 uppercase">
            {project.previewLabel}
          </span>
          <span className="mt-2 hidden max-w-md text-sm leading-6 text-slate-100 sm:block">
            {project.previewDescription}
          </span>
          <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-white/85">
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            Open preview
          </span>
        </span>
      </span>
    </button>
  );
}

function ProjectIntro({ project }: { readonly project: ProjectShowcaseItem }) {
  return (
    <div>
      <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
        <Layers3 className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
        {project.category}
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white">
        {project.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 dark:text-slate-300">
        {project.summary}
      </p>
    </div>
  );
}

function ProjectArchitecture({
  project,
}: {
  readonly project: ProjectShowcaseItem;
}) {
  return (
    <section aria-label={`${project.title} architecture tags`}>
      <h3 className="text-sm font-black text-slate-900 dark:text-white">
        Architecture
      </h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.architectureTags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-800 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-200"
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectContributions({
  project,
}: {
  readonly project: ProjectShowcaseItem;
}) {
  return (
    <section aria-label={`${project.title} build contributions`}>
      <h3 className="text-sm font-black text-slate-900 dark:text-white">
        What I Built
      </h3>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {project.contributions.map(({ area, detail }) => (
          <article
            key={`${project.id}-${area}`}
            className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/60"
          >
            <p className="text-xs font-black tracking-wide text-sky-700 uppercase dark:text-sky-300">
              {area}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
              {detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectNotes({ project }: { readonly project: ProjectShowcaseItem }) {
  return (
    <section
      aria-label={`${project.title} highlights`}
      className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/60"
    >
      <h3 className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
        <PencilLine className="h-4 w-4 text-sky-600" aria-hidden="true" />
        Engineering notes
      </h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectStack({ project }: { readonly project: ProjectShowcaseItem }) {
  return (
    <section aria-label={`${project.title} featured stack`}>
      <h3 className="text-sm font-black text-slate-950 dark:text-white">
        Core Stack
      </h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectDetails({
  project,
}: {
  readonly project: ProjectShowcaseItem;
}) {
  return (
    <div className="space-y-5 border-t border-slate-200 pt-5 dark:border-slate-700">
      <section aria-label={`${project.title} quick project facts`}>
        <h3 className="text-sm font-black text-slate-950 dark:text-white">
          Project At A Glance
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.filters.map((filter) => (
            <span
              key={filter}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {filter}
            </span>
          ))}
        </div>
      </section>
      <ProjectStack project={project} />
      <ProjectArchitecture project={project} />
      <ProjectContributions project={project} />
      <ProjectNotes project={project} />
      <ProjectLinks project={project} />
    </div>
  );
}

function DesktopProjectCard({
  project,
  index,
  onPreview,
}: Pick<ProjectCardProps, "project" | "index" | "onPreview">) {
  const isReversed = index % 2 === 1;

  return (
    <article className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-xl motion-reduce:transform-none lg:grid-cols-[minmax(20rem,0.92fr)_minmax(0,1.08fr)] dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-sky-800">
      <div
        className={cn(
          "flex flex-col bg-slate-50/80 dark:bg-slate-950/35",
          isReversed
            ? "lg:order-2 lg:border-l lg:border-slate-200 dark:lg:border-slate-700"
            : "lg:border-r lg:border-slate-200 dark:lg:border-slate-700"
        )}
      >
        <ProjectPreview project={project} index={index} onPreview={onPreview} />
        <div className="flex flex-1 flex-col justify-between gap-5 p-5">
          <div className="space-y-5">
            <ProjectStack project={project} />
            <ProjectArchitecture project={project} />
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col gap-5 p-5 sm:p-6",
          isReversed && "lg:order-1"
        )}
      >
        <ProjectIntro project={project} />
        <ProjectContributions project={project} />
        <ProjectNotes project={project} />
      </div>
    </article>
  );
}

function CompactProjectCard({
  project,
  index,
  onPreview,
  isExpanded,
  onToggleDetails,
}: Omit<ProjectCardProps, "isCompactLayout">) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
      <ProjectPreview project={project} index={index} onPreview={onPreview} />
      <div className="p-4">
        <ProjectIntro project={project} />
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={`${project.id}-mobile-details`}
          onClick={() => onToggleDetails(project.id)}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-sky-700 dark:hover:bg-slate-900"
        >
          Details
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
        {isExpanded && (
          <div id={`${project.id}-mobile-details`}>
            <ProjectDetails project={project} />
          </div>
        )}
      </div>
    </article>
  );
}

export default function ProjectCard(props: ProjectCardProps) {
  return props.isCompactLayout ? (
    <CompactProjectCard {...props} />
  ) : (
    <DesktopProjectCard {...props} />
  );
}
