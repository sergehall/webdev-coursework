// src/assignments/mod12/AssignmentMod12.tsx
import { useState } from "react";

import FinalProjectReveal from "@/components/FinalProjectReveal";
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
        title="Final Project Preview"
        isOpen={openItem === "Final"}
        onToggle={() => toggleItem("Final")}
      >
        <FinalProjectReveal
          completedTasks={12}
          totalTasks={12}
          imageUrl="/sandbox/CS81/mod-12/final-screenshot.png"
        />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={12} />
    </section>
  );
}
