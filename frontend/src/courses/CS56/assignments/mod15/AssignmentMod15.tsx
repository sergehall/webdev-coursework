import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDot,
  Code2,
  Database,
  ExternalLink,
  Film,
  Layers3,
  ListChecks,
  MonitorPlay,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

import {
  assignment15Links,
  assignmentRequirements,
  demoChapters,
  projectShowcases,
  rubricEvidence,
  submissionChecklist,
  type ProjectShowcase,
} from "./assignment15Data";

import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

const totalRubricPoints = rubricEvidence.reduce(
  (total, item) => total + item.points,
  0
);

type ExternalActionProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly tone?: "light" | "dark";
};

function ExternalAction({
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

function SectionHeading({
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

function ProjectCard({
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

function Hero() {
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

function DemoSection() {
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

function ArchitectureSection() {
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

function RubricSection() {
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

function AssignmentBrief() {
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

export function AssignmentMod15View() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-10 pb-4">
      <Hero />

      <section aria-labelledby="projects-title">
        <SectionHeading
          eyebrow="Completed work"
          title="Two Java projects, shown with clear roles."
          copy="The first repository is the direct JavaFX assignment solution. The second shows how the same Java foundation grew into a secure full-stack application."
        />
        <h2 id="projects-title" className="sr-only">
          Completed Java projects
        </h2>
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {projectShowcases.map((project, index) => (
            <ProjectCard
              key={project.repositoryUrl}
              project={project}
              index={index}
            />
          ))}
        </div>
      </section>

      <DemoSection />
      <ArchitectureSection />
      <RubricSection />
      <AssignmentBrief />

      <section className="rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white px-6 py-8 sm:px-10 dark:border-emerald-800 dark:from-emerald-950/50 dark:to-slate-900">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Sparkles aria-hidden="true" className="h-5 w-5" />
              <p className="text-xs font-bold tracking-[0.18em] uppercase">
                Project evidence complete
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white">
              Source, demonstration, and rubric alignment in one place.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Open either repository for the full README, setup instructions,
              project structure, and validation commands.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ExternalAction href={assignment15Links.javafxRepository}>
              <SiGithub aria-hidden="true" className="h-4 w-4" />
              JavaFX project
            </ExternalAction>
            <ExternalAction href={assignment15Links.javaStartRepository}>
              <Layers3 aria-hidden="true" className="h-4 w-4" />
              Java Start
            </ExternalAction>
          </div>
        </div>
      </section>

      <ModuleCompletionButton moduleId={15} />
    </section>
  );
}

export default function AssignmentMod15() {
  useFinalModuleRedirect(15);

  return <AssignmentMod15View />;
}
