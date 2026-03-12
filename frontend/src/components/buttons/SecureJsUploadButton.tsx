import React, { useRef } from "react";
import { Upload } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";
import { JS_MAX_FILE_SIZE, validateJavaScript } from "@/utils/secureJavaScript";

type SecureJsUploadButtonProps = {
  onSafeUpload: (code: string, filename: string) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
};

export default function SecureJsUploadButton({
  onSafeUpload,
  label = "Upload .js file",
  icon,
  className = "",
  variant = "success",
  size = "sm",
  type = "button",
  disabled = false,
}: SecureJsUploadButtonProps) {
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

    if (!file.name.endsWith(".js") || file.size > JS_MAX_FILE_SIZE) {
      alert("⚠️ Invalid or too large JS file.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const code = reader.result as string;
      const result = validateJavaScript(code);
      if (!result.valid) {
        alert(
          `⚠️ File blocked: unsafe JavaScript patterns detected.\nReason: ${result.reason ?? "Unknown"}`
        );
        return;
      }
      onSafeUpload(code, file.name);
    };
    reader.onloadend = () => {
      if (inputRef.current) inputRef.current.value = "";
    };

    reader.readAsText(file);
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
        accept=".js"
        onChange={handleChange}
        hidden
      />
    </>
  );
}
