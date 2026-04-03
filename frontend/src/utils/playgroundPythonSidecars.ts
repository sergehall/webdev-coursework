import { toCodePlaygroundUrl } from "@/utils/playgroundPath";

export type SidecarFile = { name: string; content: string };

function joinRelativePath(baseDir: string, name: string): string {
  return baseDir ? `${baseDir}/${name}` : name;
}

// Heuristic: detect local modules / data files mentioned in code.
// Matches bare `import foo` and `from foo import ...` where foo looks like a
// local identifier (no dots, not a known stdlib prefix).
const STDLIB_PREFIXES = new Set([
  "os", "sys", "re", "io", "abc", "ast", "csv", "math", "time", "json",
  "copy", "enum", "glob", "gzip", "html", "http", "logging", "pathlib",
  "random", "shutil", "socket", "string", "struct", "tempfile", "threading",
  "traceback", "typing", "unittest", "urllib", "uuid", "warnings", "xml",
  "collections", "contextlib", "dataclasses", "datetime", "decimal",
  "functools", "itertools", "operator", "pickle", "pprint", "queue",
  "statistics", "subprocess", "textwrap", "zlib",
  // popular third-party (available in Pyodide)
  "numpy", "pandas", "matplotlib", "scipy", "sklearn", "requests",
  "PIL", "cv2", "torch", "flask", "django",
  "__future__",
]);

export function detectSidecarNames(code: string): string[] {
  const need = new Set<string>();

  // `import foo` or `from foo import ...` — only bare identifiers (no dots)
  const importRe = /^\s*(?:from|import)\s+([A-Za-z_][A-Za-z0-9_]*)\b/gm;
  let m: RegExpExecArray | null;
  while ((m = importRe.exec(code)) !== null) {
    const name = m[1];
    if (!STDLIB_PREFIXES.has(name)) {
      need.add(`${name}.py`);
    }
  }

  // Data file references (.tab extension)
  const tabRe = /\b([A-Za-z_][A-Za-z0-9_]*)\.tab\b/g;
  while ((m = tabRe.exec(code)) !== null) {
    need.add(`${m[1]}.tab`);
  }

  return Array.from(need);
}

export function dirname(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx >= 0 ? path.slice(0, idx) : "";
}

// Fetch sidecar files relative to a base folder (folder of the .py file)
export async function fetchSidecars(
  baseDir: string,
  names: string[],
  log?: (t: string) => void
): Promise<SidecarFile[]> {
  const out: SidecarFile[] = [];
  for (const name of names) {
    try {
      const rel = joinRelativePath(baseDir, name);
      const url = toCodePlaygroundUrl(rel);
      const res = await fetch(`${url}?t=${Date.now()}`);
      if (!res.ok) {
        log?.(`[host] sidecar not found: ${name} (${res.status})`);
        continue;
      }
      out.push({ name, content: await res.text() });
    } catch (e) {
      log?.(`[host] failed to fetch sidecar ${name}: ${(e as Error).message}`);
    }
  }
  return out;
}

export async function resolveSidecarByName(
  name: string
): Promise<string | null> {
  try {
    const res = await fetch(`${toCodePlaygroundUrl(name)}?t=${Date.now()}`);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}
