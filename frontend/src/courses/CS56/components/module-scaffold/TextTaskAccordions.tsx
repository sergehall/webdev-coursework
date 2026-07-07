import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import type { CS56TextTask } from "@/courses/CS56/components/module-scaffold/types";

type TextTaskAccordionsProps = {
  moduleId: number;
  tasks: CS56TextTask[];
  openTextTasks: Record<string, boolean>;
  onToggleTextTask: (taskId: string) => void;
};

export default function TextTaskAccordions({
  moduleId,
  tasks,
  openTextTasks,
  onToggleTextTask,
}: TextTaskAccordionsProps) {
  return (
    <>
      {tasks.map((task) => (
        <AnimatedAccordionItem
          key={`${moduleId}-${task.id}`}
          title={task.title}
          isOpen={!!openTextTasks[task.id]}
          onToggle={() => onToggleTextTask(task.id)}
        >
          <TextTask task={task} />
        </AnimatedAccordionItem>
      ))}
    </>
  );
}

function TextTask({ task }: { task: CS56TextTask }) {
  return (
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
        <TaskList title="Task" items={task.tasks} />
        <TaskList
          title="Submission Instructions"
          items={task.submissionInstructions}
        />
      </div>

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
    </div>
  );
}

function TaskList({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-xl border border-orange-200 bg-white/70 p-4 dark:border-orange-800 dark:bg-slate-950/30">
      <h4 className="text-sm font-semibold tracking-wide text-orange-900 uppercase dark:text-orange-100">
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
