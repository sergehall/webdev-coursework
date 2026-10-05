import {
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  GraduationCap,
  Layers3,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { homeStats } from "@/features/home/home-content";

const statIcons = [
  GraduationCap,
  BookOpenText,
  Layers3,
  BriefcaseBusiness,
] as const;

export default function PortfolioSnapshot() {
  return (
    <aside
      aria-label="Academic portfolio snapshot"
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-inner sm:p-5 dark:border-slate-700 dark:bg-slate-950/55"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10"
      />

      <div className="relative flex items-center justify-between gap-3">
        <p className="text-xs font-bold tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
          Portfolio snapshot
        </p>
        <Sparkles className="h-4 w-4 text-sky-500" aria-hidden="true" />
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
        {homeStats.map(({ value, label, description, href, action }, index) => {
          const Icon = statIcons[index];

          return (
            <Link
              key={label}
              to={href}
              aria-label={`${value} ${label} — ${action}`}
              title={description}
              className="group relative flex min-h-22 items-center gap-2.5 overflow-hidden rounded-xl border border-slate-200 bg-white/85 p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-gradient-to-br hover:from-sky-50 hover:via-white hover:to-indigo-50 hover:shadow-md focus:outline-none focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none sm:gap-3 sm:p-3.5 dark:border-slate-800 dark:bg-slate-900/85 dark:ring-offset-slate-950 dark:hover:border-sky-600 dark:hover:from-sky-950/70 dark:hover:via-slate-900 dark:hover:to-indigo-950/50"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-400 transition-colors group-hover:border-sky-200 group-hover:bg-sky-100/80 group-hover:text-sky-600 group-focus-visible:border-sky-200 group-focus-visible:bg-sky-100/80 group-focus-visible:text-sky-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-500 dark:group-hover:border-sky-800 dark:group-hover:bg-sky-900/50 dark:group-hover:text-sky-300"
              >
                <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none" />
              </span>
              <span className="min-w-0 pr-1">
                <span className="block text-2xl leading-none font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                  {value}
                </span>
                <span className="mt-1 block text-xs leading-4 font-semibold text-slate-500 dark:text-slate-400">
                  {label}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="absolute top-2.5 right-2.5 h-3.5 w-3.5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-600 group-focus-visible:text-sky-600 motion-reduce:transform-none dark:text-slate-500 dark:group-hover:text-sky-300"
              />
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
