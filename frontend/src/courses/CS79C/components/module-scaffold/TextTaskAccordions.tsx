import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import type { CS79CTextTask } from "@/courses/CS79C/components/module-scaffold/types";

type TextTaskAccordionsProps = {
  moduleId: number;
  tasks?: CS79CTextTask[];
  openTextTasks: Record<string, boolean>;
  openTaskPreviews: Record<string, string | null>;
  onToggleTextTask: (taskId: string) => void;
  onToggleTaskPreview: (taskId: string, fileUrl: string) => void;
  onCloseTaskPreview: (taskId: string) => void;
};

export default function TextTaskAccordions({
  moduleId,
  tasks,
  openTextTasks,
  openTaskPreviews,
  onToggleTextTask,
  onToggleTaskPreview,
  onCloseTaskPreview,
}: TextTaskAccordionsProps) {
  return (
    <>
      {tasks?.map((task) => (
        <AnimatedAccordionItem
          key={`${moduleId}-${task.id}`}
          title={task.title}
          isOpen={!!openTextTasks[task.id]}
          onToggle={() => onToggleTextTask(task.id)}
        >
          <TextTask
            task={task}
            openTaskPreviews={openTaskPreviews}
            onToggleTaskPreview={onToggleTaskPreview}
            onCloseTaskPreview={onCloseTaskPreview}
          />
        </AnimatedAccordionItem>
      ))}
    </>
  );
}

type TextTaskProps = {
  task: CS79CTextTask;
  openTaskPreviews: Record<string, string | null>;
  onToggleTaskPreview: (taskId: string, fileUrl: string) => void;
  onCloseTaskPreview: (taskId: string) => void;
};

function TextTask({
  task,
  openTaskPreviews,
  onToggleTaskPreview,
  onCloseTaskPreview,
}: TextTaskProps) {
  return (
    <div className="space-y-4 rounded-xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900/50 dark:bg-cyan-950/30">
      {task.objective ? <Objective objective={task.objective} /> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {task.tasks?.length ? (
          <TaskList title="Task" items={task.tasks} />
        ) : null}
        {task.submissionInstructions?.length ? (
          <TaskList
            title="Submission Instructions"
            items={task.submissionInstructions}
          />
        ) : null}
      </div>

      {task.whyItMatters ? (
        <WhyItMatters
          heading={task.whyItMattersHeading}
          text={task.whyItMatters}
        />
      ) : null}

      {task.previewFiles?.length ? (
        <PreviewButtons
          task={task}
          openTaskPreviews={openTaskPreviews}
          onToggleTaskPreview={onToggleTaskPreview}
        />
      ) : null}

      {task.resourceSections?.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {task.resourceSections.map((section) => (
            <TaskList
              key={`${task.id}-${section.title}`}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      ) : null}

      {task.previewFiles?.length ? (
        <ShowModalButton
          isOpen={!!openTaskPreviews[task.id]}
          onClose={() => onCloseTaskPreview(task.id)}
          files={task.previewFiles.filter(
            (file) => file.fileUrl === openTaskPreviews[task.id]
          )}
        />
      ) : null}
    </div>
  );
}

function Objective({ objective }: { objective: string }) {
  return (
    <div className="rounded-xl border border-cyan-200 bg-white/70 p-4 dark:border-cyan-800 dark:bg-slate-950/30">
      <h4 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
        Objective
      </h4>
      <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
        {objective}
      </p>
    </div>
  );
}

function TaskList({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-xl border border-cyan-200 bg-white/70 p-4 dark:border-cyan-800 dark:bg-slate-950/30">
      <h4 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
        {title}
      </h4>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function WhyItMatters({ heading, text }: { heading?: string; text: string }) {
  return (
    <div className="rounded-xl border border-cyan-200 bg-white/70 p-4 dark:border-cyan-800 dark:bg-slate-950/30">
      <h4 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
        {heading ?? "Why It Matters"}
      </h4>
      <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
        {text}
      </p>
    </div>
  );
}

function PreviewButtons({
  task,
  openTaskPreviews,
  onToggleTaskPreview,
}: {
  task: CS79CTextTask;
  openTaskPreviews: Record<string, string | null>;
  onToggleTaskPreview: (taskId: string, fileUrl: string) => void;
}) {
  return (
    <div className="mt-1 flex flex-wrap gap-3">
      {task.previewFiles?.map((file) => {
        const isOpen = openTaskPreviews[task.id] === file.fileUrl;
        const buttonLabel = file.buttonLabel ?? file.filename;

        return (
          <ToggleModalButton
            key={file.fileUrl}
            isOpen={isOpen}
            label={isOpen ? `Close ${buttonLabel}` : buttonLabel}
            toggle={() => onToggleTaskPreview(task.id, file.fileUrl)}
          />
        );
      })}
    </div>
  );
}
