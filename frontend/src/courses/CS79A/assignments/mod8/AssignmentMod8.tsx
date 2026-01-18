// frontend/src/courses/CS79A/assignments/mod8/AssignmentMod8.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import FinalExamsOverview from "@/courses/CS79A/assignments/mod8/tasks/FinalExamsOverview";
import Week8FinalDeliverables from "@/courses/CS79A/assignments/mod8/tasks/Week8FinalDeliverables";

export default function AssignmentMod8() {
  // Last module — after marking complete, redirect to the final/complete page
  useFinalModuleRedirect(8);

  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Final Exams – Overview"
        isOpen={openItem === "08A"}
        onToggle={() => toggleItem("08A")}
      >
        <FinalExamsOverview />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 8 – Discussion & Final Assessment"
        isOpen={openItem === "08B"}
        onToggle={() => toggleItem("08B")}
      >
        <Week8FinalDeliverables />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={8} />
    </section>
  );
}
