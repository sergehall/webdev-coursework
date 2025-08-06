// src/components/CodePlaygroundControls.tsx

import {
  ClearConsoleButton,
  RunAgainButton,
  SecureJsUploadButton,
} from "@/components/buttons";

interface Props {
  onClear: () => void;
  onRunAgain: () => void;
  onUpload: (code: string, name: string) => void;
  showRunAgain: boolean;
}

export function CodePlaygroundControls({
  onClear,
  onRunAgain,
  onUpload,
  showRunAgain,
}: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <ClearConsoleButton onClear={onClear} />

      <SecureJsUploadButton onSafeUpload={onUpload} />

      {showRunAgain && <RunAgainButton onRunAgain={onRunAgain} />}
    </div>
  );
}
