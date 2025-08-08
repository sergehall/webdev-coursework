import React, { lazy } from "react";

// A map of all CS87A assignments and their placeholders, keyed by module ID
const assignmentCS87AComponents: Record<
  string,
  {
    main: React.LazyExoticComponent<React.FC>;
    placeholder: React.LazyExoticComponent<React.FC>;
    prefetchMain: () => Promise<{ default: React.FC }>;
    prefetchPlaceholder: () => Promise<{ default: React.FC }>;
  }
> = {
  "1": {
    main: lazy(() => import("@/courses/CS87A/assignments/mod1/AssignmentMod1")),
    placeholder: lazy(
      () => import("@/courses/CS87A/assignments/mod1/AssignmentMod1Placeholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS87A/assignments/mod1/AssignmentMod1"),
    prefetchPlaceholder: () =>
      import("@/courses/CS87A/assignments/mod1/AssignmentMod1Placeholder"),
  },
  "2": {
    main: lazy(() => import("@/courses/CS87A/assignments/mod2/AssignmentMod2")),
    placeholder: lazy(
      () => import("@/courses/CS87A/assignments/mod2/AssignmentMod2Placeholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS87A/assignments/mod2/AssignmentMod2"),
    prefetchPlaceholder: () =>
      import("@/courses/CS87A/assignments/mod2/AssignmentMod2Placeholder"),
  },
  "3": {
    main: lazy(() => import("@/courses/CS87A/assignments/mod3/AssignmentMod3")),
    placeholder: lazy(
      () => import("@/courses/CS87A/assignments/mod3/AssignmentMod3Placeholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS87A/assignments/mod3/AssignmentMod3"),
    prefetchPlaceholder: () =>
      import("@/courses/CS87A/assignments/mod3/AssignmentMod3Placeholder"),
  },
  "4": {
    main: lazy(() => import("@/courses/CS87A/assignments/mod4/AssignmentMod4")),
    placeholder: lazy(
      () => import("@/courses/CS87A/assignments/mod4/AssignmentMod4Placeholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS87A/assignments/mod4/AssignmentMod4"),
    prefetchPlaceholder: () =>
      import("@/courses/CS87A/assignments/mod4/AssignmentMod4Placeholder"),
  },
  "5": {
    main: lazy(() => import("@/courses/CS87A/assignments/mod5/AssignmentMod5")),
    placeholder: lazy(
      () => import("@/courses/CS87A/assignments/mod5/AssignmentMod5Placeholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS87A/assignments/mod5/AssignmentMod5"),
    prefetchPlaceholder: () =>
      import("@/courses/CS87A/assignments/mod5/AssignmentMod5Placeholder"),
  },
  "6": {
    main: lazy(() => import("@/courses/CS81/assignments/mod6/AssignmentMod6")),
    placeholder: lazy(
      () => import("@/courses/CS81/assignments/mod6/AssignmentMod6Placeholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS81/assignments/mod6/AssignmentMod6"),
    prefetchPlaceholder: () =>
      import("@/courses/CS81/assignments/mod6/AssignmentMod6Placeholder"),
  },
};

export default assignmentCS87AComponents;
