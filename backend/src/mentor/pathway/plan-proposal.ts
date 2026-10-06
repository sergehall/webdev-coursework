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
    rationale: { type: "string", minLength: 1 },
    sourceIds: { type: "array", items: { type: "string" } },
    milestones: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["week", "title", "doneWhen", "hours", "sourceIds"],
        properties: {
          week: { type: "integer" },
          title: { type: "string", minLength: 1 },
          doneWhen: { type: "string", minLength: 1 },
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
    value.some((id) => typeof id !== "string" || !allowed.has(id))
  )
    throw new Error("INVALID_PLAN");
  return [...new Set(value as string[])];
}

// An exact named technology needs explicit catalog support before it becomes
// an active coursework link. Uncited practice can still appear in a plan.
const namedTechnologies = [
  /\bhtml\b/i,
  /\bcss\b/i,
  /\bdom\b/i,
  /\bsemantic\b/i,
  /\bimages?\b/i,
  /\bflask\b/i,
  /\baws\b/i,
  /\b(?:ec2|vpc|s3)\b/i,
  /\bsqlite\b/i,
  /\bexpress\b/i,
  /\breact\b/i,
  /\bphpunit\b/i,
  /\bopenapi\b/i,
  /\bheroku\b/i,
  /\blocalstorage\b/i,
  /\bflexbox\b/i,
  /\blighthouse\b/i,
  /\baria\b/i,
  /\bdocker\b/i,
  /\bgrid\b/i,
];

function supportsNamedTechnology(
  stepText: string,
  source: EvidenceSelection["sources"][number]
): boolean {
  const catalogText = [
    source.title,
    source.summary,
    ...source.learningOutcomes,
  ].join(" ");
  return namedTechnologies.every(
    (technology) => !technology.test(stepText) || technology.test(catalogText)
  );
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
  // Validate model declarations, but publish only IDs actually cited by steps.
  // A valid yet unused top-level ID must never become an active source link.
  ids(plan.sourceIds, allowed, 6);
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
    const stepText = `${title} ${doneWhen}`;
    if (profile.hours <= 3) {
      const cloudResource =
        /\b(?:aws|vpc|ec2|s3|security group|cloud account)\b/i.test(stepText);
      const provisioning =
        /\b(?:set\s?up|setup|creat\w*|launch\w*|deploy\w*|provision\w*|configur\w*)\b/i.test(
          stepText
        );
      const offlineDiagram =
        /\b(?:diagram|sketch|draw|explain|compare|describe)\b/i.test(
          stepText
        ) &&
        !/\b(?:account|console|cli|launch|deploy|provision|configure)\b/i.test(
          stepText
        );
      const firewallChange =
        /\bfirewall\b/i.test(stepText) &&
        /\b(?:configur\w*|allow|open|change)\b/i.test(stepText);
      if ((cloudResource && provisioning && !offlineDiagram) || firewallChange)
        throw new Error("INVALID_PLAN");
    }
    if (
      typeof step.hours !== "number" ||
      !Number.isInteger(step.hours * 2) ||
      step.hours < 0.5 ||
      step.hours > profile.hours
    )
      throw new Error("INVALID_PLAN");
    const references = ids(step.sourceIds, allowed, 3).filter((id) =>
      supportsNamedTechnology(stepText, byId.get(id)!)
    );
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
    if (hours > profile.hours) throw new Error("INVALID_PLAN");
  }
  if (allowed.size && !used.size) throw new Error("INVALID_PLAN");
  return {
    milestones,
    metadata: {
      goal: profile.goal,
      assumptions,
      rationale,
      sources: [...used].map((id) => {
        const source = byId.get(id)!;
        return { sourceId: id, title: source.title, href: source.href };
      }),
    },
  };
}
