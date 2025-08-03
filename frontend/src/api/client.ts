// src/api/client.ts
const API_BASE_URL = import.meta.env.VITE_API_URL;

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiFetchOptions<TBody = undefined> extends Omit<RequestInit, "body"> {
  method?: ApiMethod;
  body?: TBody;
}

export async function apiFetch<TResponse, TBody = undefined>(
  endpoint: string,
  options: ApiFetchOptions<TBody> = {}
): Promise<TResponse> {
  const { body, headers, ...rest } = options;

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || res.statusText || "API request failed");
    }

    const data = await res.json().catch(() => ({}));
    return data as TResponse;
  } catch (error) {
    console.error("❌ apiFetch failed:", error);
    throw error;
  }
}
