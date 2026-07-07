import { useState } from "react";
import { FileText, Paperclip, Rocket } from "lucide-react";

import { quizAnswers, quizQuestions } from "./quizData";
import { Assignment2AContent, Assignment2BContent } from "./assignmentContent";

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
  | "assignment-2a"
  | "assignment-2b"
  | "quiz";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 2: Condition Statements & Loops",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module2_reading.pdf",
};

function ModuleTwoQuiz() {
  return (
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
            <h3 className="text-sm leading-7 font-medium text-slate-700 dark:text-slate-200">
              Quiz: Module 2 - Condition Statements & Loops
            </h3>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
              <span>Started: Jun 24 at 1:57am</span>
              <span>Due: Jun 28 at 11:59pm</span>
              <span>10 pts</span>
              <span>Timed quiz</span>
            </p>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
          Note: this is a timed quiz. You may check the remaining time you have
          at any point while taking the quiz by pressing the keyboard
          combination SHIFT, ALT, and T. Again: SHIFT, ALT, and T.
        </p>
      </header>

      <QuizGenerator questions={quizQuestions} answers={quizAnswers} />
    </section>
  );
}

export default function AssignmentMod2() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-2a": false,
    "assignment-2b": false,
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
            Module 2
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 1
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, June 28, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 2 - Control Structures & Loops
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Condition Statements & Loops
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            Continue building PHP fluency with condition statements, branching
            logic, and loop structures used to make server-side programs respond
            to changing data.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 2: Condition Statements & Loops"
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
        title="Module 2 Assignment 2A: if/else Business"
        isOpen={openSections["assignment-2a"]}
        onToggle={() => toggleSection("assignment-2a")}
      >
        <Assignment2AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 2 Assignment 2B: Time loops"
        isOpen={openSections["assignment-2b"]}
        onToggle={() => toggleSection("assignment-2b")}
      >
        <Assignment2BContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 2 - Condition Statements & Loops"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleTwoQuiz />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={2} />
    </section>
  );
}
