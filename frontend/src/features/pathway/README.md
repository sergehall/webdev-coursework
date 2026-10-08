# Web developer pathway

`PathwaySections.tsx` renders the program overview from `programSections.tsx`.
`WebDevMajorRequirements.tsx` renders the full four-semester AS pathway by
default, with a Certificate of Achievement filter.
The AS view also offers **Show Major Requirements Only** and **Show All**.
The major-only view keeps the four semesters, recalculates visible major units,
and preserves specialization selections when the full pathway is restored.
`webDeveloperPathway.ts`
composes existing course catalog entries with General Education and elective
choices. GE choices link to the approved SMC lists rather than prescribing a
single course. Area 1A also shows its three approved courses inline as nested
expandable rows via `GeneralEducationOptions.tsx`, with source-backed summaries
and prerequisites in `generalEducationCourses.ts`.
`WebDeveloperPathPage.tsx` in `pages/` composes this feature for
the route.

Source: https://www.smc.edu/academics/classes/program.php?id=52, checked
October 8, 2026. The sequence is 60–62 planned units; certificate major
requirements total 27 units. CS 3 and COUNS 20 are included in the recommended
degree sequence. CS 56 remains available as supplemental coursework and is
not a major requirement on this pathway. Global Citizenship and the applicable
GE pattern must be confirmed with a counselor; major courses may satisfy
local GE Area 2, and transfer math is recommended in the first elective slot.
