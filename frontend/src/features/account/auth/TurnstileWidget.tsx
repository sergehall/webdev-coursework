import { use, useEffect, useRef, useState } from "react";

import { ThemeContext } from "../../../context/ThemeContext";

import { loadTurnstile, type Turnstile } from "./turnstile-client";

/** Account widget lifecycle; the form owns token submission and the server owns verification. */
export default function TurnstileWidget({
  siteKey,
  action,
  onToken,
}: {
  siteKey: string;
  action: "account_login" | "account_register";
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const theme = use(ThemeContext)?.theme ?? "auto";
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    // Ignore callbacks from a removed widget after route changes, retries or StrictMode cleanup.
    let disposed = false;
    let widgetId: string | undefined;
    let api: Turnstile | undefined;
    const clear = () => {
      if (!disposed) onToken("");
    };
    void loadTurnstile()
      .then((turnstile) => {
        if (disposed || !container.current) return;
        api = turnstile;
        widgetId = api.render(container.current, {
          sitekey: siteKey,
          action,
          theme,
          // Flexible widgets require 300px; compact mode fits narrower account forms.
          size:
            container.current.getBoundingClientRect().width > 0 &&
            container.current.getBoundingClientRect().width < 300
              ? "compact"
              : "flexible",
          // React submits the token explicitly in the account request body.
          "response-field": false,
          callback: (token) => {
            if (!disposed) {
              setError("");
              onToken(token);
            }
          },
          "expired-callback": clear,
          "timeout-callback": () => {
            clear();
            if (!disposed)
              setError("Verification timed out. Please try again.");
          },
          "error-callback": () => {
            clear();
            if (!disposed)
              setError("Human verification failed. Please try again.");
          },
        });
      })
      .catch(() => {
        if (!disposed) {
          onToken("");
          setError(
            "Human verification could not load. Check your connection and try again."
          );
        }
      });
    return () => {
      disposed = true;
      // Invalidate the parent token as soon as its widget no longer owns a live challenge.
      onToken("");
      if (widgetId !== undefined) api?.remove(widgetId);
    };
  }, [siteKey, action, theme, attempt, onToken]);
  return (
    <div className="owner-human-verification" aria-label="Human verification">
      <div ref={container} />
      {error && (
        <>
          <p role="alert" className="owner-message owner-message--error">
            {error}
          </p>
          <button
            type="button"
            className="owner-button"
            onClick={() => {
              setError("");
              onToken("");
              setAttempt((value) => value + 1);
            }}
          >
            Retry verification
          </button>
        </>
      )}
    </div>
  );
}
