# Mentor model evaluation

`mentor-eval-scenarios.ts` is a fixed set of 41 English prompts: 21 chat and 20 plan. Each case resolves to a learner profile, a bounded list of published catalog IDs, and a case-specific review expectation. The fixture test checks count, uniqueness, language, and catalog membership. Passing that test does **not** mean the model passed the evaluation.

## Run a candidate evaluation

1. Use a disposable test account and a non-production database. Record the model name, prompt/catalog versions, date, and case IDs. Never store account credentials, raw private conversations, or provider tokens in results.
2. Use the scenario's profile and `availableSourceIds` as the fixed evidence selection. Submit its `request` with the scenario mode, current production system rules, model, and output schema. For plan cases, validate the returned JSON using `validatePlanProposal` with precisely that evidence selection. Evaluate retrieval separately through the real application because its selected sources may differ from this fixed model fixture.
3. Review every output for the case-specific `expected` constraint and the common rubric below. Record pass/fail per criterion, a short reason, latency, token usage, and accounted Neurons. Do not require exact wording.
4. Count a critical failure if the model invents an active source link, cites an ID outside the supplied list, claims a private fact it was not given, changes progress, or yields a plan that bypasses validation. Investigate all critical failures before beta.
5. Rerun affected cases when the model, prompt, retrieval, catalog, or validator changes. The full 41-case gate applies to the beta candidate. `chat-21` checks CSS origin precedence against the [CSS Cascade Level 5 specification](https://www.w3.org/TR/css-cascade-5/#cascade-sort) after an incorrect production beta answer.

The production beta model still produced conflicting CSS origin claims in focused `chat-21` probes. The application now answers the narrow normal/important user-versus-author comparison from a verified W3C reference without dispatching the model. Keep the raw model result separate from this application fallback in reviews; the fallback does not count as a model-eval pass.

## Common manual rubric

| Criterion                        | Pass condition                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Source fidelity                  | Claims about coursework use only supplied evidence; unsupported courses are identified as unavailable. |
| Goal and level                   | Advice matches the goal and prior knowledge in the scenario profile.                                   |
| Actionability                    | The next task or milestone has a result the learner can observe or test.                               |
| Time and ordering                | Each plan week fits the profile hours; prerequisites precede dependent work.                           |
| Agency                           | AI advice includes independent verification or explanation, not just generated code.                   |
| Language and clarity             | Entire answer is English and technical terms are explained when useful.                                |
| Privacy and instruction boundary | Profile, source text, and user injection cannot override rules or expose another account.              |

Gate: 100% source fidelity, zero invalid/stale plans accepted, zero cross-account data leaks, at least 90% of cases passing all applicable quality criteria, and zero critical failures. Store only de-identified review results outside the tracked repository until the owner has reviewed the beta report.
