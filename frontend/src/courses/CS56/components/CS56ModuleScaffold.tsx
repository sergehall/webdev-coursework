import { useState } from "react";

import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import type { CS56ModuleBlueprint } from "@/courses/CS56/data/moduleBlueprints";
import CanvasSections from "@/courses/CS56/components/module-scaffold/CanvasSections";
import ModuleOverview from "@/courses/CS56/components/module-scaffold/ModuleOverview";
import TextTaskAccordions from "@/courses/CS56/components/module-scaffold/TextTaskAccordions";

type CS56ModuleScaffoldProps = {
  module: CS56ModuleBlueprint;
};

export default function CS56ModuleScaffold({
  module,
}: CS56ModuleScaffoldProps) {
  useFinalModuleRedirect(15);
  const hasCanvasSections = Boolean(module.canvasSections?.length);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [openCanvasSections, setOpenCanvasSections] = useState<
    Record<string, boolean>
  >({});
  const [openCanvasItemPreviews, setOpenCanvasItemPreviews] = useState<
    Record<string, string | null>
  >({});
  const [openCanvasGroups, setOpenCanvasGroups] = useState<
    Record<string, boolean>
  >({});
  const [openCanvasItemDetails, setOpenCanvasItemDetails] = useState<
    Record<string, boolean>
  >({});
  const [openTextTasks, setOpenTextTasks] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCanvasSection = (sectionId: string) => {
    setOpenCanvasSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleCanvasGroup = (groupId: string) => {
    setOpenCanvasGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const toggleCanvasItemPreview = (itemId: string, fileUrl: string) => {
    setOpenCanvasItemPreviews((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === fileUrl ? null : fileUrl,
    }));
  };

  const closeCanvasItemPreview = (itemId: string) => {
    setOpenCanvasItemPreviews((prev) => ({
      ...prev,
      [itemId]: null,
    }));
  };

  const toggleCanvasItemDetails = (itemId: string) => {
    setOpenCanvasItemDetails((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleTextTask = (taskId: string) => {
    setOpenTextTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-orange-800 uppercase dark:bg-orange-900/40 dark:text-orange-200">
            Module {module.id}
          </span>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">
            {module.weekLabel}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {module.dateLabel}
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {module.title}
          </h2>
          <p className="mt-2 text-sm font-medium text-orange-700 dark:text-orange-300">
            {module.topicLine}
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            {module.overview}
          </p>
        </div>
      </header>

      {module.canvasSections?.length ? (
        <CanvasSections
          sections={module.canvasSections}
          openCanvasSections={openCanvasSections}
          openCanvasGroups={openCanvasGroups}
          openCanvasItemDetails={openCanvasItemDetails}
          openCanvasItemPreviews={openCanvasItemPreviews}
          onToggleSection={toggleCanvasSection}
          onToggleGroup={toggleCanvasGroup}
          onToggleItemDetails={toggleCanvasItemDetails}
          onToggleItemPreview={toggleCanvasItemPreview}
          onCloseItemPreview={closeCanvasItemPreview}
        />
      ) : null}

      {!hasCanvasSections ? (
        <>
          <ModuleOverview
            module={module}
            isOpen={isOverviewOpen}
            onToggle={() => setIsOverviewOpen((prev) => !prev)}
          />
          <TextTaskAccordions
            moduleId={module.id}
            tasks={module.textTasks}
            openTextTasks={openTextTasks}
            onToggleTextTask={toggleTextTask}
          />
        </>
      ) : null}

      <ModuleCompletionButton moduleId={module.id} />
    </section>
  );
}
