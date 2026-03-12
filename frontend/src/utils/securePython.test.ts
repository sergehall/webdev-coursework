import { describe, expect, it } from "vitest";

import {
  hasOnlySafeImports,
  hasOnlySafeOpenCalls,
  sanitizeAndValidateCode,
} from "@/utils/securePython";

describe("securePython", () => {
  it("allows safe imports and safe file reads", () => {
    const code = [
      "import math",
      "from A05ClassPrH import House",
      "with open('house.tab', 'r') as f:",
      "    data = f.read()",
    ].join("\n");

    const result = sanitizeAndValidateCode(code);
    expect(result.valid).toBe(true);
    expect(result.cleanedCode).toContain("import math");
  });

  it("blocks forbidden imports", () => {
    const result = hasOnlySafeImports("import os");
    expect(result.ok).toBe(false);
    expect(result.reason).toMatch(/Forbidden import/i);
  });

  it("blocks star imports", () => {
    const result = hasOnlySafeImports("from math import *");
    expect(result.ok).toBe(false);
    expect(result.reason).toMatch(/Star imports/i);
  });

  it("blocks dynamic open() path without literal filename", () => {
    const result = hasOnlySafeOpenCalls("open(path_var, 'r')");
    expect(result.ok).toBe(false);
    expect(result.reason).toMatch(/literal filename/i);
  });

  it("allows mode-first Path.open only inside trusted wrapper", () => {
    const code = [
      "from pathlib import Path",
      "def _open_data(path):",
      "    return Path(path).open('r')",
      "_open_data('house.tab')",
    ].join("\n");
    const result = hasOnlySafeOpenCalls(code);
    expect(result.ok).toBe(true);
  });

  it("removes BOM and keeps valid code", () => {
    const code = "\uFEFFimport json\nopen('president.tab', 'r')";
    const result = sanitizeAndValidateCode(code);
    expect(result.valid).toBe(true);
    expect(result.cleanedCode?.startsWith("\uFEFF")).toBe(false);
  });
});
