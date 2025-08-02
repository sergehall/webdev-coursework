// src/assignments/mod6/AssignmentMod6.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import Assignment6 from "@/courses/CS80/assignments/mod6/tasks/Assignment6";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod6() {
  useFinalModuleRedirect(6); // module 6 → redirect to /assignments/completed
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 6 – Bonus Assignment
      </h2>

      <AnimatedAccordionItem
        title="Bonus Assignment - Module 6"
        isOpen={openItem === "Module 6"}
        onToggle={() => toggleItem("Module 6")}
      >
        <Assignment6 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={6} />
    </section>
  );
}
