import { KnowledgeCatalog } from "../knowledge/knowledge-catalog";
import { validatePlanProposal } from "./plan-proposal";

const catalog = new KnowledgeCatalog();
const evidence = catalog.retrieve({ goal: "frontend", limit: 6 });
const first = evidence.sources.find(
  (source) => !source.prerequisites.some((pre) => pre.kind === "learning")
)!;
const profile = { goal: "frontend", hours: 3 };

function proposal() {
  return {
    goal: "frontend",
    assumptions: ["Practice on a small project."],
    rationale: "Start with concrete web foundations.",
    sourceIds: [first.id],
    milestones: Array.from({ length: 8 }, (_, index) => ({
      week: Math.floor(index / 2) + 1,
      title: `Milestone ${index + 1}`,
      doneWhen: `An example for milestone ${index + 1} is saved.`,
      hours: 1,
      sourceIds: index === 0 ? [first.id] : [],
    })),
  };
}

describe("validated mentor plan proposals", () => {
  it("derives stable IDs and server-owned source links", () => {
    const a = validatePlanProposal(proposal(), profile, evidence);
    const revised = proposal();
    revised.milestones[0].hours = 0.5;
    const b = validatePlanProposal(revised, profile, evidence);
    expect(a.milestones[0].id).toBe(b.milestones[0].id);
    expect(a.metadata.sources[0]).toEqual({
      sourceId: first.id,
      title: first.title,
      href: first.href,
    });
    revised.milestones[0].doneWhen = "A changed result is saved.";
    const c = validatePlanProposal(revised, profile, evidence);
    expect(c.milestones[0].id).not.toBe(a.milestones[0].id);
  });

  it.each([
    [
      "unknown source",
      (p: ReturnType<typeof proposal>) => {
        p.sourceIds[0] = "course:unknown";
      },
    ],
    [
      "over budget",
      (p: ReturnType<typeof proposal>) => {
        p.milestones[0].hours = 3;
      },
    ],
    [
      "wrong week",
      (p: ReturnType<typeof proposal>) => {
        p.milestones[2].week = 1;
      },
    ],
    [
      "duplicate result",
      (p: ReturnType<typeof proposal>) => {
        p.milestones[1].title = p.milestones[0].title;
        p.milestones[1].doneWhen = p.milestones[0].doneWhen;
        p.milestones[1].sourceIds = [first.id];
      },
    ],
    [
      "Russian text",
      (p: ReturnType<typeof proposal>) => {
        p.rationale = "Начните с HTML";
      },
    ],
    [
      "model URL",
      (p: ReturnType<typeof proposal>) => {
        (p.milestones[0] as object as Record<string, unknown>).href =
          "https://example.com";
      },
    ],
  ])("rejects %s", (_name, change) => {
    const input = proposal();
    change(input);
    expect(() => validatePlanProposal(input, profile, evidence)).toThrow(
      "INVALID_PLAN"
    );
  });

  it("requires learning prerequisites before a cited source", () => {
    const dependent = {
      ...first,
      id: "test-dependent",
      prerequisites: [
        {
          kind: "learning" as const,
          sourceId: first.id,
          description: "Study foundation first.",
        },
      ],
    };
    const input = proposal();
    input.sourceIds.push(dependent.id);
    input.milestones[0].sourceIds = [dependent.id];
    input.milestones[1].sourceIds = [first.id];
    expect(() =>
      validatePlanProposal(input, profile, {
        catalogVersion: evidence.catalogVersion,
        sources: [first, dependent],
      })
    ).toThrow("INVALID_PLAN");
  });
});
