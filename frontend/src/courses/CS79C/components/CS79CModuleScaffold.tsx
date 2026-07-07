import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import ModuleOverview from "@/courses/CS79C/components/module-scaffold/ModuleOverview";
import QuizAccordion from "@/courses/CS79C/components/module-scaffold/QuizAccordion";
import TextTaskAccordions from "@/courses/CS79C/components/module-scaffold/TextTaskAccordions";
import type { CS79CModuleBlueprint } from "@/courses/CS79C/data/moduleBlueprints";

type CS79CModuleScaffoldProps = {
  module: CS79CModuleBlueprint;
};

export default function CS79CModuleScaffold({
  module,
}: CS79CModuleScaffoldProps) {
  useFinalModuleRedirect(10);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [openTextTasks, setOpenTextTasks] = useState<Record<string, boolean>>(
    {}
  );
  const [openTaskPreviews, setOpenTaskPreviews] = useState<
    Record<string, string | null>
  >({});

  const toggleTextTask = (taskId: string) => {
    setOpenTextTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const toggleTaskPreview = (taskId: string, fileUrl: string) => {
    setOpenTaskPreviews((prev) => ({
      ...prev,
      [taskId]: prev[taskId] === fileUrl ? null : fileUrl,
    }));
  };

  const closeTaskPreview = (taskId: string) => {
    setOpenTaskPreviews((prev) => ({
      ...prev,
      [taskId]: null,
    }));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-sky-700 uppercase dark:bg-sky-900/40 dark:text-sky-200">
            {module.isFinalProject ? "Capstone" : `Module ${module.id}`}
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            {module.weekLabel}
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {module.title}
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            {module.topicLine}
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            {module.overview}
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title={`${module.title} Overview`}
        isOpen={isOverviewOpen}
        onToggle={() => setIsOverviewOpen((prev) => !prev)}
      >
        <ModuleOverview module={module} />
      </AnimatedAccordionItem>

      <TextTaskAccordions
        moduleId={module.id}
        tasks={module.textTasks}
        openTextTasks={openTextTasks}
        openTaskPreviews={openTaskPreviews}
        onToggleTextTask={toggleTextTask}
        onToggleTaskPreview={toggleTaskPreview}
        onCloseTaskPreview={closeTaskPreview}
      />

      <QuizAccordion
        quiz={module.quiz}
        isOpen={isQuizOpen}
        onToggle={() => setIsQuizOpen((prev) => !prev)}
      />

      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Current Scaffold Status
        </h3>
        <p className="mt-2 text-sm leading-7 text-gray-700 dark:text-gray-300">
          This module is now filled with real syllabus-derived context from
          Spring 2026. The next pass can layer in your actual completed labs,
          screenshots, quiz prep, answers, and submission-ready notes without
          changing the structure again.
        </p>
        <p className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">
          Milestone: {module.milestone}
        </p>
      </div>

      <ModuleCompletionButton moduleId={module.id} />
    </section>
  );
}
