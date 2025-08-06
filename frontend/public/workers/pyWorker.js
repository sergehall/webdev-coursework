import { loadPyodide } from "pyodide";

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
