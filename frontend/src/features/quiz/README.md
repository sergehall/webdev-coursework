# Quiz feature

This feature owns the legacy choice-quiz DTOs, API transport, data hook, and
components still used by CS81. The CS81 questions and answer keys come from the
backend. Their delivery requirements need confirmation before moving them to
the browser-only `features/assessment` attempt model.

`adapters/` maps local choice datasets to the shared client-practice runner.
CS79C, CS79D, and CS85 modules 1–6 use that bridge. It preserves each prompt,
option order, answer index, and the legacy one-point-per-question score. The
adapter checks for missing or conflicting keys before rendering. Canvas point
labels, due dates, and attempt-count labels remain Canvas metadata; the browser
practice score remains one point per question, and local practice retries stay
unlimited as they were in the legacy runner.

Local quizzes with a stated time limit use that limit. For untimed legacy
datasets, practice attempts use a 60-minute session. The `START` gate, local
resume, review step, and timer follow the canonical assessment standard.

Do not add new practice runners here. Use `features/assessment` and keep new
course-specific definitions and content in the course module.
