import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  catalogVersion,
  validateManifest,
  type CatalogManifest,
} from "./catalog-contract";
import { KnowledgeCatalog } from "./knowledge-catalog";

const manifest = JSON.parse(
  readFileSync(join(__dirname, "catalog.manifest.json"), "utf8")
) as CatalogManifest;
function changed(edit: (value: CatalogManifest) => void) {
  const value = structuredClone(manifest);
  edit(value);
  const { version: _version, ...payload } = value;
  value.version = catalogVersion(payload);
  return value;
}

describe("verified mentor knowledge", () => {
  const catalog = new KnowledgeCatalog(manifest);
  it("covers every active course while disclosing unreviewed modules", () => {
    expect(catalog.coverage).toMatchObject({
      activeCourses: 10,
      reviewedCourses: 10,
      registeredModules: 103,
      reviewedModules: 10,
    });
    expect(
      catalog.coverage.excluded.filter((e) => e.id.startsWith("module:"))
    ).toHaveLength(93);
    expect(catalog.coverage.excluded.some((e) => e.id === "course:CS82")).toBe(
      true
    );
  });
  it.each([
    ["HTML forms", "module:CS80:1"],
    ["CSS styling", "course:CS80"],
    ["JS values operators", "module:CS81:1"],
    ["relational database SQL", "course:CS60"],
    ["network protocols subnetting", "course:CS70"],
    ["Python strings", "course:CS87A"],
    ["Java exceptions", "course:CS56"],
    ["PHP forms", "course:CS85"],
    ["AWS EC2 scalability", "course:CS79C"],
    ["AWS security shared responsibility", "course:CS79D"],
    ["cloud providers", "course:CS79A"],
    ["roadmap counselor program", "roadmap:web-developer"],
  ])("retrieves grounded evidence for %s", (query, expected) => {
    const result = catalog.retrieve({ query });
    expect(result.sources.map((s) => s.id)).toContain(expected);
    expect(result.sources.length).toBeLessThanOrEqual(5);
  });
  it("does not fabricate a fallback for absent material or inactive courses", () => {
    expect(catalog.retrieve({ query: "quantum entanglement" }).sources).toEqual(
      []
    );
    expect(catalog.retrieve({ courseId: "CS82" }).sources).toEqual([]);
    expect(catalog.retrieve({}).sources).toEqual([]);
  });
  it("uses learner module progress, never the author course completion, for locked links", () => {
    const query = { query: "CSS styling", courseId: "CS80" };
    expect(catalog.retrieve(query).sources.map((s) => s.id)).not.toContain(
      "module:CS80:2"
    );
    expect(
      catalog
        .retrieve({ ...query, completedSourceIds: ["course:CS80"] })
        .sources.map((s) => s.id)
    ).not.toContain("module:CS80:2");
    expect(
      catalog
        .retrieve({ ...query, completedSourceIds: ["module:CS80:1"] })
        .sources.map((s) => s.id)
    ).toContain("module:CS80:2");
  });
  it("keeps official conditions and advisory alternatives distinct", () => {
    const intro = catalog
      .retrieve({ courseId: "CS79A" })
      .sources.find((s) => s.kind === "course")!;
    expect(intro.prerequisites).toContainEqual({
      kind: "official",
      description: "CS 3",
    });
    const compute = catalog.retrieve({ courseId: "CS79C" }).sources[0];
    expect(compute.prerequisites).toContainEqual({
      kind: "advisory",
      description: "CS 79A and (CS 55 or CS 87A or CS 83R or CS 85)",
    });
  });
  it("bounds output and rejects oversized or invalid inputs", () => {
    const result = catalog.retrieve({
      goal: "full-stack",
      maxCharacters: 1600,
      limit: 2,
    });
    expect(result.sources.length).toBeGreaterThan(0);
    expect(result.sources.length).toBeLessThanOrEqual(2);
    expect(JSON.stringify(result.sources).length).toBeLessThanOrEqual(1600);
    expect(() => catalog.retrieve({ limit: 100 })).toThrow("bounds");
    expect(() => catalog.retrieve({ query: "a".repeat(501) })).toThrow(
      "bounds"
    );
    expect(() =>
      catalog.retrieve({ completedSourceIds: ["module:fake:1"] })
    ).toThrow("Unknown learner");
  });
  it("resolves only selected IDs, using server links even if a caller alters the evidence URL", () => {
    const selection = catalog.retrieve({ courseId: "CS60" });
    selection.sources[0].href = "javascript:alert(1)";
    expect(catalog.resolveCitations(["course:CS60"], selection)[0].href).toBe(
      "/coursework/CS60/assignment"
    );
    expect(() => catalog.resolveCitations(["course:CS80"], selection)).toThrow(
      "Unverified"
    );
    expect(() =>
      catalog.resolveCitations(["https://example.com"], selection)
    ).toThrow("Unverified");
    expect(() =>
      catalog.resolveCitations(["course:CS60"], {
        ...selection,
        catalogVersion: "old",
      })
    ).toThrow("Stale");
    expect(catalog.retrieve({ courseId: "CS60" }).sources[0].href).toBe(
      "/coursework/CS60/assignment"
    );
  });
  it("does not expose repository paths, code, or learner state in evidence", () => {
    const result = catalog.retrieve({ goal: "frontend" });
    const serialized = JSON.stringify(result);
    expect(serialized).not.toMatch(
      /sourcePaths|sourceHashes|inputHashes|correctAnswer|api[_-]?token|completedSourceIds/
    );
  });
  it.each([
    [
      "unpublished",
      (m: CatalogManifest) => {
        (m.entries[0] as unknown as { availability: string }).availability =
          "planned";
      },
    ],
    [
      "canonical route",
      (m: CatalogManifest) => {
        m.entries[0].href = "//evil.test";
      },
    ],
    [
      "duplicate",
      (m: CatalogManifest) => {
        m.entries.push(m.entries[0]);
      },
    ],
    [
      "unknown prerequisite",
      (m: CatalogManifest) => {
        m.entries[0].prerequisites = [
          { kind: "learning", description: "Missing", sourceId: "course:FAKE" },
        ];
      },
    ],
    [
      "cycle",
      (m: CatalogManifest) => {
        m.entries[0].prerequisites = [
          { kind: "learning", description: "Cycle", sourceId: m.entries[0].id },
        ];
      },
    ],
    [
      "module access gate",
      (m: CatalogManifest) => {
        m.entries.find((e) => e.id === "module:CS80:2")!.access = {
          kind: "public",
        };
      },
    ],
  ])("rejects a malformed artifact: %s", (message, edit) => {
    expect(() => validateManifest(changed(edit))).toThrow(message);
  });
  it("fails closed on corrupt or missing artifacts", () => {
    expect(
      () => new KnowledgeCatalog({ ...manifest, version: "invalid" })
    ).toThrow("hash");
    expect(() => new KnowledgeCatalog({})).toThrow("schema");
  });
});
