// frontend/src/courses/CS79A/assignments/mod3/AssignmentMod3.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import WorkingWithUbuntuServer from "@/courses/CS79A/assignments/mod3/tasks/WorkingWithUbuntuServer";
import HostingAStaticWebsiteInAWS from "@/courses/CS79A/assignments/mod3/tasks/HostingAStaticWebsiteInAWS";
import Week3Deliverables from "@/courses/CS79A/assignments/mod3/tasks/Week3Deliverables";
import Week3bDeliverables from "@/courses/CS79A/assignments/mod3/tasks/Week3bDeliverables";

export default function AssignmentMod3() {
  useFinalModuleRedirect(8);

  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Working With Ubuntu Server"
        isOpen={openItem === "03A"}
        onToggle={() => toggleItem("03A")}
      >
        <WorkingWithUbuntuServer />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 3 – Discussion, Assignment & Lab"
        isOpen={openItem === "03B"}
        onToggle={() => toggleItem("03B")}
      >
        <Week3Deliverables />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Hosting A Static Website In AWS"
        isOpen={openItem === "03C"}
        onToggle={() => toggleItem("03C")}
      >
        <HostingAStaticWebsiteInAWS />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 3b – Discussion & Lab"
        isOpen={openItem === "03D"}
        onToggle={() => toggleItem("03D")}
      >
        <Week3bDeliverables />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={3} />
    </section>
  );
}
