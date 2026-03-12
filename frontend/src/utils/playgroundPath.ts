const SEGMENT_RE = /^[A-Za-z0-9._ -]+$/;

export function normalizePlaygroundRelativePath(
  rawPath: string | null
): string | null {
  if (!rawPath) return null;

  let decoded = rawPath.trim();
  if (!decoded) return null;

  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return null;
  }

  const normalized = decoded.replace(/\\/g, "/");
  if (!normalized || normalized.startsWith("/") || normalized.includes("//")) {
    return null;
  }

  const segments = normalized.split("/");
  if (!segments.length) return null;

  for (const segment of segments) {
    if (!segment || segment === "." || segment === "..") return null;
    if (!SEGMENT_RE.test(segment)) return null;
  }

  return segments.join("/");
}

export function toCodePlaygroundUrl(relativePath: string): string {
  const safePath = normalizePlaygroundRelativePath(relativePath);
  if (!safePath) {
    throw new Error("Invalid code-playground path.");
  }

  const encoded = safePath.split("/").map(encodeURIComponent).join("/");
  return `/code-playground/${encoded}`;
}
