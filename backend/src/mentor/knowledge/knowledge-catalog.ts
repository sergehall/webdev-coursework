import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  validateManifest,
  skillIds,
  type CatalogManifest,
  type Goal,
  type KnowledgeEntry,
  type SkillId,
} from "./catalog-contract";

export type EvidenceSource = Pick<
  KnowledgeEntry,
  | "id"
  | "kind"
  | "courseId"
  | "moduleId"
  | "title"
  | "summary"
  | "learningOutcomes"
  | "skillIds"
  | "difficulty"
  | "href"
  | "prerequisites"
>;
export type EvidenceSelection = {
  catalogVersion: string;
  sources: EvidenceSource[];
};
export type KnowledgeQuery = {
  query?: string;
  goal?: Goal;
  skillIds?: SkillId[];
  courseId?: string;
  /** Caller must supply the current learner's authorized progress, never author progress or model claims. */
  completedSourceIds?: string[];
  limit?: number;
  maxCharacters?: number;
};
const synonyms: Record<string, string[]> = {
  js: ["javascript"],
  styles: ["css"],
  styling: ["css"],
  layout: ["css"],
  browser: ["html", "dom"],
  databases: ["sql", "data", "modeling"],
  database: ["sql", "data", "modeling"],
  hosting: ["cloud", "aws"],
  amazon: ["aws"],
  networking: ["network"],
  beginner: ["introduction", "foundation"],
  beginners: ["introduction", "foundation"],
  roadmap: ["program", "overview"],
  pathway: ["program", "overview"],
};
const stopWords = new Set(
  "a an the i me my want to learn about how do can with and or for of in is please get start".split(
    " "
  )
);
function tokens(text: string): string[] {
  const words = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return [
    ...new Set(
      words
        .filter((w) => !stopWords.has(w))
        .flatMap((word) => [word, ...(synonyms[word] ?? [])])
    ),
  ];
}
function boundedInteger(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number
): number {
  if (value === undefined) return fallback;
  if (!Number.isInteger(value) || value < min || value > max)
    throw new Error("Invalid retrieval bounds");
  return value;
}
function evidence(entry: KnowledgeEntry): EvidenceSource {
  const {
    id,
    kind,
    courseId,
    moduleId,
    title,
    summary,
    learningOutcomes,
    skillIds: skills,
    difficulty,
    href,
    prerequisites,
  } = entry;
  return structuredClone({
    id,
    kind,
    ...(courseId ? { courseId } : {}),
    ...(moduleId ? { moduleId } : {}),
    title,
    summary,
    learningOutcomes,
    skillIds: skills,
    difficulty,
    href,
    prerequisites,
  });
}

/** Deterministic retrieval; no provider calls, frontend imports, user storage or remote fetching. */
export class KnowledgeCatalog {
  private readonly manifest: CatalogManifest;
  private readonly byId: Map<string, KnowledgeEntry>;

  constructor(
    manifest: unknown = JSON.parse(
      readFileSync(join(__dirname, "catalog.manifest.json"), "utf8")
    )
  ) {
    validateManifest(manifest);
    this.manifest = structuredClone(manifest);
    this.byId = new Map(
      this.manifest.entries.map((entry) => [entry.id, entry])
    );
  }
  get version(): string {
    return this.manifest.version;
  }
  get coverage(): CatalogManifest["coverage"] {
    return structuredClone(this.manifest.coverage);
  }

  retrieve(input: KnowledgeQuery): EvidenceSelection {
    if (
      input.query !== undefined &&
      (typeof input.query !== "string" || input.query.length > 500)
    )
      throw new Error("Query exceeds catalog search bounds");
    const limit = boundedInteger(input.limit, 5, 1, 6);
    const budget = boundedInteger(input.maxCharacters, 6000, 500, 12000);
    if (
      input.goal &&
      !["frontend", "backend", "full-stack", "explore"].includes(input.goal)
    )
      throw new Error("Unknown learning goal");
    if (
      input.courseId &&
      this.byId.get(`course:${input.courseId}`)?.kind !== "course"
    )
      return { catalogVersion: this.version, sources: [] };
    const skills = input.skillIds ?? [];
    if (
      !Array.isArray(skills) ||
      skills.length > skillIds.length ||
      skills.some((id) => !(skillIds as readonly string[]).includes(id))
    )
      throw new Error("Unknown skill");
    const completed = input.completedSourceIds ?? [];
    if (
      !Array.isArray(completed) ||
      completed.length > this.byId.size ||
      completed.some((id) => !this.byId.has(id))
    )
      throw new Error("Unknown learner progress source");
    const done = new Set(completed);
    const words = tokens(input.query ?? "");
    // No catch-all context dump and no unrelated fallback on an empty search.
    if (!words.length && !input.goal && !skills.length && !input.courseId)
      return { catalogVersion: this.version, sources: [] };
    const ranked = this.manifest.entries
      .flatMap((entry) => {
        if (input.goal && !entry.goals.includes(input.goal)) return [];
        if (input.courseId && entry.courseId !== input.courseId) return [];
        if (
          skills.length &&
          !skills.some((skill) => entry.skillIds.includes(skill))
        )
          return [];
        if (
          entry.access.kind === "course-progress" &&
          !done.has(entry.access.previousSourceId)
        )
          return [];
        const title = new Set(
          tokens(`${entry.title} ${entry.skillIds.join(" ")}`)
        );
        const body = new Set(
          tokens(`${entry.summary} ${entry.learningOutcomes.join(" ")}`)
        );
        const score = words.reduce(
          (sum, word) => sum + (title.has(word) ? 4 : body.has(word) ? 1 : 0),
          0
        );
        if (words.length && score === 0) return [];
        return [{ entry, score: score + (entry.kind === "module" ? 1 : 0) }];
      })
      .sort(
        (a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id)
      );
    const sources: EvidenceSource[] = [];
    for (const { entry } of ranked) {
      if (sources.length === limit) break;
      const source = evidence(entry);
      if (JSON.stringify([...sources, source]).length > budget) continue;
      sources.push(source);
    }
    return { catalogVersion: this.version, sources };
  }

  /** Resolve model source IDs only against evidence selected for this request/version. */
  resolveCitations(
    ids: unknown,
    selection: EvidenceSelection
  ): { sourceId: string; title: string; href: string }[] {
    if (selection.catalogVersion !== this.version)
      throw new Error("Stale catalog version");
    if (
      !Array.isArray(ids) ||
      ids.length > 6 ||
      ids.some((id) => typeof id !== "string")
    )
      throw new Error("Invalid citation IDs");
    const allowed = new Set(selection.sources.map((source) => source.id));
    return [...new Set(ids as string[])].map((id) => {
      const entry = this.byId.get(id);
      if (!entry || !allowed.has(id))
        throw new Error(`Unverified citation: ${id}`);
      return { sourceId: entry.id, title: entry.title, href: entry.href };
    });
  }
}
