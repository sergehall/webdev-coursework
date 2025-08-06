// src/utils/sandboxIframe.ts
export function runInSandboxedIframe(code: string) {
  const iframe = document.createElement("iframe");
  iframe.sandbox.add("allow-scripts");
  iframe.style.display = "none";
  iframe.srcdoc = `
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <script type="module">
          const originalLog = console.log;
          console.log = (...args) => {
            window.parent.postMessage({ type: "code-playground-log", payload: args.map(String).join(" ") }, "*");
            originalLog(...args);
          };
          ${code}
        </script>
      </body>
    </html>`;
  document.body.appendChild(iframe);
}
