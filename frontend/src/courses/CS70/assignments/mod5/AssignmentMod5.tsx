// frontend/src/courses/CS70/assignments/mod5/AssignmentMod5.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import RoutingAdvancedSwitching from "@/courses/CS70/assignments/mod5/tasks/RoutingAdvancedSwitching";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod5() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 5 – Routing & Advanced Switching"
        isOpen={openItem === "05"}
        onToggle={() => toggleItem("05")}
      >
        <RoutingAdvancedSwitching />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={5} />
    </section>
  );
}
