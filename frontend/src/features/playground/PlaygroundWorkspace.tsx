import {
  Braces,
  Code2,
  FileJson2,
  FileText,
  LockKeyhole,
  Play,
  RotateCcw,
  ShieldCheck,
  Square,
  TerminalSquare,
  TimerReset,
  Trash2,
  Upload,
  WifiOff,
} from "lucide-react";
import type { ReactNode, RefObject } from "react";

import { CodePlaygroundStatus } from "@/components/CodePlaygroundStatus";
import { ConsoleOutput } from "@/components/ConsoleOutput";
import {
  SecureHtmlUploadButton,
  SecureJsUploadButton,
  SecureJsonUploadButton,
  SecurePythonUploadButton,
} from "@/components/buttons";
import { getPlaygroundLanguage } from "@/features/playground/playground-security";
import type { PlaygroundSourceOrigin } from "@/hooks/usePlaygroundSession";

type PlaygroundWorkspaceProps = {
  readonly file: string | null;
  readonly rawFile: string | null;
  readonly fileExists: boolean | null;
  readonly filename: string | null;
  readonly sourceCode: string | null;
  readonly sourceOrigin: PlaygroundSourceOrigin;
  readonly logs: string[];
  readonly pendingHtml: string | null;
  readonly jsonContent: string | null;
  readonly pendingPrompt: string | null;
  readonly isAwaitingInput: boolean;
  readonly htmlPreviewContainerRef: RefObject<HTMLDivElement | null>;
  readonly onUpload: (
    code: string,
    filename: string,
    extras?: Record<string, string>
  ) => void;
  readonly onRunAgain: () => void;
  readonly onStop: () => void;
  readonly onReset: () => void;
  readonly onClearOutput: () => void;
  readonly onConsoleInput: (value: string) => void;
};

const uploadButtonClass =
  "!min-h-11 !w-full !justify-start !rounded-xl !border !border-slate-200 !bg-white/80 !px-3 !py-2.5 !text-sm !font-bold !text-slate-800 !shadow-sm transition hover:!-translate-y-0.5 hover:!border-cyan-300 hover:!bg-cyan-50 focus:!outline-none focus-visible:!ring-2 focus-visible:!ring-cyan-400 motion-reduce:!transform-none dark:!border-slate-700 dark:!bg-slate-950/60 dark:!text-slate-100 dark:hover:!border-cyan-700 dark:hover:!bg-slate-900";

const securityBoundaries = [
  {
    title: "Isolated execution",
    detail: "Disposable Workers and opaque-origin iframes",
    icon: LockKeyhole,
  },
  {
    title: "Network restricted",
    detail: "HTML and JavaScript preview requests are blocked",
    icon: WifiOff,
  },
  {
    title: "Bounded runtime",
    detail: "Timeouts, file limits, and capped console output",
    icon: TimerReset,
  },
] as const;

function ActionButton({
  label,
  icon,
  onClick,
  primary = false,
}: {
  readonly label: string;
  readonly icon: ReactNode;
  readonly onClick: () => void;
  readonly primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        primary
          ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 motion-reduce:transform-none dark:ring-offset-slate-950"
          : "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 motion-reduce:transform-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:ring-offset-slate-950 dark:hover:border-cyan-700 dark:hover:bg-slate-900"
      }
    >
      {icon}
      {label}
    </button>
  );
}

export default function PlaygroundWorkspace({
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
  isAwaitingInput,
  htmlPreviewContainerRef,
  onUpload,
  onRunAgain,
  onStop,
  onReset,
  onClearOutput,
  onConsoleInput,
}: PlaygroundWorkspaceProps) {
  return (
    <section
      aria-labelledby="workspace-title"
      className="rounded-3xl border border-slate-200/80 bg-white/60 p-4 shadow-sm sm:p-6 dark:border-slate-700/80 dark:bg-slate-900/45"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.14em] text-cyan-700 uppercase dark:text-cyan-300">
            Interactive workspace
          </p>
          <h2
            id="workspace-title"
            className="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-white"
          >
            Select a file and inspect its behavior
          </h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Project-linked exercises load from the read-only coursework archive.
            Local uploads remain in this browser session and are never sent to
            the application backend.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Client-side execution
        </span>
      </div>

      <div className="mt-6 grid items-start gap-5 xl:grid-cols-[21rem_minmax(0,1fr)]">
        <aside className="space-y-4">
          <CodePlaygroundStatus
            file={file ?? rawFile}
            fileExists={fileExists}
            filename={filename}
            sourceOrigin={sourceOrigin}
          />

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/55">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-cyan-500" aria-hidden="true" />
              <h3 className="text-sm font-black text-slate-950 dark:text-white">
                Open a local file
              </h3>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Files are validated before the runtime starts.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <SecureJsUploadButton
                onSafeUpload={onUpload}
                label="JavaScript"
                icon={<Code2 className="h-4 w-4" aria-hidden="true" />}
                variant="neutral"
                size="md"
                className={uploadButtonClass}
              />
              <SecurePythonUploadButton
                onSafeUpload={onUpload}
                label="Python"
                icon={<TerminalSquare className="h-4 w-4" aria-hidden="true" />}
                variant="neutral"
                size="md"
                className={uploadButtonClass}
              />
              <SecureHtmlUploadButton
                onSafeUpload={onUpload}
                label="HTML"
                icon={<Braces className="h-4 w-4" aria-hidden="true" />}
                variant="neutral"
                size="md"
                className={uploadButtonClass}
              />
              <SecureJsonUploadButton
                onSafeUpload={onUpload}
                label="JSON"
                icon={<FileJson2 className="h-4 w-4" aria-hidden="true" />}
                variant="neutral"
                size="md"
                className={uploadButtonClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <ActionButton
              label="Run again"
              icon={<Play className="h-4 w-4" aria-hidden="true" />}
              onClick={onRunAgain}
              primary
            />
            <ActionButton
              label="Stop"
              icon={<Square className="h-4 w-4" aria-hidden="true" />}
              onClick={onStop}
            />
            <ActionButton
              label="Clear output"
              icon={<Trash2 className="h-4 w-4" aria-hidden="true" />}
              onClick={onClearOutput}
            />
            <ActionButton
              label="Reset"
              icon={<RotateCcw className="h-4 w-4" aria-hidden="true" />}
              onClick={onReset}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950/[0.03] p-4 dark:border-slate-700 dark:bg-slate-950/55">
            <h3 className="text-xs font-black tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400">
              Security boundaries
            </h3>
            <ul className="mt-3 space-y-3">
              {securityBoundaries.map(({ title, detail, icon: Icon }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-black text-slate-800 dark:text-slate-100">
                      {title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="min-w-0 space-y-4">
          <section
            aria-labelledby="source-title"
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm dark:border-slate-700 dark:bg-slate-950/55"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText
                  className="h-4 w-4 text-violet-500"
                  aria-hidden="true"
                />
                <h3
                  id="source-title"
                  className="text-sm font-black text-slate-950 dark:text-white"
                >
                  Loaded source
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {getPlaygroundLanguage(filename)}
              </span>
            </div>

            {sourceCode ? (
              <pre className="max-h-72 overflow-auto bg-slate-950 p-4 text-xs leading-6 text-slate-200">
                <code>{sourceCode}</code>
              </pre>
            ) : (
              <div className="flex min-h-40 flex-col items-center justify-center px-5 py-8 text-center">
                <Code2 className="h-7 w-7 text-slate-400" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-200">
                  No source loaded
                </p>
                <p className="mt-1 max-w-md text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Open a supported local file or launch an exercise from a
                  coursework module.
                </p>
              </div>
            )}
          </section>

          <section aria-labelledby="runtime-output-title">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <TerminalSquare
                  className="h-4 w-4 text-cyan-500"
                  aria-hidden="true"
                />
                <h3
                  id="runtime-output-title"
                  className="text-sm font-black text-slate-950 dark:text-white"
                >
                  {pendingHtml ? "HTML preview" : "Runtime output"}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {logs.length} console {logs.length === 1 ? "entry" : "entries"}
              </span>
            </div>

            {pendingHtml ? (
              <div
                id="html-preview-container"
                ref={htmlPreviewContainerRef}
                className="min-h-[34rem] overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm dark:border-slate-700"
              />
            ) : jsonContent ? (
              <pre className="max-h-[34rem] min-h-64 overflow-auto rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-emerald-200 shadow-sm">
                <code>{jsonContent}</code>
              </pre>
            ) : (
              <ConsoleOutput
                logs={logs}
                onInput={isAwaitingInput ? onConsoleInput : undefined}
                awaitingPrompt={pendingPrompt ?? undefined}
              />
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
