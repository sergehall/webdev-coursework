import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

type FrontendPackageJson = {
  name?: string;
  scripts?: Record<string, string>;
};

function readFrontendPackageJson(): FrontendPackageJson {
  const cwdPackagePath = join(process.cwd(), "package.json");
  const cwdPackageRaw = readFileSync(cwdPackagePath, "utf8");
  const cwdPackage = JSON.parse(cwdPackageRaw) as FrontendPackageJson;

  if (cwdPackage.name === "frontend") {
    return cwdPackage;
  }

  const fallbackPath = join(process.cwd(), "frontend", "package.json");
  const raw = readFileSync(fallbackPath, "utf8");
  return JSON.parse(raw) as FrontendPackageJson;
}

describe("frontend scripts smoke", () => {
  it("keeps startup and build scripts wired", () => {
    const pkg = readFrontendPackageJson();
    const scripts = pkg.scripts ?? {};

    expect(scripts["start:dev"]).toBe("vite");
    expect(scripts["build:bundle"]).toBe("vite build");
    expect(scripts["build"]).toContain("typecheck");
    expect(scripts["build"]).toContain("build:bundle");
  });
});
