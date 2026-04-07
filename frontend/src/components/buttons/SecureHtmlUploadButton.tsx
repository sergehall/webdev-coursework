import React, { useRef } from "react";
import { Upload } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

const MAX_HTML_FILE_SIZE = 200_000; // 200 KB

type SecureHtmlUploadButtonProps = {
  onSafeUpload: (html: string, filename: string) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
};

export default function SecureHtmlUploadButton({
  onSafeUpload,
  label = "Upload .html file",
  icon,
  className = "",
  variant = "warning",
  size = "sm",
  type = "button",
  disabled = false,
}: SecureHtmlUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const finalIcon = icon ?? <Upload size={16} />;

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      !file.name.toLowerCase().endsWith(".html") &&
      !file.name.toLowerCase().endsWith(".htm")
    ) {
      alert("🚫 Only .html / .htm files are allowed.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (file.size > MAX_HTML_FILE_SIZE) {
      alert("⚠️ File too large. Max size is 200 KB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const html = String(reader.result ?? "");
      onSafeUpload(html, file.name);
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
        accept=".html,.htm"
        onChange={handleChange}
        hidden
      />
    </>
  );
}
