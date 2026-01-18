// frontend/src/courses/CS79A/assignments/mod1/AssignmentMod1.tsx
import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import CourseIntroduction from "@/courses/CS79A/assignments/mod1/tasks/CourseIntroduction";
import AWSLearnerLabWeek1 from "@/courses/CS79A/assignments/mod1/tasks/AWSLearnerLabWeek1";

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
        title="AWS Learner Lab – Week 1"
        isOpen={openItem === "lab1"}
        onToggle={() => toggleItem("lab1")}
      >
        <AWSLearnerLabWeek1 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={1} />
    </section>
  );
}
