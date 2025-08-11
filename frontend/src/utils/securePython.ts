// src/utils/securePython.ts
// Centralized Python code validator for safe uploads.
//
// Enforced policy
// - Imports:
//   • stdlib allowlist (module names only)
//   • local modules allowlist (module names only, no submodules)
//   • optional per-symbol allowlist for local modules
//   • disallow star-imports and aliases (both in `import` and `from import`)
// - File I/O:
//   • only allowlisted data files
//   • only read-text modes ("r" / "rt")
//   • Path.open(mode-first) is allowed only inside trusted wrappers
//   • builtin open(...) must use a literal filename (first arg)
// - Size/length limits

export type ValidateResult = {
  valid: boolean;
  reason?: string;
  cleanedCode?: string;
};

export const MAX_FILE_SIZE = 50_000; // bytes
export const MAX_LINE_COUNT = 1000;
export const MAX_CODE_LENGTH = 50_000;

// Safe standard library imports
export const SAFE_IMPORTS = new Set([
  "re",
  "math",
  "json",
  "statistics",
  "functools",
  "itertools",
  "collections",
  "typing",
  "dataclasses",
  "pathlib",
  "io",
  "decimal",
  "random",
]);

// Allowed local/project modules
export const ALLOWED_LOCAL_MODULES = new Set([
  "A05ClassPrH", // helper module with House/President classes
]);

// Allowed public symbols per local module (case-sensitive)
export const ALLOWED_LOCAL_SYMBOLS: Record<string, Set<string>> = {
  A05ClassPrH: new Set(["House", "President"]),
};

// Allowed data filenames and modes
export const SAFE_OPEN_FILES = new Set(["house.tab", "president.tab"]);
export const SAFE_OPEN_MODES = new Set(["r", "rt"]);

// Safe wrappers that may call Path(...).open("r")
export const SAFE_OPEN_WRAPPERS = new Set(["_open_data"]);

/** Helpers (normalized sets) */
const SAFE_IMPORTS_LC = new Set(
  Array.from(SAFE_IMPORTS, (s) => s.toLowerCase())
);
const ALLOWED_LOCAL_MODULES_LC = new Set(
  Array.from(ALLOWED_LOCAL_MODULES, (s) => s.toLowerCase())
);
const SAFE_OPEN_FILES_LC = new Set(
  Array.from(SAFE_OPEN_FILES, (f) => f.toLowerCase())
);

const baseModule = (raw: string) =>
  raw
    .trim()
    .split(/\s+as\s+/)[0]
    .split(".")[0]
    .toLowerCase();

const isMode = (s: string) => SAFE_OPEN_MODES.has(s.toLowerCase());

const hasAlias = (name: string): boolean => /\s+as\s+/i.test(name);

const splitImportList = (list: string): string[] =>
  list
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const isAllowedFilename = (rawPath: string): boolean => {
  const last = rawPath.split(/[\\/]/).pop() || "";
  if (last.includes("..")) return false;
  return SAFE_OPEN_FILES_LC.has(last.toLowerCase());
};

/**
 * Find trusted wrapper body ranges by matching "def name(...):".
 * Simple textual scan is sufficient here.
 */
function findWrapperRanges(src: string, names: Set<string>) {
  const ranges: { name: string; start: number; end: number }[] = [];
  if (!names.size) return ranges;

  const nameAlt = Array.from(names)
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const defRe = new RegExp(
    String.raw`(^|\n)[ \t]*def[ \t]+(${nameAlt})[ \t]*\([^)]*\)[ \t]*:[ \t]*\n`,
    "g"
  );

  let m: RegExpExecArray | null;
  const indices: Array<{ name: string; idx: number }> = [];
  while ((m = defRe.exec(src))) {
    const idx = m.index + (m[1] ? m[1].length : 0);
    indices.push({ name: m[2], idx });
  }
  indices.sort((a, b) => a.idx - b.idx);

  for (let i = 0; i < indices.length; i++) {
    const start = indices[i].idx;
    const end = i + 1 < indices.length ? indices[i + 1].idx : src.length;
    ranges.push({ name: indices[i].name, start, end });
  }

  return ranges;
}

const inRanges = (pos: number, ranges: { start: number; end: number }[]) =>
  ranges.some((r) => pos >= r.start && pos < r.end);

/** Import check:
 *  - only allowlisted stdlib/local modules (no submodules), case-insensitive
 *  - disallow aliases in both `import` and `from ... import ...`
 *  - ban star-imports
 *  - for local modules, enforce per-symbol allowlist on from-imports
 */
export function hasOnlySafeImports(code: string): {
  ok: boolean;
  reason?: string;
} {
  const importRe = /^\s*import\s+([a-zA-Z0-9_.,\s]+)$/gm;
  const fromImportRe =
    /^\s*from\s+([a-zA-Z0-9_.]+)\s+import\s+([a-zA-Z0-9_.*, \t]+)$/gm;

  let m: RegExpExecArray | null;

  // Plain "import X, Y"
  while ((m = importRe.exec(code))) {
    const rawItems = splitImportList(m[1]);
    // Disallow aliases in plain imports as well
    if (rawItems.some(hasAlias)) {
      return {
        ok: false,
        reason: "Aliases are not allowed in import statements (no 'as').",
      };
    }
    const names = rawItems.map(baseModule).filter(Boolean);
    for (const mod of names) {
      if (!(SAFE_IMPORTS_LC.has(mod) || ALLOWED_LOCAL_MODULES_LC.has(mod))) {
        return { ok: false, reason: `Forbidden import: ${mod}` };
      }
    }
  }

  // "from X import a, b"
  while ((m = fromImportRe.exec(code))) {
    const rawModule = m[1];
    const mod = baseModule(rawModule);
    if (!(SAFE_IMPORTS_LC.has(mod) || ALLOWED_LOCAL_MODULES_LC.has(mod))) {
      return { ok: false, reason: `Forbidden import: ${mod}` };
    }

    const items = splitImportList(m[2]);

    if (items.some((x) => x === "*" || x === "*,"))
      return {
        ok: false,
        reason: 'Star imports are not allowed ("from ... import *").',
      };

    if (items.some(hasAlias))
      return {
        ok: false,
        reason: "Aliases in from-import are not allowed (no 'as').",
      };

    // Per-symbol allowlist for local modules
    const originalModuleName = Array.from(ALLOWED_LOCAL_MODULES).find(
      (name) => name.toLowerCase() === rawModule.split(".")[0].toLowerCase()
    );
    if (originalModuleName && ALLOWED_LOCAL_SYMBOLS[originalModuleName]) {
      const allowed = ALLOWED_LOCAL_SYMBOLS[originalModuleName];
      for (const sym of items) {
        if (!allowed.has(sym)) {
          return {
            ok: false,
            reason: `Symbol not allowed from ${originalModuleName}: ${sym}`,
          };
        }
      }
    }
  }

  if (/\b(eval|exec|compile|__import__)\s*\(/.test(code)) {
    return { ok: false, reason: "Forbidden builtin call detected." };
  }

  return { ok: true };
}

/** open()/Path.open() check:
 *  - Only allowlisted files
 *  - Only read text modes ("r"/"rt")
 *  - Allow mode-first only inside trusted wrappers
 *  - Builtin open(...) must use a literal filename as the first argument
 *  Implementation note: explicitly skip method calls when matching builtin `open(...)`.
 */
export function hasOnlySafeOpenCalls(code: string): {
  ok: boolean;
  reason?: string;
} {
  const wrapperRanges = findWrapperRanges(code, SAFE_OPEN_WRAPPERS);

  // 1) builtin open("literal", "mode"?) — explicit literals
  const literalRe = /\bopen\s*\(\s*(['"])(.*?)\1\s*(?:,\s*(['"])(.*?)\3)?/g;
  let m: RegExpExecArray | null;

  while ((m = literalRe.exec(code))) {
    // Skip ".open(" — handled by method branches
    if (m.index > 0 && code[m.index - 1] === ".") continue;

    const rawPath = m[2] || "";
    const mode = (m[4] || "r").toLowerCase();

    if (!isAllowedFilename(rawPath)) {
      return {
        ok: false,
        reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
      };
    }
    if (!SAFE_OPEN_MODES.has(mode)) {
      return {
        ok: false,
        reason: `Only read text modes allowed ("r"/"rt"). Got: "${mode}"`,
      };
    }
  }

  // 2) builtin open(<expr>) — try to extract a literal from the first arg
  const openExprRe = /\bopen\s*\(\s*([^)]+?)\)/g;
  while ((m = openExprRe.exec(code))) {
    // Skip ".open(" — method call, not builtin
    if (m.index > 0 && code[m.index - 1] === ".") continue;

    const args = m[1];
    const firstArg = args.split(",")[0]?.trim() ?? "";
    const quoted = [...firstArg.matchAll(/(['"])(.*?)\1/g)].map((t) => t[2]);

    if (quoted.length > 0) {
      const last = quoted[quoted.length - 1];
      if (!isAllowedFilename(last)) {
        return {
          ok: false,
          reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
        };
      }
    } else {
      return {
        ok: false,
        reason: `First argument of open() must contain a literal filename.`,
      };
    }
  }

  // 3) method .open("...", "mode"?) — explicit literals in method calls
  const methodLiteralRe =
    /\.open\s*\(\s*(['"])(.*?)\1\s*(?:,\s*(['"])(.*?)\3)?/g;
  while ((m = methodLiteralRe.exec(code))) {
    const matchIdx = m.index;
    const rawPath = m[2] || "";
    const mode = (m[4] || "r").toLowerCase();

    // Inside a trusted wrapper, the first arg may be mode ("r"/"rt")
    if (inRanges(matchIdx, wrapperRanges) && isMode(rawPath)) {
      if (!SAFE_OPEN_MODES.has(rawPath.toLowerCase())) {
        return {
          ok: false,
          reason: `Only read text modes allowed in wrappers.`,
        };
      }
      continue;
    }

    if (!isAllowedFilename(rawPath)) {
      return {
        ok: false,
        reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
      };
    }
    if (!SAFE_OPEN_MODES.has(mode)) {
      return {
        ok: false,
        reason: `Only read text modes allowed ("r"/"rt"). Got: "${mode}"`,
      };
    }
  }

  // 4) method .open(<expr>) — if first arg is mode inside a wrapper, allow it; else require literal path
  const methodExprRe = /\.open\s*\(\s*([^)]+?)\)/g;
  while ((m = methodExprRe.exec(code))) {
    const matchIdx = m.index;
    const args = m[1];
    const firstArg = args.split(",")[0]?.trim() ?? "";

    if (inRanges(matchIdx, wrapperRanges)) {
      const unquoted = firstArg.replace(/^['"]|['"]$/g, "");
      if (isMode(unquoted)) {
        // mode-first inside a trusted wrapper — allowed
        continue;
      }
      // otherwise fall through and treat as path
    }

    const quoted = [...firstArg.matchAll(/(['"])(.*?)\1/g)].map((t) => t[2]);
    if (quoted.length > 0) {
      const last = quoted[quoted.length - 1];
      if (!isAllowedFilename(last)) {
        return {
          ok: false,
          reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
        };
      }
    } else {
      return {
        ok: false,
        reason: `First argument of .open() must contain a literal filename.`,
      };
    }
  }

  // 5) Explicit wrapper calls: _open_data("house.tab")
  const wrapperRe = new RegExp(
    String.raw`\b(${Array.from(SAFE_OPEN_WRAPPERS).join("|")})\s*\(\s*(['"])(.*?)\2`,
    "g"
  );
  while ((m = wrapperRe.exec(code))) {
    const rawPath = m[3] || "";
    if (!isAllowedFilename(rawPath)) {
      return {
        ok: false,
        reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
      };
    }
  }

  return { ok: true };
}

/** Sanitize and validate Python code */
export function sanitizeAndValidateCode(code: string): ValidateResult {
  const cleanedCode = code
    .replace(/^\uFEFF/, "")
    .replace(/[^\x20-\x7E\r\n\t]+/g, "");
  if (!cleanedCode.trim())
    return { valid: false, reason: "Empty file or non-printable content." };
  if (cleanedCode.length > MAX_CODE_LENGTH)
    return { valid: false, reason: "Code too long." };

  const lines = cleanedCode.split("\n");
  if (lines.length > MAX_LINE_COUNT)
    return { valid: false, reason: "Too many lines." };

  const imp = hasOnlySafeImports(cleanedCode);
  if (!imp.ok) return { valid: false, reason: imp.reason };

  const op = hasOnlySafeOpenCalls(cleanedCode);
  if (!op.ok) return { valid: false, reason: op.reason };

  return { valid: true, cleanedCode };
}

/** File extension check */
export const isValidPythonFile = (file: File): boolean =>
  file.name.toLowerCase().endsWith(".py");
