// frontend/src/courses/CS79D/assignments/mod1/AssignmentMod1.tsx
import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import CourseIntroduction from "@/courses/CS79D/assignments/mod1/tasks/CourseIntroduction";
import Week1Deliverables from "@/courses/CS79D/assignments/mod1/tasks/Week1Deliverables";

export default function AssignmentMod1() {
  useFinalModuleRedirect(8);

  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <AnimatedAccordionItem
        title="Course Introduction"
        isOpen={openItem === "intro"}
        onToggle={() => toggleItem("intro")}
      >
        <CourseIntroduction />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Week 1 – Introduction to AWS Security"
        isOpen={openItem === "week1"}
        onToggle={() => toggleItem("week1")}
      >
        <Week1Deliverables />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={1} />
    </section>
  );
}
