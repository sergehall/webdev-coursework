// src/assignments/mod2/AssignmentMod4.tsx
import { useState } from "react";

import Chapter4Overview from "@/courses/CS60/assignments/mod4/tasks/Chapter4Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod4() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 4 – Entity Relationship (ER) Modeling
      </h2>

      <AnimatedAccordionItem
        title="ER Modeling, Class Activities & Problem Set 2"
        isOpen={openItem === "4A"}
        onToggle={() => toggleItem("4A")}
      >
        <Chapter4Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={4} />
    </section>
  );
}
