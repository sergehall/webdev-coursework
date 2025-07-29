// src/assignments/mod11/AssignmentMod11.tsx
import { useState } from "react";

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
        Module 11 – Public APIs
      </h2>

      <AnimatedAccordionItem
        title="1 – Title"
        isOpen={openItem === "1"}
        onToggle={() => toggleItem("1")}
      >
        {/* Task content goes here */}
        {null}
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="2 – Title"
        isOpen={openItem === "2"}
        onToggle={() => toggleItem("2")}
      >
        {/* Task content goes here */}
        {null}
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="3 – Title"
        isOpen={openItem === "3"}
        onToggle={() => toggleItem("3")}
      >
        {/* Task content goes here */}
        {null}
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="4 – Title"
        isOpen={openItem === "4"}
        onToggle={() => toggleItem("4")}
      >
        {/* Task content goes here */}
        {null}
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="5 – Title"
        isOpen={openItem === "5"}
        onToggle={() => toggleItem("5")}
      >
        {/* Task content goes here */}
        {null}
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={11} />
    </section>
  );
}
