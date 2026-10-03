# CS56 Module 15

`AssignmentMod15.tsx` composes the group-project evidence and the existing
Final Exam accordion. Its `AssignmentMod15View` named export and default route
component remain stable.

- `components/ProjectShowcase.tsx`: hero, project cards, headings, and external
  actions.
- `components/ProjectEvidence.tsx`: recorded demo, architecture, rubric, and
  assignment requirements.
- `assignment15Data.ts`: links, content, and derived rubric total.
- `FinalExam.tsx` and `finalExamData.ts`: the unchanged client-practice
  assessment adapter and question-data entry point.

Keep project presentation in these local components. Assessment behavior stays
in `frontend/src/features/assessment` under the repository assessment standard.
