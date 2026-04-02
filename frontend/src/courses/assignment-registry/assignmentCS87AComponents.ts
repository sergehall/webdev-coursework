import { createAssignmentRegistry } from "./createAssignmentRegistry";

const assignmentCS87AComponents = createAssignmentRegistry(
  {
    "1": () => import("@/courses/CS87A/assignments/mod1/AssignmentMod1"),
    "2": () => import("@/courses/CS87A/assignments/mod2/AssignmentMod2"),
    "3": () => import("@/courses/CS87A/assignments/mod3/AssignmentMod3"),
    "4": () => import("@/courses/CS87A/assignments/mod4/AssignmentMod4"),
    "5": () => import("@/courses/CS87A/assignments/mod5/AssignmentMod5"),
    "6": () => import("@/courses/CS87A/assignments/mod6/AssignmentMod6"),
  },
  {
    "1": () =>
      import("@/courses/CS87A/assignments/mod1/AssignmentMod1Placeholder"),
    "2": () =>
      import("@/courses/CS87A/assignments/mod2/AssignmentMod2Placeholder"),
    "3": () =>
      import("@/courses/CS87A/assignments/mod3/AssignmentMod3Placeholder"),
    "4": () =>
      import("@/courses/CS87A/assignments/mod4/AssignmentMod4Placeholder"),
    "5": () =>
      import("@/courses/CS87A/assignments/mod5/AssignmentMod5Placeholder"),
    "6": () =>
      import("@/courses/CS87A/assignments/mod6/AssignmentMod6Placeholder"),
  }
);

export default assignmentCS87AComponents;
