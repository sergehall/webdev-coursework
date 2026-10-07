import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mentorEvalScenarios } from "./mentor-eval-scenarios";

describe("mentor model evaluation fixtures", () => {
  it("contains 41 distinct English cases with real catalog sources and a review criterion", () => {
    const ids = new Set(mentorEvalScenarios.map((item) => item.id));
    expect(mentorEvalScenarios).toHaveLength(41);
    expect(ids.size).toBe(41);
    expect(
      mentorEvalScenarios.filter((item) => item.mode === "chat")
    ).toHaveLength(21);
    expect(
      mentorEvalScenarios.filter((item) => item.mode === "plan")
    ).toHaveLength(20);
    const manifest = JSON.parse(
      readFileSync(
        join(__dirname, "../knowledge/catalog.manifest.json"),
        "utf8"
      )
    ) as {
      entries: {
        id: string;
        prerequisites: { kind: string; sourceId?: string }[];
      }[];
    };
    const known = new Map(manifest.entries.map((entry) => [entry.id, entry]));
    for (const item of mentorEvalScenarios) {
      expect(item.request).toBeTruthy();
      expect(item.expected.length).toBeGreaterThan(0);
      expect(item.profile.hours).toBeGreaterThan(0);
      expect(/\p{Script=Cyrillic}/u.test(JSON.stringify(item))).toBe(false);
      for (const sourceId of item.availableSourceIds)
        expect(known.has(sourceId)).toBe(true);
      if (item.mode === "plan")
        for (const sourceId of item.availableSourceIds)
          for (const prerequisite of known.get(sourceId)!.prerequisites)
            if (prerequisite.kind === "learning")
              expect(item.availableSourceIds).toContain(prerequisite.sourceId);
    }
  });
});
