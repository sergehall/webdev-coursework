// frontend/src/courses/CS70/assignments/mod13/AssignmentMod13.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import RemoteAccessMethods from "@/courses/CS70/assignments/mod13/tasks/RemoteAccessMethods";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod13() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 13 – Remote Access Methods"
        isOpen={openItem === "13"}
        onToggle={() => toggleItem("13")}
      >
        <RemoteAccessMethods />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={13} />
    </section>
  );
}
