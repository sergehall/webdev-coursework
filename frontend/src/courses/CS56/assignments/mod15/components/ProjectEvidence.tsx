import {
  ArrowRight,
  Check,
  CircleDot,
  Code2,
  Database,
  Film,
  ListChecks,
  Server,
} from "lucide-react";

import {
  assignment15Links,
  assignmentRequirements,
  demoChapters,
  rubricEvidence,
  submissionChecklist,
  totalRubricPoints,
} from "../assignment15Data";

import { SectionHeading } from "./ProjectShowcase";

export function DemoSection() {
  return (
    <section
      id="project-demo"
      aria-labelledby="project-demo-title"
      className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.55fr)] dark:border-slate-700 dark:bg-slate-900"
    >
      <div>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase dark:text-emerald-300">
              Recorded walkthrough · 6 min 09 sec
            </p>
            <h2
              id="project-demo-title"
              className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white"
            >
              Watch both interfaces share one workflow
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <CircleDot
              aria-hidden="true"
              className="h-3 w-3 fill-rose-500 text-rose-500"
            />
            Silent screen recording
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-lg dark:border-slate-700">
          <video
            controls
            playsInline
            preload="metadata"
            poster={assignment15Links.demoPoster}
            className="aspect-video w-full bg-black object-contain"
            aria-label="JavaFX Task List web and desktop application demonstration"
          >
            <source src={assignment15Links.demoVideo} type="video/mp4" />
            Your browser does not support embedded MP4 video.{" "}
            <a href={assignment15Links.demoVideo}>Open the recording</a>.
          </video>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>H.264 MP4 · 1440 × 1138</span>
          <a
            href={assignment15Links.demoPage}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-emerald-700 hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none dark:text-emerald-300"
          >
            Open full demo page ↗
          </a>
        </div>
      </div>

      <aside className="rounded-2xl bg-slate-950 p-5 text-white">
        <p className="text-xs font-bold tracking-[0.18em] text-emerald-300 uppercase">
          Demo chapters
        </p>
        <ol className="mt-5 space-y-1">
          {demoChapters.map((chapter, index) => (
            <li
              key={chapter.time}
              className="grid grid-cols-[3.25rem_1fr] gap-3 border-b border-white/10 py-4 last:border-0"
            >
              <span className="font-mono text-xs font-bold text-emerald-300">
                {chapter.time}
              </span>
              <div>
                <p className="text-sm font-bold">{chapter.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {chapter.detail}
                </p>
              </div>
              {index < demoChapters.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="col-start-1 mx-auto -mb-5 h-4 w-px bg-emerald-400/40"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}

export function ArchitectureSection() {
  const flow = [
    {
      label: "Clients",
      title: "JavaFX + Next.js",
      icon: <Code2 aria-hidden="true" className="h-5 w-5" />,
    },
    {
      label: "Application boundary",
      title: "Spring Boot REST API",
      icon: <Server aria-hidden="true" className="h-5 w-5" />,
    },
    {
      label: "Source of truth",
      title: "PostgreSQL",
      icon: <Database aria-hidden="true" className="h-5 w-5" />,
    },
  ] as const;

  return (
    <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white sm:px-10 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-emerald-300 uppercase">
            System boundary
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Separate clients.
            <br />
            One source of truth.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The desktop app never receives database credentials. Both interfaces
            send validated HTTP requests to the API, which alone owns
            persistence.
          </p>
        </div>

        <ol className="grid gap-3 md:grid-cols-3">
          {flow.map((item, index) => (
            <li key={item.label} className="relative">
              <div className="h-full rounded-2xl border border-white/10 bg-white/6 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-300 text-emerald-950">
                  {item.icon}
                </span>
                <p className="mt-5 text-[0.65rem] font-bold tracking-[0.16em] text-slate-400 uppercase">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-bold">{item.title}</p>
              </div>
              {index < flow.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute top-1/2 -right-4 z-10 hidden h-5 w-5 -translate-y-1/2 text-emerald-300 md:block"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function RubricSection() {
  return (
    <section aria-labelledby="rubric-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Rubric evidence"
          title="Every point has a visible implementation."
          copy="The evidence below maps the instructor’s criteria to the required JavaFX desktop module and the hosted screen recording."
        />
        <div className="rounded-2xl bg-emerald-100 px-5 py-4 text-center text-emerald-950 dark:bg-emerald-900/40 dark:text-emerald-100">
          <p className="text-3xl font-black">{totalRubricPoints}</p>
          <p className="text-xs font-bold tracking-[0.14em] uppercase">
            total points
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="hidden grid-cols-[minmax(11rem,0.7fr)_5rem_minmax(18rem,1.3fr)_minmax(9rem,0.55fr)] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-bold tracking-[0.14em] text-slate-500 uppercase md:grid dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <span>Criterion</span>
          <span>Points</span>
          <span>Implementation evidence</span>
          <span>Source</span>
        </div>
        <div>
          {rubricEvidence.map((item) => (
            <article
              key={item.criterion}
              className="grid gap-3 border-b border-slate-100 px-5 py-5 last:border-0 md:grid-cols-[minmax(11rem,0.7fr)_5rem_minmax(18rem,1.3fr)_minmax(9rem,0.55fr)] md:items-start md:gap-4 md:px-6 dark:border-slate-800"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {item.criterion}
              </h3>
              <span className="w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                {item.points} {item.points === 1 ? "pt" : "pts"}
              </span>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.evidence}
              </p>
              <code className="w-fit rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {item.source}
              </code>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AssignmentBrief() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            <ListChecks aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-amber-700 uppercase dark:text-amber-300">
              Assignment brief
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
              Required JavaFX workflow
            </h2>
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Build a group To-Do List application where users can add, complete,
          and remove tasks while the interface updates immediately.
        </p>
        <ul className="mt-5 space-y-3">
          {assignmentRequirements.map((requirement) => (
            <li
              key={requirement}
              className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200"
            >
              <Check
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              />
              {requirement}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white sm:p-8 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-300 text-emerald-950">
            <Film aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-emerald-300 uppercase">
              Submission
            </p>
            <h2 className="mt-1 text-xl font-black">
              Recording and project ZIP
            </h2>
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">
          The recording must prove the source code and the running UI—not only
          show a static screen.
        </p>
        <ol className="mt-5 space-y-4">
          {submissionChecklist.map((item, index) => (
            <li key={item} className="flex items-start gap-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-emerald-300/40 bg-emerald-300/10 text-xs font-black text-emerald-300">
                {index + 1}
              </span>
              <span className="text-sm leading-6 text-slate-200">{item}</span>
            </li>
          ))}
        </ol>
      </article>
    </section>
  );
}
