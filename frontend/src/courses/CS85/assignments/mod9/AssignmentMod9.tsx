import { useState } from "react";
import { FileText, Paperclip } from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId = "readme" | "required-reading" | "assignment-9a" | "quiz";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 9: Full CRUD & Validation",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module9-CRUD.pdf",
};

function PlaceholderContent({ label }: { label: string }) {
  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-950 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-100">
      {label} content will be filled in later.
    </section>
  );
}

export default function AssignmentMod9() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-9a": false,
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
            Module 9
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
            Module 9 - Full CRUD & Validation
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Full CRUD & Validation
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 9 Canvas materials: CRUD reading,
            the Contact List App assignment, and the Module 9 CRUD quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 9: Full CRUD & Validation"
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
        title="Module 9 Assignment 9A: Contact List App"
        isOpen={openSections["assignment-9a"]}
        onToggle={() => toggleSection("assignment-9a")}
      >
        <PlaceholderContent label="Assignment 9A - Jul 26 - 20 pts" />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 9 CRUD"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <PlaceholderContent label="Quiz - 13 pts" />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={9} />
    </section>
  );
}
