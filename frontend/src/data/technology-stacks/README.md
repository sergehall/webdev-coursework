# Course technology stacks

`programming.ts` contains CS 56, CS 80, CS 81, CS 85, and CS 87A. The database,
networking, and AWS courses live in `infrastructure.ts`. Each course array keeps
its own labels, icons, colors, and documentation links.

`../technologies.tsx` assembles the arrays in the original course order and
preserves the `technologies`, `Tech`, and `CourseName` exports used by the home
page. Keep new entries with their course and update the assembly order only
when the displayed course order is intentionally changing.
