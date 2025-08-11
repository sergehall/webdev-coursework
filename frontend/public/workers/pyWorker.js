// public/workers/pyWorker.js
// Classic Worker (not module). Pyodide runner with:
// - Live stdout/stderr streaming
// - input() via JS bridge (async)
// - Safe async transformation:
//   1) Seed async-set by functions containing input()
//   2) Propagate async up the call graph (functions calling async ones become async)
//   3) Add 'await' at call sites to any async function
//   4) Patch raw input(...) -> await __input__(...)
//   5) Wrap code in async __user_main__ and await it

importScripts("https://cdn.jsdelivr.net/pyodide/v0.28.1/full/pyodide.js");

let pyodide = null;
let nextInputId = 0;
const pendingInputs = new Map();

// ---------- JS <-> Python bridge ----------
function sendLog(s) {
  postMessage({ type: "log", text: String(s ?? "") });
}
function requestInput(promptText) {
  const id = ++nextInputId;
  return new Promise((resolve) => {
    pendingInputs.set(id, resolve);
    postMessage({ type: "input", id, prompt: String(promptText ?? "Input:") });
  });
}
function pyReport(kind, text) {
  postMessage({
    type: kind,
    [kind === "result" ? "result" : "error"]: String(text ?? ""),
  });
}
function indent4(src) {
  return String(src)
    .split("\n")
    .map((l) => "    " + l)
    .join("\n");
}

// ---------- Small parsing helpers (heuristic, line-based) ----------
function parseFunctions(code) {
  // Returns array of { name, indent, start, end, body }
  const lines = code.split("\n");
  const defs = [];
  const defRe = /^([ \t]*)def\s+([A-Za-z_]\w*)\s*\([^)]*\)\s*:\s*$/;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(defRe);
    if (!m) continue;
    const indent = m[1];
    const name = m[2];

    let j = i + 1;
    while (j < lines.length) {
      const l = lines[j];
      if (l.trim() === "") {
        j++;
        continue;
      }
      if (!l.startsWith(indent + "    ")) break; // dedent => body ends
      j++;
    }
    const body = lines.slice(i + 1, j).join("\n");
    defs.push({ name, indent, start: i, end: j - 1, body });
    i = j - 1;
  }
  return { lines, defs };
}

// Word boundary call regex builder (names already escaped)
function buildCallRegex(names) {
  if (!names.length) return null;
  const pat = names.join("|");
  // Match standalone NAME( — forbid method calls like obj.NAME(
  return new RegExp(`(^|[^.\\w])(${pat})\\s*\\(`, "g");
}

// Escape name for regex
function reEscape(s) {
  return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

// ---------- Async transform pipeline ----------
function transformToAsync(code) {
  const usesInputRe = /(^|[^.\w])input\s*\(/m;

  // 1) Parse functions
  const { lines, defs } = parseFunctions(code);

  // 2) Seed async set with functions containing input()
  const asyncSet = new Set();
  for (const d of defs) {
    if (usesInputRe.test(d.body)) asyncSet.add(d.name);
  }

  // 3) Propagate async upwards: if a function calls an async one, it becomes async too
  let changed = true;
  while (changed) {
    changed = false;
    const asyncNames = Array.from(asyncSet).map(reEscape);
    const callRe = buildCallRegex(asyncNames);
    if (!callRe) break;

    for (const d of defs) {
      if (asyncSet.has(d.name)) continue;
      // Check if body calls any async function
      callRe.lastIndex = 0;
      const body = d.body;
      let m;
      let callsAsync = false;
      while ((m = callRe.exec(body))) {
        const before = body.slice(Math.max(0, m.index - 80), m.index).trimEnd();
        // Skip 'def/async def/class' headers (shouldn't be in body anyway)
        const inHeader = /\b(async\s+def|def|class)\s*$/.test(before);
        const prevChar = body[m.index - 1] || "";
        const isMethod = prevChar === ".";
        if (!inHeader && !isMethod) {
          callsAsync = true;
          break;
        }
      }
      if (callsAsync) {
        asyncSet.add(d.name);
        changed = true;
      }
    }
  }

  // 4) Rewrite headers: def -> async def for all async functions
  let newLines = lines.slice();
  const defHeaderRe = /^([ \t]*)def\s+([A-Za-z_]\w*)\s*\(/;
  for (const d of defs) {
    if (asyncSet.has(d.name)) {
      const ln = lines[d.start];
      newLines[d.start] = ln.replace(defHeaderRe, "$1async def $2(");
    }
  }
  let newCode = newLines.join("\n");

  // 5) Add 'await' before call sites to async functions (global, but guarded)
  const asyncNamesEsc = Array.from(asyncSet).map(reEscape);
  const callReAll = buildCallRegex(asyncNamesEsc);
  if (callReAll) {
    let out = "";
    let i = 0;
    while (i < newCode.length) {
      callReAll.lastIndex = i;
      const m = callReAll.exec(newCode);
      if (!m) {
        out += newCode.slice(i);
        break;
      }
      const start = m.index + m[1].length; // skip the prefix group
      const name = m[2];
      out += newCode.slice(i, start);

      const prevChar = newCode[start - 1] || "";
      const before = newCode.slice(Math.max(0, start - 120), start).trimEnd();
      const isMethodCall = prevChar === ".";
      const inHeader = /\b(async\s+def|def|class)\s*$/.test(before);
      const alreadyAwaited = /\bawait\s+$/.test(before);

      if (!isMethodCall && !inHeader && !alreadyAwaited) {
        out += "await " + name;
      } else {
        out += name;
      }
      i = start + name.length;
    }
    newCode = out;
  }

  // 6) Patch raw input(...) to await __input__(...)
  newCode = newCode.replace(/(^|[^.\w])input\s*\(/g, "$1await __input__(");

  return { code: newCode, asyncFunctionNames: Array.from(asyncSet) };
}

// ---------- Build Python prelude ----------
function buildPrelude(userCode) {
  const { code: patched } = transformToAsync(userCode);
  return `
import sys

class _LiveOut:
    def __init__(self):
        self._buf = ""
    def write(self, t):
        t = str(t)
        self._buf += t
        if "\\n" in t:
            from js import sendLog as _send
            _send(self._buf)
            self._buf = ""
    def flush(self):
        if self._buf:
            from js import sendLog as _send
            _send(self._buf)

sys.stdout = _LiveOut()
sys.stderr = sys.stdout

from js import requestInput as _req

async def __input__(prompt=""):
    v = await _req(prompt)
    return "" if v is None else str(v)

# Wrap all user code into async function
async def __user_main__():
${indent4(patched)}
`;
}

// ---------- Worker wiring ----------
self.onmessage = async (e) => {
  const { type, code, id, value } = e.data || {};

  if (type === "inputResponse" && pendingInputs.has(id)) {
    pendingInputs.get(id)(value);
    pendingInputs.delete(id);
    return;
  }

  if (type === "start") {
    try {
      if (!pyodide) {
        postMessage({ type: "log", text: "[worker] loading pyodide…" });
        pyodide = await loadPyodide({
          stdout: (s) => sendLog(s),
          stderr: (s) => sendLog(s),
        });
        postMessage({ type: "log", text: "[worker] pyodide loaded" });
      }

      // Expose JS helpers to Python globals (importable via 'from js import ...')
      pyodide.globals.set("sendLog", sendLog);
      pyodide.globals.set("requestInput", requestInput);
      pyodide.globals.set("pyReport", pyReport);

      try {
        await pyodide.loadPackagesFromImports(code);
      } catch (pkgErr) {
        postMessage({
          type: "log",
          text: "[worker] loadPackagesFromImports skipped: " + String(pkgErr),
        });
      }

      const prelude = buildPrelude(code);
      await pyodide.runPythonAsync(prelude);

      const kickoff = `
from js import pyReport as __report
import traceback, io
try:
    await __user_main__()
    __report("result", "")
except Exception:
    buf = io.StringIO()
    traceback.print_exc(file=buf)
    __report("error", buf.getvalue())
`;
      await pyodide.runPythonAsync(kickoff);
      await pyodide.runPythonAsync("import sys; sys.stdout.flush()");
    } catch (err) {
      postMessage({
        type: "error",
        error: "[worker] runtime error: " + (err?.message || String(err)),
      });
    }
  }
};
