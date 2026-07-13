# Repository guidance for Codex

## Quiz and assessment work

Before creating, redesigning, or migrating any Quiz, Midterm, Final, self-check,
or practice assessment, read
[`docs/quiz-assessment-standard.md`](docs/quiz-assessment-standard.md) in full.

Treat that document as the canonical product and engineering standard. In
particular:

- use `frontend/src/features/assessment` instead of cloning a course-specific
  quiz runner;
- use the CS56 Module 8 Midterm as the reference adapter and behavior baseline;
- preserve question wording, options, correct answers, point values, and source
  attribution unless the task explicitly authorizes content changes;
- keep client-practice and protected graded-assessment security boundaries
  explicit;
- complete the standard's tests, visual checks, and Definition of Done before
  describing a Quiz migration as finished.

If a task conflicts with the standard, follow the user's explicit request and
briefly document the exception and its trade-off.
