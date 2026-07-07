import { useState } from "react";
import { FileText, Paperclip, type LucideIcon } from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-10a"
  | "quiz";

type CanvasItem = {
  icon: LucideIcon;
  title: string;
  dueLabel?: string;
  pointsLabel?: string;
};

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 10: User Authentication",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module10-authentication.pdf",
};

function CanvasRow({ item }: { item: CanvasItem }) {
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

function ModuleItemBlock({ item }: { item: CanvasItem }) {
  return (
    <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-950/30">
      <CanvasRow item={item} />
    </ul>
  );
}

function PlaceholderContent({ label }: { label: string }) {
  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-950 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-100">
      {label} content will be filled in later.
    </section>
  );
}

export default function AssignmentMod10() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-10a": false,
    quiz: false,
  });

  const toggleSection = (sectionId: ModuleSectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-sky-800 uppercase dark:bg-sky-900/40 dark:text-sky-200">
            Module 10
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 5
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, July 26, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 10 - User Authentication
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: User Authentication
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 10 Canvas materials: user
            authentication reading, authentication assignment, and the Module 10
            authentication quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 10: User Authentication"
        isOpen={openSections.readme}
        onToggle={() => toggleSection("readme")}
      >
        <ModuleItemBlock item={readmeItem} />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Required Reading"
        isOpen={openSections["required-reading"]}
        onToggle={() => toggleSection("required-reading")}
      >
        <ModuleItemBlock item={requiredReadingItem} />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 10 Assignment 10A: User Authentication"
        isOpen={openSections["assignment-10a"]}
        onToggle={() => toggleSection("assignment-10a")}
      >
        <PlaceholderContent label="Assignment 10A - Jul 26 - 20 pts" />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 10 Authentication"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <PlaceholderContent label="Quiz - 14 pts" />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={10} />
    </section>
  );
}
