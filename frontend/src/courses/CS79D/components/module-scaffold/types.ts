import type { CS79DModuleBlueprint } from "@/courses/CS79D/data/moduleBlueprints";

export type CS79DTextTask = NonNullable<
  CS79DModuleBlueprint["textTasks"]
>[number];

export type CS79DQuiz = NonNullable<CS79DModuleBlueprint["quiz"]>;
