import { describe, expect, it } from "vitest";

import { validateJavaScript } from "@/utils/secureJavaScript";

describe("validateJavaScript", () => {
  it("allows a simple safe script", () => {
    const result = validateJavaScript("const x = 2; console.log(x);");
    expect(result.valid).toBe(true);
  });

  it("blocks eval usage", () => {
    const result = validateJavaScript('eval("2 + 2")');
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/eval/i);
  });

  it("blocks obvious infinite loops", () => {
    const result = validateJavaScript("while (true) { console.log('x'); }");
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/infinite loop/i);
  });

  it("blocks browser globals for uploaded scripts by default", () => {
    const result = validateJavaScript("document.body.innerHTML = 'x';");
    expect(result.valid).toBe(false);
  });

  it("can allow browser globals for trusted project scripts", () => {
    const result = validateJavaScript("document.title = 'ok';", {
      allowBrowserGlobals: true,
    });
    expect(result.valid).toBe(true);
  });

  it("blocks constructor-based sandbox escapes", () => {
    const direct = validateJavaScript(
      "console.log.constructor('return globalThis')()"
    );
    const computed = validateJavaScript(
      "console.log['constructor']('return globalThis')()"
    );

    expect(direct.valid).toBe(false);
    expect(direct.reason).toMatch(/constructor/i);
    expect(computed.valid).toBe(false);
  });
});
