import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";

import PortfolioSnapshot from "@/features/home/PortfolioSnapshot";

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

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-sky-700 uppercase dark:border-sky-900 dark:bg-sky-950/60 dark:text-sky-200">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            Santa Monica College · Academic Portfolio
          </p>

          <h1
            id="home-hero-title"
            className="max-w-3xl text-3xl leading-[1.08] font-black tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] 2xl:text-5xl dark:text-white"
          >
            From SMC coursework to{" "}
            <span className="block bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
              <span className="whitespace-nowrap">full-stack</span> web
              engineering.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            I&apos;m Serge. This platform documents my Web Development
            coursework and shows how I applied it across frontend, backend,
            databases, cloud infrastructure, networking, security, and AI.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/coursework"
              className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-900/15 transition hover:-translate-y-0.5 hover:from-indigo-500 hover:via-sky-500 hover:to-cyan-400 hover:shadow-xl hover:shadow-sky-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 motion-reduce:transform-none dark:ring-offset-slate-900"
            >
              Explore coursework
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </Link>
            <Link
              to="/projects"
              className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 motion-reduce:transform-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-offset-slate-900 dark:hover:border-sky-700 dark:hover:bg-slate-800"
            >
              <BriefcaseBusiness
                className="h-4 w-4 text-sky-600 transition-transform group-hover:-rotate-3 dark:text-sky-300"
                aria-hidden="true"
              />
              View projects
            </Link>
            <a
              href="https://github.com/SergeHall"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-transparent bg-slate-100/70 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-sky-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 motion-reduce:transform-none dark:bg-slate-800/70 dark:text-slate-200 dark:ring-offset-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-sky-300"
            >
              <SiGithub className="h-4 w-4" aria-hidden="true" />
              GitHub
              <ArrowUpRight
                className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <PortfolioSnapshot />
      </div>
    </section>
  );
}
