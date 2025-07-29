// src/assignments/mod4/AssignmentMod4.tsx
import { useState } from "react";

import Assignment4A from "@/courses/CS81/assignments/mod4/tasks/Assignment4A";
import Assignment4B from "@/courses/CS81/assignments/mod4/tasks/Assignment4B";
import QuizModule4 from "@/courses/CS81/assignments/mod4/tasks/QuizModule4";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod4() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 4 – Data Structures: Objects and Arrays
      </h2>

      <AnimatedAccordionItem
        title="4A: Review readingTracker.js"
        isOpen={openItem === "4A"}
        onToggle={() => toggleItem("4A")}
      >
        <Assignment4A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="4B: My Personal Data Objects"
        isOpen={openItem === "4B"}
        onToggle={() => toggleItem("4B")}
      >
        <Assignment4B />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 4 - Objects and Arrays"
        isOpen={openItem === "Quiz: Module 4"}
        onToggle={() => toggleItem("Quiz: Module 4")}
      >
        <QuizModule4 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={4} />
    </section>
  );
}
