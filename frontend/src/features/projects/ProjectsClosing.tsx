import { CheckCircle2 } from "lucide-react";

import { projectTimeline } from "@/features/projects/project-presentation";

export default function ProjectsClosing() {
  return (
    <>
      <section className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-12 h-40 w-40 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/10"
        />
        <div className="relative flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-300"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-xl font-black text-emerald-950 dark:text-emerald-100">
              Built independently
            </h2>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-emerald-900 dark:text-emerald-100">
              Designed, implemented, tested, and deployed independently across
              frontend, backend, cloud infrastructure, authentication, payments,
              realtime systems, admin tooling, and security-focused workflows.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="project-timeline-title">
        <p className="text-xs font-black tracking-[0.14em] text-sky-700 uppercase dark:text-sky-300">
          Engineering progression
        </p>
        <h2
          id="project-timeline-title"
          className="mt-1 text-2xl font-black text-slate-950 dark:text-white"
        >
          From coursework to independent systems
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {projectTimeline.map((item, index) => (
            <article
              key={item.period}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400"
              />
              <p className="text-sm font-black text-sky-700 dark:text-sky-300">
                {String(index + 1).padStart(2, "0")} · {item.period}
              </p>
              <h3 className="mt-2 text-lg font-black text-slate-950 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
