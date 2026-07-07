import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  cs79dCourseReference,
  type CS79DModuleBlueprint,
} from "@/courses/CS79D/data/moduleBlueprints";

type ModuleOverviewProps = {
  module: CS79DModuleBlueprint;
};

export default function ModuleOverview({ module }: ModuleOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <OverviewList
          title="Focus Areas"
          items={module.focusAreas}
          className="border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/40"
          titleClassName="text-rose-800 dark:text-rose-200"
          itemClassName="text-slate-700 dark:text-slate-200"
        />
        <OverviewList
          title="Starter Tasks"
          items={module.starterTasks}
          className="border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/40"
          titleClassName="text-emerald-800 dark:text-emerald-200"
          itemClassName="text-slate-700 dark:text-slate-200"
        />
        <OverviewList
          title="Artifact Targets"
          items={module.artifacts}
          className="border-violet-200 bg-violet-50 dark:border-violet-900/50 dark:bg-violet-950/40"
          titleClassName="text-violet-800 dark:text-violet-200"
          itemClassName="text-slate-700 dark:text-slate-200"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <OverviewList
          title="Objectives Aligned"
          items={module.objectivesAligned}
          className="border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
          titleClassName="text-gray-900 dark:text-white"
          itemClassName="text-gray-700 dark:text-gray-300"
        />
        <OverviewList
          title="Outcome Alignment"
          items={module.outcomeAlignment}
          className="border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
          titleClassName="text-gray-900 dark:text-white"
          itemClassName="text-gray-700 dark:text-gray-300"
        />
      </div>

      {module.moduleSummary?.length ? <ModuleSummary module={module} /> : null}
      {module.readingHighlights?.length ? (
        <OverviewList
          title="Required Reading and Lecture Notes"
          items={module.readingHighlights}
          className="border-lime-200 bg-lime-50 dark:border-lime-900/50 dark:bg-lime-950/30"
          titleClassName="text-lime-900 dark:text-lime-100"
          itemClassName="text-lime-950/90 dark:text-lime-100/90"
        />
      ) : null}
      {module.serviceHighlights?.length ? (
        <ServiceHighlights module={module} />
      ) : null}
      {module.overviewScreenshots?.length ? (
        <OverviewScreenshots module={module} />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <OverviewList
          title="Syllabus Context"
          items={module.syllabusContext}
          className="border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30"
          titleClassName="text-amber-900 dark:text-amber-100"
          itemClassName="text-amber-900/80 dark:text-amber-100/90"
        />
        <OverviewList
          title="Important Dates"
          items={module.importantDates}
          className="border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/30"
          titleClassName="text-rose-900 dark:text-rose-100"
          itemClassName="text-rose-900/80 dark:text-rose-100/90"
        />
        <OverviewList
          title="Assessment Context"
          items={module.assessmentContext}
          className="border-indigo-200 bg-indigo-50 dark:border-indigo-900/50 dark:bg-indigo-950/30"
          titleClassName="text-indigo-900 dark:text-indigo-100"
          itemClassName="text-indigo-900/80 dark:text-indigo-100/90"
        />
      </div>

      <CourseReference />
    </div>
  );
}

type OverviewListProps = {
  title: string;
  items: string[];
  className: string;
  titleClassName: string;
  itemClassName: string;
};

function OverviewList({
  title,
  items,
  className,
  titleClassName,
  itemClassName,
}: OverviewListProps) {
  return (
    <article className={`rounded-xl border p-4 ${className}`}>
      <h3
        className={`text-sm font-semibold tracking-wide uppercase ${titleClassName}`}
      >
        {title}
      </h3>
      <ul className={`mt-3 list-disc space-y-2 pl-5 text-sm ${itemClassName}`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function ModuleSummary({ module }: { module: CS79DModuleBlueprint }) {
  return (
    <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
      <h3 className="text-sm font-semibold tracking-wide text-rose-900 uppercase dark:text-rose-100">
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
            {module.moduleSummary?.map((item) => (
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
  );
}

function ServiceHighlights({ module }: { module: CS79DModuleBlueprint }) {
  return (
    <article className="rounded-xl border border-teal-200 bg-teal-50 p-4 dark:border-teal-900/50 dark:bg-teal-950/30">
      <h3 className="text-sm font-semibold tracking-wide text-teal-900 uppercase dark:text-teal-100">
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
            {module.serviceHighlights?.map((item) => (
              <tr
                key={`${module.id}-${item.service}`}
                className="border-b border-teal-100 align-top dark:border-teal-900/40"
              >
                <td className="py-2 pr-4 font-medium">{item.service}</td>
                <td className="py-2 pr-4">{item.pages}</td>
                <td className="py-2">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function OverviewScreenshots({ module }: { module: CS79DModuleBlueprint }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
      <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-slate-100">
        Overview Snapshot
      </h3>
      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
        Reference screenshot captured for this module&apos;s supporting
        materials and study layout.
      </p>
      <ScreenshotGallery screenshots={module.overviewScreenshots ?? []} />
    </article>
  );
}

function CourseReference() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900/40">
        <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
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
        <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
          Course-Wide Reference
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          {cs79dCourseReference.gradingBreakdown.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
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
  );
}
