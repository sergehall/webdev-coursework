# Assessment feature

This feature is the reusable client-side practice-assessment boundary for the
coursework portal. CS56 Module 8 is the reference implementation.

The repository-wide product, migration, accessibility, testing, and Codex
requirements are defined in the
[Canonical Quiz and Assessment Standard](../../../../docs/quiz-assessment-standard.md).
Read that standard before adding or migrating a Quiz.

## Ownership

- domain/types.ts owns question, response, attempt, and definition contracts.
- domain/assessmentEngine.ts owns validation, scoring, progress, and formatting.
- application/useAssessmentAttempt.ts owns the attempt state machine and timer.
- infrastructure/attemptStorage.ts owns versioned localStorage parsing.
- components own accessible presentation and user interaction.

Course modules own only their assessment definition, question data, and
course-specific overview content.

## Supported questions

- Single-answer choice
- Multiple-answer choice
- Short text
- Java code completion with inline native select controls

Every definition is validated before rendering. Question ids must be unique,
points must be positive, answer indexes must exist, text answers cannot be
empty, and completion answers must be present in their option lists.

## Adding another assessment

Create a stable definition outside the React component:

    export const moduleQuiz = {
      id: "course-module-quiz",
      delivery: "client-practice",
      eyebrow: "COURSE · MODULE",
      title: "Module Quiz",
      summary: "What the quiz covers.",
      accessCode: "START",
      accessHint: "Access code: START",
      durationSeconds: 30 * 60,
      storageKey: "assessment:course-module-quiz:v1",
      questions,
    } satisfies AssessmentDefinition;

Then render AssessmentRunner with the definition and optional overview content.
Increment the storage-key version whenever the question contract changes in a
way that should invalidate saved attempts.

## Security boundary

delivery is intentionally client-practice. Correct answers and the access code
are present in the browser bundle. This is appropriate for a study mirror, not
for a protected graded exam.

A real graded assessment must fetch questions from an authenticated backend,
keep answer keys server-side, authorize attempt creation, use a server deadline,
and submit responses through a validated API. Do not market the client practice
runner as an exam-security boundary.

## Migration path

1. Use this feature for new mixed-format or timed assessments.
2. Add a small adapter for legacy UIQuestion quizzes instead of rewriting their
   data immediately.
3. Migrate old quizzes module by module after contract and visual checks.
4. Introduce a backend attempt API only if graded or cross-device persistence
   becomes a real requirement.

This preserves the current modular frontend and avoids a risky all-at-once quiz
rewrite.

## Quality gates

Run typecheck, lint, assessment unit tests, the course component tests, and the
production bundle. Visually verify access, resume, timer, choice, text,
completion, review-before-submit, result, dark mode, and 320px mobile layouts.
