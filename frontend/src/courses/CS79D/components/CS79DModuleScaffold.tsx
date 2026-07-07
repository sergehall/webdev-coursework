import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import ModuleOverview from "@/courses/CS79D/components/module-scaffold/ModuleOverview";
import QuizAccordions from "@/courses/CS79D/components/module-scaffold/QuizAccordions";
import TextTaskAccordions from "@/courses/CS79D/components/module-scaffold/TextTaskAccordions";
import type { CS79DModuleBlueprint } from "@/courses/CS79D/data/moduleBlueprints";

type CS79DModuleScaffoldProps = {
  module: CS79DModuleBlueprint;
};

export default function CS79DModuleScaffold({
  module,
}: CS79DModuleScaffoldProps) {
  useFinalModuleRedirect(8);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isMidtermOpen, setIsMidtermOpen] = useState(false);
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
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-rose-700 uppercase dark:bg-rose-900/40 dark:text-rose-200">
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
          <p className="mt-2 text-sm font-medium text-rose-700 dark:text-rose-300">
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

      <QuizAccordions
        quiz={module.quiz}
        midtermQuiz={module.midtermQuiz}
        isQuizOpen={isQuizOpen}
        isMidtermOpen={isMidtermOpen}
        onToggleQuiz={() => setIsQuizOpen((prev) => !prev)}
        onToggleMidterm={() => setIsMidtermOpen((prev) => !prev)}
      />

      <ModuleCompletionButton moduleId={module.id} />
    </section>
  );
}
