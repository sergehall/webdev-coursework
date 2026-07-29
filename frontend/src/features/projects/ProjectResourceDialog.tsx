import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import {
  BookOpen,
  CheckCircle2,
  GitBranch,
  LockKeyhole,
  X,
} from "lucide-react";

import type { PublicProjectResource } from "@/features/projects/project-public-resources";
import { useProjectDialogFocus } from "@/features/projects/useProjectDialogFocus";

type ProjectResourceDialogProps = {
  readonly resource: PublicProjectResource | null;
  readonly onClose: () => void;
};

export default function ProjectResourceDialog({
  resource,
  onClose,
}: ProjectResourceDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useProjectDialogFocus({
    isOpen: resource !== null,
    onClose,
    dialogRef,
    initialFocusRef: closeButtonRef,
  });

  if (!resource) {
    return null;
  }

  const ResourceIcon = resource.kind === "architecture" ? GitBranch : BookOpen;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <article className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl dark:bg-slate-900">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <div>
            <p className="flex items-center gap-2 text-xs font-black tracking-[0.14em] text-sky-700 uppercase dark:text-sky-300">
              <ResourceIcon className="h-4 w-4" aria-hidden="true" />
              {resource.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white"
            >
              {resource.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {resource.introduction}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={`Close ${resource.kind} overview`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-700 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="overflow-y-auto bg-slate-50 p-4 sm:p-5 dark:bg-slate-950">
          <div className="grid gap-3 md:grid-cols-2">
            {resource.sections.map((section, index) => (
              <section
                key={section.title}
                className={
                  index === resource.sections.length - 1
                    ? "rounded-xl border border-slate-200 bg-white p-4 md:col-span-2 dark:border-slate-700 dark:bg-slate-900"
                    : "rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                }
              >
                <h3 className="text-base font-black text-slate-950 dark:text-white">
                  {section.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {section.summary}
                </p>
                <ul className="mt-3 space-y-2">
                  {section.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-sm leading-5 text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-200">
            <LockKeyhole
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            This portfolio view intentionally excludes source code, credentials,
            infrastructure identifiers, private endpoints, and operational
            procedures.
          </p>
        </div>
      </article>
    </div>,
    document.body
  );
}
