import { BadgeCheck, GraduationCap, Route } from "lucide-react";

import WebDevMajorRequirements from "@/components/WebDevMajorRequirements";
import PathwaySections from "@/components/PathwaySections";
import { TagLegend } from "@/components/tags";

const WebDeveloperPathPage = () => {
  return (
    <div className="relative min-h-full overflow-x-hidden px-2 pt-1 pb-3 sm:pt-2 sm:pb-4">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-4">
        <section
          aria-labelledby="pathway-title"
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 px-5 py-7 shadow-sm backdrop-blur sm:px-8 sm:py-8 dark:border-slate-700/80 dark:bg-slate-900/75"
        >
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-500/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10"
          />

          <div className="relative max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-cyan-800 uppercase dark:border-cyan-900 dark:bg-cyan-950/60 dark:text-cyan-200">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Santa Monica College pathway
            </p>

            <h1
              id="pathway-title"
              className="mt-4 text-3xl leading-tight font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white"
            >
              Web Developer{" "}
              <span className="bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                AS Degree & Certificate
              </span>
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              A structured view of the program, learning outcomes, major
              requirements, and flexible specialization options.
            </p>

            <div
              aria-label="Pathway highlights"
              className="mt-5 flex flex-wrap gap-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200">
                <BadgeCheck
                  className="h-4 w-4 text-violet-500"
                  aria-hidden="true"
                />
                Degree and certificate options
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200">
                <Route className="h-4 w-4 text-cyan-500" aria-hidden="true" />
                Flexible course pathways
              </span>
            </div>
          </div>
        </section>

        <PathwaySections />
        <TagLegend />
        <WebDevMajorRequirements />
      </div>
    </div>
  );
};

export default WebDeveloperPathPage;
