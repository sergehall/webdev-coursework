import React, { memo, useCallback, useMemo, useState } from "react";
import {
  Circle,
  FileCode2,
  Paintbrush2,
  Code2,
  Braces,
  Route,
  Cloud,
  Wrench,
  BadgeHelp,
  Atom,
  Palette,
  Sparkles,
  Rocket,
  CloudSun,
  GaugeCircle,
  LayoutTemplate,
  Regex,
  Terminal,
  FileText,
} from "lucide-react";

import type { Tech, TechnologyGroup } from "@/data/technologies";
import { technologies } from "@/data/technologies";

/** ------------------------------------------------------------------
 *  Small utilities (no external deps)
 *  ------------------------------------------------------------------ */
// Tailwind class combiner (keeps code readable vs. [..].join(" "))
function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// Safe, tiny slugify — stable id for a11y
function slugify(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

/** ------------------------------------------------------------------
 *  Icons map with strong typing
 *  ------------------------------------------------------------------ */
const ICONS = {
  Circle,
  FileCode2,
  Paintbrush2,
  Code2,
  Braces,
  Route,
  Cloud,
  Wrench,
  BadgeHelp,
  Atom,
  Palette,
  Sparkles,
  Rocket,
  CloudSun,
  GaugeCircle,
  LayoutTemplate,
  Regex,
  Terminal,
  FileText,
} as const;

type IconName = keyof typeof ICONS;

type IconProps = { className?: string };

function getIconComponent(name: string): React.ComponentType<IconProps> {
  return (
    (ICONS as Record<string, React.ComponentType<IconProps>>)[name] ?? Circle
  );
}

/** ------------------------------------------------------------------
 *  Visual theming helpers
 *  ------------------------------------------------------------------ */
const gradients = {
  python:
    "from-emerald-200 to-emerald-300 dark:from-emerald-900 dark:to-emerald-950",
  js: "from-amber-200 to-orange-300 dark:from-amber-900 dark:to-orange-950",
  default: "from-sky-200 to-blue-300 dark:from-sky-900 dark:to-indigo-950",
} as const;

function gradientFor(courseName: string): string {
  const n = courseName.toLowerCase();
  if (n.includes("python")) return gradients.python;
  if (n.includes("javascript")) return gradients.js;
  return gradients.default;
}

/** ------------------------------------------------------------------
 *  TechGrid (memoized)
 *  ------------------------------------------------------------------ */
const TechGrid = memo(function TechGrid({
  items,
  courseKey,
}: {
  items: Tech[];
  courseKey: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 pb-2 sm:grid-cols-3 lg:grid-cols-4">
      {items.map(({ icon, color, label, url }) => {
        const Icon = getIconComponent(icon as IconName);
        const itemKey = `${courseKey}__${label}__${url}`; // stable composite key
        return (
          <a
            key={itemKey}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 rounded-xl border border-gray-200",
              "bg-white p-2.5 text-gray-800 shadow-sm",
              // Respect reduced motion users
              "transition-colors duration-200 motion-reduce:transition-none",
              "hover:border-gray-300 hover:bg-gray-100",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
              "dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            )}
          >
            <Icon className={cn("h-5 w-5", color)} />
            <span className="text-sm font-medium">{label}</span>
          </a>
        );
      })}
    </div>
  );
});

/** ------------------------------------------------------------------
 *  CourseRow (accordion row, memoized)
 *  ------------------------------------------------------------------ */
const CourseRow = memo(function CourseRow({
  name,
  items,
  open,
  onToggle,
}: {
  name: string;
  items: Tech[];
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useMemo(() => `course-panel-${slugify(name)}`, [name]);
  const buttonId = useMemo(() => `course-button-${slugify(name)}`, [name]);
  const gradient = useMemo(() => gradientFor(name), [name]);

  return (
    <div className="w-full">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          // Layout & a11y
          "group relative isolate grid w-full grid-cols-[1fr_auto] items-center text-left",
          "rounded-xl border border-gray-100 dark:border-gray-700",
          "px-4 py-2 sm:px-5 sm:py-3",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
          // Text never changes color on hover
          "text-gray-900 dark:text-white",
          // Same gradient for mobile & desktop
          "bg-gradient-to-l",
          gradient,
          "shadow-sm",
          // Prefer reduced motion
          "transition-colors duration-200 ease-in-out motion-reduce:transition-none"
        )}
      >
        {/* Hover overlay darkens ONLY the background, not the text */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-xl",
            "bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/25",
            "transition-colors duration-200 motion-reduce:transition-none"
          )}
        />
        <span className="relative z-10 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold sm:text-base">{name}</span>
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-md bg-black/10 dark:bg-white/10"
          >
            {open ? "−" : "+"}
          </span>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className={cn("px-2 pt-2 sm:px-3")}
      >
        {open && <TechGrid items={items} courseKey={panelId} />}
      </div>
    </div>
  );
});

/** ------------------------------------------------------------------
 *  Page
 *  ------------------------------------------------------------------ */
export default function HomePage() {
  const [openCourse, setOpenCourse] = useState<string | null>(null);
  const techData: TechnologyGroup = technologies; // direct import, no async

  // Precompute entries once (stable ref prevents children rerenders)
  const techEntries = useMemo(() => Object.entries(techData), [techData]);

  const handleToggle = useCallback((courseName: string) => {
    setOpenCourse((prev) => (prev === courseName ? null : courseName));
  }, []);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      <div className="w-full max-w-5xl">
        <h1 className="mb-10 bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg">
          Welcome to the Web Developer Learning Portal
        </h1>

        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white sm:text-2xl">
          Explore the technologies you'll master throughout each course module.
        </h2>

        <p className="mb-8 text-sm italic text-gray-500 dark:text-gray-400">
          Select a course to view its full technology stack.
        </p>

        <section>
          <div className="flex flex-col gap-2 sm:gap-3">
            {techEntries.map(([courseName, list]) => (
              <CourseRow
                key={courseName}
                name={courseName}
                items={list}
                open={openCourse === courseName}
                onToggle={() => handleToggle(courseName)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
