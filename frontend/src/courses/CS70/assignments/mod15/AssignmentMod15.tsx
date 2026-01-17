// frontend/src/courses/CS70/assignments/mod15/AssignmentMod15.tsx

import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import Review from "@/courses/CS70/assignments/mod15/tasks/Review";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod15() {
  useFinalModuleRedirect(16);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Week 15 – Review"
        isOpen={openItem === "15"}
        onToggle={() => toggleItem("15")}
      >
        <Review />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={15} />
    </section>
  );
}
