// frontend/src/courses/CS60/assignments/mod8/AssignmentMod8.tsx

import { useState } from "react";

import Chapter9Overview from "@/courses/CS60/assignments/mod9/tasks/Chapter9Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod9() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 9 – Database Design
      </h2>

      <AnimatedAccordionItem
        title="Database Design Principles & Schema Development"
        isOpen={openItem === "9A"}
        onToggle={() => toggleItem("9A")}
      >
        <Chapter9Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={9} />
    </section>
  );
}
