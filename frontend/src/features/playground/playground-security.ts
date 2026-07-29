export const PLAYGROUND_MAX_LOG_ENTRIES = 500;
export const PLAYGROUND_MAX_LOG_LENGTH = 10_000;
export const PLAYGROUND_FETCH_TIMEOUT_MS = 8_000;
export const PLAYGROUND_MAX_ASSET_SIZE = 250_000;
export const JAVASCRIPT_EXECUTION_TIMEOUT_MS = 3_000;
export const PYTHON_EXECUTION_TIMEOUT_MS = 45_000;

const SUPPORTED_EXTENSION_RE = /\.(?:js|mjs|py|html?|json)$/i;
const SIDECAR_NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*\.(?:py|tab)$/;

export function isSupportedPlaygroundFile(filename: string): boolean {
  return SUPPORTED_EXTENSION_RE.test(filename);
}

export function isSafeSidecarName(filename: string): boolean {
  return SIDECAR_NAME_RE.test(filename);
}

export function boundPlaygroundLogs(logs: string[]): string[] {
  const normalized = logs.map((entry) =>
    String(entry).slice(0, PLAYGROUND_MAX_LOG_LENGTH)
  );

  return normalized.slice(-PLAYGROUND_MAX_LOG_ENTRIES);
}

export function getPlaygroundLanguage(filename: string | null) {
  const lower = filename?.toLowerCase() ?? "";

  if (lower.endsWith(".py")) return "Python";
  if (lower.endsWith(".html") || lower.endsWith(".htm")) return "HTML";
  if (lower.endsWith(".json")) return "JSON";
  if (lower.endsWith(".js") || lower.endsWith(".mjs")) return "JavaScript";

  return "No file selected";
}
