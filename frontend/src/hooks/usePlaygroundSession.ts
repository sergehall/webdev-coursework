import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import {
  PYTHON_EXECUTION_TIMEOUT_MS,
  boundPlaygroundLogs,
} from "@/features/playground/playground-security";
import { useCodePlaygroundFileCheck } from "@/hooks/useCodePlaygroundFileCheck";
import { useJavaScriptWorkerRunner } from "@/hooks/useJavaScriptWorkerRunner";
import { usePostMessageLogs } from "@/hooks/usePostMessageLogs";
import { usePythonWorkerRunner } from "@/hooks/usePythonWorkerRunner";
import { fetchPlaygroundText } from "@/utils/fetchPlaygroundText";
import {
  detectSidecarNames,
  dirname,
  fetchSidecars,
} from "@/utils/playgroundPythonSidecars";
import { normalizePlaygroundRelativePath } from "@/utils/playgroundPath";
import {
  HTML_PREVIEW_IFRAME_ID,
  SANDBOX_IFRAME_ID,
  runHtmlInSandboxedIframe,
  runInSandboxedIframe,
} from "@/utils/sandboxIframe";
import { validateJavaScript } from "@/utils/secureJavaScript";

export type PlaygroundSourceOrigin = "coursework" | "upload" | null;

type ExecuteCodeOptions = {
  readonly origin: Exclude<PlaygroundSourceOrigin, null>;
  readonly extras?: Record<string, string>;
};

export function usePlaygroundSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const rawFile = searchParams.get("file");
  const file = normalizePlaygroundRelativePath(rawFile);
  const { fileExists } = useCodePlaygroundFileCheck(rawFile);

  const pythonWorkerRef = useRef<Worker | null>(null);
  const javascriptWorkerRef = useRef<Worker | null>(null);
  const htmlPreviewContainerRef = useRef<HTMLDivElement>(null);
  const [logs, setRawLogs] = useState<string[]>([]);
  const [filename, setFilename] = useState<string | null>(null);
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [sourceOrigin, setSourceOrigin] =
    useState<PlaygroundSourceOrigin>(null);
  const [uploadedExtras, setUploadedExtras] = useState<Record<string, string>>(
    {}
  );
  const [pendingHtml, setPendingHtml] = useState<string | null>(null);
  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const [inputResolver, setInputResolver] = useState<
    ((value: string) => void) | null
  >(null);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const setLogs = useCallback<Dispatch<SetStateAction<string[]>>>((action) => {
    setRawLogs((previous) => {
      const next = typeof action === "function" ? action(previous) : action;
      return boundPlaygroundLogs(next);
    });
  }, []);

  const appendLog = useCallback(
    (message: string) => setLogs((previous) => [...previous, message]),
    [setLogs]
  );

  const runPython = usePythonWorkerRunner({
    workerRef: pythonWorkerRef,
    setLogs,
    setInputResolver,
    setPendingPrompt,
    timeoutMs: PYTHON_EXECUTION_TIMEOUT_MS,
  });
  const runUploadedJavaScript = useJavaScriptWorkerRunner({
    workerRef: javascriptWorkerRef,
    setLogs,
  });

  const stopActiveRunners = useCallback(() => {
    pythonWorkerRef.current?.terminate();
    javascriptWorkerRef.current?.terminate();
    pythonWorkerRef.current = null;
    javascriptWorkerRef.current = null;
    document.getElementById(SANDBOX_IFRAME_ID)?.remove();
    document.getElementById(HTML_PREVIEW_IFRAME_ID)?.remove();
    setInputResolver(null);
    setPendingPrompt(null);
  }, []);

  const executeCode = useCallback(
    (
      code: string,
      activeFilename: string,
      { origin, extras = {} }: ExecuteCodeOptions
    ) => {
      stopActiveRunners();
      setLogs([]);
      setPendingHtml(null);
      setJsonContent(null);
      setFilename(activeFilename);
      setSourceCode(code);
      setSourceOrigin(origin);

      const lower = activeFilename.toLowerCase();
      if (lower.endsWith(".py")) {
        runPython(code, extras);
        return;
      }

      if (lower.endsWith(".html") || lower.endsWith(".htm")) {
        setPendingHtml(code);
        appendLog("✓ HTML preview loaded inside a restricted iframe.");
        return;
      }

      if (lower.endsWith(".json")) {
        try {
          setJsonContent(JSON.stringify(JSON.parse(code), null, 2));
          appendLog("✓ JSON parsed successfully.");
        } catch {
          appendLog("❌ Invalid JSON.");
        }
        return;
      }

      const validation = validateJavaScript(code, {
        allowBrowserGlobals: origin === "coursework",
      });
      if (!validation.valid) {
        appendLog(
          `🚫 JavaScript blocked: ${validation.reason ?? "unsafe code detected"}`
        );
        return;
      }

      if (origin === "coursework") {
        appendLog(">_");
        runInSandboxedIframe(code);
      } else {
        runUploadedJavaScript(code);
      }
    },
    [appendLog, runPython, runUploadedJavaScript, setLogs, stopActiveRunners]
  );

  const loadCourseworkFile = useCallback(
    async (safeFile: string) => {
      try {
        const code = await fetchPlaygroundText(safeFile, { cacheBust: true });
        const lower = safeFile.toLowerCase();
        let extras: Record<string, string> | undefined;

        if (lower.endsWith(".py")) {
          const sidecars = await fetchSidecars(
            dirname(safeFile),
            detectSidecarNames(code),
            appendLog
          );
          extras = Object.fromEntries(
            sidecars.map((sidecar) => [sidecar.name, sidecar.content])
          );
        }

        executeCode(code, safeFile.split("/").at(-1) ?? safeFile, {
          origin: "coursework",
          extras,
        });
      } catch (error) {
        setLogs([]);
        appendLog(`❌ Unable to load coursework file: ${String(error)}`);
      }
    },
    [appendLog, executeCode, setLogs]
  );

  useEffect(() => {
    if (file && fileExists === true) {
      void loadCourseworkFile(file);
    }
  }, [file, fileExists, loadCourseworkFile]);

  useEffect(() => {
    if (!pendingHtml || !htmlPreviewContainerRef.current) return;
    runHtmlInSandboxedIframe(pendingHtml, "html-preview-container");
  }, [pendingHtml]);

  useEffect(
    () => () => {
      pythonWorkerRef.current?.terminate();
      javascriptWorkerRef.current?.terminate();
    },
    []
  );

  usePostMessageLogs(appendLog);

  const upload = useCallback(
    (code: string, name: string, extras?: Record<string, string>) => {
      const search = new URLSearchParams(location.search);
      search.delete("file");
      void navigate({
        pathname: location.pathname,
        search: search.toString(),
      });

      const safeExtras = extras ?? {};
      setUploadedExtras(safeExtras);
      executeCode(code, name, {
        origin: "upload",
        extras: safeExtras,
      });
    },
    [executeCode, location.pathname, location.search, navigate]
  );

  const runAgain = useCallback(() => {
    if (file && fileExists === true) {
      void loadCourseworkFile(file);
      return;
    }

    if (sourceCode && filename && sourceOrigin === "upload") {
      executeCode(sourceCode, filename, {
        origin: "upload",
        extras: uploadedExtras,
      });
      return;
    }

    appendLog("⚠️ Select a supported file before running the workspace.");
  }, [
    appendLog,
    executeCode,
    file,
    fileExists,
    filename,
    loadCourseworkFile,
    sourceCode,
    sourceOrigin,
    uploadedExtras,
  ]);

  const stop = useCallback(() => {
    stopActiveRunners();
    setPendingHtml(null);
    appendLog("■ Execution stopped. Loaded source remains available.");
  }, [appendLog, stopActiveRunners]);

  const reset = useCallback(() => {
    stopActiveRunners();
    setLogs([]);
    setFilename(null);
    setSourceCode(null);
    setSourceOrigin(null);
    setUploadedExtras({});
    setPendingHtml(null);
    setJsonContent(null);
  }, [setLogs, stopActiveRunners]);

  const submitConsoleInput = useCallback(
    (value: string) => {
      inputResolver?.(value);
      setInputResolver(null);
      setPendingPrompt(null);
    },
    [inputResolver]
  );

  return {
    file,
    rawFile,
    fileExists,
    filename,
    sourceCode,
    sourceOrigin,
    logs,
    pendingHtml,
    jsonContent,
    pendingPrompt,
    htmlPreviewContainerRef,
    isAwaitingInput: Boolean(inputResolver),
    upload,
    runAgain,
    stop,
    reset,
    clearOutput: () => setLogs([]),
    submitConsoleInput,
  };
}
