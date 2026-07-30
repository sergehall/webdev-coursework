import { ChevronDown } from "lucide-react";

import { finalExamQuestions } from "./finalExamData";

import {
  AssessmentRunner,
  assertAssessmentDefinition,
  type AssessmentDefinition,
} from "@/features/assessment";

export const finalExamDefinition = {
  id: "cs56-final-exam",
  delivery: "client-practice",
  eyebrow: "CS 56 · Module 15",
  title: "Final Exam",
  summary:
    "Review Java collections, generics, inheritance, interfaces, exceptions, threads, JavaFX, sockets, UML, and design patterns.",
  accessCode: "START",
  accessHint: "Access code: START",
  durationSeconds: 60 * 60,
  storageKey: "assessment:cs56-final-exam:v1",
  questions: finalExamQuestions,
} satisfies AssessmentDefinition;

assertAssessmentDefinition(finalExamDefinition);

export default function FinalExam() {
  return (
    <AssessmentRunner
      definition={finalExamDefinition}
      overview={<FinalExamDetails />}
    />
  );
}

function FinalExamDetails() {
  return (
    <details
      data-testid="final-exam-details"
      className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/40"
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none focus-visible:ring-inset dark:text-white dark:hover:bg-slate-900 [&::-webkit-details-marker]:hidden">
        <span>Final Exam details</span>
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none dark:text-slate-300"
        />
      </summary>
      <div className="space-y-3 border-t border-slate-200 px-5 pt-4 pb-5 text-sm leading-7 text-slate-700 dark:border-slate-700 dark:text-slate-200">
        <dl className="grid gap-3 sm:grid-cols-2">
          <ExamFact label="Questions" value="38" />
          <ExamFact label="Total points" value="98" />
          <ExamFact
            label="Question types"
            value="30 single · 2 select all · 6 code completion"
          />
          <ExamFact label="Practice session" value="60 minutes" />
        </dl>
        <p>
          The question wording, answer choices, correct answers, and point
          values are preserved from the supplied CS 56 Final Exam questions.
        </p>
        <p>
          This portfolio copy runs in client-side practice mode. Use the access
          code START to begin; answers and progress are saved in this browser.
        </p>
      </div>
    </details>
  );
}

function ExamFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
      <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 font-bold text-slate-900 dark:text-white">{value}</dd>
    </div>
  );
}
