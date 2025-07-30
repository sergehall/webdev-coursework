// src/assignments/mod7/AssignmentMod7.tsx
import { useState } from "react";

import QuizModule7 from "@/courses/CS81/assignments/mod7/tasks/QuizModule7";
import Assignment7B from "@/courses/CS81/assignments/mod7/tasks/Assignment7B";
import Assignment7A from "@/courses/CS81/assignments/mod7/tasks/Assignment7A";
import ClassroomEngagementSlackPost7 from "@/courses/CS81/assignments/mod7/tasks/ClassroomEngagementSlackPost7";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import ModuleCompletionButton from "@/components/buttons/ModuleCompletionButton";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod7() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 7 – Asynchronous JavaScript
      </h2>

      <AnimatedAccordionItem
        title="Classroom Engagement - Slack Post"
        isOpen={openItem === "Slack Post"}
        onToggle={() => toggleItem("Slack Post")}
      >
        <ClassroomEngagementSlackPost7 />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="7A: Code Review"
        isOpen={openItem === "7A"}
        onToggle={() => toggleItem("7A")}
      >
        <Assignment7A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="7B: Daily Schedule Async Simulator"
        isOpen={openItem === "7B"}
        onToggle={() => toggleItem("7B")}
      >
        <Assignment7B />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 7 - Async"
        isOpen={openItem === "Quiz: Module 7"}
        onToggle={() => toggleItem("Quiz: Module 7")}
      >
        <QuizModule7 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={7} />
    </section>
  );
}
