// src/assignments/mod2/AssignmentMod4.tsx
import { useState } from "react";

import Assignment2A from "./tasks/Assignment2A";
import Assignment2B from "./tasks/Assignment2B";
import Assignment2C from "./tasks/Assignment2C";

import QuizModule2 from "@/courses/CS81/assignments/mod2/tasks/QuizModule2";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod2() {
  useFinalModuleRedirect(12); // module 12 → redirect to /assignments/completed
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 2 – Program Structure
      </h2>
      <AnimatedAccordionItem
        title="2A – Hello, World! with External JavaScript"
        isOpen={openItem === "2A"}
        onToggle={() => toggleItem("2A")}
      >
        <Assignment2A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="2B – FizzBuzz"
        isOpen={openItem === "2B"}
        onToggle={() => toggleItem("2B")}
      >
        <Assignment2B />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="2C – Conditions & Loops"
        isOpen={openItem === "2C"}
        onToggle={() => toggleItem("2C")}
      >
        <Assignment2C />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 2 - Program Structure"
        isOpen={openItem === "Quiz: Module 2"}
        onToggle={() => toggleItem("Quiz: Module 2")}
      >
        <QuizModule2 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={2} />
    </section>
  );
}
