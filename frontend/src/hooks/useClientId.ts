import { useState } from "react";

import { QUIZ_APP_CONFIG } from "@/api/config/quiz-app";

/**
 * Returns a persistent client ID stored in localStorage (or generates one if missing).
 */
export function getOrCreateClientId(): string | null {
  if (typeof window === "undefined") {
    // SSR or test environment — skip clientId generation
    return null;
  }

  const clientIdKey = QUIZ_APP_CONFIG.client_id_key;
  let id = localStorage.getItem(clientIdKey);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(clientIdKey, id);
  }

  return id;
}

/**
 * React hook to retrieve a persistent client ID.
 * - Returns ID from localStorage (or generates one)
 * - Returns null on SSR/test environments (no window)
 */
export function useClientId(): string | null {
  const [clientId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return getOrCreateClientId();
  });

  return clientId;
}
