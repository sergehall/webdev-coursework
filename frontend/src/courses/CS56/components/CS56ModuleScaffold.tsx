import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ClipboardPenLine,
  FileText,
  MessageSquareText,
  Rocket,
} from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import {
  ModuleCompletionButton,
  ShowModalButton,
  ToggleModalButton,
} from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import {
  cs56CourseReference,
  type CS56ModuleBlueprint,
} from "@/courses/CS56/data/moduleBlueprints";

type CS56ModuleScaffoldProps = {
  module: CS56ModuleBlueprint;
};

type CanvasItemType = NonNullable<
  CS56ModuleBlueprint["canvasSections"]
>[number]["groups"][number]["items"][number]["type"];

const canvasItemIcons = {
  page: FileText,
  quiz: Rocket,
  discussion: MessageSquareText,
  assignment: ClipboardPenLine,
} satisfies Record<CanvasItemType, typeof FileText>;

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

      {module.canvasSections?.map((section) => (
        <AnimatedAccordionItem
          key={section.id}
          title={section.title}
          isOpen={!!openCanvasSections[section.id]}
          onToggle={() => toggleCanvasSection(section.id)}
        >
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950/20">
            {section.groups.map((group, groupIndex) => {
              const groupId = `${section.id}-${group.title ?? groupIndex}`;
              const isGroupCollapsible = !!group.defaultCollapsed;
              const isGroupOpen =
                !isGroupCollapsible || !!openCanvasGroups[groupId];

              return (
                <div key={groupId}>
                  {group.title ? (
                    isGroupCollapsible ? (
                      <button
                        type="button"
                        onClick={() => toggleCanvasGroup(groupId)}
                        className="flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-800"
                      >
                        <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
                          {group.title}
                        </span>
                        <span className="text-slate-500 dark:text-slate-300">
                          {isGroupOpen ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </span>
                      </button>
                    ) : (
                      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-900/60">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                          {group.title}
                        </h3>
                      </div>
                    )
                  ) : null}

                  {isGroupOpen ? (
                    <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                      {group.items.map((item) => {
                        const Icon = canvasItemIcons[item.type];
                        const itemId = `${groupId}-${item.title}`;

                        return (
                          <li
                            key={itemId}
                            className="flex gap-4 px-5 py-4 transition hover:bg-sky-50/70 dark:hover:bg-sky-950/20"
                          >
                            <div className="flex w-12 shrink-0 justify-center pt-1">
                              <Icon
                                aria-hidden="true"
                                className="h-5 w-5 text-slate-700 dark:text-slate-200"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-base font-bold break-words text-slate-950 dark:text-white">
                                {item.title}
                              </p>
                              {item.dueLabel || item.pointsLabel ? (
                                <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
                                  {item.dueLabel ? (
                                    <span>{item.dueLabel}</span>
                                  ) : null}
                                  {item.pointsLabel ? (
                                    <span>{item.pointsLabel}</span>
                                  ) : null}
                                  {item.scoreLabel ? (
                                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800">
                                      {item.scoreLabel}
                                    </span>
                                  ) : null}
                                </p>
                              ) : null}
                              {item.scoreLabel &&
                              !item.dueLabel &&
                              !item.pointsLabel ? (
                                <p className="mt-1 text-sm">
                                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800">
                                    {item.scoreLabel}
                                  </span>
                                </p>
                              ) : null}
                              {item.prompt ? (
                                <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950/30">
                                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                                    {item.prompt.title}
                                  </h3>
                                  <div className="mt-4 space-y-5">
                                    {item.prompt.sections.map((section) => (
                                      <section key={section.title}>
                                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                          {section.title}
                                        </h4>
                                        {section.paragraphs?.map(
                                          (paragraph) => (
                                            <p
                                              key={paragraph}
                                              className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200"
                                            >
                                              {paragraph}
                                            </p>
                                          )
                                        )}
                                        {section.steps ? (
                                          <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                                            {section.steps.map((step) => (
                                              <li
                                                key={step.title}
                                                className="pl-1"
                                              >
                                                <span className="font-semibold text-slate-950 dark:text-white">
                                                  {step.title}
                                                </span>
                                                <ul className="mt-1 list-disc space-y-1 pl-5">
                                                  {step.items.map((line) => (
                                                    <li key={line}>{line}</li>
                                                  ))}
                                                </ul>
                                              </li>
                                            ))}
                                          </ol>
                                        ) : null}
                                        {section.output ? (
                                          <pre className="mt-3 overflow-auto rounded bg-slate-100 p-3 text-sm leading-6 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
                                            <code>
                                              {section.output.join("\n")}
                                            </code>
                                          </pre>
                                        ) : null}
                                      </section>
                                    ))}
                                  </div>
                                </div>
                              ) : null}
                              {item.rubric ? (
                                <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950/30">
                                  <div className="flex flex-wrap items-center justify-between gap-3">
                                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                                      {item.rubric.title}
                                    </h3>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                                      {item.rubric.rows.length} criteria
                                    </span>
                                  </div>
                                  <div className="mt-4 overflow-x-auto">
                                    <table className="min-w-full border-collapse text-left text-sm">
                                      <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-700">
                                          <th className="py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">
                                            Criteria
                                          </th>
                                          <th className="py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">
                                            Ratings
                                          </th>
                                          <th className="py-3 font-semibold text-slate-900 dark:text-slate-100">
                                            Points
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {item.rubric.rows.map((row) => (
                                          <tr
                                            key={row.criterion}
                                            className="align-top"
                                          >
                                            <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-100">
                                              {row.criterion}
                                            </td>
                                            <td className="py-3 pr-4">
                                              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                                                {row.ratings.map((rating) => (
                                                  <div
                                                    key={`${row.criterion}-${rating.label}`}
                                                    className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/60"
                                                  >
                                                    <div className="flex items-start justify-between gap-2">
                                                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                                                        {rating.label}
                                                      </p>
                                                      <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                                                        {rating.pointsLabel}
                                                      </span>
                                                    </div>
                                                    {rating.description ? (
                                                      <p className="mt-2 leading-6 text-slate-600 dark:text-slate-300">
                                                        {rating.description}
                                                      </p>
                                                    ) : null}
                                                  </div>
                                                ))}
                                              </div>
                                            </td>
                                            <td className="py-3 font-semibold whitespace-nowrap text-slate-700 dark:text-slate-200">
                                              {row.pointsLabel}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : null}
                              {item.description ? (
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                  {item.description}
                                </p>
                              ) : null}
                              {item.note ? (
                                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
                                  <span className="font-semibold">Note:</span>{" "}
                                  {item.note}
                                </div>
                              ) : null}
                              {item.details ? (
                                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                                  {item.details.intro ? (
                                    <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                                      {item.details.intro}
                                    </p>
                                  ) : null}
                                  <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                                    {item.details.steps.map((step) => (
                                      <li key={step.label} className="pl-1">
                                        <span className="font-semibold text-slate-950 dark:text-white">
                                          {step.label}:
                                        </span>{" "}
                                        <span>{step.text}</span>
                                        {step.pointsLabel ? (
                                          <span className="ml-2 inline-flex rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                                            {step.pointsLabel}
                                          </span>
                                        ) : null}
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              ) : null}
                              {item.codeBlocks?.length ? (
                                <div className="mt-4 space-y-4">
                                  {item.codeBlocks.map((block) => (
                                    <div
                                      key={block.title}
                                      className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950"
                                    >
                                      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
                                        <p className="text-sm font-semibold text-slate-100">
                                          {block.title}
                                        </p>
                                        <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-300">
                                          {block.language}
                                        </span>
                                      </div>
                                      <pre className="max-h-[520px] overflow-auto p-4 text-sm leading-6 text-slate-100">
                                        <code>{block.code}</code>
                                      </pre>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                              {item.expectedOutput?.length ? (
                                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                                  <h4 className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
                                    Expected Output
                                  </h4>
                                  <pre className="mt-3 overflow-auto rounded bg-white p-3 text-sm leading-6 text-emerald-950 dark:bg-slate-950 dark:text-emerald-100">
                                    <code>
                                      {item.expectedOutput.join("\n")}
                                    </code>
                                  </pre>
                                </div>
                              ) : null}
                              {item.previewFiles?.length ? (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {item.previewFiles.map((file) => {
                                    const isOpen =
                                      openCanvasItemPreviews[itemId] ===
                                      file.fileUrl;
                                    const buttonLabel =
                                      file.buttonLabel ?? file.filename;

                                    return (
                                      <ToggleModalButton
                                        key={file.fileUrl}
                                        isOpen={isOpen}
                                        label={
                                          isOpen
                                            ? `Close ${buttonLabel}`
                                            : buttonLabel
                                        }
                                        toggle={() =>
                                          toggleCanvasItemPreview(
                                            itemId,
                                            file.fileUrl
                                          )
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              ) : null}
                              {item.previewFiles?.length ? (
                                <ShowModalButton
                                  isOpen={!!openCanvasItemPreviews[itemId]}
                                  onClose={() =>
                                    setOpenCanvasItemPreviews((prev) => ({
                                      ...prev,
                                      [itemId]: null,
                                    }))
                                  }
                                  files={item.previewFiles.filter(
                                    (file) =>
                                      file.fileUrl ===
                                      openCanvasItemPreviews[itemId]
                                  )}
                                />
                              ) : null}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        </AnimatedAccordionItem>
      ))}

      {!hasCanvasSections ? (
        <AnimatedAccordionItem
          title={`${module.title} Overview`}
          isOpen={isOverviewOpen}
          onToggle={() => setIsOverviewOpen((prev) => !prev)}
        >
          <div className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
                <h3 className="text-sm font-semibold tracking-wide text-orange-900 uppercase dark:text-orange-100">
                  Focus Areas
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                  {module.focusAreas.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <h3 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
                  Starter Tasks
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                  {module.starterTasks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
                <h3 className="text-sm font-semibold tracking-wide text-indigo-900 uppercase dark:text-indigo-100">
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
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                  Objectives Aligned
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                  {module.objectivesAligned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                  Outcome Alignment
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                  {module.outcomeAlignment.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
              <h3 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
                Module Summary
              </h3>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-cyan-950 dark:text-cyan-50">
                  <thead>
                    <tr className="border-b border-cyan-200 dark:border-cyan-800">
                      <th className="py-2 pr-4 font-semibold">Step</th>
                      <th className="py-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.moduleSummary.map((item) => (
                      <tr
                        key={`${module.id}-${item.step}`}
                        className="border-b border-cyan-100 align-top dark:border-cyan-900/40"
                      >
                        <td className="py-2 pr-4 font-medium">{item.step}</td>
                        <td className="py-2">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
                <h3 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
                  Syllabus Context
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-amber-900/80 dark:text-amber-100/90">
                  {module.syllabusContext.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
                <h3 className="text-sm font-semibold tracking-wide text-rose-900 uppercase dark:text-rose-100">
                  Important Dates
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-rose-900/80 dark:text-rose-100/90">
                  {module.importantDates.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
                <h3 className="text-sm font-semibold tracking-wide text-violet-900 uppercase dark:text-violet-100">
                  Assessment Context
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-violet-900/80 dark:text-violet-100/90">
                  {module.assessmentContext.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900/40">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                  Course Resources From Syllabus
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                  <li>Canvas: {cs56CourseReference.canvasUrl}</li>
                  <li>Email: {cs56CourseReference.instructorEmail}</li>
                  <li>Office hours: {cs56CourseReference.officeHours}</li>
                  {cs56CourseReference.requiredReadings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900/40">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
                  Course-Wide Reference
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                  {cs56CourseReference.gradingBreakdown.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Session checkpoints
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
                    {cs56CourseReference.importantSessionDates.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>

            <article className="rounded-xl border border-lime-200 bg-lime-50 p-4 dark:border-lime-900/50 dark:bg-lime-950/30">
              <h3 className="text-sm font-semibold tracking-wide text-lime-900 uppercase dark:text-lime-100">
                Required Reading and Lecture Notes
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-lime-950/90 dark:text-lime-100/90">
                {module.readingHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </AnimatedAccordionItem>
      ) : null}

      {!hasCanvasSections
        ? module.textTasks.map((task) => (
            <AnimatedAccordionItem
              key={`${module.id}-${task.id}`}
              title={task.title}
              isOpen={!!openTextTasks[task.id]}
              onToggle={() => toggleTextTask(task.id)}
            >
              <div className="space-y-4 rounded-xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900/50 dark:bg-orange-950/30">
                <div className="rounded-xl border border-orange-200 bg-white/70 p-4 dark:border-orange-800 dark:bg-slate-950/30">
                  <h4 className="text-sm font-semibold tracking-wide text-orange-900 uppercase dark:text-orange-100">
                    Objective
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
                    {task.objective}
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <article className="rounded-xl border border-orange-200 bg-white/70 p-4 dark:border-orange-800 dark:bg-slate-950/30">
                    <h4 className="text-sm font-semibold tracking-wide text-orange-900 uppercase dark:text-orange-100">
                      Task
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                      {task.tasks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>

                  <article className="rounded-xl border border-orange-200 bg-white/70 p-4 dark:border-orange-800 dark:bg-slate-950/30">
                    <h4 className="text-sm font-semibold tracking-wide text-orange-900 uppercase dark:text-orange-100">
                      Submission Instructions
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                      {task.submissionInstructions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </div>

                {task.resourceSections?.length ? (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {task.resourceSections.map((section) => (
                      <article
                        key={`${task.id}-${section.title}`}
                        className="rounded-xl border border-orange-200 bg-white/70 p-4 dark:border-orange-800 dark:bg-slate-950/30"
                      >
                        <h4 className="text-sm font-semibold tracking-wide text-orange-900 uppercase dark:text-orange-100">
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
              </div>
            </AnimatedAccordionItem>
          ))
        : null}

      <ModuleCompletionButton moduleId={module.id} />
    </section>
  );
}
