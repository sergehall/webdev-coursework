// src/assignments/mod1/AssignmentMod1.tsx
import { useState } from "react";

import Assignment1 from "@/courses/CS87A/assignments/mod1/tasks/Assignment1";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod1() {
  useFinalModuleRedirect(6); // module 6 → redirect to /assignments/completed
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
        title="Installing and Using Python, IDLE, and the Canvas Submission System"
        isOpen={openItem === "IDLE"}
        onToggle={() => toggleItem("IDLE")}
      >
        <Assignment1 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={1} />
    </section>
  );
}
