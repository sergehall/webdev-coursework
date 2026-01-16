// src/assignments/mod2/AssignmentMod4.tsx
import { useState } from "react";

import Assignment2 from "@/courses/CS87A/assignments/mod2/tasks/Assignment2";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod2() {
  useFinalModuleRedirect(6);
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
        title="Assignment 2 — Math Trivia Quiz (random questions & scoring)"
        isOpen={openItem === "A2"}
        onToggle={() => toggleItem("A2")}
      >
        <Assignment2 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={2} />
    </section>
  );
}
