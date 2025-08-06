// src/utils/sandboxIframe.ts
export function runInSandboxedIframe(code: string) {
  const iframe = document.createElement("iframe");
  iframe.id = "sandboxed-iframe";
  iframe.sandbox.add("allow-scripts");
  iframe.style.display = "none";

  iframe.srcdoc = `
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <script type="module">
          const originalLog = console.log;

          console.log = (...args) => {
            try {
              // Send original arguments without serialization
              window.parent.postMessage({
                source: "sandbox",
                type: "log",
                payload: args
              }, "*");
            } catch (e) {
              window.parent.postMessage({
                source: "sandbox",
                type: "log",
                payload: ["[Log error]", String(e)]
              }, "*");
            }
            originalLog(...args);
          };

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
