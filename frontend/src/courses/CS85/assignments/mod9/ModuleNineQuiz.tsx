import { ChevronDown } from "lucide-react";

import { moduleNineQuizQuestions } from "./quizData";

import {
  AssessmentRunner,
  assertAssessmentDefinition,
  type AssessmentDefinition,
} from "@/features/assessment";

export const moduleNineQuizDefinition = {
  id: "cs85-module-09-crud-validation-quiz",
  delivery: "client-practice",
  eyebrow: "CS 85 · Module 9",
  title: "Quiz: Module 9 CRUD",
  summary:
    "Review CRUD operations, Laravel resource controllers, validation, CSRF protection, form helpers, and RESTful HTTP behavior.",
  accessCode: "START",
  accessHint: "Access code: START",
  durationSeconds: 60 * 60,
  storageKey: "assessment:cs85-module-09-crud-validation-quiz:v1",
  questions: moduleNineQuizQuestions,
} satisfies AssessmentDefinition;

assertAssessmentDefinition(moduleNineQuizDefinition);

export default function ModuleNineQuiz() {
  return (
    <AssessmentRunner
      definition={moduleNineQuizDefinition}
      overview={<QuizDetails />}
    />
  );
}

function QuizDetails() {
  return (
    <details
      data-testid="module-nine-quiz-details"
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
          <QuizFact label="Questions" value="13" />
          <QuizFact label="Total points" value="13" />
          <QuizFact label="Source time limit" value="Not provided" />
          <QuizFact label="Practice session" value="60 minutes" />
        </dl>
        <p>
          Source material: supplied Module 9 CRUD PDF. The 13 questions, option
          order, and one-point values are preserved from the source.
        </p>
        <p>
          This client-practice mirror uses a 60-minute practice session so
          autosave, restoration, review, and expiration remain deterministic.
          The source PDF does not specify a time limit.
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
