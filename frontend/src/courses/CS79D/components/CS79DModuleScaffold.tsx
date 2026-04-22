import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import {
  ModuleCompletionButton,
  ShowModalButton,
  ToggleModalButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import CS79DStaticQuiz from "@/courses/CS79D/components/CS79DStaticQuiz";
import {
  cs79dCourseReference,
  type CS79DModuleBlueprint,
} from "@/courses/CS79D/data/moduleBlueprints";

type CS79DModuleScaffoldProps = {
  module: CS79DModuleBlueprint;
};

export default function CS79DModuleScaffold({
  module,
}: CS79DModuleScaffoldProps) {
  useFinalModuleRedirect(8);
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

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700 dark:bg-rose-900/40 dark:text-rose-200">
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
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/40">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-800 dark:text-rose-200">
                Focus Areas
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                {module.focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/40">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
                Starter Tasks
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                {module.starterTasks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/40">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-800 dark:text-violet-200">
                Artifact Targets
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                {module.artifacts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                Objectives Aligned
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                {module.objectivesAligned.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                Outcome Alignment
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                {module.outcomeAlignment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          {module.moduleSummary && module.moduleSummary.length > 0 ? (
            <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-900 dark:text-rose-100">
                Module Summary
              </h3>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-rose-950 dark:text-rose-50">
                  <thead>
                    <tr className="border-b border-rose-200 dark:border-rose-800">
                      <th className="py-2 pr-4 font-semibold">Step</th>
                      <th className="py-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.moduleSummary.map((item) => (
                      <tr
                        key={`${module.id}-${item.step}`}
                        className="border-b border-rose-100 align-top dark:border-rose-900/40"
                      >
                        <td className="py-2 pr-4 font-medium">{item.step}</td>
                        <td className="py-2">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ) : null}

          {module.readingHighlights && module.readingHighlights.length > 0 ? (
            <article className="rounded-xl border border-lime-200 bg-lime-50 p-4 dark:border-lime-900/50 dark:bg-lime-950/30">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-lime-900 dark:text-lime-100">
                Required Reading and Lecture Notes
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-lime-950/90 dark:text-lime-100/90">
                {module.readingHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ) : null}

          {module.serviceHighlights && module.serviceHighlights.length > 0 ? (
            <article className="rounded-xl border border-teal-200 bg-teal-50 p-4 dark:border-teal-900/50 dark:bg-teal-950/30">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-900 dark:text-teal-100">
                AWS Services Highlighted in This Module
              </h3>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-teal-950 dark:text-teal-50">
                  <thead>
                    <tr className="border-b border-teal-200 dark:border-teal-800">
                      <th className="py-2 pr-4 font-semibold">Service</th>
                      <th className="py-2 pr-4 font-semibold">Category</th>
                      <th className="py-2 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.serviceHighlights.map((item) => (
                      <tr
                        key={`${module.id}-${item.service}`}
                        className="border-b border-teal-100 align-top dark:border-teal-900/40"
                      >
                        <td className="py-2 pr-4 font-medium">
                          {item.service}
                        </td>
                        <td className="py-2 pr-4">{item.pages}</td>
                        <td className="py-2">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ) : null}

          {module.overviewScreenshots &&
          module.overviewScreenshots.length > 0 ? (
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-100">
                Overview Snapshot
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Reference screenshot captured for this module&apos;s supporting
                materials and study layout.
              </p>
              <ScreenshotGallery screenshots={module.overviewScreenshots} />
            </article>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-900 dark:text-amber-100">
                Syllabus Context
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-amber-900/80 dark:text-amber-100/90">
                {module.syllabusContext.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-900 dark:text-rose-100">
                Important Dates
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-rose-900/80 dark:text-rose-100/90">
                {module.importantDates.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-900 dark:text-indigo-100">
                Assessment Context
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-indigo-900/80 dark:text-indigo-100/90">
                {module.assessmentContext.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900/40">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                Course Resources From Syllabus
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                <li>Canvas: {cs79dCourseReference.canvasUrl}</li>
                <li>Email: {cs79dCourseReference.instructorEmail}</li>
                <li>Office hours: {cs79dCourseReference.officeHours}</li>
                {cs79dCourseReference.requiredReadings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900/40">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                Course-Wide Reference
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                {cs79dCourseReference.gradingBreakdown.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Session checkpoints
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
                  {cs79dCourseReference.importantSessionDates.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </AnimatedAccordionItem>

      {module.textTasks?.map((task) => (
        <AnimatedAccordionItem
          key={`${module.id}-${task.id}`}
          title={task.title}
          isOpen={!!openTextTasks[task.id]}
          onToggle={() => toggleTextTask(task.id)}
        >
          <div className="space-y-4 rounded-xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-900/50 dark:bg-rose-950/30">
            {task.objective ? (
              <div className="rounded-xl border border-rose-200 bg-white/70 p-4 dark:border-rose-800 dark:bg-slate-950/30">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-rose-900 dark:text-rose-100">
                  Objective
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {task.objective}
                </p>
              </div>
            ) : null}

            <div className="grid gap-4 lg:grid-cols-2">
              {task.tasks && task.tasks.length > 0 ? (
                <article className="rounded-xl border border-rose-200 bg-white/70 p-4 dark:border-rose-800 dark:bg-slate-950/30">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-rose-900 dark:text-rose-100">
                    Task
                  </h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                    {task.tasks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ) : null}

              {task.submissionInstructions &&
              task.submissionInstructions.length > 0 ? (
                <article className="rounded-xl border border-rose-200 bg-white/70 p-4 dark:border-rose-800 dark:bg-slate-950/30">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-rose-900 dark:text-rose-100">
                    Submission Instructions
                  </h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                    {task.submissionInstructions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ) : null}
            </div>

            {task.whyItMatters ? (
              <div className="rounded-xl border border-rose-200 bg-white/70 p-4 dark:border-rose-800 dark:bg-slate-950/30">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-rose-900 dark:text-rose-100">
                  {task.whyItMattersHeading ?? "Why It Matters"}
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {task.whyItMatters}
                </p>
              </div>
            ) : null}

            {task.previewFiles?.length ? (
              <div className="mt-1 flex flex-wrap gap-3">
                {task.previewFiles.map((file) => {
                  const isOpen = openTaskPreviews[task.id] === file.fileUrl;
                  const buttonLabel = file.buttonLabel ?? file.filename;

                  return (
                    <ToggleModalButton
                      key={file.fileUrl}
                      isOpen={isOpen}
                      label={isOpen ? `Close ${buttonLabel}` : buttonLabel}
                      toggle={() => toggleTaskPreview(task.id, file.fileUrl)}
                    />
                  );
                })}
              </div>
            ) : null}

            {task.resourceSections?.length ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {task.resourceSections.map((section) => (
                  <article
                    key={`${task.id}-${section.title}`}
                    className="rounded-xl border border-rose-200 bg-white/70 p-4 dark:border-rose-800 dark:bg-slate-950/30"
                  >
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-rose-900 dark:text-rose-100">
                      {section.title}
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            ) : null}

            {task.previewFiles?.length ? (
              <ShowModalButton
                isOpen={!!openTaskPreviews[task.id]}
                onClose={() =>
                  setOpenTaskPreviews((prev) => ({
                    ...prev,
                    [task.id]: null,
                  }))
                }
                files={task.previewFiles.filter(
                  (file) => file.fileUrl === openTaskPreviews[task.id]
                )}
              />
            ) : null}
          </div>
        </AnimatedAccordionItem>
      ))}

      {module.quiz ? (
        <AnimatedAccordionItem
          title={`Quiz: ${module.quiz.title}`}
          isOpen={isQuizOpen}
          onToggle={() => setIsQuizOpen((prev) => !prev)}
        >
          <CS79DStaticQuiz
            title={module.quiz.title}
            dueLabel={module.quiz.dueLabel}
            questions={module.quiz.questions}
            answers={module.quiz.answers}
          />
        </AnimatedAccordionItem>
      ) : null}

      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Current Scaffold Status
        </h3>
        <p className="mt-2 text-sm leading-7 text-gray-700 dark:text-gray-300">
          This module is built from Spring 2026 syllabus data. The next pass
          layers in your completed labs, screenshots, quiz answers, and
          submission-ready notes without changing the structure.
        </p>
        <p className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">
          Milestone: {module.milestone}
        </p>
      </div>

      <ModuleCompletionButton moduleId={module.id} />
    </section>
  );
}
