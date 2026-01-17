// frontend/src/courses/CS70/assignments/mod10/AssignmentMod10.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import ApplyingNetworkSecurity from "@/courses/CS70/assignments/mod10/tasks/ApplyingNetworkSecurity";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod10() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 10 – Applying Network Security"
        isOpen={openItem === "10"}
        onToggle={() => toggleItem("10")}
      >
        <ApplyingNetworkSecurity />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={10} />
    </section>
  );
}
