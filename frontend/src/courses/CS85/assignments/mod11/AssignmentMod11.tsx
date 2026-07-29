import { useState } from "react";
import { Paperclip } from "lucide-react";

import Assignment11AContent from "./Assignment11AContent";
import ModuleElevenQuiz from "./ModuleElevenQuiz";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-11a"
  | "quiz";

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module11-architecture.pdf",
};

function ModuleElevenReadMe() {
  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
      <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
        API &amp; Architecture
      </h4>
      <div className="mt-3 space-y-4 text-sm leading-7 text-sky-950 dark:text-sky-100">
        <p>
          Welcome to Module 11. You&apos;re about to learn skills that working
          developers use every single day: API integration and clean
          architecture patterns that power virtually every modern web
          application.
        </p>
        <p>
          Think about the apps you use daily: when you log in with Google, pay
          with Stripe, or get AI-generated suggestions, you&apos;re experiencing
          API integrations in action. By the end of this module, you&apos;ll
          understand how these systems work and be able to build them yourself.
        </p>
        <p>
          You&apos;ll create a sophisticated AI-powered blog application using
          OpenAI&apos;s API, implement security best practices that protect real
          applications, and learn architectural patterns that make code
          maintainable and testable. These aren&apos;t just learning
          objectives—they&apos;re job requirements for modern web developers.
          The service class pattern and API integration skills you&apos;ll
          master here will appear in your daily work regardless of which company
          you join. You&apos;re about to become the kind of developer that
          employers actively seek. Let&apos;s build something impressive!
        </p>
      </div>
    </section>
  );
}

export default function AssignmentMod11() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-11a": false,
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
            Module 11
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
            Module 11 - Clean Architecture
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Clean Architecture
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 11 Canvas materials: clean
            architecture reading, API Data assignment, and the Module 11 API
            quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 11: API & Architecture"
        isOpen={openSections.readme}
        onToggle={() => toggleSection("readme")}
      >
        <ModuleElevenReadMe />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Required Reading"
        isOpen={openSections["required-reading"]}
        onToggle={() => toggleSection("required-reading")}
      >
        <ModuleItemBlock item={requiredReadingItem} />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 11 Assignment 11A: API Data"
        isOpen={openSections["assignment-11a"]}
        onToggle={() => toggleSection("assignment-11a")}
      >
        <Assignment11AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 11 API"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleElevenQuiz />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={11} />
    </section>
  );
}
