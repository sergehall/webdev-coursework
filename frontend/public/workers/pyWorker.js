// public/workers/pyWorker.js
// Fixing the error: importScripts cannot be used if worker type is "module"
// We remove `type: 'module'` in the caller and write this file as a classic (non-module) worker

importScripts("https://cdn.jsdelivr.net/pyodide/v0.28.1/full/pyodide.js");

let pyodide = null;

self.onmessage = async (event) => {
  const { code } = event.data;

  try {
    if (!pyodide) {
      pyodide = await loadPyodide();
    }

    await pyodide.runPythonAsync(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
      sys.stderr = sys.stdout
    `);

    await pyodide.runPythonAsync(code);

    const output = await pyodide.runPythonAsync("sys.stdout.getvalue()");
    self.postMessage({ type: "result", result: output });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : String(err ?? "Unknown error");
    self.postMessage({ type: "error", error: message });
  }
};
