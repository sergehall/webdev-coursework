import { createAssignmentRegistry } from "./createAssignmentRegistry";

const assignmentCS81Components = createAssignmentRegistry(
  {
    "1": () => import("@/courses/CS81/assignments/mod1/AssignmentMod1"),
    "2": () => import("@/courses/CS81/assignments/mod2/AssignmentMod2"),
    "3": () => import("@/courses/CS81/assignments/mod3/AssignmentMod3"),
    "4": () => import("@/courses/CS81/assignments/mod4/AssignmentMod4"),
    "5": () => import("@/courses/CS81/assignments/mod5/AssignmentMod5"),
    "6": () => import("@/courses/CS81/assignments/mod6/AssignmentMod6"),
    "7": () => import("@/courses/CS81/assignments/mod7/AssignmentMod7"),
    "8": () => import("@/courses/CS81/assignments/mod8/AssignmentMod8"),
    "9": () => import("@/courses/CS81/assignments/mod9/AssignmentMod9"),
    "10": () => import("@/courses/CS81/assignments/mod10/AssignmentMod10"),
    "11": () => import("@/courses/CS81/assignments/mod11/AssignmentMod11"),
    "12": () => import("@/courses/CS81/assignments/mod12/AssignmentMod12"),
  },
  {
    "1": () =>
      import("@/courses/CS81/assignments/mod1/AssignmentMod1Placeholder"),
    "2": () =>
      import("@/courses/CS81/assignments/mod2/AssignmentMod2Placeholder"),
    "3": () =>
      import("@/courses/CS81/assignments/mod3/AssignmentMod3Placeholder"),
    "4": () =>
      import("@/courses/CS81/assignments/mod4/AssignmentMod4Placeholder"),
    "5": () =>
      import("@/courses/CS81/assignments/mod5/AssignmentMod5Placeholder"),
    "6": () =>
      import("@/courses/CS81/assignments/mod6/AssignmentMod6Placeholder"),
    "7": () =>
      import("@/courses/CS81/assignments/mod7/AssignmentMod7Placeholder"),
    "8": () =>
      import("@/courses/CS81/assignments/mod8/AssignmentMod8Placeholder"),
    "9": () =>
      import("@/courses/CS81/assignments/mod9/AssignmentMod9Placeholder"),
    "10": () =>
      import("@/courses/CS81/assignments/mod10/AssignmentMod10Placeholder"),
    "11": () =>
      import("@/courses/CS81/assignments/mod11/AssignmentMod11Placeholder"),
    "12": () =>
      import("@/courses/CS81/assignments/mod12/AssignmentMod12Placeholder"),
  }
);

export default assignmentCS81Components;
