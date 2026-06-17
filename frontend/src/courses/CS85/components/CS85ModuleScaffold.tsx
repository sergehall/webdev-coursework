import { useState } from "react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";
import {
  cs85CourseReference,
  type CS85ModuleBlueprint,
} from "@/courses/CS85/data/moduleBlueprints";

type CS85ModuleScaffoldProps = {
  module: CS85ModuleBlueprint;
};

export default function CS85ModuleScaffold({
  module,
}: CS85ModuleScaffoldProps) {
  useFinalModuleRedirect(12);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [openTextTasks, setOpenTextTasks] = useState<Record<string, boolean>>(
    {}
  );

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
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-sky-800 uppercase dark:bg-sky-900/40 dark:text-sky-200">
            {module.isFinalProject ? "Final Project" : `Module ${module.id}`}
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            {module.weekLabel}
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            {module.dueLabel}
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
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/40">
              <h3 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
                Focus Areas
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                {module.focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/40">
              <h3 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
                Starter Tasks
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                {module.starterTasks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/40">
              <h3 className="text-sm font-semibold tracking-wide text-violet-900 uppercase dark:text-violet-100">
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

          {module.moduleSummary && module.moduleSummary.length > 0 ? (
            <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
              <h3 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
                Module Workflow
              </h3>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-sky-950 dark:text-sky-50">
                  <thead>
                    <tr className="border-b border-sky-200 dark:border-sky-800">
                      <th className="py-2 pr-4 font-semibold">Step</th>
                      <th className="py-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.moduleSummary.map((item) => (
                      <tr
                        key={`${module.id}-${item.step}`}
                        className="border-b border-sky-100 align-top dark:border-sky-900/40"
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

            <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
              <h3 className="text-sm font-semibold tracking-wide text-indigo-900 uppercase dark:text-indigo-100">
                Assessment Context
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-indigo-900/80 dark:text-indigo-100/90">
                {module.assessmentContext.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Course Reference"
        isOpen={isReferenceOpen}
        onToggle={() => setIsReferenceOpen((prev) => !prev)}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
              Instructor and Tools
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
              <li>Instructor: {cs85CourseReference.instructor}</li>
              <li>Email: {cs85CourseReference.instructorEmail}</li>
              <li>Office: {cs85CourseReference.facultyOffice}</li>
              <li>Phone: {cs85CourseReference.facultyPhone}</li>
              <li>Office hours: {cs85CourseReference.officeHours}</li>
              <li>Slack: {cs85CourseReference.slackWorkspace}</li>
              <li>Canvas: {cs85CourseReference.canvasUrl}</li>
            </ul>
          </article>

          <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
              Development Environment
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
              {cs85CourseReference.developmentTools.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
              Grading
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
              {cs85CourseReference.gradingBreakdown.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {cs85CourseReference.gradeScale.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
              Session Dates
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
              {cs85CourseReference.importantSessionDates.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </AnimatedAccordionItem>

      {module.textTasks?.map((task) => (
        <AnimatedAccordionItem
          key={`${module.id}-${task.id}`}
          title={task.title}
          isOpen={!!openTextTasks[task.id]}
          onToggle={() => toggleTextTask(task.id)}
        >
          <div className="space-y-4 rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900/50 dark:bg-sky-950/30">
            {task.objective ? (
              <div className="rounded-xl border border-sky-200 bg-white/70 p-4 dark:border-sky-800 dark:bg-slate-950/30">
                <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
                  Objective
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {task.objective}
                </p>
              </div>
            ) : null}

            <div className="grid gap-4 lg:grid-cols-2">
              {task.tasks && task.tasks.length > 0 ? (
                <article className="rounded-xl border border-sky-200 bg-white/70 p-4 dark:border-sky-800 dark:bg-slate-950/30">
                  <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
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
                <article className="rounded-xl border border-sky-200 bg-white/70 p-4 dark:border-sky-800 dark:bg-slate-950/30">
                  <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
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

            {task.resourceSections?.length ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {task.resourceSections.map((section) => (
                  <article
                    key={`${task.id}-${section.title}`}
                    className="rounded-xl border border-sky-200 bg-white/70 p-4 dark:border-sky-800 dark:bg-slate-950/30"
                  >
                    <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
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

            {task.whyItMatters ? (
              <div className="rounded-xl border border-sky-200 bg-white/70 p-4 dark:border-sky-800 dark:bg-slate-950/30">
                <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
                  {task.whyItMattersHeading ?? "Why It Matters"}
                </h4>
                <div className="mt-2 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {task.whyItMatters.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </AnimatedAccordionItem>
      ))}

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-100">
        <strong>Milestone:</strong> {module.milestone}
      </div>

      <ModuleCompletionButton moduleId={module.id} />
    </section>
  );
}
