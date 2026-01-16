// frontend/src/courses/CS60/assignments/mod5/AssignmentMod5.tsx
import { useState } from "react";

import Chapter6Overview from "@/courses/CS60/assignments/mod6/tasks/Chapter6Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod6() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 6 – Normalization of Database Tables
      </h2>

      <AnimatedAccordionItem
        title="Normalization, Class Activities & Problem Set 3"
        isOpen={openItem === "6A"}
        onToggle={() => toggleItem("6A")}
      >
        <Chapter6Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={6} />
    </section>
  );
}
