# Canonical Quiz and Assessment Standard

**Status:** canonical repository standard  
**Reference implementation:** CS56 Module 8 Midterm Quiz  
**Applies to:** Quiz, Midterm, Final, self-check, practice test, and other
question-based assessment work

This document defines how assessments are designed, implemented, migrated, and
verified in the WebDev Coursework Platform. Codex and human contributors must
consult it before changing an existing Quiz or adding a new one.

The standard is behavioral and architectural. The goal is not to make every
course page visually identical. The goal is to give every assessment the same
reliable foundation while allowing course-specific content and context.

## Canonical references

Use these files as the source of truth:

- `frontend/src/features/assessment/` — reusable assessment feature
- `frontend/src/features/assessment/domain/types.ts` — question, response,
  definition, and attempt contracts
- `frontend/src/features/assessment/domain/assessmentEngine.ts` — validation,
  scoring, progress, and formatting rules
- `frontend/src/features/assessment/application/useAssessmentAttempt.ts` —
  attempt lifecycle, timer, persistence orchestration, and actions
- `frontend/src/features/assessment/infrastructure/attemptStorage.ts` — versioned
  and runtime-validated browser persistence
- `frontend/src/features/assessment/components/AssessmentRunner.tsx` — canonical
  assessment experience
- `frontend/src/courses/CS56/assignments/mod8/MidtermQuiz.tsx` — canonical thin
  course adapter and Module Overview
- `frontend/src/courses/CS56/assignments/mod8/midtermData.ts` — canonical mixed
  question dataset
- `frontend/src/courses/CS56/assignments/mod8/MidtermQuiz.test.tsx` — canonical
  course-level behavior test

Do not copy `MidtermQuiz.tsx` into other modules and rename it. Reuse the
assessment feature and create a small course-owned definition, dataset, and
optional overview.

## Product baseline

A canonical assessment provides a complete attempt journey:

1. The learner sees a clear title, summary, duration, question count, points,
   and optional module context.
2. A collapsed Module Overview may provide longer course instructions without
   overwhelming the entry screen.
3. The learner enters the access code and receives accessible inline feedback
   if it is invalid.
4. Starting creates one explicit attempt with an absolute start time and
   deadline.
5. Responses update progress and are saved automatically.
6. Reloading restores a valid active or submitted attempt.
7. The learner can navigate to unanswered questions and see the remaining
   time.
8. Manual submission always includes a review step that reports unanswered
   questions.
9. Expiration submits the attempt deterministically.
10. The result clearly reports score, points, answered questions, duration, and
    submission reason, and offers an intentional restart action.

These are baseline behaviors, not optional visual embellishments.

## Architecture and ownership

The reusable assessment feature is a bounded frontend feature:

```text
frontend/src/features/assessment/
├── application/       # attempt orchestration and state transitions
├── components/        # reusable accessible presentation
├── domain/            # framework-light contracts and pure rules
├── infrastructure/    # browser persistence and external adapters
├── index.ts            # intentionally small public API
└── README.md           # feature-local implementation notes
```

Ownership rules:

- The feature owns generic assessment behavior and presentation.
- A course module owns exact question content, point values, metadata, source
  context, and optional overview content.
- Route or assignment components compose the course adapter; they do not
  reimplement the assessment engine.
- Generic assessment code must not import a specific course.
- Course datasets should depend only on the feature's public contracts.
- Framework and storage details must not leak into question data.

Keep the course adapter small. A typical adapter should contain the definition,
definition assertion, optional overview composition, and the
`<AssessmentRunner />` call—not scoring, timers, persistence, or response state.

## Definition contract

Create a stable definition outside the React render function:

```tsx
import {
  AssessmentRunner,
  assertAssessmentDefinition,
  type AssessmentDefinition,
} from "@/features/assessment";

import { moduleQuizQuestions } from "./quizData";

export const moduleQuizDefinition = {
  id: "cs56-module-09-collections-quiz",
  delivery: "client-practice",
  eyebrow: "CS 56 · Module 9",
  title: "Collections Quiz",
  summary: "Review ArrayList, LinkedList, equals, hashCode, Set, and Map.",
  accessCode: "START",
  accessHint: "Access code: START",
  durationSeconds: 20 * 60,
  storageKey: "assessment:cs56-module-09-collections-quiz:v1",
  questions: moduleQuizQuestions,
} satisfies AssessmentDefinition;

assertAssessmentDefinition(moduleQuizDefinition);

export default function CollectionsQuiz() {
  return <AssessmentRunner definition={moduleQuizDefinition} />;
}
```

Contract rules:

- `id` is unique, stable, lowercase, and course/module specific.
- `delivery` is currently only `"client-practice"`.
- `eyebrow`, `title`, and `summary` describe the assessment without duplicating
  the entire module description.
- `accessCode` and `accessHint` must agree.
- `durationSeconds` is positive and reflects the source material.
- `storageKey` follows `assessment:<stable-id>:v<number>`.
- Increment the storage version when a question contract changes enough that an
  old attempt could become incorrect or impossible to restore.
- Use `satisfies AssessmentDefinition`; do not hide contract errors behind a
  broad cast.
- Call `assertAssessmentDefinition` at module load and allow the runner to
  validate at its boundary as defense in depth.

## Question authoring rules

Use the discriminated `AssessmentQuestion` union. Each question has a unique
numeric `id`, a positive `points` value, a non-empty `prompt`, and one explicit
`kind`.

### Single answer

```ts
{
  id: 1,
  kind: "single",
  points: 2,
  prompt: "Which collection prevents duplicate elements?",
  options: ["ArrayList", "Set", "LinkedList", "Queue"],
  answer: [1],
}
```

`answer` stores zero-based option indexes and must contain exactly one index.

### Multiple answers

```ts
{
  id: 2,
  kind: "multiple",
  points: 3,
  prompt: "Select all statements that are true.",
  options: ["...", "...", "..."],
  answer: [0, 2],
}
```

The answer set is order-independent. Do not encode multiple answers in a
comma-separated string.

### Short text

```ts
{
  id: 3,
  kind: "text",
  points: 4,
  prompt: "Write the declaration.",
  instruction: "Enter Java code only.",
  answers: ["List<String> names;"],
}
```

List every accepted answer explicitly. The existing engine normalizes allowed
text answers; do not silently introduce fuzzy matching or AI grading.

### Code completion

Use `completion` when the learner fills structured blanks inside code. Give
every blank a question-local unique id, a non-empty option list, and an answer
that occurs in that list. Keep the code represented as typed segments rather
than interpolated HTML.

### Content fidelity

During migration, preserve:

- wording and punctuation of prompts;
- option order and labels;
- correct answers;
- point values and total points;
- code whitespace when it changes meaning;
- explanatory text and source links;
- assessment timing and access instructions.

If a source PDF, Canvas page, screenshot, or existing dataset is ambiguous, do
not invent missing content. Record the ambiguity and request confirmation.
Content corrections and interface migrations are separate changes unless the
user explicitly combines them.

## Attempt state machine

The lifecycle is a discriminated union, not a collection of unrelated booleans:

```text
locked ──valid access code──> active ──manual review/confirm──> submitted
                                  └────deadline reached───────> submitted
submitted ──restart───────────────────────────────────────────> active
```

Required invariants:

- An active attempt has `startedAt`, `deadlineAt`, and typed answers.
- Remaining time is derived from `deadlineAt - now`; it is not trusted as a
  repeatedly decremented counter.
- Submission has an explicit `reason`: `manual` or `time-expired`.
- Submission is idempotent from the user's perspective.
- Restart creates a fresh timing window and clears prior answers.
- A malformed, foreign, or unsupported saved attempt fails closed and is
  discarded without breaking the page.

Do not add overlapping state such as `isStarted`, `isFinished`, `timedOut`, and
`showResults` when the attempt union already expresses the state.

## Persistence and runtime validation

Browser storage is an untrusted runtime boundary even when this application
wrote the data originally.

- Persist only the minimal attempt data required to resume.
- Include a schema version and assessment id in the persisted envelope.
- Parse restored JSON with the repository's Zod schema before using it.
- Reject mismatched assessment ids and invalid timestamps or response shapes.
- Handle unavailable storage without crashing or blocking the attempt.
- Expose save/restore status to the learner when useful.
- Never use a TypeScript assertion as a replacement for runtime parsing.

`localStorage` provides same-browser convenience, not cross-device durability,
tamper resistance, or exam security.

## Security boundary

The current runner is explicitly a **client-practice** experience. The access
code and answer key are present in the JavaScript bundle and can be inspected or
modified. Hiding answers in the UI does not change that boundary.

Never describe this implementation as secure delivery for a protected graded
exam.

A real graded assessment requires a separate architecture:

- authenticated and authorized server-side attempt creation;
- answer keys kept server-side;
- server-authoritative deadlines;
- validated response submission through an API;
- replay and duplicate-submission protection;
- auditability and rate limiting;
- explicit rules for reconnects, accommodations, and grading disputes.

Do not add these capabilities opportunistically during a visual Quiz migration.
They require an intentionally scoped backend design.

## Interface standard

The Midterm establishes the interaction baseline. Preserve these qualities when
the visual design evolves:

- clear hierarchy: course/module context, title, summary, facts, primary action;
- calm, readable density appropriate for long assessments;
- collapsed-by-default long overview content;
- visible question number and points on every card;
- progress represented in text and with a semantic progress bar;
- remaining time visible during active attempts;
- explicit autosave/restored-attempt feedback;
- a navigator that distinguishes answered and unanswered questions;
- review-before-submit with unanswered count and a way to return;
- result state separated from the active attempt;
- consistent light and dark themes;
- no horizontal overflow with long code or option text.

Use existing design tokens, primitives, spacing, and typography. Do not make one
course Quiz a disconnected mini-application.

## Accessibility standard

Accessibility is part of correctness.

- Use native `button`, `input`, `select`, `details`, `summary`, `fieldset`, and
  `legend` semantics where they fit.
- Single-answer choices use radios; multiple-answer choices use checkboxes.
- Every input has a programmatic label.
- Grouped controls expose the question prompt and instruction.
- Errors use an appropriate live or alert role and are connected to the input.
- Progress exposes its current and maximum values.
- Time and save status are understandable without color alone.
- Keyboard focus is visible and follows the submission-review transition.
- Question navigator actions identify their destination and state.
- External links use `target="_blank"` only with `rel="noopener noreferrer"`.
- Motion honors `prefers-reduced-motion`.
- Touch targets remain usable on small screens.

Verify the full journey using only a keyboard. ARIA is not a substitute for a
native element that already has the correct behavior.

## Responsive and theme requirements

At minimum, verify:

- 320 px mobile width;
- a representative tablet width;
- standard desktop width;
- long prompts, code, and answer options;
- light mode and dark mode;
- reduced-motion behavior.

The layout must not rely on hover, must not introduce horizontal page scrolling,
and must retain readable line lengths on large displays.

## Legacy Quiz migration workflow

Existing quizzes may use `UIQuestion`, `QuizGenerator`,
`QuizGeneratorPaginated`, API-backed data, or course-specific static runners.
Do not perform a repository-wide rewrite by search and replace.

For one Quiz at a time:

1. **Inventory the current behavior.** Locate the route, component, question
   source, answer format, scoring, API use, images, timing, and tests.
2. **Establish content parity.** Record question count, total points, type mix,
   and exact answers before changing the UI.
3. **Classify delivery.** Confirm that a client-visible answer key is acceptable.
   Do not move an API-backed graded flow to `client-practice` by assumption.
4. **Choose the smallest migration.** Convert static data directly when the
   mapping is lossless; otherwise add a narrow typed adapter and migrate the data
   separately.
5. **Create the course definition.** Use stable ids, timing, access instructions,
   storage version, and an optional collapsed overview.
6. **Reuse the runner.** Add generic behavior to the assessment feature only
   when it benefits multiple assessments and fits its domain.
7. **Preserve routing and progress integration.** A Quiz refactor must not break
   assignment navigation, completion state, or surrounding module content.
8. **Add focused tests.** Protect content totals, gate behavior, supported input
   controls, persistence, review-before-submit, and any course-specific behavior.
9. **Run quality and visual gates.** Use the checklist below.
10. **Report deviations.** State any intentional difference from the canonical
    Midterm and why it exists.

Keep legacy code until no remaining consumer needs it. Remove shared legacy
components only in a separately verified cleanup after all consumers migrate.

## Anti-patterns

Do not:

- copy and rename the entire Midterm component for each course;
- build a new scoring or timer hook inside a course directory;
- use `any`, broad type assertions, or raw string conventions for responses;
- keep correct answers and selected answers in the same ambiguous shape;
- decrement a timer counter and persist the counter as the source of truth;
- trust parsed `localStorage` data without runtime validation;
- submit immediately without a review step;
- use clickable `div` or `span` elements;
- use color as the only answered, error, or correctness signal;
- reveal answer keys accidentally in result copy or browser logs;
- claim that an access code embedded in the frontend secures an exam;
- change question semantics while presenting the work as an interface-only
  migration;
- introduce a new package when the existing feature can support the requirement.

## Testing standard

Test behavior and invariants rather than Tailwind class strings.

### Domain tests

Cover:

- definition validation and rejected invalid datasets;
- answered versus unanswered rules for each question kind;
- correctness for each response variant;
- order-independent multiple-choice scoring;
- weighted points, totals, and percentages;
- text normalization rules;
- incomplete and incorrect code-completion responses.

### Persistence and application tests

Cover:

- active-attempt save and restore;
- submitted-attempt restore;
- malformed, mismatched, and unavailable storage;
- deadline restoration and automatic expiration;
- restart behavior;
- manual versus time-expired submission reason.

### Course component tests

At minimum, assert:

- exact question count, sequential or expected ids, and total points;
- access gate and invalid-code feedback;
- overview default state when present;
- expected native controls for the dataset's question kinds;
- progress after answering;
- autosave and remount restoration;
- review-before-submit and final result.

### Required commands

Run the smallest focused tests during development, then the repository-standard
gates before completion:

```bash
yarn workspace frontend test --run \
  src/features/assessment \
  src/courses/<COURSE>/assignments/<MODULE>/<Quiz>.test.tsx
yarn workspace frontend typecheck
yarn workspace frontend lint
yarn workspace frontend test --run
yarn workspace frontend build:bundle
```

If changes cross into the backend or shared root tooling, also run the relevant
root or backend checks. Do not report a gate as passing unless it was actually
executed successfully.

## Visual verification checklist

Verify the real route, not only an isolated component:

- locked entry screen and invalid access code;
- overview collapsed by default and expanded content;
- start attempt and all represented question kinds;
- answer, change answer, and clear/change multi-answer behavior;
- progress, navigator, timer, and autosave feedback;
- reload and resume;
- review with unanswered questions;
- cancel review and continue;
- manual submission;
- timeout submission when practical to test;
- result and restart;
- keyboard-only flow;
- light, dark, 320 px mobile, tablet, and desktop layouts;
- no console errors introduced by the assessment.

## Definition of Done

A Quiz implementation or migration is complete only when:

- the assessment uses the shared feature or has a documented reason not to;
- content and point totals match the authoritative source;
- definition and question contracts are strict and runtime invariants are
  checked;
- attempt states, timer, persistence, submission, and restart behave
  deterministically;
- the security boundary is truthful;
- accessibility, responsive layout, dark mode, and reduced motion are verified;
- focused tests and required quality gates pass;
- unrelated user changes remain untouched;
- the final handoff lists changed files, executed checks, and any known
  deviations or follow-up work.

## Codex execution protocol

When Codex is asked to create or rewrite a Quiz, it must:

1. Read this document and `frontend/src/features/assessment/README.md` fully.
2. Inspect repository instructions, `git status`, the target route, existing
   Quiz implementation, data source, and relevant tests before editing.
3. Compare the target with the CS56 Midterm reference without assuming all
   differences are defects.
4. State whether the work is a content-preserving migration, a content change,
   or both.
5. Preserve unrelated worktree changes and avoid destructive Git operations.
6. Prefer extending the shared feature over duplicating generic behavior, but
   avoid speculative abstractions for one Quiz.
7. Keep the course adapter thin and the dataset typed.
8. Add or update tests in proportion to migration risk.
9. Perform focused checks first, then the full required gates and visual route
   verification.
10. Report the outcome precisely. Never claim parity, security, accessibility,
    or passing checks without evidence.

When the requested behavior conflicts with this standard, Codex should follow
the explicit user request, identify the exception, and keep the deviation as
small and reversible as possible.
