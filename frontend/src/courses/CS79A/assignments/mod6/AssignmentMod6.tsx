// frontend/src/courses/CS79A/assignments/mod6/AssignmentMod8.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import UseEC2ToCreateAWordPressSite from "@/courses/CS79A/assignments/mod6/tasks/UseEC2ToCreateAWordPressSite";
import Week6Deliverables from "@/courses/CS79A/assignments/mod6/tasks/Week6Deliverables";

export default function AssignmentMod6() {
  useFinalModuleRedirect(8);

  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Use EC2 To Create A WordPress Site"
        isOpen={openItem === "06A"}
        onToggle={() => toggleItem("06A")}
      >
        <UseEC2ToCreateAWordPressSite />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 6 – Discussion, Assignment & Lab"
        isOpen={openItem === "06B"}
        onToggle={() => toggleItem("06B")}
      >
        <Week6Deliverables />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={6} />
    </section>
  );
}
