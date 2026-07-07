import type { LucideIcon } from "lucide-react";

export type CanvasItem = {
  icon: LucideIcon;
  title: string;
  dueLabel?: string;
  pointsLabel?: string;
};

export function CanvasRow({ item }: { item: CanvasItem }) {
  const Icon = item.icon;

  return (
    <li className="flex gap-4 px-4 py-3 transition hover:bg-sky-50/70 dark:hover:bg-sky-950/20">
      <div className="flex w-10 shrink-0 justify-center pt-1">
        <Icon
          aria-hidden="true"
          className="h-5 w-5 text-slate-700 dark:text-slate-200"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-7 font-medium break-words text-slate-700 dark:text-slate-200">
          {item.title}
        </p>
        {item.dueLabel || item.pointsLabel ? (
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
            {item.dueLabel ? <span>{item.dueLabel}</span> : null}
            {item.pointsLabel ? <span>{item.pointsLabel}</span> : null}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export function ModuleItemBlock({ item }: { item: CanvasItem }) {
  return (
    <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-950/30">
      <CanvasRow item={item} />
    </ul>
  );
}
