// src/components/TagLegend.tsx

import { Tags } from "lucide-react";

import { tagIcons } from "./TagIcons";

export const TagLegend = () => {
  return (
    <section
      aria-labelledby="course-notation-title"
      className="w-full rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 shadow-sm sm:px-5 dark:border-slate-700/80 dark:bg-slate-900/45"
    >
      <div className="flex items-center gap-2">
        <Tags className="h-4 w-4 text-violet-500" aria-hidden="true" />
        <h2
          id="course-notation-title"
          className="text-sm font-black tracking-[0.12em] text-slate-700 uppercase dark:text-slate-200"
        >
          Course notation
        </h2>
      </div>

      <div className="mt-3 overflow-x-auto pb-1">
        <div className="flex min-w-max items-center gap-2">
          {tagIcons.map((item) => (
            <div
              key={item.label}
              className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/75 py-1 pr-3 pl-1 shadow-sm dark:border-slate-700 dark:bg-slate-950/55"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${item.bg}`}
              >
                {item.icon}
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
