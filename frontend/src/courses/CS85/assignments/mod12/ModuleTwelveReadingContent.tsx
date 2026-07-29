import { useState } from "react";
import { BookOpen, CheckCircle2 } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";

const readingPdfUrl =
  "/code-playground/CS85/mod-12/reading/m12-AIintergration.pdf";

const readingPdfFiles = [
  {
    fileUrl: readingPdfUrl,
    filename: "m12-AIintergration.pdf",
  },
];

const learningObjectives = [
  "Write effective prompts using role prompting and clear, specific instructions.",
  "Build an AI draft generator across a Blade view, route, controller, and service class.",
  "Store an API key and model name safely in .env and read them through Laravel configuration.",
  "Handle failures deliberately with Throwable, logging, caching, and fallbacks.",
  "Test AI code by faking the HTTP layer and know when to reach for laravel/ai.",
];

export default function ModuleTwelveReadingContent() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <section className="space-y-5">
      <header className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-sky-700 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-white/10 p-2 ring-1 ring-white/20">
            <BookOpen aria-hidden="true" className="h-5 w-5" />
          </span>
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-200 uppercase">
            Module 12 Reading
          </p>
        </div>
        <h4 className="mt-5 text-2xl font-bold">
          AI Integration in PHP Applications
        </h4>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-sky-50">
          Build an AI-powered Laravel application with clean architecture,
          prompt engineering, secure API configuration, intentional error
          handling, and testable service-layer code.
        </p>
      </header>

      <article className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/40">
        <h4 className="text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
          Reading Overview
        </h4>
        <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
          This capstone reading brings together the PHP and Laravel skills from
          the course. It demonstrates how professional teams isolate a
          third-party AI integration in a dedicated service class, write useful
          prompts, protect credentials, recover from provider failures, and
          verify the integration without spending API credits during tests.
        </p>
      </article>

      <article className="rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900/60 dark:bg-sky-950/30">
        <h4 className="text-sm font-semibold tracking-wide text-sky-950 uppercase dark:text-sky-100">
          Learning Objectives
        </h4>
        <ul className="mt-4 space-y-3">
          {learningObjectives.map((objective) => (
            <li
              key={objective}
              className="flex gap-3 text-sm leading-7 text-sky-950 dark:text-sky-100"
            >
              <CheckCircle2
                aria-hidden="true"
                className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
              />
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900/60 dark:bg-indigo-950/30">
        <h4 className="text-sm font-semibold tracking-wide text-indigo-950 uppercase dark:text-indigo-100">
          Reading Materials
        </h4>
        <p className="mt-3 text-sm leading-7 text-indigo-950 dark:text-indigo-100">
          The 30-page reading covers prompt engineering, the Blade/controller/
          service flow, OpenAI configuration, rate limits, caching, privacy,
          graceful degradation, HTTP fakes, and the path toward Laravel&apos;s
          first-party AI package.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPdfOpen}
            label={isPdfOpen ? "Close reading PDF" : "View reading PDF"}
            toggle={() => setIsPdfOpen((previous) => !previous)}
          />
          <a
            href={readingPdfUrl}
            download="m12-AIintergration.pdf"
            className="inline-flex items-center justify-center rounded-lg border border-indigo-300 bg-white px-4 py-2 text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-indigo-800 dark:bg-slate-950/40 dark:text-indigo-100 dark:hover:bg-slate-950/70"
          >
            Download reading PDF
          </a>
          <a
            href="https://online.smc.edu/courses/83209/files/22217317?wrap=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-indigo-800 dark:text-indigo-100 dark:hover:bg-slate-950/50"
          >
            Open original Canvas reading
          </a>
        </div>
      </article>

      <ShowModalButton
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        files={readingPdfFiles}
      />
    </section>
  );
}
