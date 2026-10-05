// src/api/client.ts
import { buildApiUrl } from "./request-url";
// Empty string → same-origin relative requests (single-dyno / same-domain setup).
// Full URL → cross-origin requests (separate API subdomain/host).
const API_BASE_URL: string = import.meta.env.VITE_API_URL ?? "";

const DEFAULT_TIMEOUT_MS = 10_000;

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export class ApiHttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly endpoint: string,
    message: string
  ) {
    super(message);
    this.name = "ApiHttpError";
  }
}

interface ApiFetchOptions<TBody = undefined, TResponse = unknown> extends Omit<
  RequestInit,
  "body"
> {
  method?: ApiMethod;
  body?: TBody;
  timeoutMs?: number;
  parseResponse?: (value: unknown) => TResponse;
}

export async function apiFetch<TResponse, TBody = undefined>(
  endpoint: string,
  options: ApiFetchOptions<TBody, TResponse> = {}
): Promise<TResponse> {
  const url = buildApiUrl(endpoint, API_BASE_URL);
  const {
    body,
    headers,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    parseResponse,
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
    const res = await fetch(url, {
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
      ...rest,
      // Sensitive bodies and tokens must not be replayed to a redirect target.
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as {
        message?: unknown;
      };
      throw new ApiHttpError(
        res.status,
        endpoint,
        (typeof err.message === "string" && err.message) ||
          res.statusText ||
          "API request failed"
      );
    }

    const responseText = await res.text();
    if (!responseText.trim()) return undefined as TResponse;
    let value: unknown;
    try {
      value = JSON.parse(responseText);
    } catch {
      throw new Error(`Invalid JSON response from ${endpoint}`);
    }
    return parseResponse ? parseResponse(value) : (value as TResponse);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      if (timedOut)
        throw new Error(`Request timed out after ${timeoutMs}ms: ${endpoint}`);
      throw error;
    }
    throw error;
  } finally {
    clearTimeout(timerId);
    externalSignal?.removeEventListener("abort", abortFromCaller);
  }
}
