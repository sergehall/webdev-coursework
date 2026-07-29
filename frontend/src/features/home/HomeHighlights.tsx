import { Code2, GraduationCap, Layers3 } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

import {
  homeHighlights,
  type HomeHighlightKind,
} from "@/features/home/home-content";

const highlightIcons = {
  academic: GraduationCap,
  engineering: Layers3,
  artifacts: Code2,
} satisfies Record<HomeHighlightKind, ComponentType<LucideProps>>;

export default function HomeHighlights() {
  return (
    <section aria-labelledby="platform-purpose-title" className="text-left">
      <div className="max-w-3xl">
        <p className="text-xs font-bold tracking-[0.16em] text-sky-600 uppercase dark:text-sky-300">
          More than a course archive
        </p>
        <h2
          id="platform-purpose-title"
          className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white"
        >
          What this platform demonstrates
        </h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          The coursework is preserved as evidence of learning, then connected to
          the engineering decisions and working applications it helped make
          possible.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {homeHighlights.map(({ kind, title, description }) => {
          const Icon = highlightIcons[kind];

          return (
            <article
              key={kind}
              className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/65"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
