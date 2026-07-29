import { useDeferredValue, useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";

import {
  resourceCollections,
  resourceCount,
  type ResourceCollection,
  type ResourceEntry,
  type ResourceTone,
} from "@/features/resources/resource-library-data";
import { cn } from "@/utils/cn";

const toneStyles = {
  sky: {
    icon: "bg-sky-500/10 text-sky-600 ring-sky-500/20 dark:text-sky-300",
    eyebrow: "text-sky-700 dark:text-sky-300",
    accent: "group-hover:border-sky-300 dark:group-hover:border-sky-700",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-600 ring-violet-500/20 dark:text-violet-300",
    eyebrow: "text-violet-700 dark:text-violet-300",
    accent: "group-hover:border-violet-300 dark:group-hover:border-violet-700",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-300",
    eyebrow: "text-emerald-700 dark:text-emerald-300",
    accent:
      "group-hover:border-emerald-300 dark:group-hover:border-emerald-700",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300",
    eyebrow: "text-amber-700 dark:text-amber-300",
    accent: "group-hover:border-amber-300 dark:group-hover:border-amber-700",
  },
} satisfies Record<
  ResourceTone,
  { readonly icon: string; readonly eyebrow: string; readonly accent: string }
>;

function resourceMatchesQuery(resource: ResourceEntry, query: string) {
  if (!query) {
    return true;
  }

  return [resource.title, resource.description, resource.course]
    .filter(Boolean)
    .some((value) => value?.toLocaleLowerCase().includes(query));
}

function ResourceCard({
  resource,
  tone,
}: {
  readonly resource: ResourceEntry;
  readonly tone: ResourceTone;
}) {
  const styles = toneStyles[tone];

  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${resource.title}: ${resource.description} (opens in a new tab)`}
      className={cn(
        "group flex min-h-40 flex-col rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition",
        "hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 motion-reduce:transform-none",
        "dark:border-slate-700 dark:bg-slate-900/75 dark:ring-offset-slate-950 dark:hover:bg-slate-900",
        styles.accent
      )}
    >
      <span className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1",
            styles.icon
          )}
        >
          {resource.icon}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-500 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </span>

      <span className="mt-4 block text-base font-black text-slate-950 dark:text-white">
        {resource.title}
      </span>
      <span className="mt-1.5 block text-sm leading-6 text-slate-600 dark:text-slate-400">
        {resource.description}
      </span>

      <span className="mt-auto pt-4">
        {resource.course ? (
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
            {resource.course}
          </span>
        ) : (
          <span className="text-xs font-bold tracking-wide text-slate-400 uppercase dark:text-slate-500">
            Professional workflow
          </span>
        )}
      </span>
    </a>
  );
}

function ResourceCollectionSection({
  collection,
}: {
  readonly collection: ResourceCollection;
}) {
  const styles = toneStyles[collection.tone];

  return (
    <section
      id={collection.id}
      aria-labelledby={`${collection.id}-title`}
      className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white/60 p-4 shadow-sm sm:p-6 dark:border-slate-700/80 dark:bg-slate-900/45"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1",
              styles.icon
            )}
          >
            {collection.icon}
          </span>
          <div>
            <p
              className={cn(
                "text-xs font-black tracking-[0.14em] uppercase",
                styles.eyebrow
              )}
            >
              {collection.eyebrow}
            </p>
            <h2
              id={`${collection.id}-title`}
              className="mt-1 text-xl font-black tracking-tight text-slate-950 sm:text-2xl dark:text-white"
            >
              {collection.title}
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              {collection.description}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
          {collection.resources.length} references
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-3">
        {collection.resources.map((resource) => (
          <ResourceCard
            key={resource.href}
            resource={resource}
            tone={collection.tone}
          />
        ))}
      </div>
    </section>
  );
}

export default function ResourceDirectory() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());

  const filteredCollections = useMemo(
    () =>
      resourceCollections
        .map((collection) => ({
          ...collection,
          resources: collection.resources.filter((resource) =>
            resourceMatchesQuery(resource, deferredQuery)
          ),
        }))
        .filter((collection) => collection.resources.length > 0),
    [deferredQuery]
  );

  const visibleCount = filteredCollections.reduce(
    (total, collection) => total + collection.resources.length,
    0
  );

  return (
    <section id="resource-directory" aria-labelledby="directory-title">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm sm:p-5 dark:border-slate-700 dark:bg-slate-900/70">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[0.14em] text-sky-700 uppercase dark:text-sky-300">
              Search the library
            </p>
            <h2
              id="directory-title"
              className="mt-1 text-2xl font-black text-slate-950 dark:text-white"
            >
              Find the right reference
            </h2>
          </div>

          <p
            aria-live="polite"
            className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Showing {visibleCount} of {resourceCount}
          </p>
        </div>

        <label className="relative mt-4 block">
          <span className="sr-only">Search resources</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search technologies, documentation, or courses..."
            className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pr-12 pl-12 text-sm text-slate-900 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/25 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear resource search"
              className="absolute top-1/2 right-2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </label>
      </div>

      {filteredCollections.length > 0 ? (
        <div className="mt-5 flex flex-col gap-4">
          {filteredCollections.map((collection) => (
            <ResourceCollectionSection
              key={collection.id}
              collection={collection}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white/60 px-5 py-12 text-center dark:border-slate-700 dark:bg-slate-900/45">
          <Search
            className="mx-auto h-8 w-8 text-slate-400"
            aria-hidden="true"
          />
          <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
            No matching references
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Try another technology, resource name, or course number.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-5 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:ring-offset-slate-950"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
