// frontend/src/courses/CS60/assignments/mod8/AssignmentMod8.tsx

import { useState } from "react";

import Chapter10Overview from "@/courses/CS60/assignments/mod10/tasks/Chapter10Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod10() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 10 – Transaction Management, Concurrency Control & Final Exam
      </h2>

      <AnimatedAccordionItem
        title="Transactions, Concurrency Control & Final Exam Preparation"
        isOpen={openItem === "10A"}
        onToggle={() => toggleItem("10A")}
      >
        <Chapter10Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={10} />
    </section>
  );
}
