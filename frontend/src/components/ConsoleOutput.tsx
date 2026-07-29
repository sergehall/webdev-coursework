import React, { useEffect, useMemo, useRef, useState } from "react";
import { TerminalSquare } from "lucide-react";

type Props = {
  logs: string[];
  onInput?: (value: string) => void; // when present, show input bar
  awaitingPrompt?: string; // prompt text from worker
};

export function ConsoleOutput({ logs, onInput, awaitingPrompt }: Props) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");

  // Join logs into a single pre block and drop empty/whitespace-only lines
  const joined = useMemo(() => {
    if (!logs.length) return "";
    const lines: string[] = [];
    for (const chunk of logs) {
      // Normalize chunk into lines
      const parts = String(chunk ?? "").split(/\r?\n/);
      for (const line of parts) {
        if (line.trim() === "") continue; // skip empty lines
        lines.push(line);
      }
    }
    return lines.join("\n");
  }, [logs]);

  // Auto-scroll to bottom on new output or prompt
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [joined, awaitingPrompt]);

  // Autofocus input when awaiting user input
  useEffect(() => {
    if (onInput && inputRef.current) inputRef.current.focus();
  }, [onInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onInput) return;
    const v = value;
    setValue("");
    onInput(v);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700 bg-[#050914] text-slate-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="ml-2 text-xs font-bold tracking-wide text-slate-400 uppercase">
            Browser sandbox
          </span>
        </div>
        <TerminalSquare className="h-4 w-4 text-cyan-400" aria-hidden="true" />
      </div>

      <div
        ref={listRef}
        className="max-h-[34rem] min-h-64 w-full overflow-auto p-4 font-mono text-sm leading-7"
        aria-live="polite"
        aria-label="Playground console output"
      >
        {joined ? (
          <pre className="break-words whitespace-pre-wrap">{joined}</pre>
        ) : (
          <div className="flex min-h-48 flex-col items-center justify-center text-center">
            <TerminalSquare
              className="h-7 w-7 text-slate-600"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-bold text-slate-400">
              Console is ready
            </p>
            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-600">
              Runtime messages and errors will appear here after a file is
              loaded.
            </p>
          </div>
        )}
      </div>

      {onInput && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center gap-2 border-t border-slate-800 bg-slate-950 p-3"
        >
          <span className="font-mono text-xs text-slate-400 select-none">
            {awaitingPrompt || "Input:"}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-w-40 flex-1 rounded-lg border border-slate-700 bg-black px-3 py-2 font-mono text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
            placeholder="Type a value and press Enter"
            autoComplete="off"
            aria-label={awaitingPrompt || "Console input"}
          />
          <button
            type="submit"
            className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}
