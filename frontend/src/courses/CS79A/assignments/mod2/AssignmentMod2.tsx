// frontend/src/courses/CS79A/assignments/mod2/AssignmentMod2.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import IntroducingCloudComputingWindowsServerEC2 from "@/courses/CS79A/assignments/mod2/tasks/IntroducingCloudComputingWindowsServerEC2";
import Week2Deliverables from "@/courses/CS79A/assignments/mod2/tasks/Week2Deliverables";

export default function AssignmentMod2() {
  useFinalModuleRedirect(8);

  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Introducing Cloud Computing & Windows Server EC2"
        isOpen={openItem === "02A"}
        onToggle={() => toggleItem("02A")}
      >
        <IntroducingCloudComputingWindowsServerEC2 />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 2 – Discussion & Labs"
        isOpen={openItem === "02B"}
        onToggle={() => toggleItem("02B")}
      >
        <Week2Deliverables />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={2} />
    </section>
  );
}
