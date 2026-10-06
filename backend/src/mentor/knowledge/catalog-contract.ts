import { createHash } from "node:crypto";

export const skillIds = [
  "html",
  "css",
  "javascript",
  "dom",
  "git",
  "java",
  "sql",
  "data-modeling",
  "networking",
  "cloud",
  "aws",
  "php",
  "python",
  "security",
  "web-development",
] as const;
export type SkillId = (typeof skillIds)[number];
export type Goal = "frontend" | "backend" | "full-stack" | "explore";
export type Prerequisite = {
  kind: "learning" | "official" | "advisory";
  description: string;
  sourceId?: string;
};
export type KnowledgeEntry = {
  id: string;
  kind: "course" | "module" | "resource";
  courseId?: string;
  moduleId?: string;
  title: string;
  summary: string;
  learningOutcomes: string[];
  skillIds: SkillId[];
  goals: Goal[];
  difficulty: "foundation" | "intermediate" | "advanced";
  href: string;
  availability: "published";
  reviewedAt: string;
  sourcePaths: string[];
  prerequisites: Prerequisite[];
  access:
    | { kind: "public" }
    | { kind: "course-progress"; previousSourceId: string };
};
export type Coverage = {
  activeCourses: number;
  reviewedCourses: number;
  registeredModules: number;
  reviewedModules: number;
  courses: {
    courseId: string;
    declaredSlots: number;
    registered: number;
    reviewed: number;
  }[];
  excluded: { id: string; reason: string; sourcePath?: string }[];
};
export type CatalogPayload = {
  schemaVersion: 1;
  entries: KnowledgeEntry[];
  skills: readonly SkillId[];
  coverage: Coverage;
  inputHashes: Record<string, string>;
};
export type CatalogManifest = CatalogPayload & { version: string };

export function catalogVersion(payload: CatalogPayload): string {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Invalid mentor catalog: ${message}`);
}
function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function text(value: unknown, max = 1200): value is string {
  return (
    typeof value === "string" && value.trim().length > 0 && value.length <= max
  );
}
function strings(value: unknown, maxItems = 20): value is string[] {
  return (
    Array.isArray(value) &&
    value.length <= maxItems &&
    value.every((item) => text(item))
  );
}

/** Validate the shipped artifact before exposing any recommendation or citation. */
export function validateManifest(
  value: unknown
): asserts value is CatalogManifest {
  assert(object(value) && value.schemaVersion === 1, "schema version");
  assert(
    Array.isArray(value.entries) &&
      value.entries.length > 0 &&
      value.entries.length <= 1000,
    "entries"
  );
  assert(
    Array.isArray(value.skills) &&
      JSON.stringify(value.skills) === JSON.stringify(skillIds),
    "skill vocabulary"
  );
  assert(
    object(value.inputHashes) && Object.keys(value.inputHashes).length > 0,
    "input hashes"
  );
  assert(
    Object.entries(value.inputHashes).every(
      ([path, hash]) =>
        /^(frontend|backend)\/[\w./-]+$/.test(path) &&
        !path.includes("..") &&
        typeof hash === "string" &&
        /^[a-f0-9]{64}$/.test(hash)
    ),
    "source hashes"
  );
  const ids = new Set<string>();
  for (const entry of value.entries) {
    assert(object(entry), "entry object");
    assert(
      text(entry.id, 100) && !ids.has(entry.id),
      "duplicate or missing ID"
    );
    ids.add(entry.id);
    assert(
      ["course", "module", "resource"].includes(String(entry.kind)),
      "kind"
    );
    assert(entry.availability === "published", "unpublished source");
    assert(text(entry.title, 200) && text(entry.summary), "title/summary");
    assert(
      strings(entry.learningOutcomes) && entry.learningOutcomes.length > 0,
      "outcomes"
    );
    assert(
      strings(entry.skillIds) &&
        entry.skillIds.length > 0 &&
        entry.skillIds.every((id) =>
          (skillIds as readonly string[]).includes(id)
        ),
      "skills"
    );
    assert(
      strings(entry.goals, 4) &&
        entry.goals.length > 0 &&
        entry.goals.every((goal) =>
          ["frontend", "backend", "full-stack", "explore"].includes(goal)
        ),
      "goals"
    );
    assert(
      ["foundation", "intermediate", "advanced"].includes(
        String(entry.difficulty)
      ),
      "difficulty"
    );
    assert(
      typeof entry.reviewedAt === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(entry.reviewedAt) &&
        Number.isFinite(Date.parse(entry.reviewedAt)),
      "review date"
    );
    assert(
      strings(entry.sourcePaths) &&
        entry.sourcePaths.length > 0 &&
        entry.sourcePaths.every(
          (path) =>
            path in (value.inputHashes as object) &&
            !/placeholder|quiz|answer|solution|\.env/i.test(path)
        ),
      "reviewed source paths"
    );
    if (entry.kind === "resource") {
      assert(
        entry.id === "roadmap:web-developer" &&
          entry.href === "/web-developer-path" &&
          entry.courseId === undefined &&
          entry.moduleId === undefined,
        "roadmap route"
      );
    } else {
      assert(
        typeof entry.courseId === "string" &&
          /^CS\d+[A-Z]?$/.test(entry.courseId),
        "course ID"
      );
      const suffix = entry.kind === "module" ? `/${entry.moduleId}` : "";
      assert(
        entry.href === `/coursework/${entry.courseId}/assignment${suffix}`,
        "canonical route"
      );
      assert(
        entry.id ===
          (entry.kind === "course"
            ? `course:${entry.courseId}`
            : `module:${entry.courseId}:${entry.moduleId}`),
        "canonical ID"
      );
      assert(
        entry.kind === "course"
          ? entry.moduleId === undefined
          : typeof entry.moduleId === "string" &&
              /^[1-9]\d*$/.test(entry.moduleId),
        "module ID"
      );
    }
    assert(
      object(entry.access) &&
        ["public", "course-progress"].includes(String(entry.access.kind)),
      "access"
    );
    assert(
      Array.isArray(entry.prerequisites) && entry.prerequisites.length <= 20,
      "prerequisites"
    );
    for (const pre of entry.prerequisites) {
      assert(
        object(pre) &&
          ["learning", "official", "advisory"].includes(String(pre.kind)) &&
          text(pre.description),
        "prerequisite description"
      );
      assert(
        pre.sourceId === undefined || text(pre.sourceId, 100),
        "prerequisite ID"
      );
    }
  }
  const entries = value.entries as KnowledgeEntry[];
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  for (const entry of entries) {
    for (const pre of entry.prerequisites)
      assert(
        !pre.sourceId || byId.has(pre.sourceId),
        `unknown prerequisite ${pre.sourceId}`
      );
    if (entry.kind === "module") {
      assert(
        byId.get(`course:${entry.courseId}`)?.kind === "course",
        "missing parent course"
      );
      const previous = `module:${entry.courseId}:${Number(entry.moduleId) - 1}`;
      assert(
        Number(entry.moduleId) === 1
          ? entry.access.kind === "public"
          : entry.access.kind === "course-progress" &&
              entry.access.previousSourceId === previous &&
              byId.has(previous),
        "module access gate"
      );
    } else assert(entry.access.kind === "public", "course/resource access");
  }
  const visited = new Set<string>();
  const active = new Set<string>();
  function visit(id: string) {
    assert(!active.has(id), "prerequisite cycle");
    if (visited.has(id)) return;
    active.add(id);
    for (const pre of byId.get(id)!.prerequisites)
      if (pre.sourceId) visit(pre.sourceId);
    active.delete(id);
    visited.add(id);
  }
  for (const entry of entries) visit(entry.id);
  const coverage = value.coverage;
  assert(
    object(coverage) &&
      Array.isArray(coverage.courses) &&
      Array.isArray(coverage.excluded),
    "coverage"
  );
  assert(
    coverage.activeCourses ===
      entries.filter((entry) => entry.kind === "course").length &&
      coverage.reviewedCourses === coverage.activeCourses,
    "all active courses must be reviewed"
  );
  assert(
    coverage.reviewedModules ===
      entries.filter((entry) => entry.kind === "module").length,
    "module coverage"
  );
  const { version, ...payload } = value;
  assert(
    typeof version === "string" &&
      version === catalogVersion(payload as CatalogPayload),
    "manifest hash"
  );
}
