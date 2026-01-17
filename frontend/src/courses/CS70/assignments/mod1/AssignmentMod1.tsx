import { useState } from "react";

import AssignmentInfo from "@/courses/CS60/assignments/modInfo/AssignmentInfo";
import NetworkTopologies from "@/courses/CS70/assignments/mod1/tasks/NetworkTopologies";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod1() {
  useFinalModuleRedirect(16);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Start Here – Network Fundamentals and Architecture"
        isOpen={openItem === "info"}
        onToggle={() => toggleItem("info")}
      >
        <AssignmentInfo />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 1 – Network Topologies"
        isOpen={openItem === "01"}
        onToggle={() => toggleItem("01")}
      >
        <NetworkTopologies />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={1} />
    </section>
  );
}
