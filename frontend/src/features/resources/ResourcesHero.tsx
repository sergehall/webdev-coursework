import { ArrowDown, BookOpen, LibraryBig, SearchCheck } from "lucide-react";

import {
  representedCourseCount,
  resourceCollections,
  resourceCount,
} from "@/features/resources/resource-library-data";

const libraryStats = [
  {
    value: String(resourceCount),
    label: "Curated references",
    icon: BookOpen,
  },
  {
    value: String(resourceCollections.length),
    label: "Focused collections",
    icon: LibraryBig,
  },
  {
    value: String(representedCourseCount),
    label: "SMC courses mapped",
    icon: SearchCheck,
  },
] as const;

export default function ResourcesHero() {
  return (
    <section
      aria-labelledby="resources-title"
      className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 px-5 py-8 shadow-sm backdrop-blur sm:px-8 sm:py-10 dark:border-slate-700/80 dark:bg-slate-900/75"
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-500/10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10"
      />

      <div className="relative grid items-start gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-violet-700 uppercase dark:border-violet-900 dark:bg-violet-950/60 dark:text-violet-200">
            <LibraryBig className="h-4 w-4" aria-hidden="true" />
            Curated engineering library
          </p>

          <h1
            id="resources-title"
            className="mt-5 max-w-3xl text-4xl leading-[1.05] font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white"
          >
            Reference Hub{" "}
            <span className="mt-1 block bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Learn with reliable sources.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            A focused collection of official documentation, learning platforms,
            and technical references behind my Santa Monica College coursework
            and independent engineering projects.
          </p>

          <a
            href="#resource-directory"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 motion-reduce:transform-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-offset-slate-900 dark:hover:border-violet-700 dark:hover:bg-slate-800"
          >
            Browse the library
            <ArrowDown
              className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </a>
        </div>

        <aside
          aria-label="Reference library snapshot"
          className="rounded-2xl border border-slate-200/80 bg-slate-950/[0.03] p-4 dark:border-slate-700 dark:bg-slate-950/55"
        >
          <p className="text-xs font-black tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
            Library snapshot
          </p>

          <dl className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            {libraryStats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-white/75 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
              >
                <Icon className="h-4 w-4 text-violet-500" aria-hidden="true" />
                <dd className="mt-3 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                  {value}
                </dd>
                <dt className="mt-1 text-xs leading-5 font-bold text-slate-500 dark:text-slate-400">
                  {label}
                </dt>
              </div>
            ))}
          </dl>

          <nav
            aria-label="Resource collections"
            className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800"
          >
            <p className="text-xs font-black tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400">
              Jump to a collection
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {resourceCollections.map((collection) => (
                <a
                  key={collection.id}
                  href={`#${collection.id}`}
                  className="rounded-full border border-slate-200 bg-white/75 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-violet-700 dark:hover:text-violet-200"
                >
                  {collection.shortTitle}
                </a>
              ))}
            </div>
          </nav>
        </aside>
      </div>
    </section>
  );
}
