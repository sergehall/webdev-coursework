// src/assignments/mod1/AssignmentMod1.tsx
import { useState } from "react";

import Chapter1Overview from "@/courses/CS60/assignments/mod1/tasks/Chapter1Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod1() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 1 – Database Systems
      </h2>
      <AnimatedAccordionItem
        title="Course Orientation & Database Setup"
        isOpen={openItem === "1A"}
        onToggle={() => toggleItem("1A")}
      >
        <Chapter1Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={1} />
    </section>
  );
}
