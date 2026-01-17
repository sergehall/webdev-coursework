// frontend/src/courses/CS70/assignments/mod16/AssignmentMod16.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import FinalExamComprehensive from "@/courses/CS70/assignments/mod16/tasks/FinalExamComprehensive";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod16() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 16 – Finals Week"
        isOpen={openItem === "16"}
        onToggle={() => toggleItem("16")}
      >
        <FinalExamComprehensive />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={16} />
    </section>
  );
}
