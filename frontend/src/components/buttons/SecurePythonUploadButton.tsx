import React, { useRef } from "react";
import { Upload } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";
import {
  sanitizeAndValidateCode,
  isValidPythonFile,
  MAX_FILE_SIZE,
} from "@/utils/securePython";

type SecurePythonUploadButtonProps = {
  // extras: validated sidecar module content keyed by filename (e.g. "A05ClassPrH.py")
  onSafeUpload: (
    code: string,
    filename: string,
    extras?: Record<string, string>
  ) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
};

/** Read a File as text via FileReader — returns a Promise<string>. */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/**
 * Determine which file is the "main" entry point among multiple .py files.
 * Preference: file that contains `if __name__ == "__main__"`.
 * Fallback: first file in the list.
 */
function detectMainIndex(codes: string[]): number {
  const idx = codes.findIndex((c) =>
    /if\s+__name__\s*==\s*["']__main__["']/.test(c)
  );
  return idx >= 0 ? idx : 0;
}

function SecurePythonUploadButton({
  onSafeUpload,
  label = "Upload .py file(s)",
  icon,
  className = "",
  variant = "blue",
  size = "sm",
  type = "button",
  disabled = false,
}: SecurePythonUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const finalIcon = icon ?? <Upload size={16} />;

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    // Validate extension + size for every selected file
    for (const file of files) {
      if (!isValidPythonFile(file)) {
        alert(`🚫 Invalid file: "${file.name}". Only .py files are allowed.`);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`⚠️ File too large: "${file.name}". Max allowed size is 50KB.`);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
    }

    void (async () => {
      try {
        // Read all files in parallel
        const rawCodes = await Promise.all(files.map(readFileAsText));

        // Build the set of all uploaded module names so each file
        // may import from the other uploaded files.
        const uploadedModuleNames = new Set(
          files.map((f) => f.name.replace(/\.py$/i, "").toLowerCase())
        );

        // Validate each file through the security pipeline
        const validated: Array<{ name: string; code: string }> = [];
        for (let i = 0; i < files.length; i++) {
          const { valid, reason, cleanedCode } = sanitizeAndValidateCode(
            rawCodes[i],
            uploadedModuleNames
          );
          if (!valid || !cleanedCode) {
            alert(
              `🚫 Unsafe Python code blocked in "${files[i].name}".\nReason: ${reason}`
            );
            if (inputRef.current) inputRef.current.value = "";
            return;
          }
          validated.push({ name: files[i].name, code: cleanedCode });
        }

        // Detect main vs sidecars
        const mainIdx = detectMainIndex(validated.map((v) => v.code));
        const main = validated[mainIdx];
        const extras: Record<string, string> = {};
        for (let i = 0; i < validated.length; i++) {
          if (i !== mainIdx) extras[validated[i].name] = validated[i].code;
        }

        onSafeUpload(
          main.code,
          main.name,
          Object.keys(extras).length ? extras : undefined
        );
      } catch (err) {
        console.error("🐍 Python file load error:", err);
        alert("❌ Unexpected error while loading the Python file(s).");
      } finally {
        if (inputRef.current) inputRef.current.value = "";
      }
    })();
  };

  const colorClass = ColoredButton({ variant, className });

  return (
    <>
      <BaseButton
        onClick={handleClick}
        icon={finalIcon}
        size={size}
        type={type}
        disabled={disabled}
        className={colorClass}
        title={label}
        aria-label={label}
      >
        {label}
      </BaseButton>
      <input
        ref={inputRef}
        type="file"
        accept=".py"
        multiple
        onChange={handleChange}
        hidden
      />
    </>
  );
}

export default SecurePythonUploadButton;
