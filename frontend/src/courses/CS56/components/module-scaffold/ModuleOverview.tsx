import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import {
  cs56CourseReference,
  type CS56ModuleBlueprint,
} from "@/courses/CS56/data/moduleBlueprints";

type ModuleOverviewProps = {
  module: CS56ModuleBlueprint;
  isOpen: boolean;
  onToggle: () => void;
};

export default function ModuleOverview({
  module,
  isOpen,
  onToggle,
}: ModuleOverviewProps) {
  return (
    <AnimatedAccordionItem
      title={`${module.title} Overview`}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <OverviewList
            title="Focus Areas"
            items={module.focusAreas}
            className="border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30"
            titleClassName="text-orange-900 dark:text-orange-100"
            itemClassName="text-slate-700 dark:text-slate-200"
          />
          <OverviewList
            title="Starter Tasks"
            items={module.starterTasks}
            className="border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30"
            titleClassName="text-emerald-900 dark:text-emerald-100"
            itemClassName="text-slate-700 dark:text-slate-200"
          />
          <OverviewList
            title="Artifact Targets"
            items={module.artifacts}
            className="border-indigo-200 bg-indigo-50 dark:border-indigo-900/50 dark:bg-indigo-950/30"
            titleClassName="text-indigo-900 dark:text-indigo-100"
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

        <ModuleSummary module={module} />

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
            className="border-violet-200 bg-violet-50 dark:border-violet-900/50 dark:bg-violet-950/30"
            titleClassName="text-violet-900 dark:text-violet-100"
            itemClassName="text-violet-900/80 dark:text-violet-100/90"
          />
        </div>

        <CourseReference />

        <OverviewList
          title="Required Reading and Lecture Notes"
          items={module.readingHighlights}
          className="border-lime-200 bg-lime-50 dark:border-lime-900/50 dark:bg-lime-950/30"
          titleClassName="text-lime-900 dark:text-lime-100"
          itemClassName="text-lime-950/90 dark:text-lime-100/90"
        />
      </div>
    </AnimatedAccordionItem>
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

function ModuleSummary({ module }: { module: CS56ModuleBlueprint }) {
  return (
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
  );
}
