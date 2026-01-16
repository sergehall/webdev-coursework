// src/assignments/mod2/AssignmentMod4.tsx
import { useState } from "react";

import Chapter2Overview from "@/courses/CS60/assignments/mod2/tasks/Chapter2Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod2() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 2 – Data Models
      </h2>

      <AnimatedAccordionItem
        title="Data Models, Class Examples & Problem Set 1"
        isOpen={openItem === "2A"}
        onToggle={() => toggleItem("2A")}
      >
        <Chapter2Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={2} />
    </section>
  );
}
