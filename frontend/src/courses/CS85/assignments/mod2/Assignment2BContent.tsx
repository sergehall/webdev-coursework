import { useState } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment2BItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 2 Assignment 2B: Time loops",
  dueLabel: "Jun 28",
  pointsLabel: "20 pts",
};

const assignment2BFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-2/module2_assignment_2b.pdf",
    filename: "module2_assignment_2b.pdf",
  },
  {
    fileUrl: "/code-playground/CS85/mod-2/CosmicCalendarBuilder.php",
    filename: "CosmicCalendarBuilder.php",
  },
];

export function Assignment2BContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment2BItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            This assignment tests loops and conditional logic with live,
            unpredictable API data. Instead of processing a fixed range of
            numbers, the PHP script fetches the current Los Angeles date,
            combines it with my first name, and generates a personalized Cosmic
            Calendar report.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Your Mission
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>
              Fetch the current date from the World Time API endpoint for
              America/Los_Angeles.
            </li>
            <li>
              Convert the API response from JSON into PHP data with
              <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                json_decode()
              </code>
              .
            </li>
            <li>
              Use the length of my first name, Serge, as the loop start value.
            </li>
            <li>
              Use the current day of the year from the API date as the loop end
              value.
            </li>
            <li>
              Apply conditional styling for numbers divisible by the name
              length, the current month, or both.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
            Cosmic Number Rules
          </h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-violet-200 bg-white p-3 dark:border-violet-900/60 dark:bg-slate-950/40">
              <p className="text-xs font-semibold tracking-wide text-violet-800 uppercase dark:text-violet-200">
                Name Length
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                Numbers divisible by 5 are marked as name-length matches.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-white p-3 dark:border-amber-900/60 dark:bg-slate-950/40">
              <p className="text-xs font-semibold tracking-wide text-amber-800 uppercase dark:text-amber-200">
                Month
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                Numbers divisible by the current month receive month styling.
              </p>
            </div>
            <div className="rounded-lg border border-rose-200 bg-white p-3 dark:border-rose-900/60 dark:bg-slate-950/40">
              <p className="text-xs font-semibold tracking-wide text-rose-800 uppercase dark:text-rose-200">
                Both
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                Numbers divisible by both values get the strongest highlight.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950/40">
              <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase dark:text-slate-200">
                Regular
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                All other numbers render as regular day-number entries.
              </p>
            </div>
          </div>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Implementation
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            The PHP solution is implemented in
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              CosmicCalendarBuilder.php
            </code>
            . It reads the API values
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              dateTime
            </code>
            and
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              month
            </code>
            , calculates the day of year with
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              DateTimeImmutable
            </code>
            , and builds a result array from a
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              for
            </code>
            loop. If the external API is unavailable, the code falls back to the
            local America/Los_Angeles date so the page can still render.
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            GitHub source:
            <a
              href="https://github.com/sergehall/cs85_projects/blob/main/app/Services/Modules/Module2B/CosmicCalendarBuilder.php"
              target="_blank"
              rel="noreferrer"
              className="ml-1 font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
            >
              CosmicCalendarBuilder.php
            </a>
          </p>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Reflection
          </h4>
          <p className="mt-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            The most important part of this assignment was separating the live
            data step from the loop step. Once the API response was decoded, the
            rest of the problem became a clear set of loop boundaries and
            conditional checks. I also added a fallback date because a real page
            should not fail completely just because a third-party time API is
            temporarily unreachable.
          </p>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 2 Assignment 2B files"
                : "View Module 2 Assignment 2B files"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment2BFiles}
        />
      </section>
    </div>
  );
}
