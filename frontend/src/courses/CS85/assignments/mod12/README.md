# Module 12 assignment content

`Assignment12AContent.tsx` composes the existing Assignment 12A instructions and
owns the PDF modal state. Its teaching text and section order remain here.

- `data/assignment12AExamples.ts` contains the displayed Laravel, API, Blade,
  and command-line examples. Keep their wording and order aligned with the
  assignment source.
- `data/assignment12AMetadata.ts` contains the Canvas item, report PDF link,
  and grading rubric.
- `components/Assignment12APrimitives.tsx` contains the local heading, tutorial
  step, callout, and code-block presentation elements.

The surrounding `AssignmentMod12.tsx` keeps the module navigation and imports
the assignment through the unchanged default export.
