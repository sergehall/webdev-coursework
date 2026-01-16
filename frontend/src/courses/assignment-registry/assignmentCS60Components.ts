import React, { lazy } from "react";

// A map of all CS60 assignments and their placeholders, keyed by module ID
const assignmentCS60Components: Record<
  string,
  {
    main: React.LazyExoticComponent<React.FC>;
    placeholder: React.LazyExoticComponent<React.FC>;
    prefetchMain: () => Promise<{ default: React.FC }>;
    prefetchPlaceholder: () => Promise<{ default: React.FC }>;
  }
> = {
  "1": {
    main: lazy(() => import("@/courses/CS60/assignments/mod1/AssignmentMod1")),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod1/AssignmentMod1"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
  "2": {
    main: lazy(() => import("@/courses/CS60/assignments/mod2/AssignmentMod2")),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod2/AssignmentMod2"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
  "3": {
    main: lazy(() => import("@/courses/CS60/assignments/mod3/AssignmentMod3")),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod3/AssignmentMod3"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
  "4": {
    main: lazy(() => import("@/courses/CS60/assignments/mod4/AssignmentMod4")),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod4/AssignmentMod4"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
  "5": {
    main: lazy(() => import("@/courses/CS60/assignments/mod5/AssignmentMod5")),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod5/AssignmentMod5"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
  "6": {
    main: lazy(() => import("@/courses/CS60/assignments/mod6/AssignmentMod6")),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod6/AssignmentMod6"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
  "7": {
    main: lazy(() => import("@/courses/CS60/assignments/mod7/AssignmentMod7")),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod7/AssignmentMod7"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
  "8": {
    main: lazy(() => import("@/courses/CS60/assignments/mod8/AssignmentMod8")),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod8/AssignmentMod8"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
  "9": {
    main: lazy(() => import("@/courses/CS60/assignments/mod9/AssignmentMod9")),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod9/AssignmentMod9"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
  "10": {
    main: lazy(
      () => import("@/courses/CS60/assignments/mod10/AssignmentMod10")
    ),
    placeholder: lazy(
      () => import("@/courses/CS60/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS60/assignments/mod10/AssignmentMod10"),
    prefetchPlaceholder: () =>
      import("@/courses/CS60/assignments/AssignmentPlaceholder"),
  },
};

export default assignmentCS60Components;
