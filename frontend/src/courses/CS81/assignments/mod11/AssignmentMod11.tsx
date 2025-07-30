// src/assignments/mod11/AssignmentMod11.tsx
import { useState } from "react";

import Assignment11 from "@/courses/CS81/assignments/mod11/tasks/Assignment11";
import QuizModule11 from "@/courses/CS81/assignments/mod11/tasks/QuizModule11";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod11() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 11 – React Data Forms
      </h2>

      <AnimatedAccordionItem
        title="Assignment 11A: React Contact Form"
        isOpen={openItem === "11A"}
        onToggle={() => toggleItem("11A")}
      >
        <Assignment11 />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 11 - React Forms"
        isOpen={openItem === "Quiz: Module 11"}
        onToggle={() => toggleItem("Quiz: Module 11")}
      >
        <QuizModule11 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={11} />
    </section>
  );
}
