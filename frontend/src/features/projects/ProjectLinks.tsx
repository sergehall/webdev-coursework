import { useCallback, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CirclePlay,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

import type { ProjectShowcaseItem } from "@/data/projectShowcase";
import ProjectResourceDialog from "@/features/projects/ProjectResourceDialog";
import {
  publicProjectArchitectureById,
  publicProjectDocsById,
  type PublicProjectResource,
} from "@/features/projects/project-public-resources";

const secondaryActionStyles =
  "group inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 motion-reduce:transform-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:ring-offset-slate-900 dark:hover:border-sky-700 dark:hover:bg-slate-800 dark:hover:text-sky-300";

type ProjectLinkProps = {
  readonly href: string;
  readonly label: string;
  readonly icon: ReactNode;
  readonly primary?: boolean;
};

function ProjectLink({ href, label, icon, primary = false }: ProjectLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? "group inline-flex min-h-10 items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 motion-reduce:transform-none dark:ring-offset-slate-900"
          : secondaryActionStyles
      }
    >
      {icon}
      {label}
      {primary && (
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
          aria-hidden="true"
        />
      )}
    </a>
  );
}

export default function ProjectLinks({
  project,
}: {
  readonly project: ProjectShowcaseItem;
}) {
  const publicDocumentation = publicProjectDocsById[project.id];
  const publicArchitecture = publicProjectArchitectureById[project.id];
  const [activeResource, setActiveResource] =
    useState<PublicProjectResource | null>(null);
  const closeResource = useCallback(() => {
    setActiveResource(null);
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        {project.liveUrl && (
          <ProjectLink
            href={project.liveUrl}
            label="Live site"
            icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
            primary
          />
        )}
        {project.sourceUrl && (
          <ProjectLink
            href={project.sourceUrl}
            label="Source"
            icon={<SiGithub className="h-4 w-4" aria-hidden="true" />}
          />
        )}
        {publicDocumentation ? (
          <button
            type="button"
            onClick={() => setActiveResource(publicDocumentation)}
            className={secondaryActionStyles}
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Docs
          </button>
        ) : (
          project.docsUrl && (
            <ProjectLink
              href={project.docsUrl}
              label="Docs"
              icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
            />
          )
        )}
        {publicArchitecture ? (
          <button
            type="button"
            onClick={() => setActiveResource(publicArchitecture)}
            className={secondaryActionStyles}
          >
            <GitBranch className="h-4 w-4" aria-hidden="true" />
            Architecture
          </button>
        ) : (
          project.architectureUrl && (
            <ProjectLink
              href={project.architectureUrl}
              label="Architecture"
              icon={<GitBranch className="h-4 w-4" aria-hidden="true" />}
            />
          )
        )}
        {project.videoUrl && (
          <ProjectLink
            href={project.videoUrl}
            label="Video demo"
            icon={<CirclePlay className="h-4 w-4" aria-hidden="true" />}
          />
        )}
      </div>
      {(publicDocumentation || publicArchitecture) && (
        <ProjectResourceDialog
          resource={activeResource}
          onClose={closeResource}
        />
      )}
    </>
  );
}
