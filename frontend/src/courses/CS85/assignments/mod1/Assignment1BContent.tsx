import { ClipboardPenLine } from "lucide-react";

import {
  CanvasRow,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment1BItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 1 Assignment 1B: Setup Slack Account and App",
  dueLabel: "Jun 28",
  pointsLabel: "20 pts",
};

export function Assignment1BContent() {
  return (
    <div className="space-y-4">
      <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-950/30">
        <CanvasRow item={assignment1BItem} />
      </ul>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            To ensure all students are connected to the course communication
            platform, Slack, and can effectively communicate with the instructor
            and classmates.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Task
          </h4>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
              <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Sign Up for Slack
              </h5>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                <li>Go to SlackLinks.</li>
                <li>
                  Click Sign Up and create an account using your preferred email
                  address, preferably your SMC email.
                </li>
                <li>Verify your email and complete your profile setup.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
              <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Join the CS 85 Slack Workspace
              </h5>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                <li>Click the invite link: Join CS 85 Slack Workspace.</li>
                <li>
                  Sign in with your newly created Slack account or use an
                  existing one if you already have Slack.
                </li>
                <li>
                  Set your display name to your full name as it appears in
                  Canvas for easy identification.
                </li>
              </ol>
            </div>
          </div>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Submission Instructions
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            Submit a screenshot showing the following:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>Your name visible in the CS 85 Slack Workspace.</li>
            <li>
              The workspace name{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                smccs85sum2026
              </code>{" "}
              visible in the Slack interface.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Why Slack?
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            Slack will be our primary communication tool for questions,
            discussions, and announcements throughout the semester in addition
            to Canvas announcements. Ensuring you are connected early will set
            you up for success in this course.
          </p>
        </article>
      </section>
    </div>
  );
}
