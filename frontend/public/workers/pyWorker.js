// public/workers/pyWorker.js
// Run Python in Pyodide with: real-time logs + browser input() support

importScripts("https://cdn.jsdelivr.net/pyodide/v0.28.1/full/pyodide.js");

let pyodide = null; // initialized once
let nextInputId = 0;
const pendingInputs = new Map(); // id -> resolve

// ---- helpers ---------------------------------------------------------------

// send text line-by-line to main thread
function sendLog(s) {
  postMessage({ type: "log", text: String(s ?? "") });
}

// ask main thread for input; returns a JS Promise<string>
function requestInput(promptText) {
  const id = ++nextInputId;
  return new Promise((resolve) => {
    pendingInputs.set(id, resolve);
    postMessage({ type: "input", id, prompt: promptText });
  });
}

// indent arbitrary code with 4 spaces (to put it inside async def)
function indent4(src) {
  return String(src)
    .split("\n")
    .map((l) => "    " + l)
    .join("\n");
}

// wrap user code into an async function and rewrite input() calls
function wrapUserCode(code) {
  const patched = String(code).replace(/\binput\s*\(/g, "await __input__(");
  return `
import sys
# live stdout/stderr -> JS
class _LiveOut:
    def __init__(self): self._buf = ""
    def write(self, t):
        self._buf += str(t)
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

await __user_main__()
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
      // NOTE: names must match those imported in wrapUserCode()
      self.sendLog = sendLog;
      self.requestInput = requestInput;
      pyodide.globals.set("sendLog", sendLog);
      pyodide.globals.set("requestInput", requestInput);

      // run the wrapped (async) program
      const wrapped = wrapUserCode(code);
      await pyodide.runPythonAsync(wrapped);

      postMessage({ type: "result", result: "" });
    } catch (err) {
      postMessage({
        type: "error",
        error: err && err.message ? err.message : String(err),
      });
    }
  }
};
