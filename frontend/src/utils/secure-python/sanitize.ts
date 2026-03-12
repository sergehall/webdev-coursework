import {
  MAX_CODE_LENGTH,
  MAX_LINE_COUNT,
  type ValidateResult,
} from "@/utils/secure-python/constants";
import { hasOnlySafeImports } from "@/utils/secure-python/import-safety";
import { hasOnlySafeOpenCalls } from "@/utils/secure-python/open-call-safety";

/** Sanitize and validate Python code */
export function sanitizeAndValidateCode(code: string): ValidateResult {
  const cleanedCode = code
    .replace(/^\uFEFF/, "")
    .replace(/[^\x20-\x7E\r\n\t]+/g, "");
  if (!cleanedCode.trim())
    return { valid: false, reason: "Empty file or non-printable content." };
  if (cleanedCode.length > MAX_CODE_LENGTH)
    return { valid: false, reason: "Code too long." };

  const lines = cleanedCode.split("\n");
  if (lines.length > MAX_LINE_COUNT)
    return { valid: false, reason: "Too many lines." };

  const imp = hasOnlySafeImports(cleanedCode);
  if (!imp.ok) return { valid: false, reason: imp.reason };

  const op = hasOnlySafeOpenCalls(cleanedCode);
  if (!op.ok) return { valid: false, reason: op.reason };

  return { valid: true, cleanedCode };
}

/** File extension check */
export const isValidPythonFile = (file: File): boolean =>
  file.name.toLowerCase().endsWith(".py");
