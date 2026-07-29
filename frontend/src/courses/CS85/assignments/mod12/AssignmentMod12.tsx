import { useState } from "react";

import Assignment12AContent from "./Assignment12AContent";
import FinalProjectContent from "./FinalProjectContent";
import ModuleTwelveReadingContent from "./ModuleTwelveReadingContent";
import ModuleTwelveQuiz from "./ModuleTwelveQuiz";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-12a"
  | "quiz"
  | "final-project";

function ModuleTwelveReadMe() {
  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
      <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
        AI Integration and Career Tips
      </h4>
      <div className="mt-3 space-y-4 text-sm leading-7 text-sky-950 dark:text-sky-100">
        <p>
          Congratulations! You&apos;ve reached the culmination of your PHP
          journey. Over the past eleven modules, you&apos;ve transformed from a
          beginner into a developer who can build secure, database-driven web
          applications with professional architecture.
        </p>
        <p>
          What makes this module special is that you&apos;re positioning
          yourself at the forefront of modern technology. While many developers
          are still figuring out AI integration, you&apos;re about to build an
          AI-powered blog post generator using the same patterns that companies
          like GitHub and Shopify use in production.
        </p>
        <p>
          This isn&apos;t just another tutorial—you&apos;ll learn prompt
          engineering, service layer architecture, and external API integration
          while creating portfolio materials that make hiring managers take
          notice. The timing couldn&apos;t be better: the 2025 job market is
          hungry for developers who combine solid web fundamentals with AI
          capabilities.
        </p>
        <p>
          By this module&apos;s end, you&apos;ll have an application showcasing
          problem-solving skills, technical depth, and a forward-thinking
          approach that employers actively seek. You&apos;re not just completing
          coursework—you&apos;re building the foundation for a successful
          development career.
        </p>
      </div>
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
        title="ReadMe Module 12: AI Integration and Career Tips"
        isOpen={openSections.readme}
        onToggle={() => toggleSection("readme")}
      >
        <ModuleTwelveReadMe />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Required Reading"
        isOpen={openSections["required-reading"]}
        onToggle={() => toggleSection("required-reading")}
      >
        <ModuleTwelveReadingContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 12 Assignment 12A: Integrating OpenAI"
        isOpen={openSections["assignment-12a"]}
        onToggle={() => toggleSection("assignment-12a")}
      >
        <Assignment12AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 12 AI Integration"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleTwelveQuiz />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Final Project"
        isOpen={openSections["final-project"]}
        onToggle={() => toggleSection("final-project")}
      >
        <FinalProjectContent />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={12} />
    </section>
  );
}
