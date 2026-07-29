import { Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 text-slate-900 shadow-sm backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-950/90 dark:text-white">
      <Link
        to="/"
        aria-label="SMC Web Development Portfolio home"
        className="group inline-flex min-w-0 items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:ring-offset-slate-950"
      >
        <img
          src="/animated-wave.svg"
          alt=""
          className="h-10 w-10 rounded-xl shadow-sm"
          aria-hidden="true"
        />
        <span className="max-w-44 text-sm leading-5 font-black sm:max-w-none sm:text-base">
          SMC Web Development Portfolio
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
