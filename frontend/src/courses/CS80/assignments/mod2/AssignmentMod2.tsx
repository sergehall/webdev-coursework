// src/assignments/mod2/AssignmentMod2.tsx
import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import Assignment2 from "@/courses/CS80/assignments/mod2/tasks/Assignment2";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod2() {
  useFinalModuleRedirect(6); // module 6 → redirect to /assignments/completed
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 2: Set the style of web pages using the Cascading Style Sheet
        (CSS3) language.
      </h2>

      <AnimatedAccordionItem
        title="Assignment - Module 2"
        isOpen={openItem === "Module 2"}
        onToggle={() => toggleItem("Module 2")}
      >
        <Assignment2 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={2} />
    </section>
  );
}
