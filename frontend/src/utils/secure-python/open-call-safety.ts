import {
  SAFE_OPEN_FILES,
  SAFE_OPEN_MODES,
  SAFE_OPEN_WRAPPERS,
} from "@/utils/secure-python/constants";
import {
  findWrapperRanges,
  inRanges,
  isAllowedFilename,
  isMode,
} from "@/utils/secure-python/helpers";

/** open()/Path.open() check:
 *  - Only allowlisted files
 *  - Only read text modes ("r"/"rt")
 *  - Allow mode-first only inside trusted wrappers
 *  - Builtin open(...) must use a literal filename as the first argument
 *  Implementation note: explicitly skip method calls when matching builtin `open(...)`.
 */
export function hasOnlySafeOpenCalls(code: string): {
  ok: boolean;
  reason?: string;
} {
  const wrapperRanges = findWrapperRanges(code, SAFE_OPEN_WRAPPERS);

  // 1) builtin open("literal", "mode"?) — explicit literals
  const literalRe = /\bopen\s*\(\s*(['"])(.*?)\1\s*(?:,\s*(['"])(.*?)\3)?/g;
  let m: RegExpExecArray | null;

  while ((m = literalRe.exec(code))) {
    // Skip ".open(" — handled by method branches
    if (m.index > 0 && code[m.index - 1] === ".") continue;

    const rawPath = m[2] || "";
    const mode = (m[4] || "r").toLowerCase();

    if (!isAllowedFilename(rawPath)) {
      return {
        ok: false,
        reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
      };
    }
    if (!SAFE_OPEN_MODES.has(mode)) {
      return {
        ok: false,
        reason: `Only read text modes allowed ("r"/"rt"). Got: "${mode}"`,
      };
    }
  }

  // 2) builtin open(<expr>) — try to extract a literal from the first arg
  const openExprRe = /\bopen\s*\(\s*([^)]+?)\)/g;
  while ((m = openExprRe.exec(code))) {
    // Skip ".open(" — method call, not builtin
    if (m.index > 0 && code[m.index - 1] === ".") continue;

    const args = m[1];
    const firstArg = args.split(",")[0]?.trim() ?? "";
    const quoted = [...firstArg.matchAll(/(['"])(.*?)\1/g)].map((t) => t[2]);

    if (quoted.length > 0) {
      const last = quoted[quoted.length - 1];
      if (!isAllowedFilename(last)) {
        return {
          ok: false,
          reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
        };
      }
    } else {
      return {
        ok: false,
        reason: `First argument of open() must contain a literal filename.`,
      };
    }
  }

  // 3) method .open("...", "mode"?) — explicit literals in method calls
  const methodLiteralRe =
    /\.open\s*\(\s*(['"])(.*?)\1\s*(?:,\s*(['"])(.*?)\3)?/g;
  while ((m = methodLiteralRe.exec(code))) {
    const matchIdx = m.index;
    const rawPath = m[2] || "";
    const mode = (m[4] || "r").toLowerCase();

    // Inside a trusted wrapper, the first arg may be mode ("r"/"rt")
    if (inRanges(matchIdx, wrapperRanges) && isMode(rawPath)) {
      if (!SAFE_OPEN_MODES.has(rawPath.toLowerCase())) {
        return {
          ok: false,
          reason: `Only read text modes allowed in wrappers.`,
        };
      }
      continue;
    }

    if (!isAllowedFilename(rawPath)) {
      return {
        ok: false,
        reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
      };
    }
    if (!SAFE_OPEN_MODES.has(mode)) {
      return {
        ok: false,
        reason: `Only read text modes allowed ("r"/"rt"). Got: "${mode}"`,
      };
    }
  }

  // 4) method .open(<expr>) — if first arg is mode inside a wrapper, allow it; else require literal path
  const methodExprRe = /\.open\s*\(\s*([^)]+?)\)/g;
  while ((m = methodExprRe.exec(code))) {
    const matchIdx = m.index;
    const args = m[1];
    const firstArg = args.split(",")[0]?.trim() ?? "";

    if (inRanges(matchIdx, wrapperRanges)) {
      const unquoted = firstArg.replace(/^['"]|['"]$/g, "");
      if (isMode(unquoted)) {
        // mode-first inside a trusted wrapper — allowed
        continue;
      }
      // otherwise fall through and treat as path
    }

    const quoted = [...firstArg.matchAll(/(['"])(.*?)\1/g)].map((t) => t[2]);
    if (quoted.length > 0) {
      const last = quoted[quoted.length - 1];
      if (!isAllowedFilename(last)) {
        return {
          ok: false,
          reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
        };
      }
    } else {
      return {
        ok: false,
        reason: `First argument of .open() must contain a literal filename.`,
      };
    }
  }

  // 5) Explicit wrapper calls: _open_data("house.tab")
  const wrapperRe = new RegExp(
    String.raw`\b(${Array.from(SAFE_OPEN_WRAPPERS).join("|")})\s*\(\s*(['"])(.*?)\2`,
    "g"
  );
  while ((m = wrapperRe.exec(code))) {
    const rawPath = m[3] || "";
    if (!isAllowedFilename(rawPath)) {
      return {
        ok: false,
        reason: `Only these files are allowed: ${Array.from(SAFE_OPEN_FILES).join(", ")}`,
      };
    }
  }

  return { ok: true };
}
