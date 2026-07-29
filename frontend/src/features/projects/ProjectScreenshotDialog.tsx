import { useEffect } from "react";
import { X } from "lucide-react";

import type { ProjectShowcaseItem } from "@/data/projectShowcase";

type ProjectScreenshotDialogProps = {
  readonly project: ProjectShowcaseItem | null;
  readonly onClose: () => void;
};

export default function ProjectScreenshotDialog({
  project,
  onClose,
}: ProjectScreenshotDialogProps) {
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

  const screenshots = [
    {
      src: project.imageUrl,
      caption: `${project.title} overview`,
    },
    ...(project.galleryImages ?? []),
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshot preview`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
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
            type="button"
            onClick={onClose}
            aria-label="Close screenshot preview"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-700 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="max-h-[calc(92vh-4.5rem)] overflow-auto bg-slate-100 p-3 dark:bg-slate-950">
          <div className="mx-auto grid w-full max-w-[1200px] gap-3">
            {screenshots.map((screenshot, index) => (
              <figure
                key={screenshot.src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
              >
                <img
                  src={screenshot.src}
                  alt={
                    index === 0
                      ? `${project.title} enlarged website preview`
                      : `${project.title} additional website preview ${index + 1}`
                  }
                  width={1200}
                  height={900}
                  className="h-auto w-full object-contain"
                />
                {screenshots.length > 1 && (
                  <figcaption className="border-t border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {screenshot.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
