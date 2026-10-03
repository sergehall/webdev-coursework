import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, LogIn } from "lucide-react";

import { useOwner } from "./owner-context";
import "./owner-theme.css";

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
        to="/account/sign-in"
        aria-label="Sign in"
        className="owner-account-menu inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--owner-border)] px-3 text-sm font-semibold text-[var(--owner-text)] hover:bg-[var(--owner-hover)] focus-visible:ring-2 focus-visible:ring-[var(--owner-accent)]"
      >
        <LogIn size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Sign in</span>
      </Link>
    );
  const name = owner.session.profile.displayName;
  return (
    <div className="owner-account-menu relative" ref={panel}>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls="owner-account-menu"
        aria-label={`Open account menu for ${name}`}
        onClick={() => setOpen(!open)}
        className="flex min-h-10 items-center gap-2 rounded-full border border-[var(--owner-border)] bg-[var(--owner-panel)] pr-3 pl-1 text-[var(--owner-text)] hover:border-[var(--owner-accent)] focus-visible:ring-2 focus-visible:ring-[var(--owner-accent)]"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-[var(--owner-soft)] text-sm font-bold text-[var(--owner-accent)]">
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
          className="absolute top-[calc(100%+0.65rem)] right-0 w-56 rounded-lg border border-[var(--owner-border)] bg-[var(--owner-panel)] p-2 text-[var(--owner-text)] shadow-2xl"
        >
          <p className="truncate border-b border-[var(--owner-border)] px-3 py-2 text-sm font-semibold">
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
                className="block rounded-md px-3 py-2 text-sm hover:bg-[var(--owner-hover)] focus-visible:ring-2 focus-visible:ring-[var(--owner-accent)]"
                to={`/account/${path}`}
                key={path}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          <button
            className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[var(--owner-danger)] hover:bg-[var(--owner-danger-bg)] focus-visible:ring-2 focus-visible:ring-[var(--owner-accent)] disabled:opacity-60"
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
            <p
              role="alert"
              className="px-3 py-2 text-sm text-[var(--owner-danger)]"
            >
              {error}
            </p>
          )}
        </nav>
      )}
    </div>
  );
}
