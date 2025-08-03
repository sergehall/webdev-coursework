import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  COURSE_PROGRESS_CONFIG,
  type CourseId,
} from "@/api/config/course-progress";

const DEFAULT_CLIENT_ID_KEY = "default-client-id";

function getClientIdKey(courseId: CourseId | undefined): string {
  if (!courseId || !(courseId in COURSE_PROGRESS_CONFIG)) {
    return DEFAULT_CLIENT_ID_KEY;
  }
  return COURSE_PROGRESS_CONFIG[courseId].client_id_key;
}

/**
 * Returns a persistent client ID stored in localStorage (or generates one if missing).
 */
export function getOrCreateClientId(
  courseId: CourseId | undefined
): string | null {
  if (typeof window === "undefined") return null;

  const clientIdKey = getClientIdKey(courseId);
  let id = localStorage.getItem(clientIdKey);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(clientIdKey, id);
  }

  return id;
}

/**
 * React hook to retrieve a persistent client ID.
 * - Uses `useParams` to extract courseId.
 */
export function useClientId(): string | null {
  const { courseId } = useParams<{ courseId: CourseId }>();

  const [clientId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return getOrCreateClientId(courseId);
  });

  return clientId;
}
