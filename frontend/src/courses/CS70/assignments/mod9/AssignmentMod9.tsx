// frontend/src/courses/CS70/assignments/mod9/AssignmentMod9.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import NetworkSecurityConcepts from "@/courses/CS70/assignments/mod9/tasks/NetworkSecurityConcepts";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod9() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 9 – Network Security Concepts"
        isOpen={openItem === "09"}
        onToggle={() => toggleItem("09")}
      >
        <NetworkSecurityConcepts />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={9} />
    </section>
  );
}
