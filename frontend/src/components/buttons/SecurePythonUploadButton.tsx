import React, { useRef } from "react";
import { Upload } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type SecurePythonUploadButtonProps = {
  onSafeUpload: (code: string, filename: string) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
};

const MAX_FILE_SIZE = 50_000;
const MAX_LINE_COUNT = 1000;
const MAX_CODE_LENGTH = 15_000;

const forbiddenPatterns = [
  /\bimport\s+(os|sys|subprocess|shutil|socket|multiprocessing|threading|ctypes|resource|signal|js)\b/,
  /\b(eval|exec|compile|open|__import__)\s*\(/,
  /\bwhile\s+True\b/,
  /\bfor\s+\w+\s+in\s+range\s*\(\s*10{4,}/,
  /\bdel\s+\w+/,
  /\bsetattr\s*\(/,
  /\bgetattr\s*\(/,
];

// Cleaning and validating Python code
const sanitizeAndValidateCode = (
  code: string
): { valid: boolean; reason?: string; cleanedCode?: string } => {
  const cleanedCode = code
    .replace(/^\uFEFF/, "")
    .replace(/[^\x20-\x7E\r\n\t]+/g, "");
  if (!cleanedCode.trim())
    return { valid: false, reason: "Empty file or non-printable content." };
  if (cleanedCode.length > MAX_CODE_LENGTH)
    return { valid: false, reason: "Code too long" };

  const lines = cleanedCode.split("\n");
  if (lines.length > MAX_LINE_COUNT)
    return { valid: false, reason: "Too many lines" };

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(cleanedCode)) {
      return { valid: false, reason: `Forbidden pattern detected: ${pattern}` };
    }
  }

  return { valid: true, cleanedCode };
};

//  Checking for valid extensions and MIME types
const isValidPythonFile = (file: File): boolean => {
  return file.name.toLowerCase().endsWith(".py");
};

export default function SecurePythonUploadButton({
  onSafeUpload,
  label = "Upload .py file",
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
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidPythonFile(file)) {
      alert("🚫 Invalid file type. Only .py files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("⚠️ File too large. Max allowed size is 50KB.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const code = reader.result as string;
        const { valid, reason, cleanedCode } = sanitizeAndValidateCode(code);

        if (!valid) {
          alert(`🚫 Unsafe Python code blocked.\nReason: ${reason}`);
          return;
        }

        onSafeUpload(cleanedCode!, file.name);
      };

      reader.readAsText(file);
    } catch (err) {
      console.error("🐍 Python file load error:", err);
      alert("❌ Unexpected error while loading the Python file.");
    }
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
        onChange={handleChange}
        hidden
      />
    </>
  );
}
