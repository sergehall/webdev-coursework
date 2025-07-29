// src/components/buttons/DownloadHtmlButton.tsx
import type { ReactNode } from "react";
import { Download } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { Variants } from "@/components/buttons/types/variants";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";

type DownloadHtmlButtonProps = {
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

const DownloadHtmlButton = ({
  fileUrl,
  filename = "download.html",
  label = "Download HTML",
  icon,
  size = "sm",
  variant = "gray",
  type = "button",
  disabled = false,
  className = "",
}: DownloadHtmlButtonProps) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link); // Firefox support
    link.click();
    document.body.removeChild(link);
  };

  const finalIcon = icon ?? <Download size={16} />;

  const buttonClass = ColoredButton({ variant, className });

  return (
    <BaseButton
      onClick={handleDownload}
      disabled={disabled}
      icon={finalIcon}
      size={size}
      type={type}
      className={buttonClass}
      title={label}
      aria-label={label}
    >
      {label}
    </BaseButton>
  );
};

export default DownloadHtmlButton;
