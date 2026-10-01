import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, LogIn } from "lucide-react";

import { useOwner } from "./owner-context";

export default function OwnerAccountMenu() {
  const owner = useOwner();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (e.target instanceof Node && !panel.current?.contains(e.target))
        setOpen(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  if (!owner?.session)
    return (
      <Link
        to="/account/login"
        aria-label="Sign in"
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-3 text-sm font-semibold hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <LogIn size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Sign in</span>
      </Link>
    );
  const name = owner.session.profile.displayName;
  return (
    <div className="relative" ref={panel}>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls="owner-account-menu"
        aria-label={`Open account menu for ${name}`}
        onClick={() => setOpen(!open)}
        className="flex min-h-10 items-center gap-2 rounded-full border border-sky-500/40 bg-sky-50 pr-3 pl-1 text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-400 dark:bg-sky-950 dark:text-sky-100"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-sky-700 text-sm font-bold text-white">
          {name.charAt(0).toUpperCase()}
        </span>
        <span className="hidden max-w-24 truncate text-sm font-semibold lg:inline">
          {name}
        </span>
        {owner.session.role === "admin" && (
          <span className="text-xs font-bold">Admin</span>
        )}
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && (
        <nav
          id="owner-account-menu"
          aria-label="My account"
          className="absolute top-[calc(100%+0.65rem)] right-0 w-64 rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <p className="truncate border-b border-slate-200 px-3 py-3 text-sm font-semibold dark:border-slate-700">
            {name}
          </p>
          {[
            ["Overview", "overview"],
            ["Profile", "profile"],
            ["Security", "security"],
            ["Preferences", "preferences"],
            ["Administration", "administration"],
          ]
            .filter(
              ([, path]) =>
                path !== "administration" || owner.session?.role === "admin"
            )
            .map(([label, path]) => (
              <Link
                className="block rounded-xl px-3 py-2 text-sm hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-400 dark:hover:bg-slate-800"
                to={`/account/${path}`}
                key={path}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          <button
            className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60 dark:hover:bg-red-950"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError("");
              try {
                await owner.logout();
                setOpen(false);
              } catch {
                setError("Unable to sign out. Please try again.");
              } finally {
                setBusy(false);
              }
            }}
          >
            {" "}
            {busy ? "Signing out…" : "Sign out"}
          </button>
          {error && (
            <p role="alert" className="px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </nav>
      )}
    </div>
  );
}
