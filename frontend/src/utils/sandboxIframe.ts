// src/utils/sandboxIframe.ts
// Runs arbitrary JS code inside a hidden, sandboxed iframe.
// Intercepts console.log and forwards safe, stringified messages to the parent,
// avoiding "undefined" spam and non-serializable values.

export function runInSandboxedIframe(code: string) {
  const iframe = document.createElement("iframe");
  iframe.id = "sandboxed-iframe";
  iframe.sandbox.add("allow-scripts"); // script-only sandbox
  iframe.style.display = "none";

  iframe.srcdoc = `
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <script type="module">
          // Keep original console for devtools
          const originalLog = console.log;

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

          // Execute user code
          try {
            ${code}
          } catch (err) {
            console.log("❌ Error:", err);
          }
        </script>
      </body>
    </html>
  `;

  document.body.appendChild(iframe);
}
