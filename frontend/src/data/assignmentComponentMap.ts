import React, { lazy } from "react";

// A map of all assignments and their placeholders, keyed by module ID
const assignmentComponents: Record<
  string,
  {
    main: React.LazyExoticComponent<React.FC>;
    placeholder: React.LazyExoticComponent<React.FC>;
    prefetchMain: () => Promise<{ default: React.FC }>;
    prefetchPlaceholder: () => Promise<{ default: React.FC }>;
  }
> = {
  "1": {
    main: lazy(() => import("@/courses/CS81/assignments/mod1/AssignmentMod1")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod1/AssignmentMod1Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod1/AssignmentMod1"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod1/AssignmentMod1Placeholder"),
  },
  "2": {
    main: lazy(() => import("@/courses/CS81/assignments/mod2/AssignmentMod2")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod2/AssignmentMod2Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod2/AssignmentMod2"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod2/AssignmentMod2Placeholder"),
  },
  "3": {
    main: lazy(() => import("@/courses/CS81/assignments/mod3/AssignmentMod3")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod3/AssignmentMod3Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod3/AssignmentMod3"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod3/AssignmentMod3Placeholder"),
  },
  "4": {
    main: lazy(() => import("@/courses/CS81/assignments/mod4/AssignmentMod4")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod4/AssignmentMod4Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod4/AssignmentMod4"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod4/AssignmentMod4Placeholder"),
  },
  "5": {
    main: lazy(() => import("@/courses/CS81/assignments/mod5/AssignmentMod5")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod5/AssignmentMod5Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod5/AssignmentMod5"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod5/AssignmentMod5Placeholder"),
  },
  "6": {
    main: lazy(() => import("@/courses/CS81/assignments/mod6/AssignmentMod6")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod6/AssignmentMod6Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod6/AssignmentMod6"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod6/AssignmentMod6Placeholder"),
  },
  "7": {
    main: lazy(() => import("@/courses/CS81/assignments/mod7/AssignmentMod7")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod7/AssignmentMod7Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod7/AssignmentMod7"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod7/AssignmentMod7Placeholder"),
  },
  "8": {
    main: lazy(() => import("@/courses/CS81/assignments/mod8/AssignmentMod8")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod8/AssignmentMod8Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod8/AssignmentMod8"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod8/AssignmentMod8Placeholder"),
  },
  "9": {
    main: lazy(() => import("@/courses/CS81/assignments/mod9/AssignmentMod9")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod9/AssignmentMod9Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod9/AssignmentMod9"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod9/AssignmentMod9Placeholder"),
  },
  "10": {
    main: lazy(() => import("@/courses/CS81/assignments/mod10/AssignmentMod10")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod10/AssignmentMod10Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod10/AssignmentMod10"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod10/AssignmentMod10Placeholder"),
  },
  "11": {
    main: lazy(() => import("@/courses/CS81/assignments/mod11/AssignmentMod11")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod11/AssignmentMod11Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod11/AssignmentMod11"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod11/AssignmentMod11Placeholder"),
  },
  "12": {
    main: lazy(() => import("@/courses/CS81/assignments/mod12/AssignmentMod12")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod12/AssignmentMod12Placeholder")
    ),
    prefetchMain: () => import("@/courses/CS81/assignments/mod12/AssignmentMod12"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod12/AssignmentMod12Placeholder"),
  },
};

export default assignmentComponents;
