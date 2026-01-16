// frontend/src/courses/CS60/assignments/mod8/AssignmentMod8.tsx

import { useState } from "react";

import Chapter8Overview from "@/courses/CS60/assignments/mod8/tasks/Chapter8Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod8() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 8 – Advanced SQL
      </h2>

      <AnimatedAccordionItem
        title="Joins, Group Queries & Problem Set 4"
        isOpen={openItem === "8A"}
        onToggle={() => toggleItem("8A")}
      >
        <Chapter8Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={8} />
    </section>
  );
}
