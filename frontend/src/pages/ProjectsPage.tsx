import { useCallback, useMemo, useState } from "react";

import {
  type ProjectFilterOption,
  type ProjectFrameworkFilterOption,
  type ProjectLanguageFilterOption,
  type ProjectShowcaseItem,
} from "@/data/projectShowcase";
import ProjectCard from "@/features/projects/ProjectCard";
import ProjectFilters from "@/features/projects/ProjectFilters";
import ProjectScreenshotDialog from "@/features/projects/ProjectScreenshotDialog";
import ProjectsClosing from "@/features/projects/ProjectsClosing";
import ProjectsHero from "@/features/projects/ProjectsHero";
import {
  getAvailableLanguageFilters,
  getAvailableProjectFilters,
  getAvailableFrameworkFilters,
  orderedProjectShowcaseItems,
  projectMatchesFramework,
  projectMatchesLanguage,
  projectMatchesType,
} from "@/features/projects/project-presentation";
import { useCompactProjectsLayout } from "@/features/projects/useCompactProjectsLayout";

export default function ProjectsPage() {
  const isCompactLayout = useCompactProjectsLayout();
  const [activeType, setActiveType] = useState<ProjectFilterOption>("All");
  const [activeLanguage, setActiveLanguage] =
    useState<ProjectLanguageFilterOption>("All");
  const [activeFramework, setActiveFramework] =
    useState<ProjectFrameworkFilterOption>("All");
  const [previewProject, setPreviewProject] =
    useState<ProjectShowcaseItem | null>(null);
  const [expandedProjectIds, setExpandedProjectIds] = useState<
    ReadonlySet<string>
  >(() => new Set());

  const visibleProjects = useMemo(
    () =>
      orderedProjectShowcaseItems.filter(
        (project) =>
          projectMatchesType(project, activeType) &&
          projectMatchesLanguage(project, activeLanguage) &&
          projectMatchesFramework(project, activeFramework)
      ),
    [activeFramework, activeLanguage, activeType]
  );

  const availableTypes = useMemo(
    () => getAvailableProjectFilters(activeLanguage, activeFramework),
    [activeFramework, activeLanguage]
  );

  const availableLanguages = useMemo(
    () => getAvailableLanguageFilters(activeType, activeFramework),
    [activeFramework, activeType]
  );

  const availableFrameworks = useMemo(
    () => getAvailableFrameworkFilters(activeType, activeLanguage),
    [activeLanguage, activeType]
  );

  const closePreview = useCallback(() => {
    setPreviewProject(null);
  }, []);

  const resetFilters = useCallback(() => {
    setActiveType("All");
    setActiveLanguage("All");
    setActiveFramework("All");
  }, []);

  const toggleProjectDetails = useCallback((projectId: string) => {
    setExpandedProjectIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(projectId)) {
        nextIds.delete(projectId);
      } else {
        nextIds.add(projectId);
      }

      return nextIds;
    });
  }, []);

  return (
    <div className="relative min-h-full overflow-x-hidden px-2 pt-1 pb-3 sm:pt-2 sm:pb-4">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-5">
        <ProjectsHero />

        <ProjectFilters
          activeType={activeType}
          activeLanguage={activeLanguage}
          activeFramework={activeFramework}
          availableTypes={availableTypes}
          availableLanguages={availableLanguages}
          availableFrameworks={availableFrameworks}
          visibleCount={visibleProjects.length}
          totalCount={orderedProjectShowcaseItems.length}
          onTypeChange={setActiveType}
          onLanguageChange={setActiveLanguage}
          onFrameworkChange={setActiveFramework}
          onReset={resetFilters}
        />

        <section aria-labelledby="project-list-title">
          <div className="mb-5">
            <p className="text-xs font-black tracking-[0.14em] text-sky-700 uppercase dark:text-sky-300">
              Selected engineering work
            </p>
            <h2
              id="project-list-title"
              className="mt-1 text-2xl font-black text-slate-950 dark:text-white"
            >
              Platforms, products, and learning labs
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onPreview={setPreviewProject}
                isCompactLayout={isCompactLayout}
                isExpanded={expandedProjectIds.has(project.id)}
                onToggleDetails={toggleProjectDetails}
              />
            ))}
          </div>
        </section>

        <ProjectsClosing />
      </div>

      <ProjectScreenshotDialog
        project={previewProject}
        onClose={closePreview}
      />
    </div>
  );
}
