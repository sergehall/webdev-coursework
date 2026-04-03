import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { CodePlaygroundStatus } from "@/components/CodePlaygroundStatus";
import { useConsoleInterceptor } from "@/hooks/useConsoleInterceptor";
import { usePostMessageLogs } from "@/hooks/usePostMessageLogs";
import { useRunPlayground } from "@/hooks/useRunPlayground";
import { usePythonWorkerRunner } from "@/hooks/usePythonWorkerRunner";
import { useCodePlaygroundFileCheck } from "@/hooks/useCodePlaygroundFileCheck";
import { ConsoleOutput } from "@/components/ConsoleOutput";
import {
  toCodePlaygroundUrl,
  normalizePlaygroundRelativePath,
} from "@/utils/playgroundPath";
import { validateJavaScript } from "@/utils/secureJavaScript";
import {
  SANDBOX_IFRAME_ID,
  runInSandboxedIframe,
  runHtmlInSandboxedIframe,
} from "@/utils/sandboxIframe";
import {
  ClearConsoleButton,
  RunAgainButton,
  SecureJsUploadButton,
  SecurePythonUploadButton,
  SecureHtmlUploadButton,
  SecureJsonUploadButton,
} from "@/components/buttons";

const PYTHON_TIMEOUT_MS = 45_000;

export default function CodePlaygroundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const rawFile = searchParams.get("file");
  const file = normalizePlaygroundRelativePath(rawFile);

  const workerRef = useRef<Worker | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [filename, setFilename] = useState<string | null>(null);
  const [lastUploadedCode, setLastUploadedCode] = useState<string | null>(null);
  const [uploadedSidecars, setUploadedSidecars] = useState<Record<string, string>>({});
  const [pendingHtml, setPendingHtml] = useState<string | null>(null);
  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const htmlPreviewContainerRef = useRef<HTMLDivElement>(null);

  // Input prompt integration for bottom input bar
  const [inputResolver, setInputResolver] = useState<
    ((value: string) => void) | null
  >(null);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const { fileExists } = useCodePlaygroundFileCheck(rawFile);

  const runPythonInWorker = usePythonWorkerRunner({
    workerRef,
    setLogs,
    setInputResolver,
    setPendingPrompt,
    timeoutMs: PYTHON_TIMEOUT_MS,
  });

  // Send console input back to worker
  const handleConsoleInput = (value: string) => {
    if (inputResolver) {
      inputResolver(value);
      setInputResolver(null);
      setPendingPrompt(null);
    }
  };

  // Auto-run file if present in /code-playground
  useEffect(() => {
    if (!file || fileExists !== true) return;

    const lower = file.toLowerCase();
    const isPython = lower.endsWith(".py");
    const isJavaScript = lower.endsWith(".js") || lower.endsWith(".mjs");

    if (isJavaScript) {
      void fetch(toCodePlaygroundUrl(file))
        .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
        .then((code) => {
          const validation = validateJavaScript(code, {
            allowBrowserGlobals: true,
          });
          if (!validation.valid) {
            setLogs((prev) => [
              ...prev,
              `🚫 JS blocked: ${validation.reason ?? "unsafe code detected"}`,
            ]);
            return;
          }
          setLogs((prev) => [...prev, ">_"]);
          runInSandboxedIframe(code);
        })
        .catch((err) =>
          setLogs((prev) => [...prev, `❌ Failed to run JS: ${String(err)}`])
        );
    }

    if (isPython) {
      void fetch(toCodePlaygroundUrl(file))
        .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
        .then((code) => runPythonInWorker(code))
        .catch((err) =>
          setLogs((prev) => [
            ...prev,
            `❌ Failed to run Python: ${String(err)}`,
          ])
        );
    }
  }, [file, fileExists, runPythonInWorker]);

  // Inject HTML into the preview container after React commits the DOM.
  // useEffect runs after every render where pendingHtml changes,
  // at which point the container div is guaranteed to exist in the DOM.
  useEffect(() => {
    if (!pendingHtml || !htmlPreviewContainerRef.current) return;
    runHtmlInSandboxedIframe(pendingHtml, "html-preview-container");
  }, [pendingHtml]);

  // Capture browser console + postMessage logs
  useConsoleInterceptor((msg) => setLogs((prev) => [...prev, msg]));
  usePostMessageLogs((msg) => setLogs((prev) => [...prev, msg]));

  // Run again button
  const handleRunAgain = useRunPlayground(
    workerRef,
    file,
    fileExists,
    lastUploadedCode,
    filename,
    setLogs,
    setInputResolver,
    uploadedSidecars
  );

  // Shared cleanup: reset all active runners when switching file types
  const clearActiveRunners = () => {
    document.getElementById(SANDBOX_IFRAME_ID)?.remove();
    setPendingHtml(null);
    setJsonContent(null);
    setUploadedSidecars({});
  };

  // Upload handler
  const handleUpload = (code: string, name: string, extras?: Record<string, string>) => {
    void (async () => {
      const search = new URLSearchParams(location.search);
      search.delete("file");
      await navigate({
        pathname: location.pathname,
        search: search.toString(),
      });

      clearActiveRunners();
      setFilename(name);
      setLastUploadedCode(code);

      const lower = name.toLowerCase();
      if (lower.endsWith(".py")) {
        const sidecars = extras ?? {};
        setUploadedSidecars(sidecars);
        if (Object.keys(sidecars).length) {
          setLogs((prev) => [
            ...prev,
            `[modules] loaded: ${Object.keys(sidecars).join(", ")}`,
          ]);
        }
        runPythonInWorker(code, sidecars);
      } else if (lower.endsWith(".html") || lower.endsWith(".htm")) {
        // Setting pendingHtml triggers useEffect after React commits the container div
        setPendingHtml(code);
      } else if (lower.endsWith(".json")) {
        try {
          setJsonContent(JSON.stringify(JSON.parse(code), null, 2));
        } catch {
          setLogs((prev) => [...prev, "❌ Invalid JSON."]);
        }
      } else {
        setLogs((prev) => [...prev, ">_"]);
        runInSandboxedIframe(code);
      }
    })();
  };

  const handleHtmlUpload = (html: string, name: string) => { handleUpload(html, name); };
  const handleJsonUpload = (json: string, name: string) => { handleUpload(json, name); };

  // When HTML preview is active the page fills the entire main area
  // (header → footer) using flex-col + h-full so the iframe can flex-1.
  const pageClass =
    pendingHtml !== null
      ? "flex h-full flex-col p-3"
      : "p-3";

  return (
    <div className={pageClass}>
      <h2 className="mb-4 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        Code Playground
      </h2>

      <CodePlaygroundStatus
        file={file ?? rawFile}
        fileExists={fileExists}
        filename={filename}
        lastUploadedCode={lastUploadedCode}
      />

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ClearConsoleButton onClear={() => { setLogs([]); clearActiveRunners(); }} />
        <SecureJsUploadButton onSafeUpload={handleUpload} />
        <SecurePythonUploadButton onSafeUpload={handleUpload} />
        <SecureHtmlUploadButton onSafeUpload={handleHtmlUpload} />
        <SecureJsonUploadButton onSafeUpload={handleJsonUpload} />
        {(file || lastUploadedCode) && (
          <RunAgainButton onRunAgain={handleRunAgain} />
        )}
      </div>

      {pendingHtml !== null && (
        <div
          id="html-preview-container"
          ref={htmlPreviewContainerRef}
          className="mt-4 min-h-0 flex-1 overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600"
        />
      )}

      {jsonContent && (
        <pre className="mt-4 max-h-[500px] overflow-auto rounded-xl bg-gray-100 p-4 font-mono text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-200">
          {jsonContent}
        </pre>
      )}

      {pendingHtml === null && (
        <ConsoleOutput
          logs={logs}
          onInput={inputResolver ? handleConsoleInput : undefined}
          awaitingPrompt={pendingPrompt || undefined}
        />
      )}
    </div>
  );
}
