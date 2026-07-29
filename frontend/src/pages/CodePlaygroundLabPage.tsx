import PlaygroundHero from "@/features/playground/PlaygroundHero";
import PlaygroundWorkspace from "@/features/playground/PlaygroundWorkspace";
import { usePlaygroundSession } from "@/hooks/usePlaygroundSession";

export default function CodePlaygroundPage() {
  const session = usePlaygroundSession();

  return (
    <div className="relative min-h-full overflow-x-hidden px-2 pt-1 pb-3 sm:pt-2 sm:pb-4">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-5">
        <PlaygroundHero />
        <PlaygroundWorkspace
          file={session.file}
          rawFile={session.rawFile}
          fileExists={session.fileExists}
          filename={session.filename}
          sourceCode={session.sourceCode}
          sourceOrigin={session.sourceOrigin}
          logs={session.logs}
          pendingHtml={session.pendingHtml}
          jsonContent={session.jsonContent}
          pendingPrompt={session.pendingPrompt}
          isAwaitingInput={session.isAwaitingInput}
          htmlPreviewContainerRef={session.htmlPreviewContainerRef}
          onUpload={session.upload}
          onRunAgain={session.runAgain}
          onStop={session.stop}
          onReset={session.reset}
          onClearOutput={session.clearOutput}
          onConsoleInput={session.submitConsoleInput}
        />
      </div>
    </div>
  );
}
