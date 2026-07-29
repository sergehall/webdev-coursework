import { Boxes, Code2, RotateCcw, SlidersHorizontal } from "lucide-react";

import {
  projectFilters,
  projectFrameworkFilters,
  projectLanguageFilters,
  type ProjectFilterOption,
  type ProjectFrameworkFilterOption,
  type ProjectLanguageFilterOption,
} from "@/data/projectShowcase";
import { cn } from "@/utils/cn";

type ProjectFiltersProps = {
  readonly activeType: ProjectFilterOption;
  readonly activeLanguage: ProjectLanguageFilterOption;
  readonly activeFramework: ProjectFrameworkFilterOption;
  readonly availableTypes: ReadonlySet<ProjectFilterOption>;
  readonly availableLanguages: ReadonlySet<ProjectLanguageFilterOption>;
  readonly availableFrameworks: ReadonlySet<ProjectFrameworkFilterOption>;
  readonly visibleCount: number;
  readonly totalCount: number;
  readonly onTypeChange: (filter: ProjectFilterOption) => void;
  readonly onLanguageChange: (filter: ProjectLanguageFilterOption) => void;
  readonly onFrameworkChange: (filter: ProjectFrameworkFilterOption) => void;
  readonly onReset: () => void;
};

type FilterButtonProps<TFilter extends string> = {
  readonly filter: TFilter;
  readonly active: boolean;
  readonly disabled: boolean;
  readonly tone: "sky" | "emerald" | "violet";
  readonly onSelect: (filter: TFilter) => void;
};

function FilterButton<TFilter extends string>({
  filter,
  active,
  disabled,
  tone,
  onSelect,
}: FilterButtonProps<TFilter>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => onSelect(filter)}
      className={cn(
        "min-h-10 rounded-full border px-3.5 py-2 text-sm font-bold transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 motion-reduce:transform-none",
        active && tone === "sky"
          ? "border-sky-500 bg-sky-600 text-white shadow-md shadow-sky-900/15 dark:border-sky-400 dark:bg-sky-500 dark:text-slate-950"
          : active && tone === "emerald"
            ? "border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-900/15 dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950"
            : active && tone === "violet"
              ? "border-violet-500 bg-violet-600 text-white shadow-md shadow-violet-900/15 dark:border-violet-400 dark:bg-violet-500 dark:text-slate-950"
              : "border-slate-200 bg-white/80 text-slate-700 hover:border-sky-300 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-sky-700 dark:hover:bg-slate-800"
      )}
    >
      {filter}
    </button>
  );
}

export default function ProjectFilters({
  activeType,
  activeLanguage,
  activeFramework,
  availableTypes,
  availableLanguages,
  availableFrameworks,
  visibleCount,
  totalCount,
  onTypeChange,
  onLanguageChange,
  onFrameworkChange,
  onReset,
}: ProjectFiltersProps) {
  const hasActiveFilters =
    activeType !== "All" ||
    activeLanguage !== "All" ||
    activeFramework !== "All";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm sm:p-5 dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-black tracking-[0.14em] text-sky-700 uppercase dark:text-sky-300">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Explore the portfolio
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
            Find projects by focus
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <p
            className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-live="polite"
          >
            Showing {visibleCount} of {totalCount} projects
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-300"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <section className="space-y-3" aria-label="Project filters">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">
            Project type
          </h3>
          <div className="flex flex-wrap gap-2">
            {projectFilters.map((filter) => (
              <FilterButton
                key={filter}
                filter={filter}
                active={activeType === filter}
                disabled={!availableTypes.has(filter)}
                tone="sky"
                onSelect={onTypeChange}
              />
            ))}
          </div>
        </section>

        <section
          className="space-y-3 xl:border-l xl:border-slate-200 xl:pl-5 dark:xl:border-slate-800"
          aria-label="Programming language filters"
        >
          <h3 className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
            <Code2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            Programming language
          </h3>
          <div className="flex flex-wrap gap-2">
            {projectLanguageFilters.map((filter) => (
              <FilterButton
                key={filter}
                filter={filter}
                active={activeLanguage === filter}
                disabled={!availableLanguages.has(filter)}
                tone="emerald"
                onSelect={onLanguageChange}
              />
            ))}
          </div>
        </section>

        <section
          className="space-y-3 xl:border-l xl:border-slate-200 xl:pl-5 dark:xl:border-slate-800"
          aria-label="Framework and platform filters"
        >
          <h3 className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
            <Boxes className="h-4 w-4 text-violet-600" aria-hidden="true" />
            Framework / platform
          </h3>
          <div className="flex flex-wrap gap-2">
            {projectFrameworkFilters.map((filter) => (
              <FilterButton
                key={filter}
                filter={filter}
                active={activeFramework === filter}
                disabled={!availableFrameworks.has(filter)}
                tone="violet"
                onSelect={onFrameworkChange}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
