// src/assignments/mod4/AssignmentMod4.tsx
import { useState } from "react";

import Assignment4 from "@/courses/CS87A/assignments/mod4/tasks/Assignment4";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod4() {
  useFinalModuleRedirect(6);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 4 – More Fun With Functions & Python Lists
      </h2>

      <AnimatedAccordionItem
        title="Assignment 4 — Dot Product, Matrix Transpose, and Scalar Multiplication (auto/manual/random)"
        isOpen={openItem === "A4"}
        onToggle={() => toggleItem("A4")}
      >
        <Assignment4 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={4} />
    </section>
  );
}
