import type { CS79CModuleBlueprint } from "@/courses/CS79C/data/moduleBlueprints";

export type CS79CTextTask = NonNullable<
  CS79CModuleBlueprint["textTasks"]
>[number];

export type CS79CQuiz = NonNullable<CS79CModuleBlueprint["quiz"]>;
