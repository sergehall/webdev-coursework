// frontend/src/courses/CS70/assignments/mod14/AssignmentMod14.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import CloudConcepts from "@/courses/CS70/assignments/mod14/tasks/CloudConcepts";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod14() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 14 – Cloud Concepts"
        isOpen={openItem === "14"}
        onToggle={() => toggleItem("14")}
      >
        <CloudConcepts />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={14} />
    </section>
  );
}
