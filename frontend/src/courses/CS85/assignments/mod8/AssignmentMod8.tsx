import { useState } from "react";
import { FileText, Paperclip } from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-8a"
  | "assignment-8b"
  | "quiz";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 8: ORM & Database Migrations",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module8-ORMDatabase.pdf",
};

function PlaceholderContent({ label }: { label: string }) {
  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-950 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-100">
      {label} content will be filled in later.
    </section>
  );
}

export default function AssignmentMod8() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-8a": false,
    "assignment-8b": false,
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
            Module 8
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 4
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, July 19, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 8 - ORM & Database Migrations
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: ORM & Database Migrations
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 8 Canvas materials: ORM and
            database migrations reading, Laravel database environment, inventory
            rebuild with Eloquent, and the module quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 8: ORM & Database Migrations"
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
        title="Module 8 Assignment 8A: Laravel w/ Database Environment"
        isOpen={openSections["assignment-8a"]}
        onToggle={() => toggleSection("assignment-8a")}
      >
        <PlaceholderContent label="Assignment 8A - Jul 19 - 20 pts" />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 8 Assignment 8B: Rebuild Your Inventory with Laravel Eloquent"
        isOpen={openSections["assignment-8b"]}
        onToggle={() => toggleSection("assignment-8b")}
      >
        <PlaceholderContent label="Assignment 8B - Jul 19 - 20 pts" />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 8 ORM & Database Migrations"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <PlaceholderContent label="Quiz - Jul 19 - 22 pts" />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={8} />
    </section>
  );
}
