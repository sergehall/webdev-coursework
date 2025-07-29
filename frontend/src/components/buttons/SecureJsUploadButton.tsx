// src/components/buttons/SecureJsUploadButton.tsx
import * as esprima from "esprima";
import * as estraverse from "estraverse";
import React, { useRef } from "react";
import { Upload } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

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

// --- JavaScript security validator ---
const isSafeJavaScript = (code: string): boolean => {
  try {
    const ast = esprima.parseScript(code);
    let isSafe = true;

    estraverse.traverse(ast, {
      enter(node) {
        const isCall = (name: string) =>
          node.type === "CallExpression" &&
          node.callee.type === "Identifier" &&
          node.callee.name === name;

        const isUnsafeMember =
          node.type === "CallExpression" &&
          node.callee.type === "MemberExpression" &&
          node.callee.property.type === "Identifier" &&
          ["write", "assign", "replace", "open"].includes(
            node.callee.property.name
          );

        const isAssignmentToDangerousHTML =
          node.type === "AssignmentExpression" &&
          node.left.type === "MemberExpression" &&
          node.left.property.type === "Identifier" &&
          ["innerHTML", "outerHTML"].includes(node.left.property.name);

        if (
          isCall("eval") ||
          isCall("Function") ||
          isCall("setTimeout") ||
          isCall("setInterval") ||
          isUnsafeMember ||
          isAssignmentToDangerousHTML ||
          (node.type === "NewExpression" &&
            node.callee.type === "Identifier" &&
            node.callee.name === "Function") ||
          [
            "ImportDeclaration",
            "ExportNamedDeclaration",
            "ExportDefaultDeclaration",
          ].includes(node.type) ||
          node.type === "WithStatement" ||
          (node.type === "Identifier" &&
            ["window", "document", "globalThis", "self"].includes(node.name)) ||
          (node.type === "WhileStatement" &&
            node.test.type === "Literal" &&
            node.test.value === true) ||
          (node.type === "ForStatement" && node.test === null)
        ) {
          isSafe = false;
        }
      },
    });

    return isSafe;
  } catch (err) {
    console.error("JS parse error:", err);
    return false;
  }
};

export default function SecureJsUploadButton({
  onSafeUpload,
  label = "Upload JS File",
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

    if (file.size > 50_000) {
      alert("⚠️ File too large. Max allowed size is 50KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const code = reader.result as string;

      if (!isSafeJavaScript(code)) {
        alert("⚠️ File blocked: unsafe JavaScript patterns detected.");
        return;
      }

      onSafeUpload(code, file.name);
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
