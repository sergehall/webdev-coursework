// frontend/src/courses/CS60/assignments/mod5/AssignmentMod5.tsx

import { useState } from "react";

import Chapter7Overview from "@/courses/CS60/assignments/mod7/tasks/Chapter7Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod7() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 7 – Introduction to Structured Query Language (SQL)
      </h2>

      <AnimatedAccordionItem
        title="SQL Setup, Labs & Problem Set 4"
        isOpen={openItem === "7A"}
        onToggle={() => toggleItem("7A")}
      >
        <Chapter7Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={7} />
    </section>
  );
}
