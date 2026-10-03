// src/api/client.ts
// Empty string → same-origin relative requests (single-dyno / same-domain setup).
// Full URL → cross-origin requests (separate API subdomain/host).
const API_BASE_URL: string = import.meta.env.VITE_API_URL ?? "";

const DEFAULT_TIMEOUT_MS = 10_000;

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiFetchOptions<TBody = undefined> extends Omit<RequestInit, "body"> {
  method?: ApiMethod;
  body?: TBody;
  timeoutMs?: number;
}

export async function apiFetch<TResponse, TBody = undefined>(
  endpoint: string,
  options: ApiFetchOptions<TBody> = {}
): Promise<TResponse> {
  const {
    body,
    headers,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal: externalSignal,
    ...rest
  } = options;

  const controller = new AbortController();
  let timedOut = false;
  const timerId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  const abortFromCaller = () => controller.abort();
  if (externalSignal?.aborted) abortFromCaller();
  else
    externalSignal?.addEventListener("abort", abortFromCaller, {
      once: true,
    });

  const requestHeaders = new Headers(headers);
  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
      ...rest,
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as {
        message?: unknown;
      };
      throw new Error(
        (typeof err.message === "string" && err.message) ||
          res.statusText ||
          "API request failed"
      );
    }

    const responseText = await res.text();
    if (!responseText.trim()) return undefined as TResponse;
    try {
      return JSON.parse(responseText) as TResponse;
    } catch {
      throw new Error(`Invalid JSON response from ${endpoint}`);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      if (timedOut)
        throw new Error(`Request timed out after ${timeoutMs}ms: ${endpoint}`);
      throw error;
    }
    console.error("❌ apiFetch failed:", error);
    throw error;
  } finally {
    clearTimeout(timerId);
    externalSignal?.removeEventListener("abort", abortFromCaller);
  }
}
