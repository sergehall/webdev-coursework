import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { OwnerApiError, ownerRequest, type OwnerSession } from "./owner-api";
import { OwnerContext, type OwnerState } from "./owner-context";

export default function OwnerProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [session, setSession] = useState<OwnerSession | null>(null);
  const [status, setStatus] = useState<OwnerState["status"]>("idle");
  const [error, setError] = useState("");
  const clear = useCallback(() => {
    setSession(null);
    setStatus("anonymous");
    setError("");
  }, []);
  const refresh = useCallback(async () => {
    setStatus("loading");
    try {
      const data = await ownerRequest<OwnerSession>("session");
      setSession(data);
      setStatus("authenticated");
      setError("");
    } catch (err) {
      setSession(null);
      if (err instanceof OwnerApiError && err.status === 401) {
        setStatus("anonymous");
        setError("");
        return;
      }
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Unable to check your account."
      );
      throw err;
    }
  }, []);
  const logout = useCallback(async () => {
    try {
      await ownerRequest("logout", { method: "POST" });
    } catch (err) {
      if (!(err instanceof OwnerApiError && err.status === 401)) throw err;
    }
    clear();
  }, [clear]);
  useEffect(() => {
    // Avoid session requests and denied-access audit events for public visitors.
    if (
      (location.pathname.startsWith("/owner") ||
        location.pathname.startsWith("/account")) &&
      status === "idle"
    )
      void refresh().catch(() => {});
  }, [location.pathname, status, refresh]);
  useEffect(() => {
    if (!session) return;
    const delay = Math.max(0, Date.parse(session.expiresAt) - Date.now());
    const timer = window.setTimeout(clear, delay);
    return () => window.clearTimeout(timer);
  }, [session, clear]);
  return (
    <OwnerContext.Provider
      value={{ session, status, error, refresh, logout, clear }}
    >
      {children}
    </OwnerContext.Provider>
  );
}
