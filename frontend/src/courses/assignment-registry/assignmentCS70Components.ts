import React, { lazy } from "react";

// A map of all CS70 assignments and their placeholders, keyed by module ID
const assignmentCS70Components: Record<
  string,
  {
    main: React.LazyExoticComponent<React.FC>;
    placeholder: React.LazyExoticComponent<React.FC>;
    prefetchMain: () => Promise<{ default: React.FC }>;
    prefetchPlaceholder: () => Promise<{ default: React.FC }>;
  }
> = {
  "1": {
    main: lazy(() => import("@/courses/CS70/assignments/mod1/AssignmentMod1")),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod1/AssignmentMod1"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "2": {
    main: lazy(() => import("@/courses/CS70/assignments/mod2/AssignmentMod2")),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod2/AssignmentMod2"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "3": {
    main: lazy(() => import("@/courses/CS70/assignments/mod3/AssignmentMod3")),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod3/AssignmentMod3"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "4": {
    main: lazy(() => import("@/courses/CS70/assignments/mod4/AssignmentMod4")),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod4/AssignmentMod4"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "5": {
    main: lazy(() => import("@/courses/CS70/assignments/mod5/AssignmentMod5")),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod5/AssignmentMod5"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "6": {
    main: lazy(() => import("@/courses/CS70/assignments/mod6/AssignmentMod6")),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod6/AssignmentMod6"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "7": {
    main: lazy(() => import("@/courses/CS70/assignments/mod7/AssignmentMod7")),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod7/AssignmentMod7"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "8": {
    main: lazy(() => import("@/courses/CS70/assignments/mod8/AssignmentMod8")),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod8/AssignmentMod8"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "9": {
    main: lazy(() => import("@/courses/CS70/assignments/mod9/AssignmentMod9")),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod9/AssignmentMod9"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "10": {
    main: lazy(
      () => import("@/courses/CS70/assignments/mod10/AssignmentMod10")
    ),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod10/AssignmentMod10"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "11": {
    main: lazy(
      () => import("@/courses/CS70/assignments/mod11/AssignmentMod11")
    ),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod11/AssignmentMod11"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "12": {
    main: lazy(
      () => import("@/courses/CS70/assignments/mod12/AssignmentMod12")
    ),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod12/AssignmentMod12"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "13": {
    main: lazy(
      () => import("@/courses/CS70/assignments/mod13/AssignmentMod13")
    ),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod13/AssignmentMod13"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "14": {
    main: lazy(
      () => import("@/courses/CS70/assignments/mod14/AssignmentMod14")
    ),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod14/AssignmentMod14"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "15": {
    main: lazy(
      () => import("@/courses/CS70/assignments/mod15/AssignmentMod15")
    ),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod15/AssignmentMod15"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
  "16": {
    main: lazy(
      () => import("@/courses/CS70/assignments/mod16/AssignmentMod16")
    ),
    placeholder: lazy(
      () => import("@/courses/CS70/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS70/assignments/mod16/AssignmentMod16"),
    prefetchPlaceholder: () =>
      import("@/courses/CS70/assignments/AssignmentPlaceholder"),
  },
};

export default assignmentCS70Components;
