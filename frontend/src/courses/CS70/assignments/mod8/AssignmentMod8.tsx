// frontend/src/courses/CS70/assignments/mod8/AssignmentMod8.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import NetworkManagement from "@/courses/CS70/assignments/mod8/tasks/NetworkManagement";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod8() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 8 – Network Management"
        isOpen={openItem === "08"}
        onToggle={() => toggleItem("08")}
      >
        <NetworkManagement />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={8} />
    </section>
  );
}
