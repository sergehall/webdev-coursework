import { toCodePlaygroundUrl } from "@/utils/playgroundPath";

export type SidecarFile = { name: string; content: string };

function joinRelativePath(baseDir: string, name: string): string {
  return baseDir ? `${baseDir}/${name}` : name;
}

// Heuristic: detect local modules / data mentioned in code
export function detectSidecarNames(code: string): string[] {
  const need = new Set<string>();
  if (/\bfrom\s+A05ClassPrH\b|\bimport\s+A05ClassPrH\b/.test(code)) {
    need.add("A05ClassPrH.py");
  }
  if (/\bhouse\.tab\b/.test(code)) need.add("house.tab");
  if (/\bpresident\.tab\b/.test(code)) need.add("president.tab");
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
