import {
  SAFE_OPEN_FILES_LC,
  SAFE_OPEN_MODES,
} from "@/utils/secure-python/constants";

export type WrapperRange = {
  name: string;
  start: number;
  end: number;
};

export const baseModule = (raw: string) =>
  raw
    .trim()
    .split(/\s+as\s+/)[0]
    .split(".")[0]
    .toLowerCase();

export const isMode = (s: string) => SAFE_OPEN_MODES.has(s.toLowerCase());

export const hasAlias = (name: string): boolean => /\s+as\s+/i.test(name);

export const splitImportList = (list: string): string[] =>
  list
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const isAllowedFilename = (rawPath: string): boolean => {
  const last = rawPath.split(/[\\/]/).pop() || "";
  if (last.includes("..")) return false;
  return SAFE_OPEN_FILES_LC.has(last.toLowerCase());
};

/**
 * Find trusted wrapper body ranges by matching "def name(...):".
 * Simple textual scan is sufficient here.
 */
export function findWrapperRanges(src: string, names: Set<string>) {
  const ranges: WrapperRange[] = [];
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

export const inRanges = (
  pos: number,
  ranges: { start: number; end: number }[]
) => ranges.some((r) => pos >= r.start && pos < r.end);
