// frontend/src/courses/CS70/assignments/mod2/AssignmentMod2.tsx

import { useState } from "react";

import CablingPhysicalInstallations from "@/courses/CS70/assignments/mod2/tasks/CablingPhysicalInstallations";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod2() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 2 – Cabling & Physical Installations"
        isOpen={openItem === "02"}
        onToggle={() => toggleItem("02")}
      >
        <CablingPhysicalInstallations />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={2} />
    </section>
  );
}
