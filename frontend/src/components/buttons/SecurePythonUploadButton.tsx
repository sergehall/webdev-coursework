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
  onSafeUpload: (code: string, filename: string) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
};

function SecurePythonUploadButton({
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
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidPythonFile(file)) {
      alert("🚫 Invalid file type. Only .py files are allowed.");
      // reset
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("⚠️ File too large. Max allowed size is 50KB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const code = String(reader.result ?? "");
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
    } finally {
      if (inputRef.current) inputRef.current.value = "";
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

export default SecurePythonUploadButton;
