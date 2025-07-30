// src/assignments/mod10/AssignmentMod10.tsx
import { useState } from "react";

import Assignment10A from "@/courses/CS81/assignments/mod10/tasks/Assignment10A";
import Assignment10B from "@/courses/CS81/assignments/mod10/tasks/Assignment10B";
import QuizModule10 from "@/courses/CS81/assignments/mod10/tasks/QuizModule10";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod10() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 10 – React State and Props
      </h2>

      <AnimatedAccordionItem
        title="10A: Code Review - StudentCard Component"
        isOpen={openItem === "10A"}
        onToggle={() => toggleItem("10A")}
      >
        <Assignment10A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="10B: Dynamic Profile"
        isOpen={openItem === "10B"}
        onToggle={() => toggleItem("10B")}
      >
        <Assignment10B />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 10 - React Prop"
        isOpen={openItem === "Quiz: Module 10"}
        onToggle={() => toggleItem("Quiz: Module 10")}
      >
        <QuizModule10 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={10} />
    </section>
  );
}
