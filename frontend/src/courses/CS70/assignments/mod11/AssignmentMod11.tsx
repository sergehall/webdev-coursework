// frontend/src/courses/CS70/assignments/mod11/AssignmentMod11.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import NetworkSecurityDesign from "@/courses/CS70/assignments/mod11/tasks/NetworkSecurityDesign";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod11() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 11 – Network Security Design"
        isOpen={openItem === "11"}
        onToggle={() => toggleItem("11")}
      >
        <NetworkSecurityDesign />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={11} />
    </section>
  );
}
