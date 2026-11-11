import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import ts from "typescript";
import { expect, it } from "vitest";

it("loads emitted middleware with native Node.js ESM resolution", () => {
  // Keep the files inside the workspace so the child resolves its PnP dependencies.
  const directory = mkdtempSync(resolve(".middleware-runtime-check-"));
  try {
    for (const name of ["middleware", "content-security-policy"]) {
      const source = readFileSync(resolve(`${name}.ts`), "utf8");
      const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
        },
      });
      writeFileSync(join(directory, `${name}.js`), outputText);
    }

    const entrypoint = join(directory, "run.mjs");
    writeFileSync(
      entrypoint,
      `
      import middleware from "./middleware.js";
      const response = middleware(new Request("https://webdev-coursework.com/"));
      if (!response.headers.get("Content-Security-Policy")?.includes("default-src 'none'")) {
        throw new Error("Middleware did not return the expected CSP");
      }
    `
    );
    const result = spawnSync(process.execPath, [entrypoint], {
      encoding: "utf8",
      timeout: 10_000,
    });
    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
