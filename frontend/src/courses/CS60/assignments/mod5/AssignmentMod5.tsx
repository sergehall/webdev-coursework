// frontend/src/courses/CS60/assignments/mod5/AssignmentMod5.tsx
import { useState } from "react";

import Chapter5Overview from "@/courses/CS60/assignments/mod5/tasks/Chapter5Overview";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod5() {
  useFinalModuleRedirect(10);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Chapter 5 – Advanced Data Modeling
      </h2>

      <AnimatedAccordionItem
        title="Advanced ER Modeling, Class Exercises & Mid Semester Test"
        isOpen={openItem === "5A"}
        onToggle={() => toggleItem("5A")}
      >
        <Chapter5Overview />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={5} />
    </section>
  );
}
