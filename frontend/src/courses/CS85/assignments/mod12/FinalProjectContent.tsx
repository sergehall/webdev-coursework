import { useState, type ReactNode } from "react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDot,
  ClipboardPenLine,
  Code2,
  Download,
  FileText,
  GraduationCap,
  MessageCircle,
  Newspaper,
  ShieldCheck,
  Tags,
} from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const finalProjectItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Final Project: AI Powered Web Application",
  dueLabel: "Aug 2",
  pointsLabel: "100 pts",
};

const finalReportPdfUrl =
  "/code-playground/CS85/mod-12/final-project/CS85_Siarhei_Hancharo_Final_Project_AI_Powered_Web_Application.pdf";

const finalReportPdfFiles = [
  {
    fileUrl: finalReportPdfUrl,
    filename:
      "CS85_Siarhei_Hancharo_Final_Project_AI_Powered_Web_Application.pdf",
  },
];

const finalProjectLinks = {
  repository: "https://github.com/sergehall/cs85-php-programming",
  demoPage: "https://sergehall.github.io/cs85-php-programming/",
  demoVideo:
    "https://sergehall.github.io/cs85-php-programming/assets/cs85-ai-powered-application-demo.mp4",
  demoPoster:
    "https://sergehall.github.io/cs85-php-programming/assets/cs85-ai-powered-application-demo-poster.jpg",
} as const;

const demoChapters = [
  {
    time: "00:00",
    title: "Local environment",
    detail: "Laravel, services, and project startup",
  },
  {
    time: "00:48",
    title: "Project overview",
    detail: "Stack, roadmap, and application foundation",
  },
  {
    time: "01:36",
    title: "Coursework",
    detail: "PHP, OOP, MVC, database, and Laravel work",
  },
  {
    time: "03:12",
    title: "Module 12A",
    detail: "Verified OpenAI content generation",
  },
  {
    time: "04:00",
    title: "Secure cabinet",
    detail: "Authenticated student workspace",
  },
  {
    time: "04:48",
    title: "AI providers",
    detail: "Local runtime and online connection",
  },
  {
    time: "05:36",
    title: "AI conversations",
    detail: "Specialists, streaming, and history",
  },
  {
    time: "07:12",
    title: "Administration",
    detail: "Protected operations dashboard",
  },
] as const;

const requirements = [
  "Use Laravel.",
  "Use MySQL as the application database.",
  "Incorporate form validation and error handling.",
  "Include at least one meaningful AI feature using the OpenAI API.",
  "Submit the project through GitHub with a complete README.md file.",
];

const aiIdeas = [
  {
    icon: Newspaper,
    title: "AI Blog Assistant",
    description:
      "Users enter a title and receive an AI-generated blog post draft.",
  },
  {
    icon: GraduationCap,
    title: "AI Study Guide",
    description:
      "Generate summaries or quiz questions from user-submitted notes.",
  },
  {
    icon: BriefcaseBusiness,
    title: "AI Career Coach",
    description:
      "Provide feedback on or rewrite résumés and cover letters submitted by users.",
  },
  {
    icon: MessageCircle,
    title: "AI Chat Companion",
    description:
      "Build a simple chat interface where users ask questions and receive AI responses.",
  },
  {
    icon: Tags,
    title: "AI Content Classifier",
    description:
      "Classify user-submitted text by tone, emotion, intent, or another useful category.",
  },
  {
    icon: Code2,
    title: "AI Coding Assistant",
    description:
      "Return code snippets or explanations for programming questions and prompts.",
  },
];

const submissionRequirements = [
  "Host the project in a GitHub repository.",
  "Include the project description, features, setup steps, and screenshots in README.md.",
  "Record a 3–5 minute demonstration of the application and its AI feature.",
  "Submit the GitHub repository URL to Canvas.",
];

const deliveredCapabilities = [
  "Hybrid inference through three private LM Studio specialists and OpenAI GPT-4o mini.",
  "Persistent, user-owned multi-turn conversations stored by Laravel.",
  "Same-origin Server-Sent Events for incremental responses and safe retries.",
  "Live provider health checks with non-sensitive latency information.",
  "Validated model routing, sanitized Markdown, rate limits, CSRF, and server-only credentials.",
  "Deterministic feature, unit, and Node tests using fake provider boundaries.",
];

export default function FinalProjectContent() {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="space-y-5">
      <ModuleItemBlock item={finalProjectItem} />

      <section className="overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 text-white shadow-sm dark:border-cyan-900/60">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-200 uppercase ring-1 ring-cyan-300/30">
            Final Project
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-100 ring-1 ring-white/15">
            Laravel + MySQL + OpenAI
          </span>
        </div>
        <h4 className="mt-5 text-2xl font-bold sm:text-3xl">
          AI Powered Web Application
        </h4>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-200">
          Build a full-stack Laravel and MySQL application of your choice with
          at least one meaningful OpenAI API integration. Choose a topic that
          supports your interests and career goals while demonstrating modern
          PHP development through something creative, useful, and complete.
        </p>
      </section>

      <ContentCard
        title="Project Requirements"
        className="border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100"
      >
        <ul className="mt-4 space-y-3">
          {requirements.map((requirement) => (
            <ChecklistItem key={requirement}>{requirement}</ChecklistItem>
          ))}
        </ul>
      </ContentCard>

      <ContentCard
        title="AI Ideas — Choose One or Invent Your Own"
        className="border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-100"
      >
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {aiIdeas.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-xl border border-sky-200 bg-white/80 p-4 dark:border-sky-800 dark:bg-slate-950/35"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-900/60 dark:text-sky-200">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h5 className="font-semibold">{title}</h5>
              </div>
              <p className="mt-3 text-sm leading-7">{description}</p>
            </article>
          ))}
        </div>
      </ContentCard>

      <ContentCard
        title="Submission Requirements"
        className="border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100"
      >
        <ol className="mt-4 space-y-3">
          {submissionRequirements.map((requirement, index) => (
            <li key={requirement} className="flex gap-3 text-sm leading-7">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-950 dark:bg-amber-800 dark:text-amber-50">
                {index + 1}
              </span>
              <span>{requirement}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-lg border border-amber-300 bg-white/70 p-3 text-sm leading-7 dark:border-amber-800 dark:bg-slate-950/30">
          Recording tools: Windows Snipping Tool or the macOS-compatible{" "}
          <a
            href="https://www.screencapture.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            Screen Capture
          </a>{" "}
          service.
        </p>
      </ContentCard>

      <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900/60 dark:bg-indigo-950/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-indigo-700 uppercase dark:text-indigo-300">
              Completed Final Project
            </p>
            <h4 className="mt-2 text-xl font-bold text-indigo-950 dark:text-white">
              Hybrid AI Study Studio
            </h4>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-indigo-950 dark:text-indigo-100">
              A production-style, authenticated Laravel 13 workspace that routes
              each conversation to one of three private local models or the
              OpenAI GPT-4o mini online model.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            Secure server-side routing
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {deliveredCapabilities.map((capability) => (
            <div
              key={capability}
              className="flex gap-3 rounded-xl border border-indigo-200 bg-white/80 p-4 text-sm leading-7 text-indigo-950 dark:border-indigo-800 dark:bg-slate-950/35 dark:text-indigo-100"
            >
              <CheckCircle2
                aria-hidden="true"
                className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
              />
              <span>{capability}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ProjectLink
            icon={<Code2 aria-hidden="true" className="h-5 w-5" />}
            href={finalProjectLinks.repository}
            label="sergehall/cs85-php-programming"
          />
          <ProjectLink
            icon={<BookOpenCheck aria-hidden="true" className="h-5 w-5" />}
            href="https://online.smc.edu/courses/83209/files/22217317?wrap=1"
            label="Module 12 reading"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isReportOpen}
            label={isReportOpen ? "Close final report" : "View final report"}
            toggle={() => setIsReportOpen((previous) => !previous)}
          />
          <a
            href={finalReportPdfUrl}
            download="CS85_Siarhei_Hancharo_Final_Project_AI_Powered_Web_Application.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-300 bg-white px-4 py-2 text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-indigo-800 dark:bg-slate-950/40 dark:text-indigo-100 dark:hover:bg-slate-950/70"
          >
            <FileText aria-hidden="true" className="h-4 w-4" />
            Download final report
          </a>
        </div>
      </section>

      <ProjectDemo />

      <ShowModalButton
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        files={finalReportPdfFiles}
      />
    </div>
  );
}

function ProjectDemo() {
  return (
    <section
      aria-labelledby="cs85-project-demo-title"
      className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.55fr)] dark:border-slate-700 dark:bg-slate-900"
    >
      <div>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-cyan-700 uppercase dark:text-cyan-300">
              Recorded walkthrough · 7 min 53 sec
            </p>
            <h4
              id="cs85-project-demo-title"
              className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white"
            >
              See the complete application in action
            </h4>
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
            poster={finalProjectLinks.demoPoster}
            className="aspect-video w-full bg-black object-contain"
            aria-label="CS85 Laravel coursework and AI final project demonstration"
          >
            <source src={finalProjectLinks.demoVideo} type="video/mp4" />
            Your browser does not support embedded MP4 video.{" "}
            <a href={finalProjectLinks.demoVideo}>Download the demo</a>.
          </video>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>H.264 MP4 · 1440 × 1130 · 7:53</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a
              href={finalProjectLinks.demoVideo}
              download
              className="inline-flex items-center gap-1.5 font-bold text-cyan-700 hover:text-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none dark:text-cyan-300"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Download video
            </a>
            <a
              href={finalProjectLinks.demoPage}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-cyan-700 hover:text-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none dark:text-cyan-300"
            >
              Watch the CS85 AI-powered Laravel application demo ↗
            </a>
          </div>
        </div>
      </div>

      <aside className="rounded-2xl bg-slate-950 p-5 text-white">
        <p className="text-xs font-bold tracking-[0.18em] text-cyan-300 uppercase">
          Demo chapters
        </p>
        <ol className="mt-5 space-y-1">
          {demoChapters.map((chapter, index) => (
            <li
              key={chapter.time}
              className="grid grid-cols-[3.25rem_1fr] gap-3 border-b border-white/10 py-3 last:border-0"
            >
              <span className="font-mono text-xs font-bold text-cyan-300">
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
                  className="col-start-1 mx-auto -mb-4 h-3 w-px bg-cyan-400/40"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}

function ContentCard({
  title,
  className,
  children,
}: {
  title: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <section className={`rounded-xl border p-5 ${className}`}>
      <h4 className="text-sm font-semibold tracking-wide uppercase">{title}</h4>
      {children}
    </section>
  );
}

function ChecklistItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-7">
      <CheckCircle2
        aria-hidden="true"
        className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
      />
      <span>{children}</span>
    </li>
  );
}

function ProjectLink({
  icon,
  href,
  label,
}: {
  icon: ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-white/80 p-4 text-sm font-semibold text-indigo-950 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-indigo-800 dark:bg-slate-950/35 dark:text-indigo-100 dark:hover:bg-slate-950/60"
    >
      <span className="text-indigo-700 dark:text-indigo-300">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
