// src/assignments/mod12/AssignmentMod12.tsx
import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod12() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 12 – Final Project
      </h2>

      <AnimatedAccordionItem
        title="1 – Project Planning"
        isOpen={openItem === "1"}
        onToggle={() => toggleItem("1")}
      >
        {null}
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="2 – Component Structure"
        isOpen={openItem === "2"}
        onToggle={() => toggleItem("2")}
      >
        {null}
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="3 – State Management"
        isOpen={openItem === "3"}
        onToggle={() => toggleItem("3")}
      >
        {null}
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="4 – API Integration"
        isOpen={openItem === "4"}
        onToggle={() => toggleItem("4")}
      >
        {null}
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="5 – Final Touches & Deployment"
        isOpen={openItem === "5"}
        onToggle={() => toggleItem("5")}
      >
        {null}
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={12} />
    </section>
  );
}
