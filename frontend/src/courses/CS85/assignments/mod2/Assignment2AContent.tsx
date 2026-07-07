import { useState } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment2AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 2 Assignment 2A: if/else Business",
  dueLabel: "Jun 28",
  pointsLabel: "20 pts",
};

const assignment2APdf = {
  fileUrl: "/code-playground/CS85/mod-2/module2_assignment_2a.pdf",
  filename: "module2_assignment_2a.pdf",
};

export function Assignment2AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment2AItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            This assignment is a real-world simulation of a common developer
            task: first, implementing a set of business rules quickly, and
            second, refactoring that code for clarity and long-term maintenance.
            You will experience firsthand why clean, readable code is critical.
            The logic is complex enough that simply asking an AI to "solve it"
            will be less effective than thinking through the rules yourself.
          </p>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Important: Use Git & Push Often
          </h4>
          <p className="mt-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            Track your progress with frequent, meaningful Git commits. Push
            regularly to GitHub. Your commit history will be reviewed as part of
            your grade. It should show progress over time, not one single commit
            with the final version.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            The Scenario
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            You are a junior developer at an online T-shirt store. The marketing
            team has just released a new, complex pricing structure. Your task
            is to write the PHP code that calculates the final price of a
            T-shirt based on its size, color, and customization options.
          </p>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close module2_assignment_2a.pdf"
                : "View module2_assignment_2a.pdf"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={[assignment2APdf]}
        />
      </section>
    </div>
  );
}
