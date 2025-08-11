// src/utils/runPythonWithTimeout.ts
// Runs Python code inside a Web Worker with an optional timeout.
// Streams logs in real time (via onLog) and supports async input() (via onInput).
type SidecarFile = { name: string; content: string };
type Resolver = (name: string) => Promise<string | null>;
type Options = {
  // Provide fixed sidecar files (exact content)
  extras?: Record<string, string>;
  // Provide a resolver to fetch sidecars by name (e.g., from /code-playground)
  resolver?: Resolver;
  // If you already know names to fetch; if omitted, names are detected from `code`
  sidecarNames?: string[];
};

function detectSidecarNames(code: string): string[] {
  const need = new Set<string>();
  if (/\bfrom\s+A05ClassPrH\b|\bimport\s+A05ClassPrH\b/.test(code))
    need.add("A05ClassPrH.py");
  if (/\bhouse\.tab\b/.test(code)) need.add("house.tab");
  if (/\bpresident\.tab\b/.test(code)) need.add("president.tab");
  return Array.from(need);
}

async function resolveSidecars(
  code: string,
  opts?: Options
): Promise<SidecarFile[]> {
  const out: SidecarFile[] = [];
  const names = opts?.sidecarNames ?? detectSidecarNames(code);

  // extras take precedence
  if (opts?.extras) {
    for (const [name, content] of Object.entries(opts.extras)) {
      out.push({ name, content });
    }
  }

  // fill missing via resolver
  const have = new Set(out.map((f) => f.name));
  if (opts?.resolver) {
    for (const name of names) {
      if (have.has(name)) continue;
      try {
        const content = await opts.resolver(name);
        if (content != null) out.push({ name, content });
      } catch {
        /* ignore resolver errors */
      }
    }
  }
  return out;
}

export function runPythonWithTimeout(
  code: string,
  timeoutMs = 300000,
  onInput?: (prompt: string) => Promise<string | null>,
  onLog?: (text: string) => void,
  options?: Options
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Wrap async logic in an IIFE
    (async () => {
      let files: SidecarFile[] = [];
      try {
        files = await resolveSidecars(code, options);
        if (files.length) {
          onLog?.(`[host] sidecars: ${files.map((f) => f.name).join(", ")}`);
        }
      } catch (e) {
        onLog?.(`[host] sidecar resolution error: ${(e as Error).message}`);
      }

      const worker = new Worker("/workers/pyWorker.js");
      let active = true;
      let timer: ReturnType<typeof setTimeout>;

      const armTimeout = () => {
        clearTimeout(timer);
        if (timeoutMs > 0) {
          timer = setTimeout(
            () => stop(() => reject("Python execution timed out.")),
            timeoutMs
          );
        }
      };

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

        if (type === "log") {
          onLog?.(String(text ?? ""));
          return;
        }

        if (type === "input") {
          clearTimeout(timer);
          const value = (await onInput?.(String(prompt ?? "Input:"))) ?? "";
          armTimeout();
          worker.postMessage({ type: "inputResponse", id, value });
          return;
        }

        if (type === "result") {
          stop(() => resolve(result ?? ""));
          return;
        }

        if (type === "error") {
          stop(() => reject(error ?? "Unknown worker error"));
          return;
        }
      };

      worker.onerror = (err) => {
        stop(() => reject(err.message || "Unknown worker error"));
      };

      worker.postMessage({ type: "start", code, files });
    })().catch(reject);
  });
}
