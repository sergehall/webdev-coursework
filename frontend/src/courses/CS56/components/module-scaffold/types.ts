import type { CS56ModuleBlueprint } from "@/courses/CS56/data/moduleBlueprints";

export type CS56CanvasSection = NonNullable<
  CS56ModuleBlueprint["canvasSections"]
>[number];

export type CS56CanvasGroup = CS56CanvasSection["groups"][number];

export type CS56CanvasItem = CS56CanvasGroup["items"][number];

export type CS56TextTask = CS56ModuleBlueprint["textTasks"][number];
