import { useId, useState } from "react";
import { Compass, Minus, Plus } from "lucide-react";

import { programSections } from "@/constants/programSections";

const PathwaySections = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionId = useId();

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      aria-labelledby={`${sectionId}-title`}
      className="rounded-3xl border border-slate-200/80 bg-white/60 p-4 shadow-sm sm:p-5 dark:border-slate-700/80 dark:bg-slate-900/45"
    >
      <div className="mb-3 flex items-center gap-3 px-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-sm">
          <Compass className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-black tracking-[0.15em] text-cyan-700 uppercase dark:text-cyan-300">
            Program overview
          </p>
          <h2
            id={`${sectionId}-title`}
            className="text-lg font-black text-slate-950 dark:text-white"
          >
            Understand the pathway
          </h2>
        </div>
      </div>

      <div className="space-y-2">
        {programSections.map((section, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `${sectionId}-trigger-${idx}`;
          const panelId = `${sectionId}-panel-${idx}`;

          return (
            <section
              key={section.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white/75 transition hover:border-cyan-300 dark:border-slate-700 dark:bg-slate-950/40 dark:hover:border-cyan-800"
            >
              <button
                id={buttonId}
                type="button"
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggle(idx)}
                className="group flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left text-base font-bold text-slate-800 transition hover:bg-cyan-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-inset sm:text-lg dark:text-white dark:hover:bg-cyan-950/20"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white shadow-sm transition ${
                    isOpen
                      ? "bg-gradient-to-br from-violet-500 to-cyan-500"
                      : "bg-slate-800 group-hover:bg-cyan-700 dark:bg-slate-700"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                {section.title}
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="border-t border-slate-200 px-4 py-4 text-sm leading-6 text-slate-700 sm:px-5 dark:border-slate-800 dark:text-slate-300"
                >
                  {section.content}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default PathwaySections;
