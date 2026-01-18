// frontend/src/courses/CS70/assignments/mod6/AssignmentMod8.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import NetworkServices from "@/courses/CS70/assignments/mod6/tasks/NetworkServices";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod6() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 6 – Network Services"
        isOpen={openItem === "06"}
        onToggle={() => toggleItem("06")}
      >
        <NetworkServices />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={6} />
    </section>
  );
}
