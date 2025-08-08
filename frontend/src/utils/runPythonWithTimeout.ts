// Runs Python code inside a Web Worker with an optional timeout.
// Streams logs in real time (via onLog) and supports async input() (via onInput).
export function runPythonWithTimeout(
  code: string,
  timeoutMs = 300000,
  onInput?: (prompt: string) => Promise<string | null>,
  onLog?: (text: string) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("/workers/pyWorker.js"); // classic worker
    let active = true; // prevent double settle
    let timer: ReturnType<typeof setTimeout>; // execution timeout handle

    // Arm (or re-arm) the timeout
    const armTimeout = () => {
      clearTimeout(timer);
      if (timeoutMs > 0) {
        timer = setTimeout(
          () => stop(() => reject("Python execution timed out.")),
          timeoutMs
        );
      }
    };

    // Single place to terminate the worker and settle the promise exactly once
    const stop = (finalize: () => void) => {
      if (!active) return;
      active = false;
      clearTimeout(timer);
      try {
        worker.terminate();
      } catch {
        /* ignore */
      }
      finalize();
    };

    armTimeout();

    worker.onmessage = async (e) => {
      if (!active) return;
      const { type, result, error, id, prompt, text } = e.data || {};

      // Real-time logs from worker
      if (type === "log") {
        if (onLog) onLog(String(text ?? ""));
        return;
      }

      // input() request from Python: pause timeout while the user thinks
      if (type === "input") {
        clearTimeout(timer); // pause timeout during user input
        const value = (await onInput?.(String(prompt ?? "Input:"))) ?? "";
        armTimeout(); // resume timeout after we got the answer
        worker.postMessage({ type: "inputResponse", id, value });
        return;
      }

      // Normal completion
      if (type === "result") {
        stop(() => resolve(result ?? ""));
        return;
      }

      // Error from worker / Python
      if (type === "error") {
        stop(() => reject(error ?? "Unknown worker error"));
        return;
      }
    };

    worker.onerror = (err) => {
      stop(() => reject(err.message || "Unknown worker error"));
    };

    // Kick off execution
    worker.postMessage({ type: "start", code });
  });
}
