import {
  Braces,
  Clock3,
  CodeXml,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";

const runtimeStats = [
  { value: "4", label: "Supported formats", icon: Braces },
  { value: "3s", label: "Uploaded JS ceiling", icon: Clock3 },
  { value: "45s", label: "Python ceiling", icon: TerminalSquare },
] as const;

export default function PlaygroundHero() {
  return (
    <section
      aria-labelledby="playground-title"
      className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 px-5 py-8 shadow-sm backdrop-blur sm:px-8 sm:py-10 dark:border-slate-700/80 dark:bg-slate-900/75"
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-500/10"
      />

      <div className="relative grid items-start gap-8 xl:grid-cols-[1.08fr_0.92fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-cyan-800 uppercase dark:border-cyan-900 dark:bg-cyan-950/60 dark:text-cyan-200">
            <CodeXml className="h-4 w-4" aria-hidden="true" />
            Coursework execution lab
          </p>

          <h1
            id="playground-title"
            className="mt-5 max-w-3xl text-4xl leading-[1.05] font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white"
          >
            Code Playground{" "}
            <span className="mt-1 block bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Run. Inspect. Understand.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            Execute selected JavaScript and Python exercises, inspect structured
            JSON, or preview HTML without leaving the portfolio. Every runtime
            has an explicit browser-side boundary and a predictable stop
            condition.
          </p>
        </div>

        <aside
          aria-label="Playground runtime snapshot"
          className="rounded-2xl border border-slate-200/80 bg-slate-950/[0.03] p-4 dark:border-slate-700 dark:bg-slate-950/55"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck
              className="h-4 w-4 text-emerald-500"
              aria-hidden="true"
            />
            <p className="text-xs font-black tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
              Runtime snapshot
            </p>
          </div>

          <dl className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            {runtimeStats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-white/75 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
              >
                <Icon className="h-4 w-4 text-cyan-500" aria-hidden="true" />
                <dd className="mt-3 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                  {value}
                </dd>
                <dt className="mt-1 text-xs leading-5 font-bold text-slate-500 dark:text-slate-400">
                  {label}
                </dt>
              </div>
            ))}
          </dl>

          <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-400">
            Uploaded JavaScript runs without DOM access in a disposable Worker.
            HTML previews use an opaque-origin iframe with network-blocking CSP.
          </p>
        </aside>
      </div>
    </section>
  );
}
