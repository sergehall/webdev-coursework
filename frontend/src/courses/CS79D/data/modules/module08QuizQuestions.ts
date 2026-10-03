import type { CS79DModuleBlueprint } from "../types";

import { questions01To36 } from "./module08-final/questions-01-36";
import { questions37To66 } from "./module08-final/questions-37-66";

type Quiz = NonNullable<CS79DModuleBlueprint["quiz"]>;

export const cs79dModule08QuizQuestions = [
  ...questions01To36,
  ...questions37To66,
] satisfies Quiz["questions"];
