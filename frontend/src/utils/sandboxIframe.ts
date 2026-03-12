// src/utils/sandboxIframe.ts
// Runs arbitrary JS code inside a hidden, sandboxed iframe.
// Intercepts console.log and forwards safe, stringified messages to the parent,
// avoiding "undefined" spam and non-serializable values.

export const SANDBOX_IFRAME_ID = "sandboxed-iframe";

const escapeScriptCloseTag = (jsonString: string): string =>
  jsonString.replace(/</g, "\\u003c");

export function runInSandboxedIframe(code: string) {
  // Keep only one sandbox iframe at a time.
  const existing = document.getElementById(SANDBOX_IFRAME_ID);
  if (existing) existing.remove();

  const iframe = document.createElement("iframe");
  iframe.id = SANDBOX_IFRAME_ID;
  iframe.sandbox.add("allow-scripts"); // script-only sandbox
  iframe.referrerPolicy = "no-referrer";
  iframe.style.display = "none";

  const serializedCode = escapeScriptCloseTag(JSON.stringify(code));

  iframe.srcdoc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'none'; script-src 'unsafe-inline'; connect-src 'none'; img-src data:; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'; frame-ancestors 'none'"
        />
      </head>
      <body>
        <script type="module">
          // Keep original console for devtools
          const originalLog = console.log;
          const userCode = ${serializedCode};

          // Convert any JS value to a readable string
          const toStr = (v) => {
            if (v === undefined || v === null) return "";
            if (typeof v === "string") return v;
            if (typeof v === "number" || typeof v === "boolean") return String(v);
            if (v instanceof Error) return v.stack || v.message || String(v);
            // Try JSON first, fall back to String(...)
            try { return JSON.stringify(v); } catch { return String(v); }
          };

          // Produce a single safe line
          const toLine = (...args) => {
            const cleaned = args.map(toStr).filter(s => s !== "");
            return cleaned.join(" ");
          };

          // Override console.log to forward sanitized messages
          console.log = (...args) => {
            try {
              const line = toLine(...args);
              if (line) {
                window.parent.postMessage(
                  { source: "sandbox", type: "log", payload: line },
                  "*"
                );
              }
            } catch (e) {
              // Send a minimal, safe error line if forwarding fails
              window.parent.postMessage(
                { source: "sandbox", type: "log", payload: "[Log error] " + String(e) },
                "*"
              );
            }
            // Still log to devtools console inside the iframe
            originalLog(...args);
          };

          window.addEventListener("error", (event) => {
            console.log("❌ Error:", event?.error || event?.message || "Unknown script error");
          });

          window.addEventListener("unhandledrejection", (event) => {
            console.log("❌ Promise error:", event?.reason || "Unhandled promise rejection");
          });

          // Execute user code
          try {
            const userScript = document.createElement("script");
            userScript.type = "module";
            userScript.textContent = userCode;
            document.body.appendChild(userScript);
          } catch (err) {
            console.log("❌ Error:", err);
          }
        </script>
      </body>
    </html>
  `;

  document.body.appendChild(iframe);
}
