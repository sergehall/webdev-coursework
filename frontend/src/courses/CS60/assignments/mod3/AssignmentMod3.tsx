// src/assignments/mod2/AssignmentMod4.tsx
import { useState } from "react";

import Chapter3Overview from "@/courses/CS60/assignments/mod3/tasks/Chapter3Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod3() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 3 – The Relational Data Model
      </h2>

      <AnimatedAccordionItem
        title="Relational Model, SQL Introduction & Problem Set 1"
        isOpen={openItem === "3A"}
        onToggle={() => toggleItem("3A")}
      >
        <Chapter3Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={3} />
    </section>
  );
}
