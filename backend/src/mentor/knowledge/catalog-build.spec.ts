import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { buildCatalog } from "../../../scripts/mentor/build-catalog";
import type { CatalogManifest } from "./catalog-contract";

const root = resolve(__dirname, "../../../..");
const manifest = JSON.parse(
  readFileSync(join(__dirname, "catalog.manifest.json"), "utf8")
) as CatalogManifest;
let fixture: string;
beforeEach(() => {
  fixture = mkdtempSync(join(tmpdir(), "mentor-catalog-"));
  for (const path of Object.keys(manifest.inputHashes)) {
    mkdirSync(dirname(join(fixture, path)), { recursive: true });
    writeFileSync(join(fixture, path), readFileSync(join(root, path)));
  }
});
afterEach(() => rmSync(fixture, { recursive: true, force: true }));
function replace(path: string, from: string, to: string) {
  const full = join(fixture, path);
  const value = readFileSync(full, "utf8");
  expect(value).toContain(from);
  writeFileSync(full, value.replace(from, to));
}
describe("catalog source/build boundary", () => {
  it("reproduces the checked-in artifact from canonical sources", () => {
    expect(buildCatalog(root)).toEqual(manifest);
  });
  it("requires a new review when approved content changes", () => {
    const path =
      "frontend/src/courses/CS80/assignments/mod1/AssignmentMod1.tsx";
    replace(path, "Intro to HTML5", "Different topic");
    expect(() => buildCatalog(fixture)).toThrow("review stale");
  });
  it("rejects route drift instead of matching the application catch-all", () => {
    replace(
      "frontend/src/routes/AppRoutes.tsx",
      'path=":id"',
      'path="module/:id"'
    );
    expect(() => buildCatalog(fixture)).toThrow("route contract changed");
  });
  it("rejects a missing registered source", () => {
    rmSync(
      join(
        fixture,
        "frontend/src/courses/CS80/assignments/mod1/AssignmentMod1.tsx"
      )
    );
    expect(() => buildCatalog(fixture)).toThrow("missing or ambiguous source");
  });
  it("rejects a reviewed wrapper replaced by a placeholder", () => {
    writeFileSync(
      join(
        fixture,
        "frontend/src/courses/CS80/assignments/mod1/AssignmentMod1.tsx"
      ),
      "export default function Page() { return <AssignmentPlaceholder />; }"
    );
    expect(() => buildCatalog(fixture)).toThrow("approved placeholder");
  });
  it("never evaluates a nonliteral expression in frontend metadata", () => {
    replace(
      "frontend/src/courses/catalog/activeCourses.ts",
      "maxModules: 15",
      'maxModules: (() => { throw new Error("EXECUTED"); })()'
    );
    expect(() => buildCatalog(fixture)).toThrow(
      "Nonliteral curriculum metadata"
    );
  });
});
