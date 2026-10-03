import React, { useRef } from "react";
import { Upload } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

const MAX_JSON_FILE_SIZE = 100_000; // 100 KB

type SecureJsonUploadButtonProps = {
  onSafeUpload: (json: string, filename: string) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
};

export default function SecureJsonUploadButton({
  onSafeUpload,
  label = "Upload .json file",
  icon,
  className = "",
  variant = "secondary",
  size = "sm",
  type = "button",
  disabled = false,
}: SecureJsonUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const finalIcon = icon ?? <Upload size={16} />;

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      alert("🚫 Only .json files are allowed.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (file.size > MAX_JSON_FILE_SIZE) {
      alert("⚠️ File too large. Max size is 100 KB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const raw = String(reader.result ?? "");
      try {
        // Validate it is actually parseable JSON
        JSON.parse(raw);
      } catch {
        alert("❌ Invalid JSON — file could not be parsed.");
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      onSafeUpload(raw, file.name);
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
        accept=".json"
        onChange={handleChange}
        hidden
      />
    </>
  );
}
