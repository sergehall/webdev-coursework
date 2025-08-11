// public/workers/pyWorker.js
// Classic Worker (not module). Pyodide runner with:
// - Live stdout/stderr streaming
// - async input() via JS bridge
// - Safe async transformation for user code:
//   1) Seed async-set by functions containing input() OR any `await`
//   2) Propagate async up the call graph (callers become async)
//   3) Add 'await' at call sites to async functions
//   4) Patch raw input(...) -> await __input__(...)
//   5) Wrap code in async __user_main__ and run via top-level await
//
// It also supports "sidecar" files sent from the host:
//   worker.postMessage({ type: "start", code, files: [{name, content}, ...] })
// These files are written into /project, and /project is added to sys.path,
// so "from A05ClassPrH import House, President" works if A05ClassPrH.py is provided.

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

// ---------- Small parsing helpers (heuristic, indentation-aware) ----------
function parseFunctions(code) {
  // Returns array of { name, indent, start, end, body }
  const lines = code.split("\n");
  const defs = [];
  const defRe = /^([ \t]*)def\s+([A-Za-z_]\w*)\s*\([^)]*\)\s*:\s*$/;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(defRe);
    if (!m) continue;

    const indent = m[1]; // whitespace before "def"
    const name = m[2];

    // Find first non-empty body line; its indent determines the block
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === "") j++;

    if (j >= lines.length) {
      defs.push({ name, indent, start: i, end: i, body: "" });
      break;
    }

    const firstBodyLine = lines[j];
    const bodyIndent = (firstBodyLine.match(/^([ \t]+)/) || ["", ""])[1];

    // If body is not properly indented, treat as empty body
    if (bodyIndent.length <= indent.length || !bodyIndent.startsWith(indent)) {
      defs.push({ name, indent, start: i, end: i, body: "" });
      continue;
    }

    // Consume until dedent to less than bodyIndent (non-empty lines only)
    let k = j;
    while (k < lines.length) {
      const l = lines[k];
      if (l.trim() === "") {
        k++;
        continue;
      }
      const lead = (l.match(/^([ \t]+)/) || ["", ""])[1];
      if (lead.length < bodyIndent.length || !lead.startsWith(indent)) break;
      k++;
    }

    const body = lines.slice(j, k).join("\n");
    defs.push({ name, indent, start: i, end: k - 1, body });
    i = k - 1;
  }
  return { lines, defs };
}

// Build a regex to match bare function calls NAME( (not obj.NAME())
function buildCallRegex(names) {
  if (!names.length) return null;
  const pat = names.join("|");
  return new RegExp(`(^|[^.\\w])(${pat})\\s*\\(`, "g");
}

// Escape for regex
function reEscape(s) {
  return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

// ---------- Async transform pipeline ----------
function transformToAsync(code) {
  const usesInputRe = /(^|[^.\w])input\s*\(/m;
  const usesAwaitRe = /\bawait\b/;

  // 1) Parse function blocks
  const { lines, defs } = parseFunctions(code);

  // 2) Seed async-set with functions containing input() OR await
  const asyncSet = new Set();
  for (const d of defs) {
    if (usesInputRe.test(d.body) || usesAwaitRe.test(d.body)) {
      asyncSet.add(d.name);
    }
  }

  // 3) Propagate async upwards (callers of async funcs become async)
  let changed = true;
  while (changed) {
    changed = false;
    const asyncNames = Array.from(asyncSet).map(reEscape);
    const callRe = buildCallRegex(asyncNames);
    if (!callRe) break;

    for (const d of defs) {
      if (asyncSet.has(d.name)) continue;

      callRe.lastIndex = 0;
      const body = d.body;
      let m;
      let callsAsync = false;
      while ((m = callRe.exec(body))) {
        const before = body.slice(Math.max(0, m.index - 80), m.index).trimEnd();
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

  // 5) Add 'await' before call sites to async functions (outside headers/method calls)
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

  // 6) Patch raw input(...) -> await __input__(...)
  newCode = newCode.replace(/(^|[^.\w])input\s*\(/g, "$1await __input__(");

  return { code: newCode, asyncFunctionNames: Array.from(asyncSet) };
}

// ---------- Build Python prelude (stdout piping, input bridge, /project setup) ----------
function buildPrelude(userCode) {
  const { code: patched } = transformToAsync(userCode);
  const safePatched = patched.endsWith("\n") ? patched : patched + "\n";
  return `
import sys, os

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

# Make /project importable and ensure __file__ exists
if "/project" not in sys.path:
    sys.path.insert(0, "/project")
try:
    __file__
except NameError:
    __file__ = "/project/__main__.py"

from js import requestInput as _req

async def __input__(prompt=""):
    v = await _req(prompt)
    return "" if v is None else str(v)

# Wrap all user code into async function
async def __user_main__():
${indent4(safePatched)}
`;
}

// ---------- Worker wiring ----------
self.onmessage = async (e) => {
  const { type, code, id, value, files = [] } = e.data || {};

  // input() response from the host UI
  if (type === "inputResponse" && pendingInputs.has(id)) {
    pendingInputs.get(id)(value);
    pendingInputs.delete(id);
    return;
  }

  if (type === "start") {
    try {
      // Lazy-load Pyodide once
      if (!pyodide) {
        postMessage({ type: "log", text: "[worker] loading pyodide…" });
        pyodide = await loadPyodide({
          stdout: (s) => sendLog(s),
          stderr: (s) => sendLog(s),
        });
        postMessage({ type: "log", text: "[worker] pyodide loaded" });
      }

      // 1) Write sidecar files into /project (so local imports work)
      try {
        const FS = pyodide.FS;
        try {
          FS.lookupPath("/project");
        } catch {
          FS.mkdir("/project");
        }
        // Always ensure a dummy __main__.py so __file__ points somewhere
        if (!FS.analyzePath("/project/__main__.py").exists) {
          FS.writeFile("/project/__main__.py", "# placeholder\n", {
            encoding: "utf8",
          });
        }

        const written = [];
        for (const f of files) {
          if (!f || !f.name) continue;
          const path = "/project/" + String(f.name);
          FS.writeFile(path, String(f.content ?? ""), { encoding: "utf8" });
          written.push(f.name);
        }

        postMessage({
          type: "log",
          text: `[worker] wrote to /project: ${JSON.stringify(written)}`,
        });
        try {
          const listing = FS.readdir("/project");
          postMessage({
            type: "log",
            text: `[worker] /project files: ${JSON.stringify(listing)}`,
          });
        } catch (lsErr) {
          postMessage({
            type: "log",
            text: `[worker] readdir error: ${String(lsErr)}`,
          });
        }
      } catch (fsErr) {
        postMessage({
          type: "log",
          text: `[worker] FS error: ${String(fsErr)}`,
        });
      }

      // 2) Expose JS helpers into Python
      pyodide.globals.set("sendLog", sendLog);
      pyodide.globals.set("requestInput", requestInput);
      pyodide.globals.set("pyReport", pyReport);

      // 3) Best-effort: pre-load pyodide packages referenced by imports
      try {
        await pyodide.loadPackagesFromImports(code);
      } catch (pkgErr) {
        postMessage({
          type: "log",
          text: "[worker] loadPackagesFromImports skipped: " + String(pkgErr),
        });
      }

      // 4) Build and run prelude
      const prelude = buildPrelude(code);
      // postMessage({ type: "log", text: "==== PRELUDE BEGIN ====\n" + prelude + "\n==== PRELUDE END ====" });
      await pyodide.runPythonAsync(prelude);

      // 5) Kickoff via top-level await (supported by runPythonAsync)
      const kickoff = `
from js import pyReport as __report
import traceback, io

async def __runner__():
    try:
        await __user_main__()
        __report("result", "")
    except Exception:
        buf = io.StringIO()
        traceback.print_exc(file=buf)
        __report("error", buf.getvalue())

await __runner__()
`;
      await pyodide.runPythonAsync(kickoff);

      // 6) Flush any buffered stdout
      await pyodide.runPythonAsync("import sys; sys.stdout.flush()");
    } catch (err) {
      postMessage({
        type: "error",
        error: "[worker] runtime error: " + (err?.message || String(err)),
      });
    }
  }
};
