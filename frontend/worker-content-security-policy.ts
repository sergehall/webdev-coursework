// Workers use their script response's CSP, not the containing page's policy.
// Keep these equivalent to the static /workers headers in vercel.json.
export const PYODIDE_RUNTIME_URL =
  "https://cdn.jsdelivr.net/pyodide/v0.28.1/full/";

export const javascriptWorkerPolicy =
  "default-src 'none'; script-src 'unsafe-eval'; connect-src 'none'; worker-src 'none'; object-src 'none'; base-uri 'none'";
export const pythonWorkerPolicy = `default-src 'none'; script-src 'wasm-unsafe-eval' ${PYODIDE_RUNTIME_URL}; connect-src ${PYODIDE_RUNTIME_URL}; worker-src 'none'; object-src 'none'; base-uri 'none'`;

export function workerContentSecurityPolicy(
  pathname: string
): string | undefined {
  if (pathname === "/workers/jsWorker.js") return javascriptWorkerPolicy;
  if (pathname === "/workers/pyWorker.js") return pythonWorkerPolicy;
  return undefined;
}
