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
export const SAFE_IMPORTS_LC = new Set(
  Array.from(SAFE_IMPORTS, (s) => s.toLowerCase())
);
export const ALLOWED_LOCAL_MODULES_LC = new Set(
  Array.from(ALLOWED_LOCAL_MODULES, (s) => s.toLowerCase())
);
export const SAFE_OPEN_FILES_LC = new Set(
  Array.from(SAFE_OPEN_FILES, (f) => f.toLowerCase())
);
