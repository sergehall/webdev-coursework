// frontend/src/courses/CS79A/assignments/mod7/AssignmentMod7.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import AWSEducateAndOpenVPN from "@/courses/CS79A/assignments/mod7/tasks/AWSEducateAndOpenVPN";
import Week7Deliverables from "@/courses/CS79A/assignments/mod7/tasks/Week7Deliverables";

export default function AssignmentMod7() {
  useFinalModuleRedirect(8);

  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="AWS Educate & OpenVPN"
        isOpen={openItem === "07A"}
        onToggle={() => toggleItem("07A")}
      >
        <AWSEducateAndOpenVPN />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 7 – Discussion, Assignment & Lab"
        isOpen={openItem === "07B"}
        onToggle={() => toggleItem("07B")}
      >
        <Week7Deliverables />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={7} />
    </section>
  );
}
