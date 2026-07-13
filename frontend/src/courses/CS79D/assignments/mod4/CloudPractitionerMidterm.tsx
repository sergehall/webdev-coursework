import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { AssessmentRunner } from "@/features/assessment";
import { cs79dCloudPractitionerMidtermDefinition } from "@/courses/CS79D/data/modules/module04MidtermQuiz";

export default function CloudPractitionerMidterm() {
  return (
    <AssessmentRunner
      definition={cs79dCloudPractitionerMidtermDefinition}
      overview={<MidtermDetails />}
    />
  );
}

function MidtermDetails() {
  return (
    <details
      data-testid="cs79d-midterm-details"
      className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/40"
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-bold text-slate-950 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none focus-visible:ring-inset dark:text-white dark:hover:bg-slate-900 [&::-webkit-details-marker]:hidden">
        <span>Midterm details</span>
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none dark:text-slate-300"
        />
      </summary>
      <div className="space-y-5 border-t border-slate-200 px-5 pt-4 pb-5 text-sm leading-7 text-slate-700 dark:border-slate-700 dark:text-slate-200">
        <DetailSection title="What?">
          This 67-question practice midterm covers AWS Cloud Practitioner
          material from Weeks 1–4. Each question is worth one point.
        </DetailSection>
        <DetailSection title="How?">
          Enter the provided access code when you are ready. The 2-hour timer
          starts immediately. Your answers and deadline are saved in this
          browser, and the question navigator helps you return to unanswered
          questions.
        </DetailSection>
        <DetailSection title="When?">
          The course deadline is May 17, 2026 at 11:59 pm.
        </DetailSection>
        <DetailSection title="Anything else?">
          This portal is a client-side practice mirror. Complete any required
          graded submission through SMC Canvas.
        </DetailSection>
      </div>
    </details>
  );
}

function DetailSection({
  title,
  children,
}: {
  readonly title: string;
  readonly children: ReactNode;
}) {
  return (
    <section>
      <h3 className="font-bold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-1">{children}</p>
    </section>
  );
}
