import { useState } from "react";
import { ClipboardPenLine, FileText } from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-12a"
  | "quiz"
  | "final-project";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 12: Career Tips and Sample Project",
};

const finalProjectItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Final Project: AI Powered Web Application",
  dueLabel: "Aug 2",
  pointsLabel: "100 pts",
};

function PlaceholderContent({ label }: { label: string }) {
  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-950 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-100">
      {label} content will be filled in later.
    </section>
  );
}

export default function AssignmentMod12() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-12a": false,
    quiz: false,
    "final-project": false,
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
            Module 12
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 6
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, August 2, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 12 - Next Steps
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Next Steps
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 12 Canvas materials: career tips,
            sample project notes, Integrating OpenAI assignment, and the AI
            Integration quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 12: Career Tips and Sample Project"
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
        <PlaceholderContent label="Required Reading" />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 12 Assignment 12A: Integrating OpenAI"
        isOpen={openSections["assignment-12a"]}
        onToggle={() => toggleSection("assignment-12a")}
      >
        <PlaceholderContent label="Assignment 12A - Aug 2 - 20 pts" />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 12 AI Integration"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <PlaceholderContent label="Quiz - Aug 2 - 20 pts" />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Final Project"
        isOpen={openSections["final-project"]}
        onToggle={() => toggleSection("final-project")}
      >
        <ModuleItemBlock item={finalProjectItem} />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={12} />
    </section>
  );
}
