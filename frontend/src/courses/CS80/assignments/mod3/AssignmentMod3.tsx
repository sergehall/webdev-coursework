// src/assignments/mod3/Assignment3.tsx
import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import Assignment3 from "@/courses/CS80/assignments/mod3/tasks/Assignment3";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod3() {
  useFinalModuleRedirect(6); // module 6 → redirect to /assignments/completed
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 3: JavaScript Practice — prompt, alert, conditionals, loops,
        output
      </h2>

      <AnimatedAccordionItem
        title="Assignment - Module 3"
        isOpen={openItem === "Module 3"}
        onToggle={() => toggleItem("Module 3")}
      >
        <Assignment3 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={3} />
    </section>
  );
}
