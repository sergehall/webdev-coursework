import { BadRequestException } from "@nestjs/common";

export type LearnerInput = {
  goal: "frontend" | "backend" | "full-stack" | "explore";
  level: "beginner" | "foundations" | "building-projects";
  hours: number;
  outcome: string;
};
export type MilestoneInput = {
  id: string;
  week: number;
  title: string;
  doneWhen: string;
  hours: number;
};
export function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new BadRequestException("Invalid input");
  return value as Record<string, unknown>;
}
export function exact(value: Record<string, unknown>, keys: string[]) {
  if (Object.keys(value).some((key) => !keys.includes(key)))
    throw new BadRequestException("Invalid input");
}
export function integer(value: unknown, min: number, max: number): number {
  if (
    !Number.isInteger(value) ||
    (value as number) < min ||
    (value as number) > max
  )
    throw new BadRequestException("Invalid input");
  return value as number;
}
export function string(
  value: unknown,
  max: number,
  allowEmpty = false
): string {
  if (
    typeof value !== "string" ||
    value.length > max ||
    (!allowEmpty && !value.trim())
  )
    throw new BadRequestException("Invalid input");
  return value.trim();
}
export function uuid(value: unknown): string {
  const result = string(value, 36);
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      result
    )
  )
    throw new BadRequestException("Invalid identifier");
  return result;
}
export function profileInput(value: unknown): {
  profile: LearnerInput;
  expectedVersion: number | null;
} {
  const input = record(value);
  exact(input, ["goal", "level", "hours", "outcome", "expectedVersion"]);
  if (
    !["frontend", "backend", "full-stack", "explore"].includes(
      String(input.goal)
    ) ||
    !["beginner", "foundations", "building-projects"].includes(
      String(input.level)
    )
  )
    throw new BadRequestException("Invalid profile");
  return {
    profile: {
      goal: input.goal as LearnerInput["goal"],
      level: input.level as LearnerInput["level"],
      hours: integer(input.hours, 1, 40),
      outcome: string(input.outcome, 500, true),
    },
    expectedVersion:
      input.expectedVersion === null
        ? null
        : integer(input.expectedVersion, 1, 2147483646),
  };
}
function halfHours(value: unknown): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0.5 ||
    value > 40 ||
    !Number.isInteger(value * 2)
  )
    throw new BadRequestException("Invalid plan");
  return value;
}
export function milestoneInput(value: unknown): MilestoneInput[] {
  if (!Array.isArray(value) || value.length !== 8)
    throw new BadRequestException("Invalid plan");
  const ids = new Set<string>();
  return value.map((raw, index) => {
    const step = record(raw);
    exact(step, ["id", "week", "title", "doneWhen", "hours"]);
    const id = string(step.id, 100);
    if (!/^[a-zA-Z0-9-]+$/.test(id) || ids.has(id))
      throw new BadRequestException("Invalid plan");
    ids.add(id);
    const week = integer(step.week, 1, 4);
    if (week !== Math.floor(index / 2) + 1)
      throw new BadRequestException("Invalid plan");
    return {
      id,
      week,
      title: string(step.title, 140),
      doneWhen: string(step.doneWhen, 500),
      hours: halfHours(step.hours),
    };
  });
}
