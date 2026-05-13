import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

type RootPackageJson = {
  scripts?: Record<string, string>;
};

function readRootPackageJson(): RootPackageJson {
  const rootPackagePath = join(process.cwd(), "..", "package.json");
  const raw = readFileSync(rootPackagePath, "utf8");
  return JSON.parse(raw) as RootPackageJson;
}

function readViteConfig(): string {
  return readFileSync(join(process.cwd(), "vite.config.ts"), "utf8");
}

describe("local development API wiring", () => {
  it("forces root dev frontend startup to use same-origin API requests", () => {
    const scripts = readRootPackageJson().scripts ?? {};

    expect(scripts["dev:frontend"]).toContain("VITE_API_URL=");
    expect(scripts["dev:frontend"]).toContain(
      "yarn workspace frontend start:dev"
    );
  });

  it("proxies app API routes to the local backend in Vite dev mode", () => {
    const viteConfig = readViteConfig();

    expect(viteConfig).toContain('"/quizzes"');
    expect(viteConfig).toContain('"/tokens"');
    expect(viteConfig).toContain('"http://localhost:5050"');
  });
});
