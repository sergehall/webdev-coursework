// src/api/client.ts
const API_BASE_URL = import.meta.env.VITE_API_URL;

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
  const { body, headers, timeoutMs = DEFAULT_TIMEOUT_MS, signal: externalSignal, ...rest } = options;

  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), timeoutMs);

  // Respect any external signal passed by the caller
  externalSignal?.addEventListener("abort", () => controller.abort());

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      ...rest,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || res.statusText || "API request failed");
    }

    const data = await res.json().catch(() => ({}));
    return data as TResponse;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms: ${endpoint}`);
    }
    console.error("❌ apiFetch failed:", error);
    throw error;
  } finally {
    clearTimeout(timerId);
  }
}
