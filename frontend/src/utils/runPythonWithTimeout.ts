// src/utils/runPythonWithTimeout.ts
export function runPythonWithTimeout(
  code: string,
  timeoutMs = 3000
): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("@/workers/pyWorker.ts", import.meta.url),
      { type: "module" }
    );
    const timeout = setTimeout(() => {
      worker.terminate();
      reject("Python execution timed out.");
    }, timeoutMs);

    worker.onmessage = (e) => {
      const { type, result, error } = e.data;

      clearTimeout(timeout);
      worker.terminate();

      if (type === "result") {
        resolve(result);
      } else {
        reject(error);
      }
    };

    worker.onerror = (err) => {
      clearTimeout(timeout);
      worker.terminate();
      reject(err.message || "Unknown worker error");
    };

    worker.postMessage({ code });
  });
}
