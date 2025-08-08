// public/workers/pyWorker.js
// Run Python in Pyodide with: real-time logs + browser input() support

importScripts("https://cdn.jsdelivr.net/pyodide/v0.28.1/full/pyodide.js");

let pyodide = null; // initialized once
let nextInputId = 0;
const pendingInputs = new Map(); // id -> resolve

// ---- helpers ---------------------------------------------------------------

function sendLog(s) {
  // Logical simple strings — safe for structured clone
  postMessage({ type: "log", text: String(s ?? "") });
}

function requestInput(promptText) {
  const id = ++nextInputId;
  return new Promise((resolve) => {
    pendingInputs.set(id, resolve);
    postMessage({ type: "input", id, prompt: String(promptText ?? "") });
  });
}

// safe bridge for result/error — strings only
function pyReport(kind, text) {
  const msg = { type: kind };
  if (kind === "result") msg.result = String(text ?? "");
  else msg.error = String(text ?? "");
  postMessage(msg);
}

function indent4(src) {
  return String(src)
    .split("\n")
    .map((l) => "    " + l)
    .join("\n");
}

// --- code transforms --------------------------------------------------------

// Find functions whose body contains plain `input(` and make them async
function asyncifyFunctionsWithInput(code) {
  const lines = code.split("\n");
  const funcRegex = /^([ \t]*)def\s+([A-Za-z_]\w*)\s*\([^)]*\)\s*:\s*$/;
  const usesInputRegex = /(^|[^.\w])input\s*\(/m;

  const toAsync = new Set();

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(funcRegex);
    if (!m) continue;
    const indent = m[1];
    const name = m[2];

    let j = i + 1;
    const body = [];
    while (j < lines.length) {
      const l = lines[j];
      if (l.trim() === "") {
        body.push(l);
        j++;
        continue;
      }
      if (!l.startsWith(indent + "    ")) break; // dedented => block end
      body.push(l);
      j++;
    }

    const bodyText = body.join("\n");
    if (usesInputRegex.test(bodyText)) {
      toAsync.add(name);
      lines[i] = lines[i].replace(/^([ \t]*)def\b/, "$1async def");
    }
    i = j - 1;
  }

  return { code: lines.join("\n"), asyncified: Array.from(toAsync) };
}

// Safely add `await` before call sites of given function names
function addAwaitToCallSites(code, names) {
  if (!names.length) return code;

  const sorted = [...names].sort((a, b) => b.length - a.length);
  const re = new RegExp(
    `\\b(${sorted.map((n) => n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})\\s*\\(`,
    "g"
  );

  let out = "";
  let i = 0;
  while (i < code.length) {
    re.lastIndex = i;
    const m = re.exec(code);
    if (!m) {
      out += code.slice(i);
      break;
    }
    const start = m.index;
    const name = m[1];

    out += code.slice(i, start);

    const ctxStart = Math.max(0, start - 50);
    const ctx = code.slice(ctxStart, start);
    const prevChar = code[start - 1] || "";
    const before = ctx.trimEnd();

    const isMethodCall = prevChar === ".";
    const precededByWord = /[A-Za-z0-9_]/.test(prevChar);
    const inDef = /\b(async\s+def|def|class)\s*$/.test(before);
    const alreadyAwaited = /\bawait\s+$/.test(before);

    if (!isMethodCall && !precededByWord && !inDef && !alreadyAwaited) {
      out += "await " + name;
    } else {
      out += name;
    }

    i = start + name.length;
  }

  return out;
}

// Replace plain input(…) with awaited __input__(…)
function patchInputCalls(code) {
  return String(code).replace(/(^|[^.\w])input\s*\(/g, "$1await __input__(");
}

// Phase A: define plumbing (__input__, stdout hook, __user_main__) WITHOUT running it
function wrapPrelude(originalCode) {
  const { code: asyncifiedCode, asyncified } =
    asyncifyFunctionsWithInput(originalCode);
  const withAwaitCalls = addAwaitToCallSites(asyncifiedCode, asyncified);
  const patched = patchInputCalls(withAwaitCalls);

  return `
import sys

# live stdout/stderr -> JS
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
            self._buf = ""

sys.stdout = _LiveOut()
sys.stderr = sys.stdout

import asyncio
from js import requestInput as _req

async def __input__(prompt=""):
    v = await _req(prompt)
    return "" if v is None else str(v)

async def __user_main__():
${indent4(patched)}
`;
}

// ---- worker wiring ---------------------------------------------------------

self.onmessage = async (e) => {
  const { type, code, id, value } = e.data || {};

  // response from main for an input() prompt
  if (type === "inputResponse" && pendingInputs.has(id)) {
    pendingInputs.get(id)(value);
    pendingInputs.delete(id);
    return;
  }

  if (type === "start") {
    try {
      if (!pyodide) {
        pyodide = await loadPyodide();
      }

      // expose JS functions to Python
      self.sendLog = sendLog;
      self.requestInput = requestInput;
      self.pyReport = pyReport;
      pyodide.globals.set("sendLog", sendLog);
      pyodide.globals.set("requestInput", requestInput);
      pyodide.globals.set("pyReport", pyReport);

      // Load any packages required by user's code
      await pyodide.loadPackagesFromImports(code);

      // Phase A
      const prelude = wrapPrelude(code);
      await pyodide.runPythonAsync(prelude);

      // Phase B: run user main without top-level await; репорт через pyReport
      const kickoff = `
import asyncio
from js import pyReport as __report

async def __runner__():
    try:
        await __user_main__()
        __report("result", "")
    except Exception as e:
        import traceback, io
        buf = io.StringIO()
        traceback.print_exc(file=buf)
        __report("error", buf.getvalue())

asyncio.create_task(__runner__())
`;
      await pyodide.runPythonAsync(kickoff);

      // Flush any partial stdout line
      try {
        await pyodide.runPythonAsync("import sys; sys.stdout.flush()");
      } catch (e) {
        console.error(e);
      }

      // Python сам пришлёт result/error через pyReport
    } catch (err) {
      postMessage({
        type: "error",
        error: err && err.message ? err.message : String(err),
      });
    }
  }
};
