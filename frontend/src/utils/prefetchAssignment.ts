import assignmentComponents from "@/data/assignmentComponentMap";

export function prefetchAssignmentModule(id: string, unlocked: boolean) {
  const entry = assignmentComponents[id];
  if (!entry) return;

  // Trigger dynamic import prefetch manually (do not call the lazy component)
  if (unlocked) {
    entry.prefetchMain();
  } else {
    entry.prefetchPlaceholder();
  }
}
