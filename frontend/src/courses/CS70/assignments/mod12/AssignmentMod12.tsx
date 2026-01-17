// frontend/src/courses/CS70/assignments/mod12/AssignmentMod12.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import WirelessNetworking from "@/courses/CS70/assignments/mod12/tasks/WirelessNetworking";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod12() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 12 – Wireless Networking"
        isOpen={openItem === "12"}
        onToggle={() => toggleItem("12")}
      >
        <WirelessNetworking />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={12} />
    </section>
  );
}
