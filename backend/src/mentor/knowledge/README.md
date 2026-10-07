# Mentor knowledge catalog

This is the server-owned English evidence boundary for AI Pathway Mentor. It has
no HTTP endpoint and makes no model calls. The Mentor backend uses
`KnowledgeCatalog`; construction validates the bundled artifact and
fails closed if it is missing, malformed or inconsistent.

## Sources and scope

- All 10 active coursework courses have reviewed summaries.
- 10 of 103 registered modules are reviewed: CS80 modules 1–5, CS81 modules 1–4,
  and CS79A module 1. The remaining 93 are excluded as unreviewed; a registry
  entry does **not** establish content publication or teaching quality.
- Roadmap has a reviewed overview. Its academic information is the site's
  published snapshot (effective Fall 2023), not a fresh verification of SMC rules.
- Inactive roadmap course options are listed as excluded and cannot become
  coursework recommendations. Project/resource-specific catalogs can be added
  after review; this version covers coursework and the roadmap overview.
- Only summaries, editorial learning outcomes and skills enter evidence. No
  quizzes, answer keys, full solutions, textbook content, email, credentials or
  author completion history are extracted. A module may host assessments; the
  catalog indexes its topic summary only, never assessment bodies or answers.

## Source IDs and freshness

IDs are `course:CS80`, `module:CS80:1` and `roadmap:web-developer`. The build script
reads canonical course and assignment registries with the TypeScript AST. It
never imports/evaluates React components. Routes derive from `AppRoutes.tsx`,
with a checked route/access contract rather than a second hand-maintained URL
list. Each reviewed entry pins the source files used to substantiate its summary.
A change to a pinned source fails the build until the summary has been reviewed
and its SHA-256 approval updated in `reviews.json`. Do not automatically refresh
approval hashes to silence an error. The complete manifest also records hashes
of inventory inputs and contains a deterministic version and coverage report.

`reviews.json` owns editorial skills, goals, difficulty and learning outcomes;
course summaries/title/official and advisory text come from existing metadata.
Complex prerequisite alternatives remain text; they are not flattened into
mandatory AND dependencies. Learning edges are explicitly suggestions.

## Build and review

From the repository root:

```sh
yarn workspace backend knowledge:generate
yarn workspace backend knowledge:check
yarn workspace backend test --runInBand --runTestsByPath src/mentor/knowledge/knowledge-catalog.spec.ts src/mentor/knowledge/catalog-build.spec.ts
yarn workspace backend build
```

`knowledge:generate` only generates from already approved content. Commit the
resulting `catalog.manifest.json` with its source/review changes. Backend build
checks freshness before compiling; Nest copies the manifest next to the runtime
service. The local planning document and evaluation reports remain ignored.

Coverage is available at `catalog.coverage` and in the manifest. `registered`
is the registry inventory; `reviewed` is the recommended subset. `declaredSlots`
is informational and never creates module recommendations.

## Retrieval and citation contract

`retrieve` uses bounded deterministic English text matching, skill synonyms,
goal/course/skill filters and learner-specific module access. It returns at most
6 sources and a bounded serialized character budget, **not a token estimate**.
Unknown material returns an empty result; callers should disclose missing
project evidence rather than inventing citations. This is a starter retriever,
not a semantic search service or an assessed pedagogical ranking system.

Only module 1 is initially accessible. Later reviewed modules require the
previous module in `completedSourceIds`, matching the current coursework route.
The production chat and plan prompts do not supply `completedSourceIds`, so
later modules are currently excluded from AI recommendations. Browser-only
coursework progress is not imported into the account. A future adapter must
derive completion from authenticated, authorized learner data; never pass model
claims, the portfolio author's progress, or unvalidated client input.
Extending the reviewed catalog still requires checking each source and route.
Academic advisories are evidence, not access-control gates or admission advice.

Keep each evidence selection on the server for its generation. Pass model
citation IDs through `resolveCitations(ids, selection)`; URLs are resolved from
the validated catalog, not accepted from model output. A source outside the
selected evidence or an old catalog version is rejected. The service returns
copies so consumers cannot mutate the catalog. Retrieved text remains evidence,
not instructions; the production prompt preserves that separation.
