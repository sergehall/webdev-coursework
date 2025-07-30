// frontend/src/assignments/mod8/tasks/Assignment8A.tsx
import { useState } from "react";

import QuizModule8 from "@/courses/CS81/assignments/mod8/tasks/QuizModule8";
import Assignment8A from "@/courses/CS81/assignments/mod8/tasks/Assignment8A";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod8() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 8 – Interacting with the Browser
      </h2>

      <AnimatedAccordionItem
        title="8A: Cookie Clicker Tracker"
        isOpen={openItem === "8A"}
        onToggle={() => toggleItem("8A")}
      >
        <Assignment8A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 8 - DOM"
        isOpen={openItem === "Quiz: Module 8"}
        onToggle={() => toggleItem("Quiz: Module 8")}
      >
        <QuizModule8 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={8} />
    </section>
  );
}
