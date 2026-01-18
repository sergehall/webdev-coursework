// frontend/src/courses/CS79A/assignments/mod4/AssignmentMod4.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import AWSConceptsS3AndServersContinues from "@/courses/CS79A/assignments/mod4/tasks/AWSConceptsS3AndServersContinues";
import Week4Deliverables from "@/courses/CS79A/assignments/mod4/tasks/Week4Deliverables";

export default function AssignmentMod4() {
  useFinalModuleRedirect(8);

  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="AWS Concepts, S3, and Servers Continues"
        isOpen={openItem === "04A"}
        onToggle={() => toggleItem("04A")}
      >
        <AWSConceptsS3AndServersContinues />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 4 – Discussion, Assignment, Lab & Midterm"
        isOpen={openItem === "04B"}
        onToggle={() => toggleItem("04B")}
      >
        <Week4Deliverables />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={4} />
    </section>
  );
}
