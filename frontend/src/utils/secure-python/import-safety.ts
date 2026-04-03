import {
  ALLOWED_LOCAL_MODULES,
  ALLOWED_LOCAL_MODULES_LC,
  ALLOWED_LOCAL_SYMBOLS,
  SAFE_IMPORTS_LC,
} from "@/utils/secure-python/constants";
import {
  baseModule,
  hasAlias,
  splitImportList,
} from "@/utils/secure-python/helpers";

/** Import check:
 *  - only allowlisted stdlib/local modules (no submodules), case-insensitive
 *  - disallow aliases in both `import` and `from ... import ...`
 *  - ban star-imports
 *  - for local modules, enforce per-symbol allowlist on from-imports
 */
export function hasOnlySafeImports(code: string): {
  ok: boolean;
  reason?: string;
} {
  const importRe = /^\s*import\s+([a-zA-Z0-9_., \t]+)$/gm;
  const fromImportRe =
    /^\s*from\s+([a-zA-Z0-9_.]+)\s+import\s+([a-zA-Z0-9_.*, \t]+)$/gm;

  let m: RegExpExecArray | null;

  // Plain "import X, Y"
  while ((m = importRe.exec(code))) {
    const rawItems = splitImportList(m[1]);
    // Disallow aliases in plain imports as well
    if (rawItems.some(hasAlias)) {
      return {
        ok: false,
        reason: "Aliases are not allowed in import statements (no 'as').",
      };
    }
    const names = rawItems.map(baseModule).filter(Boolean);
    for (const mod of names) {
      if (!(SAFE_IMPORTS_LC.has(mod) || ALLOWED_LOCAL_MODULES_LC.has(mod))) {
        return { ok: false, reason: `Forbidden import: ${mod}` };
      }
    }
  }

  // "from X import a, b"
  while ((m = fromImportRe.exec(code))) {
    const rawModule = m[1];
    const mod = baseModule(rawModule);
    if (!(SAFE_IMPORTS_LC.has(mod) || ALLOWED_LOCAL_MODULES_LC.has(mod))) {
      return { ok: false, reason: `Forbidden import: ${mod}` };
    }

    const items = splitImportList(m[2]);

    if (items.some((x) => x === "*" || x === "*,"))
      return {
        ok: false,
        reason: 'Star imports are not allowed ("from ... import *").',
      };

    if (items.some(hasAlias))
      return {
        ok: false,
        reason: "Aliases in from-import are not allowed (no 'as').",
      };

    // Per-symbol allowlist for local modules
    const originalModuleName = Array.from(ALLOWED_LOCAL_MODULES).find(
      (name) => name.toLowerCase() === rawModule.split(".")[0].toLowerCase()
    );
    if (originalModuleName && ALLOWED_LOCAL_SYMBOLS[originalModuleName]) {
      const allowed = ALLOWED_LOCAL_SYMBOLS[originalModuleName];
      for (const sym of items) {
        if (!allowed.has(sym)) {
          return {
            ok: false,
            reason: `Symbol not allowed from ${originalModuleName}: ${sym}`,
          };
        }
      }
    }
  }

  if (/\b(eval|exec|compile|__import__)\s*\(/.test(code)) {
    return { ok: false, reason: "Forbidden builtin call detected." };
  }

  // Block introspection builtins that allow sandbox escape by accessing
  // __builtins__ or the class hierarchy at runtime.
  if (/\b(getattr|setattr|delattr|hasattr)\s*\(/.test(code)) {
    return {
      ok: false,
      reason: "getattr/setattr/delattr/hasattr are not allowed.",
    };
  }

  if (/\b(globals|locals|vars|dir)\s*\(/.test(code)) {
    return {
      ok: false,
      reason: "globals()/locals()/vars()/dir() are not allowed.",
    };
  }

  if (/\bbreakpoint\s*\(/.test(code)) {
    return { ok: false, reason: "breakpoint() is not allowed." };
  }

  // Block dunder attribute access used in class-hierarchy escapes:
  //   ().__class__.__mro__[0].__subclasses__()
  //   ().__class__.__bases__[0].__subclasses__()
  //   func.__globals__["__builtins__"]
  if (
    /__(?:class|mro|bases|subclasses|init|globals|builtins|dict|qualname|module|code|func|closure|wrapped)__/.test(
      code
    )
  ) {
    return {
      ok: false,
      reason: "Dunder attribute access is not allowed.",
    };
  }

  return { ok: true };
}
