import { ArrowUpRight, Boxes, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";

import {
  architectureFootprint,
  projectShowcaseStats,
} from "@/features/projects/project-presentation";

export default function ProjectsHero() {
  return (
    <section
      aria-labelledby="projects-title"
      className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 px-5 py-8 shadow-sm backdrop-blur sm:px-8 sm:py-10 dark:border-slate-700/80 dark:bg-slate-900/75"
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-500/10"
      />

      <div className="relative grid items-start gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-sky-700 uppercase dark:border-sky-900 dark:bg-sky-950/60 dark:text-sky-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Independent product engineering
          </p>

          <h1
            id="projects-title"
            className="mt-5 max-w-3xl text-4xl leading-[1.05] font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white"
          >
            Project Showcase{" "}
            <span className="mt-1 block bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Systems, not just screens.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            A curated view of applications I designed and built across frontend,
            backend, cloud infrastructure, security, payments, and realtime
            systems. Every project includes source, architecture, and the
            engineering decisions behind it.
          </p>

          <a
            href="https://github.com/SergeHall"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 motion-reduce:transform-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-offset-slate-900 dark:hover:border-sky-700 dark:hover:bg-slate-800"
          >
            <SiGithub className="h-4 w-4" aria-hidden="true" />
            Explore my GitHub
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </a>
        </div>

        <aside
          aria-label="Project portfolio snapshot"
          className="rounded-2xl border border-slate-200/80 bg-slate-950/[0.03] p-4 dark:border-slate-700 dark:bg-slate-950/55"
        >
          <p className="flex items-center gap-2 text-xs font-black tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
            <Boxes className="h-4 w-4 text-sky-500" aria-hidden="true" />
            Portfolio snapshot
          </p>

          <dl className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            {projectShowcaseStats.map(({ value, label, description }) => (
              <div
                key={label}
                title={description}
                className="rounded-xl border border-slate-200 bg-white/75 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
              >
                <dd className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                  {value}
                </dd>
                <dt className="mt-1 text-xs leading-5 font-bold text-slate-500 dark:text-slate-400">
                  {label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
            <h2 className="text-xs font-black tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400">
              Architecture footprint
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {architectureFootprint.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-200"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
