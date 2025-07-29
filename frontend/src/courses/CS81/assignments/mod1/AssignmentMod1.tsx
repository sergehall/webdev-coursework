// src/assignments/mod1/AssignmentMod1.tsx
import { useState } from "react";

import Assignment1A from "./tasks/Assignment1A";
import Assignment1B from "./tasks/Assignment1B";
import Assignment1C from "./tasks/Assignment1C";

import QuizModule1 from "@/courses/CS81/assignments/mod1/tasks/QuizModule1";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod1() {
  useFinalModuleRedirect(12); // module 12 → redirect to /assignments/completed
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 1 – Introduction to JavaScript Values, Types and Operators
      </h2>
      <AnimatedAccordionItem
        title="1A – Setup HomePage Dev Environment"
        isOpen={openItem === "1A"}
        onToggle={() => toggleItem("1A")}
      >
        <Assignment1A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="1B – Slack Workspace"
        isOpen={openItem === "1B"}
        onToggle={() => toggleItem("1B")}
      >
        <Assignment1B />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="1C – Intro to JavaScript"
        isOpen={openItem === "1C"}
        onToggle={() => toggleItem("1C")}
      >
        <Assignment1C />
      </AnimatedAccordionItem>
      <AnimatedAccordionItem
        title="Quiz: Module 1 - Intro to JavaScript"
        isOpen={openItem === "Quiz: Module 1"}
        onToggle={() => toggleItem("Quiz: Module 1")}
      >
        <QuizModule1 />
      </AnimatedAccordionItem>
      <ModuleCompletionButton moduleId={1} />
    </section>
  );
}
