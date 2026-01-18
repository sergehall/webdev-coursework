// frontend/src/courses/CS70/assignments/mod7/AssignmentMod8.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import ApplicationServices from "@/courses/CS70/assignments/mod7/tasks/ApplicationServices";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod7() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 7 – Application Services"
        isOpen={openItem === "07"}
        onToggle={() => toggleItem("07")}
      >
        <ApplicationServices />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={7} />
    </section>
  );
}
