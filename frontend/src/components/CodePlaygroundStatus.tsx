import {
  CircleCheck,
  FileCode2,
  FileWarning,
  LoaderCircle,
  UploadCloud,
} from "lucide-react";

import { getPlaygroundLanguage } from "@/features/playground/playground-security";
import type { PlaygroundSourceOrigin } from "@/hooks/usePlaygroundSession";
import { cn } from "@/utils/cn";

type CodePlaygroundStatusProps = {
  readonly file: string | null;
  readonly fileExists: boolean | null;
  readonly filename: string | null;
  readonly sourceOrigin: PlaygroundSourceOrigin;
};

export function CodePlaygroundStatus({
  file,
  fileExists,
  filename,
  sourceOrigin,
}: CodePlaygroundStatusProps) {
  const isInvalid = Boolean(file) && fileExists === false;
  const isChecking = Boolean(file) && fileExists === null;
  const isReady = Boolean(filename);

  const state = isInvalid
    ? {
        label: "File unavailable",
        detail: file?.split("/").at(-1) ?? "Invalid path",
        icon: FileWarning,
        tone: "text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-200 dark:bg-rose-950/40 dark:border-rose-900",
      }
    : isChecking
      ? {
          label: "Validating project file",
          detail: file?.split("/").at(-1) ?? "Checking path",
          icon: LoaderCircle,
          tone: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-200 dark:bg-amber-950/40 dark:border-amber-900",
        }
      : isReady
        ? {
            label:
              sourceOrigin === "coursework"
                ? "Coursework file ready"
                : "Local upload ready",
            detail: filename ?? "",
            icon: CircleCheck,
            tone: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900",
          }
        : {
            label: "Workspace ready",
            detail: "Select a supported local file to begin",
            icon: UploadCloud,
            tone: "text-sky-700 bg-sky-50 border-sky-200 dark:text-sky-200 dark:bg-sky-950/40 dark:border-sky-900",
          };

  const Icon = state.icon;

  return (
    <div
      aria-live="polite"
      className={cn(
        "flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3",
        state.tone
      )}
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-current/10">
        <Icon
          className={cn("h-5 w-5", isChecking && "animate-spin")}
          aria-hidden="true"
        />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-black">{state.label}</span>
        <span className="mt-0.5 block truncate text-xs font-semibold opacity-80">
          {state.detail}
        </span>
      </span>
      {isReady && (
        <span className="ml-auto hidden rounded-full border border-current/20 px-2.5 py-1 text-xs font-bold sm:inline-flex">
          <FileCode2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
          {getPlaygroundLanguage(filename)}
        </span>
      )}
    </div>
  );
}
