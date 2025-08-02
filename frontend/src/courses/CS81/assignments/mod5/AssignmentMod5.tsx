// src/assignments/mod5/AssignmentMod5.tsx
import { useState } from "react";

import Assignment5B from "@/courses/CS81/assignments/mod5/tasks/Assignment5B";
import Assignment5A from "@/courses/CS81/assignments/mod5/tasks/Assignment5A";
import ClassroomEngagementSlackPost5 from "@/courses/CS81/assignments/mod5/tasks/ClassroomEngagementSlackPost5";
import QuizModule5 from "@/courses/CS81/assignments/mod5/tasks/QuizModule5";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod5() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 5 – Higher Order Functions
      </h2>

      <AnimatedAccordionItem
        title="Classroom Engagement - Slack Post"
        isOpen={openItem === "Module 5"}
        onToggle={() => toggleItem("Module 5")}
      >
        <ClassroomEngagementSlackPost5 />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="5A: Code Review"
        isOpen={openItem === "5A"}
        onToggle={() => toggleItem("5A")}
      >
        <Assignment5A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="5B: My Week in Data"
        isOpen={openItem === "5B"}
        onToggle={() => toggleItem("5B")}
      >
        <Assignment5B />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 5 - Higher Order Functions"
        isOpen={openItem === "Quiz: Module 5"}
        onToggle={() => toggleItem("Quiz: Module 5")}
      >
        <QuizModule5 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={5} />
    </section>
  );
}
