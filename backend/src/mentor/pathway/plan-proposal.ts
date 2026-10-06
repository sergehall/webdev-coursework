import { createHash } from "node:crypto";
import type { MilestoneInput } from "../api/mentor-input";
import type { EvidenceSelection } from "../knowledge/knowledge-catalog";

export type PlanProposal = {
  milestones: (MilestoneInput & { sourceIds: string[] })[];
  metadata: {
    goal: string;
    assumptions: string[];
    rationale: string;
    sources: { sourceId: string; title: string; href: string }[];
  };
};

// The provider's JSON mode constrains output shape; this schema is still checked below.
export const PLAN_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["goal", "assumptions", "rationale", "sourceIds", "milestones"],
  properties: {
    goal: { type: "string" },
    assumptions: { type: "array", items: { type: "string" } },
    rationale: { type: "string" },
    sourceIds: { type: "array", items: { type: "string" } },
    milestones: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["week", "title", "doneWhen", "hours", "sourceIds"],
        properties: {
          week: { type: "integer" },
          title: { type: "string" },
          doneWhen: { type: "string" },
          hours: { type: "number" },
          sourceIds: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
} as const;

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("INVALID_PLAN");
  return value as Record<string, unknown>;
}
function fields(value: Record<string, unknown>, allowed: string[]) {
  if (Object.keys(value).some((key) => !allowed.includes(key)))
    throw new Error("INVALID_PLAN");
}
function bounded(value: unknown, max: number): string {
  if (
    typeof value !== "string" ||
    !value.trim() ||
    value.length > max ||
    /\p{Script=Cyrillic}/u.test(value)
  )
    throw new Error("INVALID_PLAN");
  return value.trim();
}
function ids(value: unknown, allowed: Set<string>, max: number): string[] {
  if (
    !Array.isArray(value) ||
    value.length > max ||
    value.some((id) => typeof id !== "string" || !allowed.has(id)) ||
    new Set(value).size !== value.length
  )
    throw new Error("INVALID_PLAN");
  return value as string[];
}

export function validatePlanProposal(
  raw: unknown,
  profile: { goal: string; hours: number },
  evidence: EvidenceSelection
): PlanProposal {
  if (Buffer.byteLength(JSON.stringify(raw), "utf8") > 16_000)
    throw new Error("INVALID_PLAN");
  const plan = object(raw);
  fields(plan, ["goal", "assumptions", "rationale", "sourceIds", "milestones"]);
  if (bounded(plan.goal, 16) !== profile.goal) throw new Error("INVALID_PLAN");
  if (
    !Array.isArray(plan.assumptions) ||
    plan.assumptions.length > 4 ||
    plan.assumptions.some((item) => typeof item !== "string")
  )
    throw new Error("INVALID_PLAN");
  const assumptions = plan.assumptions.map((item) => bounded(item, 180));
  const rationale = bounded(plan.rationale, 600);
  const byId = new Map(evidence.sources.map((source) => [source.id, source]));
  const allowed = new Set(byId.keys());
  const sourceIds = ids(plan.sourceIds, allowed, 6);
  if (allowed.size && !sourceIds.length) throw new Error("INVALID_PLAN");
  if (!Array.isArray(plan.milestones) || plan.milestones.length !== 8)
    throw new Error("INVALID_PLAN");
  const seen = new Set<string>();
  const used = new Set<string>();
  const milestones = plan.milestones.map((item, index) => {
    const step = object(item);
    fields(step, ["week", "title", "doneWhen", "hours", "sourceIds"]);
    const week = Math.floor(index / 2) + 1;
    if (step.week !== week) throw new Error("INVALID_PLAN");
    const title = bounded(step.title, 140);
    const doneWhen = bounded(step.doneWhen, 500);
    if (
      typeof step.hours !== "number" ||
      !Number.isInteger(step.hours * 2) ||
      step.hours < 0.5 ||
      step.hours > profile.hours
    )
      throw new Error("INVALID_PLAN");
    const references = ids(step.sourceIds, allowed, 3);
    for (const id of references) {
      const source = byId.get(id)!;
      for (const prerequisite of source.prerequisites) {
        if (
          prerequisite.kind === "learning" &&
          prerequisite.sourceId &&
          !used.has(prerequisite.sourceId)
        )
          throw new Error("INVALID_PLAN");
      }
      used.add(id);
    }
    // An unchanged outcome retains its ID across revisions; a changed result gets a new ID.
    const id = `step-${createHash("sha256")
      .update(JSON.stringify([title, doneWhen, references]))
      .digest("hex")
      .slice(0, 20)}`;
    if (seen.has(id)) throw new Error("INVALID_PLAN");
    seen.add(id);
    return {
      id,
      week,
      title,
      doneWhen,
      hours: step.hours,
      sourceIds: references,
    };
  });
  for (let week = 1; week <= 4; week++) {
    const hours = milestones
      .filter((step) => step.week === week)
      .reduce((sum, step) => sum + step.hours, 0);
    if (hours > profile.hours + 0.5) throw new Error("INVALID_PLAN");
  }
  if (sourceIds.length !== used.size || sourceIds.some((id) => !used.has(id)))
    throw new Error("INVALID_PLAN");
  return {
    milestones,
    metadata: {
      goal: profile.goal,
      assumptions,
      rationale,
      sources: sourceIds.map((id) => {
        const source = byId.get(id)!;
        return { sourceId: id, title: source.title, href: source.href };
      }),
    },
  };
}
