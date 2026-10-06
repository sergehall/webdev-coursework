import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import * as ts from "typescript";
import {
  catalogVersion,
  validateManifest,
  skillIds,
  type CatalogManifest,
  type CatalogPayload,
  type KnowledgeEntry,
} from "../../src/mentor/knowledge/catalog-contract";

const activePath = "frontend/src/courses/catalog/activeCourses.ts";
const descriptionsPath = "frontend/src/courses/catalog/webDeveloperCourses.ts";
const registryPath =
  "frontend/src/courses/assignment-registry/courseAssignmentRegistries.ts";
const componentsPath =
  "frontend/src/courses/assignment-registry/completedCourseComponents.ts";
const routesPath = "frontend/src/routes/AppRoutes.tsx";
const reviewPath = "backend/src/mentor/knowledge/reviews.json";
const outputPath = "backend/src/mentor/knowledge/catalog.manifest.json";

type Review = Pick<
  KnowledgeEntry,
  "skillIds" | "goals" | "difficulty" | "learningOutcomes" | "reviewedAt"
> & {
  title?: string;
  summary?: string;
  sourceHashes: Record<string, string>;
};
type CourseDescription = {
  code: string;
  description: string;
  descriptionSummary?: string;
  prerequisite?: string;
  skillsAdvisory?: string;
};

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Mentor catalog build: ${message}`);
}
function unwrap(node: ts.Expression): ts.Expression {
  while (
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node)
  )
    node = node.expression;
  return node;
}
function variable(file: ts.SourceFile, name: string): ts.Expression {
  for (const statement of file.statements)
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === name &&
          declaration.initializer
        )
          return unwrap(declaration.initializer);
      }
    }
  throw new Error(`Missing static declaration: ${name}`);
}
function properties(node: ts.Expression): [string, ts.Expression][] {
  invariant(ts.isObjectLiteralExpression(node), "expected static object");
  const entries: [string, ts.Expression][] = node.properties.map((p) => {
    invariant(
      ts.isPropertyAssignment(p) &&
        (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)),
      "unsupported property"
    );
    return [p.name.text, unwrap(p.initializer)];
  });
  invariant(
    new Set(entries.map(([key]) => key)).size === entries.length,
    "duplicate source property"
  );
  return entries;
}
/** Read only literal metadata; never evaluate or import browser code. */
function literal(node: ts.Expression): unknown {
  node = unwrap(node);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isArrayLiteralExpression(node))
    return node.elements.map((n) => literal(n));
  if (ts.isObjectLiteralExpression(node))
    return Object.fromEntries(
      properties(node).map(([key, value]) => [key, literal(value)])
    );
  throw new Error(
    `Nonliteral curriculum metadata: ${ts.SyntaxKind[node.kind]}`
  );
}
function imports(file: ts.SourceFile): Map<string, string> {
  const result = new Map<string, string>();
  for (const statement of file.statements)
    if (
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.importClause?.name
    ) {
      result.set(
        statement.importClause.name.text,
        statement.moduleSpecifier.text
      );
    }
  return result;
}

export function buildCatalog(root: string): CatalogManifest {
  const inputHashes: Record<string, string> = {};
  const read = (path: string): string => {
    invariant(
      /^(frontend|backend)\/[\w./-]+$/.test(path) && !path.includes(".."),
      `unsafe source path ${path}`
    );
    const content = readFileSync(resolve(root, path), "utf8");
    inputHashes[path] = createHash("sha256").update(content).digest("hex");
    return content;
  };
  const parse = (path: string) =>
    ts.createSourceFile(
      path,
      read(path),
      ts.ScriptTarget.Latest,
      true,
      path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
    );
  const resolveAlias = (specifier: string): string => {
    invariant(
      specifier.startsWith("@/"),
      "registry import must use the frontend alias"
    );
    const path = `frontend/src/${specifier.slice(2)}`;
    const candidates = [".ts", ".tsx"].filter((ext) =>
      existsSync(resolve(root, path + ext))
    );
    invariant(candidates.length === 1, `missing or ambiguous source ${path}`);
    return path + candidates[0];
  };
  const active = literal(
    variable(parse(activePath), "activeCourses")
  ) as Record<string, { code: string; title: string; maxModules: number }>;
  const groups = literal(variable(parse(descriptionsPath), "courses")) as (
    | CourseDescription
    | { options: CourseDescription[] }
  )[];
  const descriptions = groups.flatMap((course) =>
    "options" in course ? course.options : [course]
  );
  invariant(
    new Set(descriptions.map((c) => c.code)).size === descriptions.length,
    "duplicate course descriptions"
  );
  const registry = parse(registryPath);
  const registryImports = imports(registry);
  const registries = new Map(
    properties(variable(registry, "courseAssignmentRegistries"))
  );
  const components = new Map(
    properties(variable(parse(componentsPath), "completedCourseComponents"))
  );
  const routes = parse(routesPath);
  let courseRoute = "";
  let roadmapRoute = "";
  let moduleChild = "";
  function attribute(
    node: ts.JsxOpeningElement | ts.JsxSelfClosingElement,
    name: string
  ) {
    return node.attributes.properties.find(
      (a): a is ts.JsxAttribute =>
        ts.isJsxAttribute(a) && a.name.getText(routes) === name
    )?.initializer;
  }
  function findRoute(node: ts.Node) {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = ts.isJsxElement(node) ? node.openingElement : node;
      if (opening.tagName.getText(routes) === "Route") {
        const path = attribute(opening, "path");
        const element = attribute(opening, "element")?.getText(routes) ?? "";
        if (path && ts.isStringLiteral(path)) {
          if (
            element.includes("Screens.AssignmentWrapper") &&
            ts.isJsxElement(node)
          ) {
            courseRoute = path.text;
            for (const child of node.children)
              if (ts.isJsxSelfClosingElement(child)) {
                const childPath = attribute(child, "path");
                if (
                  attribute(child, "element")
                    ?.getText(routes)
                    .includes("AutoAssignmentRouter") &&
                  childPath &&
                  ts.isStringLiteral(childPath)
                )
                  moduleChild = childPath.text;
              }
          }
          if (element.includes("Screens.WebDeveloperPathPage"))
            roadmapRoute = path.text;
        }
      }
    }
    ts.forEachChild(node, findRoute);
  }
  findRoute(routes);
  invariant(
    courseRoute === "/coursework/:courseId/assignment" &&
      moduleChild === ":id" &&
      roadmapRoute === "/web-developer-path",
    "route contract changed; review catalog links"
  );
  // Access semantics are explicitly pinned to the router, independently of academic prerequisites.
  const accessRouter = read("frontend/src/routes/AutoAssignmentRouter.tsx");
  invariant(
    accessRouter.includes(
      "moduleNumber === 1 || completedModules.includes(moduleNumber - 1)"
    ),
    "module access rule changed"
  );
  const reviews = JSON.parse(read(reviewPath)) as Record<string, Review>;
  const consumed = new Set<string>();
  const reviewed = (id: string, expectedPath: string): Review => {
    const review = reviews[id];
    invariant(
      review && review.sourceHashes && expectedPath in review.sourceHashes,
      `missing review for ${id}`
    );
    for (const [path, digest] of Object.entries(review.sourceHashes)) {
      read(path);
      invariant(
        inputHashes[path] === digest,
        `review stale: ${id} (${path}); inspect content before updating approval hash`
      );
    }
    consumed.add(id);
    return review;
  };
  const common = (review: Review) => ({
    skillIds: review.skillIds,
    goals: review.goals,
    difficulty: review.difficulty,
    learningOutcomes: review.learningOutcomes,
    reviewedAt: review.reviewedAt,
    sourcePaths: Object.keys(review.sourceHashes).sort(),
    availability: "published" as const,
  });
  const entries: KnowledgeEntry[] = [];
  const coverage: CatalogPayload["coverage"] = {
    activeCourses: Object.keys(active).length,
    reviewedCourses: 0,
    registeredModules: 0,
    reviewedModules: 0,
    courses: [],
    excluded: [],
  };
  for (const [courseId, course] of Object.entries(active).sort(([a], [b]) =>
    a.localeCompare(b)
  )) {
    const description = descriptions.find((d) => d.code === course.code);
    invariant(description, `missing course description ${courseId}`);
    const component = components.get(course.code);
    invariant(
      component &&
        properties(component).some(
          ([key, value]) =>
            key === "component" &&
            ts.isIdentifier(value) &&
            value.text === courseId
        ),
      `unpublished course ${courseId}`
    );
    const courseReview = reviewed(`course:${courseId}`, descriptionsPath);
    const prerequisite: KnowledgeEntry["prerequisites"] = [];
    for (const [kind, text] of [
      ["official", description.prerequisite],
      ["advisory", description.skillsAdvisory],
    ] as const) {
      if (text && text !== "None") {
        const target = Object.entries(active).find(
          ([, c]) => c.code === text
        )?.[0];
        prerequisite.push({
          kind,
          description: text,
          ...(target ? { sourceId: `course:${target}` } : {}),
        });
      }
    }
    entries.push({
      ...common(courseReview),
      id: `course:${courseId}`,
      kind: "course",
      courseId,
      title: course.title,
      summary: description.descriptionSummary ?? description.description,
      href: courseRoute.replace(":courseId", courseId),
      prerequisites: prerequisite,
      access: { kind: "public" },
    });
    coverage.reviewedCourses++;
    const registrySymbol = registries.get(course.code);
    invariant(
      registrySymbol && ts.isIdentifier(registrySymbol),
      `missing registry ${courseId}`
    );
    const specifier = registryImports.get(registrySymbol.text);
    invariant(specifier, `registry import ${courseId}`);
    const file = parse(resolveAlias(specifier));
    const call = variable(file, registrySymbol.text);
    invariant(
      ts.isCallExpression(call) &&
        call.expression.getText(file) === "createAssignmentRegistry" &&
        call.arguments.length === 2,
      "registry shape changed"
    );
    const loaders = properties(call.arguments[0]);
    const count = {
      courseId,
      declaredSlots: course.maxModules,
      registered: loaders.length,
      reviewed: 0,
    };
    for (const [moduleId, loader] of loaders) {
      invariant(
        /^[1-9]\d*$/.test(moduleId) && Number(moduleId) <= course.maxModules,
        "module outside declared bounds"
      );
      invariant(
        ts.isArrowFunction(loader) &&
          ts.isCallExpression(loader.body) &&
          loader.body.expression.kind === ts.SyntaxKind.ImportKeyword &&
          loader.body.arguments.length === 1 &&
          ts.isStringLiteral(loader.body.arguments[0]),
        "nonstatic module importer"
      );
      const path = resolveAlias(loader.body.arguments[0].text);
      const content = read(path);
      const id = `module:${courseId}:${moduleId}`;
      coverage.registeredModules++;
      const placeholder =
        /placeholder/i.test(path) ||
        /return\s*\(?\s*<\w*Placeholder\b|coming soon|not yet available/i.test(
          content
        );
      if (!reviews[id] || placeholder) {
        invariant(!reviews[id] || !placeholder, `approved placeholder ${id}`);
        coverage.excluded.push({
          id,
          sourcePath: path,
          reason: placeholder
            ? "placeholder"
            : "not-reviewed: no approved summary; content availability is not inferred from registration",
        });
        continue;
      }
      const review = reviewed(id, path);
      invariant(review.title && review.summary, `module summary ${id}`);
      const previousSourceId = `module:${courseId}:${Number(moduleId) - 1}`;
      entries.push({
        ...common(review),
        id,
        kind: "module",
        courseId,
        moduleId,
        title: review.title,
        summary: review.summary,
        href: `${courseRoute.replace(":courseId", courseId)}/${moduleChild.replace(":id", moduleId)}`,
        prerequisites:
          Number(moduleId) === 1
            ? []
            : [
                {
                  kind: "learning",
                  sourceId: previousSourceId,
                  description:
                    "Suggested learning sequence within this course, not an official enrollment prerequisite.",
                },
              ],
        access:
          Number(moduleId) === 1
            ? { kind: "public" }
            : { kind: "course-progress", previousSourceId },
      });
      count.reviewed++;
      coverage.reviewedModules++;
    }
    coverage.courses.push(count);
  }
  for (const description of descriptions)
    if (!Object.values(active).some((c) => c.code === description.code)) {
      coverage.excluded.push({
        id: `course:${description.code.replaceAll(" ", "")}`,
        reason: "roadmap-option-only: no active coursework component",
      });
    }
  const roadmap = reviewed(
    "roadmap:web-developer",
    "frontend/src/features/pathway/programSections.tsx"
  );
  invariant(roadmap.title && roadmap.summary, "roadmap summary");
  entries.push({
    ...common(roadmap),
    id: "roadmap:web-developer",
    kind: "resource",
    title: roadmap.title,
    summary: roadmap.summary,
    href: roadmapRoute,
    prerequisites: [],
    access: { kind: "public" },
  });
  invariant(
    Object.keys(reviews).every((id) => consumed.has(id)),
    "unknown or no longer published reviewed source"
  );
  const payload: CatalogPayload = {
    schemaVersion: 1,
    entries: entries.sort((a, b) => a.id.localeCompare(b.id)),
    skills: skillIds,
    coverage,
    inputHashes: Object.fromEntries(
      Object.entries(inputHashes).sort(([a], [b]) => a.localeCompare(b))
    ),
  };
  const manifest = { ...payload, version: catalogVersion(payload) };
  validateManifest(manifest);
  return manifest;
}

function serializeManifest(manifest: CatalogManifest): string {
  const entries = manifest.entries
    .map((entry) => `    ${JSON.stringify(entry)}`)
    .join(",\n");
  const hashes = Object.entries(manifest.inputHashes)
    .map(
      ([path, hash]) => `    ${JSON.stringify(path)}: ${JSON.stringify(hash)}`
    )
    .join(",\n");
  return `{
  "schemaVersion": ${manifest.schemaVersion},
  "entries": [
${entries}
  ],
  "skills": ${JSON.stringify(manifest.skills)},
  "coverage": ${JSON.stringify(manifest.coverage)},
  "inputHashes": {
${hashes}
  },
  "version": ${JSON.stringify(manifest.version)}
}\n`;
}

if (require.main === module) {
  const root = resolve(__dirname, "../../..");
  const manifest = buildCatalog(root);
  const serialized = serializeManifest(manifest);
  const output = resolve(root, outputPath);
  if (process.argv.includes("--write")) writeFileSync(output, serialized);
  else
    invariant(
      JSON.stringify(JSON.parse(readFileSync(output, "utf8"))) ===
        JSON.stringify(manifest),
      "manifest stale; run knowledge:generate after reviewing changes"
    );
  console.log(
    `${relative(root, output)}: ${manifest.coverage.reviewedCourses}/${manifest.coverage.activeCourses} courses, ${manifest.coverage.reviewedModules}/${manifest.coverage.registeredModules} modules reviewed; ${manifest.version.slice(0, 12)}`
  );
}
