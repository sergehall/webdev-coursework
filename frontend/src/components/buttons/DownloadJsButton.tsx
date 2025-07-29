// src/components/buttons/DownloadJsButton.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import { Download } from "lucide-react";
import * as esprima from "esprima";
import * as estraverse from "estraverse";

import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";
import { BaseButton, ColoredButton } from "@/components/buttons";

type DownloadJsButtonProps = {
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

const isSafeJavaScript = (code: string): boolean => {
  try {
    const ast = esprima.parseScript(code);
    let isSafe = true;

    estraverse.traverse(ast, {
      enter(node) {
        if (
          node.type === "CallExpression" &&
          node.callee &&
          ((node.callee.type === "Identifier" &&
            ["eval", "Function"].includes(node.callee.name)) ||
            (node.callee.type === "MemberExpression" &&
              node.callee.property.type === "Identifier" &&
              ["write", "assign", "replace"].includes(
                node.callee.property.name
              )))
        ) {
          isSafe = false;
        }

        if (
          node.type === "AssignmentExpression" &&
          node.left.type === "MemberExpression" &&
          node.left.property.type === "Identifier" &&
          ["innerHTML", "outerHTML"].includes(node.left.property.name)
        ) {
          isSafe = false;
        }
      },
    });

    return isSafe;
  } catch (error) {
    console.error("Parsing error:", error);
    return false;
  }
};

const DownloadJsButton = ({
  fileUrl,
  filename = "script.js",
  label = "Download JS",
  icon,
  size = "sm",
  variant = "indigo",
  type = "button",
  disabled = false,
  className = "",
}: DownloadJsButtonProps) => {
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

      if (!isSafeJavaScript(content)) {
        alert("Download blocked: JavaScript code contains unsafe patterns.");
        return;
      }

      const blob = new Blob([content], { type: "application/javascript" });
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

export default DownloadJsButton;
