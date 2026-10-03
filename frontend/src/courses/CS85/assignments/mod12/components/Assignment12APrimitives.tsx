import type { ReactNode } from "react";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
      {children}
    </h4>
  );
}

export function TutorialStep({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-5 text-sm leading-7 text-inherit">
      <h5 className="font-semibold">{title}</h5>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 rounded-lg border border-emerald-300 bg-white/70 p-3 dark:border-emerald-800 dark:bg-slate-950/30">
      {children}
    </div>
  );
}

export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
      <code>{children}</code>
    </pre>
  );
}
