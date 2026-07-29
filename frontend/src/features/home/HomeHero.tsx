import { ArrowRight, GraduationCap } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";

import { homeStats } from "@/features/home/home-content";

export default function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 px-5 py-8 text-left shadow-sm backdrop-blur sm:px-8 sm:py-10 dark:border-slate-700/80 dark:bg-slate-900/75"
    >
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-500/10"
      />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-sky-700 uppercase dark:border-sky-900 dark:bg-sky-950/60 dark:text-sky-200">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            Santa Monica College · Academic Portfolio
          </p>

          <h1
            id="home-hero-title"
            className="max-w-3xl text-4xl leading-[1.08] font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white"
          >
            From SMC coursework to{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
              full-stack web engineering.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            I&apos;m Serge Hall. This platform documents my Web Development
            coursework and shows how I applied it across frontend, backend,
            databases, cloud infrastructure, networking, security, and AI.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/coursework"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:ring-offset-slate-900"
            >
              Explore coursework
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-offset-slate-900 dark:hover:border-sky-700 dark:hover:bg-slate-800"
            >
              View projects
            </Link>
            <a
              href="https://github.com/SergeHall"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:text-slate-300 dark:ring-offset-slate-900 dark:hover:text-sky-300"
            >
              <SiGithub className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        <aside
          aria-label="Academic portfolio snapshot"
          className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-inner dark:border-slate-700 dark:bg-slate-950/55"
        >
          <p className="text-xs font-bold tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
            Portfolio snapshot
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            {homeStats.map(({ value, label, description }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                title={description}
              >
                <dd className="text-2xl font-black text-slate-950 dark:text-white">
                  {value}
                </dd>
                <dt className="mt-1 text-xs leading-5 font-semibold text-slate-500 dark:text-slate-400">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
