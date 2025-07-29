// src/assignments/mod9/AssignmentMod9.tsx
import { useState } from "react";

import Assignment9B from "@/courses/CS81/assignments/mod9/tasks/Assignment9B";
import QuizModule9 from "@/courses/CS81/assignments/mod9/tasks/QuizModule9";
import Assignment9A from "@/courses/CS81/assignments/mod9/tasks/Assignment9A";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod9() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 9 – React Events & Side Effects
      </h2>

      <AnimatedAccordionItem
        title="9A: Build Your First React Component"
        isOpen={openItem === "9A"}
        onToggle={() => toggleItem("9A")}
      >
        <Assignment9A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="9B: Custom Profile Component"
        isOpen={openItem === "9B"}
        onToggle={() => toggleItem("9B")}
      >
        <Assignment9B />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 9 - React"
        isOpen={openItem === "Quiz: Module 9"}
        onToggle={() => toggleItem("Quiz: Module 9")}
      >
        <QuizModule9 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={9} />
    </section>
  );
}
