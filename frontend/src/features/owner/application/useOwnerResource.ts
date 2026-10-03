import { useEffect, useState } from "react";

import { OwnerApiError, ownerRequest } from "../owner-api";
import { useOwner } from "../owner-context";

export function useOwnerResource<T>(
  path: string,
  parseResponse: (value: unknown) => T
) {
  const owner = useOwner();
  const clear = owner?.clear;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setData(null);
    setError("");
    void ownerRequest<T>(path, { parseResponse })
      .then((value) => {
        if (active) setData(value);
      })
      .catch((err) => {
        if (!active) return;
        if (err instanceof OwnerApiError && err.status === 401) clear?.();
        else
          setError(
            err instanceof Error ? err.message : "Unable to load this page."
          );
      });
    return () => {
      active = false;
    };
  }, [path, parseResponse, revision, clear]);
  return { data, error, retry: () => setRevision((value) => value + 1) };
}
