import {
  PLAYGROUND_FETCH_TIMEOUT_MS,
  PLAYGROUND_MAX_ASSET_SIZE,
  isSupportedPlaygroundFile,
} from "@/features/playground/playground-security";
import {
  normalizePlaygroundRelativePath,
  toCodePlaygroundUrl,
} from "@/utils/playgroundPath";

type FetchPlaygroundTextOptions = {
  readonly cacheBust?: boolean;
  readonly timeoutMs?: number;
};

export async function fetchPlaygroundText(
  relativePath: string,
  options: FetchPlaygroundTextOptions = {}
): Promise<string> {
  const safePath = normalizePlaygroundRelativePath(relativePath);
  if (!safePath || !isSupportedPlaygroundFile(safePath)) {
    throw new Error("Unsupported or invalid playground file path.");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? PLAYGROUND_FETCH_TIMEOUT_MS
  );

  try {
    const baseUrl = toCodePlaygroundUrl(safePath);
    const url = options.cacheBust
      ? `${baseUrl}?t=${encodeURIComponent(String(Date.now()))}`
      : baseUrl;
    const response = await fetch(url, {
      cache: "no-store",
      credentials: "same-origin",
      redirect: "error",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`File request failed with status ${response.status}.`);
    }

    const declaredSize = Number(response.headers.get("content-length") ?? 0);
    if (declaredSize > PLAYGROUND_MAX_ASSET_SIZE) {
      throw new Error("Playground file exceeds the permitted size.");
    }

    const text = await response.text();
    if (new TextEncoder().encode(text).byteLength > PLAYGROUND_MAX_ASSET_SIZE) {
      throw new Error("Playground file exceeds the permitted size.");
    }

    return text;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Playground file request timed out.", { cause: error });
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
