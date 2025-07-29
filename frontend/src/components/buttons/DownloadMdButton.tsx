// src/components/buttons/DownloadMdButton.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import { Download } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { Variants } from "@/components/buttons/types/variants";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";

type DownloadMdButtonProps = {
  fileUrl: string;
  filename?: string;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  disabled?: boolean;
  className?: string;
};

const isSafeMarkdown = (content: string): boolean => {
  const forbiddenTags = ["<script", "<iframe", "<object", "<embed"];
  return !forbiddenTags.some((tag) => content.toLowerCase().includes(tag));
};

const DownloadMdButton = ({
  fileUrl,
  filename = "README.md",
  label = "Download MD",
  icon,
  size = "sm",
  variant = "slate",
  type = "button",
  disabled = false,
  className = "",
}: DownloadMdButtonProps) => {
  const [loading, setLoading] = useState(false);

  const checkResponse = (response: Response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch(fileUrl);
      checkResponse(response);

      const content = await response.text();

      if (!isSafeMarkdown(content)) {
        alert("Download blocked: Markdown contains potentially unsafe HTML.");
        return;
      }

      const blob = new Blob([content], { type: "text/markdown" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.rel = "noopener";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      alert("Error downloading file: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const finalIcon = icon ?? <Download size={16} />;

  const buttonClass = ColoredButton({
    variant,
    className: `px-4 py-2 rounded ${className}`,
  });

  return (
    <BaseButton
      onClick={() => void handleDownload()}
      disabled={disabled || loading}
      icon={finalIcon}
      size={size}
      type={type}
      className={buttonClass}
      title={label}
      aria-label={label}
    >
      {loading ? "Checking..." : label}
    </BaseButton>
  );
};

export default DownloadMdButton;
