// src/assignments/mod3/AssignmentMod4.tsx
import { useState } from "react";

import Assignment3A from "@/courses/CS81/assignments/mod3/tasks/Assignment3A";
import Assignment3B from "@/courses/CS81/assignments/mod3/tasks/Assignment3B";
import ClassroomEngagementSlackPost from "@/courses/CS81/assignments/mod3/tasks/ClassroomEngagementSlackPost";
import QuizModule3 from "@/courses/CS81/assignments/mod3/tasks/QuizModule3";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod3() {
  useFinalModuleRedirect(12);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Module 3 – Functions
      </h2>

      <AnimatedAccordionItem
        title="Classroom Engagement - Slack Post"
        isOpen={openItem === "Slack Post"}
        onToggle={() => toggleItem("Slack Post")}
      >
        <ClassroomEngagementSlackPost />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="3A: Git & GitHub"
        isOpen={openItem === "3A"}
        onToggle={() => toggleItem("3A")}
      >
        <Assignment3A />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="3B: Math Toolkit Builder"
        isOpen={openItem === "3B"}
        onToggle={() => toggleItem("3B")}
      >
        <Assignment3B />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 3 - Functions"
        isOpen={openItem === "Quiz: Module 3"}
        onToggle={() => toggleItem("Quiz: Module 3")}
      >
        <QuizModule3 />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={3} />
    </section>
  );
}
