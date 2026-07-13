import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { midtermQuestions } from "./midtermData";

import {
  AssessmentRunner,
  assertAssessmentDefinition,
  type AssessmentDefinition,
} from "@/features/assessment";

export const cs56MidtermAssessmentDefinition = {
  id: "cs56-midterm",
  delivery: "client-practice",
  eyebrow: "CS 56 · Module 8",
  title: "Midterm Quiz",
  summary:
    "The midterm consists of 33 questions. Most of them are multiple-choice type questions. A bit longer programming-style questions are at the end of the exam.",
  accessCode: "START",
  accessHint: "Access code: START",
  durationSeconds: 60 * 60,
  storageKey: "assessment:cs56-midterm:v1",
  questions: midtermQuestions,
} satisfies AssessmentDefinition;

assertAssessmentDefinition(cs56MidtermAssessmentDefinition);

export default function MidtermQuiz() {
  return (
    <AssessmentRunner
      definition={cs56MidtermAssessmentDefinition}
      overview={<ModuleOverview />}
    />
  );
}

function ModuleOverview() {
  const linkClassName =
    "font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900 dark:text-sky-300 dark:decoration-sky-700 dark:hover:text-sky-100";

  return (
    <details
      data-testid="midterm-module-overview"
      className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/40"
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-bold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none focus-visible:ring-inset dark:text-white dark:hover:bg-slate-900 [&::-webkit-details-marker]:hidden">
        <span>Module Overview</span>
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none dark:text-slate-300"
        />
      </summary>
      <div className="space-y-5 border-t border-slate-200 px-5 pt-4 pb-5 text-sm leading-7 text-slate-700 dark:border-slate-700 dark:text-slate-200">
        <div className="space-y-2">
          <p>
            Welcome to the{" "}
            <a
              className={linkClassName}
              href="https://online.smc.edu/courses/83001/modules/619513"
              target="_blank"
              rel="noopener noreferrer"
            >
              Module: Midterm
            </a>
            .
          </p>
          <p>
            This week will be the{" "}
            <a
              className={linkClassName}
              href="https://online.smc.edu/courses/83001/quizzes/512238"
              target="_blank"
              rel="noopener noreferrer"
            >
              midterm
            </a>
            . Here&apos;s more info:
          </p>
        </div>

        <OverviewSection title="What?">
          The midterm will consist of 33 questions. It will cover all modules so
          far. The multiple choice part will be similar to the quizzes you have
          completed in the modules. The programming questions will be similar to
          the assignments you have completed in the modules. You should also
          know what design patterns are and the three categories. In particular
          you should know the design patterns discussed: Singleton, Template
          Method, Iterator.
        </OverviewSection>

        <OverviewSection title="How?">
          You need to answer all questions on Canvas without any other program
          open. Please be sure to close all notifications on your desktop. Leave
          the Canvas exam tab open at all times. You may use notes or the book
          while taking the exam but be sure to not close the exam tab on your
          computer. Also, be mindful of the time available. Answer easier
          questions first and those that may result in a higher score.
        </OverviewSection>

        <OverviewSection title="When?">
          Please reserve an uninterrupted block of 60 minutes to complete the
          midterm. You may take it at any time during the dates specified.
        </OverviewSection>

        <OverviewSection title="Anything else?">
          No, the main focus for you will be to review topics and study for the
          midterm. There won&apos;t be any new material covered and no other
          tasks to be completed in this module.
        </OverviewSection>

        <p className="font-semibold text-slate-900 dark:text-white">
          Happy programming!
        </p>
      </div>
    </details>
  );
}

function OverviewSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h3 className="font-bold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-1">{children}</p>
    </section>
  );
}
