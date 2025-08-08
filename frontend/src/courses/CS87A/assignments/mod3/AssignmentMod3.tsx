// src/assignments/mod3/AssignmentMod3.tsx
import { useState } from "react";

import Assignment3 from "@/courses/CS87A/assignments/mod3/tasks/Assignment3";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod3() {
  useFinalModuleRedirect(6);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 3 – Tic-Tac-Toe with Variable Board Size & Difficulty
      </h2>
      <AnimatedAccordionItem
        title="Assignment 3 — You will create a Python tic-tac-toe game!"
        isOpen={openItem === "A3"}
        onToggle={() => toggleItem("A3")}
      >
        <Assignment3 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={3} />
    </section>
  );
}
