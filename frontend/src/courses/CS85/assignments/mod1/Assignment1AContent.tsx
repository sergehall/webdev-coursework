import { useState } from "react";
import { ClipboardPenLine, GitBranch } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  CanvasRow,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment1AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 1 Assignment 1A: Home Dev Environment & hello world",
  dueLabel: "Jun 28",
  pointsLabel: "20 pts",
};

const assignment1APdf = {
  fileUrl: "/code-playground/CS85/mod-1/assignment_1a.pdf",
  filename: "assignment_1a.pdf",
};

export function Assignment1AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-950/30">
        <CanvasRow item={assignment1AItem} />
      </ul>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            The purpose of this assignment is to establish a complete,
            professional-grade PHP development environment on your personal
            computer using Laravel Herd. Along the way you will create your very
            first Laravel application, install Visual Studio Code as your code
            editor, install Git for version control, and push your work to
            GitHub. This is the same toolchain used by working developers in
            industry, and everything you set up here will be reused in every
            future assignment in this course. Take your time - doing this
            carefully once means you won't fight your tools later.
          </p>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Important: Use Git & Push Often
          </h4>
          <p className="mt-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            Track your progress with frequent, meaningful Git commits rather
            than one final upload. A healthy commit history that shows progress
            over time is a habit you start building now and rely on for the rest
            of the course.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Submit
          </h4>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
              <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <GitBranch aria-hidden="true" className="h-4 w-4" />
                GitHub Repository Link
              </h5>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
                Submit the link to your repo, for example{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                  https://github.com/your-username/cs85_projects
                </code>
                .
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
              <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Screenshots
              </h5>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
                Combine screenshots into one PDF or DOC before submitting.
              </p>
            </div>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>The Laravel Herd app running.</li>
            <li>
              VS Code showing your edited{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                routes/web.php
              </code>{" "}
              file.
            </li>
            <li>
              Browser showing{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                http://cs85_projects.test
              </code>{" "}
              with your custom "Hello World from Laravel Herd!" message.
            </li>
            <li>Your GitHub repo showing the files pushed and committed.</li>
          </ul>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close assignment_1a.pdf"
                : "View assignment_1a.pdf"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={[assignment1APdf]}
        />
      </section>
    </div>
  );
}
