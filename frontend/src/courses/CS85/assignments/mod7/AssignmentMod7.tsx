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
  | "assignment-7a"
  | "assignment-7b"
  | "quiz";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 7: Laravel Intro",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module7-lavravel.pdf",
};

function PlaceholderContent({ label }: { label: string }) {
  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-950 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-100">
      {label} content will be filled in later.
    </section>
  );
}

export default function AssignmentMod7() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-7a": false,
    "assignment-7b": false,
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
            Module 7
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
            Module 7 - Laravel Intro
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Laravel Intro
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 7 Canvas materials: Laravel intro
            reading, Hello Route, Basic Routing, and the Laravel quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 7: Laravel Intro"
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
        title="Module 7 Assignment 7A: Hello Route"
        isOpen={openSections["assignment-7a"]}
        onToggle={() => toggleSection("assignment-7a")}
      >
        <PlaceholderContent label="Assignment 7A - Jul 19 - 20 pts" />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 7 Assignment 7B: Basic Routing"
        isOpen={openSections["assignment-7b"]}
        onToggle={() => toggleSection("assignment-7b")}
      >
        <PlaceholderContent label="Assignment 7B - Jul 19 - 20 pts" />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 7 Laravel"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <PlaceholderContent label="Quiz - Jul 19 - 24 pts" />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={7} />
    </section>
  );
}
