// src/assignments/mod5/AssignmentMod5.tsx
import { useState } from "react";

import Assignment5 from "@/courses/CS87A/assignments/mod5/tasks/Assignment5";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod5() {
  useFinalModuleRedirect(6);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 5 – Elections Analysis with Dictionaries & File I/O
      </h2>

      <AnimatedAccordionItem
        title="Assignment 5 — President Candidate vs House Member Winners (state majorities, electoral votes)"
        isOpen={openItem === "A5"}
        onToggle={() => toggleItem("A5")}
      >
        <Assignment5 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={5} />
    </section>
  );
}
