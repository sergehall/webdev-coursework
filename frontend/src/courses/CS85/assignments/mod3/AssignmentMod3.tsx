import { useState } from "react";
import { FileText, Paperclip, Rocket } from "lucide-react";

import { quizAnswers, quizQuestions } from "./quizData";
import { Assignment3AContent, Assignment3BContent } from "./assignmentContent";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-3a"
  | "assignment-3b"
  | "quiz";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 3: Handling Web Requests",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module3_handlingWeb.pdf",
};

function ModuleThreeQuizShell() {
  return (
    <div className="space-y-4">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <header className="space-y-2">
          <div className="flex items-start gap-4">
            <div className="flex w-10 shrink-0 justify-center pt-1">
              <Rocket
                aria-hidden="true"
                className="h-5 w-5 text-slate-700 dark:text-slate-200"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Quiz: Module 3 - Handling Web Requests
              </h3>
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
                <span>Started: Jun 29 at 6:37pm</span>
                <span>Due: Jul 5</span>
                <span>19 pts</span>
                <span>PDO, SQL, and CRUD review</span>
              </p>
            </div>
          </div>
          <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
            This quiz block is available directly in the module for review and
            practice before submitting on SMC Canvas.
          </p>
        </header>

        <QuizGenerator questions={quizQuestions} answers={quizAnswers} />
      </section>
    </div>
  );
}

export default function AssignmentMod3() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-3a": false,
    "assignment-3b": false,
    quiz: false,
  });

  const toggleSection = (id: ModuleSectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-sky-800 uppercase dark:bg-sky-900/40 dark:text-sky-200">
            Module 3
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 2
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, July 5, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 3 - Handling Web Requests
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Handling Web Requests
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 3 Canvas materials: request
            handling notes, form-review work, secure contact form deliverables,
            and the module quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 3: Handling Web Requests"
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
        title="Module 3 Assignment 3A: Review and Comment on Form"
        isOpen={openSections["assignment-3a"]}
        onToggle={() => toggleSection("assignment-3a")}
      >
        <Assignment3AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 3 Assignment 3B: Secure Product Contact Form"
        isOpen={openSections["assignment-3b"]}
        onToggle={() => toggleSection("assignment-3b")}
      >
        <Assignment3BContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 3 - Handling Web Requests"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleThreeQuizShell />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={3} />
    </section>
  );
}
