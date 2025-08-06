import { loadPyodide } from "pyodide";

let pyodide: Awaited<ReturnType<typeof loadPyodide>> | null = null;

self.onmessage = async (event: MessageEvent<{ code: string }>) => {
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
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : String(err ?? "Unknown error");
    self.postMessage({ type: "error", error: message });
  }
};
