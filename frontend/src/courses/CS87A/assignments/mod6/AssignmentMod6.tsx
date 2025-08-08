// src/assignments/mod6/AssignmentMod6.tsx
import { useState } from "react";

import Assignment6 from "@/courses/CS87A/assignments/mod6/tasks/Assignment6";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod6() {
  useFinalModuleRedirect(6); // final module → completed redirect
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 6 – Visualization & UI for Data Analysis (Tkinter)
      </h2>

      <AnimatedAccordionItem
        title='Assignment 6 — Visualization and UI for Data Analysis (radio buttons, year/state inputs, Canvas graph, "Clear"/"Quit")'
        isOpen={openItem === "A6"}
        onToggle={() => toggleItem("A6")}
      >
        <Assignment6 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={6} />
    </section>
  );
}
