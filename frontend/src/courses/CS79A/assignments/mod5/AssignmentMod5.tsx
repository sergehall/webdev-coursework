// frontend/src/courses/CS79A/assignments/mod5/AssignmentMod5.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import IAMAndVirtualPrivateCloud from "@/courses/CS79A/assignments/mod5/tasks/IAMAndVirtualPrivateCloud";
import Week5Deliverables from "@/courses/CS79A/assignments/mod5/tasks/Week5Deliverables";

export default function AssignmentMod5() {
  useFinalModuleRedirect(8);

  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="IAM & Virtual Private Cloud"
        isOpen={openItem === "05A"}
        onToggle={() => toggleItem("05A")}
      >
        <IAMAndVirtualPrivateCloud />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 5 – Discussion & Assignments"
        isOpen={openItem === "05B"}
        onToggle={() => toggleItem("05B")}
      >
        <Week5Deliverables />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={5} />
    </section>
  );
}
