import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  Film,
  MonitorPlay,
  ShieldCheck,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

import {
  assignment15Links,
  totalRubricPoints,
  type ProjectShowcase,
} from "../assignment15Data";

type ExternalActionProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly tone?: "light" | "dark";
};

export function ExternalAction({
  href,
  children,
  tone = "light",
}: ExternalActionProps) {
  const toneClasses =
    tone === "dark"
      ? "border-white/15 bg-white/10 text-white hover:border-emerald-300/50 hover:bg-white/15"
      : "border-slate-200 bg-white text-slate-900 hover:border-emerald-400 hover:text-emerald-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-emerald-500";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:outline-none ${toneClasses}`}
    >
      {children}
      <ExternalLink aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  readonly eyebrow: string;
  readonly title: string;
  readonly copy: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold tracking-[0.22em] text-emerald-700 uppercase dark:text-emerald-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
        {copy}
      </p>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  readonly project: ProjectShowcase;
  readonly index: number;
}) {
  const isPrimary = index === 0;

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
        isPrimary
          ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/30"
          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute top-0 right-0 h-28 w-28 rounded-bl-[5rem] ${
          isPrimary
            ? "bg-emerald-200/45 dark:bg-emerald-700/15"
            : "bg-amber-100 dark:bg-amber-500/10"
        }`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className={`text-xs font-bold tracking-[0.18em] uppercase ${
                isPrimary
                  ? "text-emerald-800 dark:text-emerald-300"
                  : "text-amber-700 dark:text-amber-300"
              }`}
            >
              0{index + 1} · {project.label}
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              {project.title}
            </h3>
          </div>
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
              isPrimary
                ? "bg-emerald-900 text-emerald-100 dark:bg-emerald-300 dark:text-emerald-950"
                : "bg-slate-900 text-white dark:bg-amber-300 dark:text-slate-950"
            }`}
          >
            {isPrimary ? (
              <MonitorPlay aria-hidden="true" className="h-5 w-5" />
            ) : (
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            )}
          </span>
        </div>

        <p className="mt-5 text-lg font-semibold text-slate-800 dark:text-slate-100">
          {project.summary}
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        <ul
          className="mt-6 space-y-3"
          aria-label={`${project.title} highlights`}
        >
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200"
            >
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Technology stack"
        >
          {project.stack.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-slate-200 bg-white/75 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
            >
              {technology}
            </span>
          ))}
        </div>

        <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {project.note}
        </p>

        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-4 transition hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none dark:text-emerald-300"
        >
          <SiGithub aria-hidden="true" className="h-4 w-4" />
          {project.repositoryLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden rounded-[2rem] bg-[#082d24] px-6 py-8 text-white shadow-2xl sm:px-10 sm:py-12 lg:px-14 lg:py-16">
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full border border-emerald-300/20"
      />
      <div
        aria-hidden="true"
        className="absolute top-10 -right-14 h-48 w-48 rounded-full bg-emerald-300/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute right-[28%] -bottom-36 h-64 w-64 rounded-full bg-amber-200/10 blur-3xl"
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-[0.18em] text-emerald-200 uppercase">
            <span>CS 56</span>
            <CircleDot aria-hidden="true" className="h-3 w-3" />
            <span>Group project</span>
            <CircleDot aria-hidden="true" className="h-3 w-3" />
            <span>{totalRubricPoints} points</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl leading-[0.98] font-black tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
            JavaFX + <span className="text-emerald-300">Event Handling</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-emerald-50/80 sm:text-lg">
            Two completed Java projects document the path from an interactive
            desktop task list to secure, production-minded full-stack Java
            development.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalAction href={assignment15Links.demoPage} tone="dark">
              <Film aria-hidden="true" className="h-4 w-4" />
              Watch project demo
            </ExternalAction>
            <ExternalAction
              href={assignment15Links.javafxRepository}
              tone="dark"
            >
              <SiGithub aria-hidden="true" className="h-4 w-4" />
              View primary repository
            </ExternalAction>
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-white/15 bg-white/8 p-6 backdrop-blur-sm">
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-200 uppercase">
            Assignment focus
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-5">
            <div>
              <dt className="text-3xl font-black">02</dt>
              <dd className="mt-1 text-xs leading-5 text-emerald-50/65">
                Java repositories
              </dd>
            </div>
            <div>
              <dt className="text-3xl font-black">06:09</dt>
              <dd className="mt-1 text-xs leading-5 text-emerald-50/65">
                Recorded demo
              </dd>
            </div>
            <div>
              <dt className="text-3xl font-black">11</dt>
              <dd className="mt-1 text-xs leading-5 text-emerald-50/65">
                Code rubric areas
              </dd>
            </div>
            <div>
              <dt className="text-3xl font-black">100%</dt>
              <dd className="mt-1 text-xs leading-5 text-emerald-50/65">
                Core task workflow
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </header>
  );
}
