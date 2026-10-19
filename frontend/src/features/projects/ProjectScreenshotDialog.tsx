import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { ProjectShowcaseItem } from "@/features/projects/data/projectShowcase";
import { useProjectDialogFocus } from "@/features/projects/useProjectDialogFocus";

type ProjectScreenshotDialogProps = {
  readonly project: ProjectShowcaseItem | null;
  readonly onClose: () => void;
};

export default function ProjectScreenshotDialog({
  project,
  onClose,
}: ProjectScreenshotDialogProps) {
  if (!project) {
    return null;
  }

  return (
    <ProjectScreenshotContent
      key={project.id}
      project={project}
      onClose={onClose}
    />
  );
}

function ProjectScreenshotContent({
  project,
  onClose,
}: {
  readonly project: ProjectShowcaseItem;
  readonly onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useProjectDialogFocus({
    isOpen: true,
    onClose,
    dialogRef,
    initialFocusRef: closeButtonRef,
  });

  const screenshots = [
    {
      src: project.imageUrl,
      caption: `${project.title} overview`,
    },
    ...(project.galleryImages ?? []),
  ];
  const hasMultipleScreenshots = screenshots.length > 1;
  const activeScreenshot = screenshots[activeIndex];
  const showPrevious = () =>
    setActiveIndex(
      (index) => (index - 1 + screenshots.length) % screenshots.length
    );
  const showNext = () =>
    setActiveIndex((index) => (index + 1) % screenshots.length);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshot preview`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onKeyDown={(event) => {
        if (!hasMultipleScreenshots) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-slate-950 dark:text-white">
              {project.title}
            </p>
            <p className="truncate text-xs text-slate-600 dark:text-slate-300">
              {project.previewDescription}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close screenshot preview"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-700 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="max-h-[calc(92vh-4.5rem)] overflow-auto bg-slate-100 p-3 dark:bg-slate-950">
          <figure className="mx-auto max-w-[1200px] overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <img
              src={activeScreenshot.src}
              alt={
                activeIndex === 0
                  ? `${project.title} enlarged website preview`
                  : `${project.title} additional website preview ${activeIndex + 1}`
              }
              width={1200}
              height={900}
              className="mx-auto h-auto max-h-[calc(92vh-12rem)] w-full object-contain"
            />
            {hasMultipleScreenshots && (
              <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <span>{activeScreenshot.caption}</span>
                <span aria-live="polite">
                  {activeIndex + 1} of {screenshots.length}
                </span>
              </figcaption>
            )}
          </figure>
          {hasMultipleScreenshots && (
            <div className="mx-auto mt-3 flex max-w-[1200px] items-center justify-center gap-3">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous screenshot"
                className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next screenshot"
                className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
