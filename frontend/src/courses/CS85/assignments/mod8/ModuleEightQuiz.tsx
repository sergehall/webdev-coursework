import { ChevronDown } from "lucide-react";

import { moduleEightQuizQuestions } from "./quizData";

import {
  AssessmentRunner,
  assertAssessmentDefinition,
  type AssessmentDefinition,
} from "@/features/assessment";

export const moduleEightQuizDefinition = {
  id: "cs85-module-08-orm-database-migrations-quiz",
  delivery: "client-practice",
  eyebrow: "CS 85 · Module 8",
  title: "Quiz: Module 8 ORM & Database Migrations",
  summary:
    "Review Laravel environment configuration, migrations, Eloquent models, query performance, and production database practices.",
  accessCode: "START",
  accessHint: "Access code: START",
  durationSeconds: 60 * 60,
  storageKey: "assessment:cs85-module-08-orm-database-migrations-quiz:v1",
  questions: moduleEightQuizQuestions,
} satisfies AssessmentDefinition;

assertAssessmentDefinition(moduleEightQuizDefinition);

export default function ModuleEightQuiz() {
  return (
    <AssessmentRunner
      definition={moduleEightQuizDefinition}
      overview={<QuizDetails />}
    />
  );
}

function QuizDetails() {
  return (
    <details
      data-testid="module-eight-quiz-details"
      className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/40"
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none focus-visible:ring-inset dark:text-white dark:hover:bg-slate-900 [&::-webkit-details-marker]:hidden">
        <span>Quiz details</span>
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none dark:text-slate-300"
        />
      </summary>
      <div className="space-y-3 border-t border-slate-200 px-5 pt-4 pb-5 text-sm leading-7 text-slate-700 dark:border-slate-700 dark:text-slate-200">
        <dl className="grid gap-3 sm:grid-cols-2">
          <QuizFact label="Due" value="Jul 19 at 11:59pm" />
          <QuizFact label="Available after" value="Jul 13 at 10am" />
          <QuizFact label="Canvas time limit" value="None" />
          <QuizFact label="Canvas allowed attempts" value="2" />
        </dl>
        <p>
          Source material: Canvas Quiz: Module 8 ORM &amp; Database Migrations.
          The 22 questions, option order, correct answers, and point values are
          preserved from the supplied PDF.
        </p>
        <p>
          This client-practice mirror uses a 60-minute practice session so
          autosave, restoration, review, and expiration remain deterministic.
          The source Canvas quiz has no time limit.
        </p>
      </div>
    </details>
  );
}

function QuizFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
      <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 font-bold text-slate-900 dark:text-white">{value}</dd>
    </div>
  );
}
