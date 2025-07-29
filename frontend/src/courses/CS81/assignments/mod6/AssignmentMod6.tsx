// frontend/src/assignments/mod6/AssignmentMod6.tsx
import { useState } from "react";

import Assignment6A from "@/courses/CS81/assignments/mod6/tasks/Assignment6a";
import Assignment6B from "@/courses/CS81/assignments/mod6/tasks/Assignment6B";
import QuizModule6 from "@/courses/CS81/assignments/mod6/tasks/QuizModule6";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod6() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 6 – JavaScript and the Browser & The Document Object Model
      </h2>

      <AnimatedAccordionItem
        title="6A: Code Review"
        isOpen={openItem === "6A"}
        onToggle={() => toggleItem("6A")}
      >
        <Assignment6A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="6B: Personal Assistant"
        isOpen={openItem === "6B"}
        onToggle={() => toggleItem("6B")}
      >
        <Assignment6B />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 6 - The Secret Life of Objects"
        isOpen={openItem === "Quiz: Module 6"}
        onToggle={() => toggleItem("Quiz: Module 6")}
      >
        <QuizModule6 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={6} />
    </section>
  );
}
