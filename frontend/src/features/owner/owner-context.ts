import { createContext, useContext } from "react";

import type { OwnerSession } from "./owner-api";

export type OwnerState = {
  session: OwnerSession | null;
  status: "idle" | "loading" | "authenticated" | "anonymous" | "error";
  error: string;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  clear: () => void;
};
export const OwnerContext = createContext<OwnerState | null>(null);
export const useOwner = () => useContext(OwnerContext);
