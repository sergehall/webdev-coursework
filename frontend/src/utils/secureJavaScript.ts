import * as esprima from "esprima";
import * as estraverse from "estraverse";

export type JavaScriptValidationOptions = {
  allowBrowserGlobals?: boolean;
};

export type JavaScriptValidationResult = {
  valid: boolean;
  reason?: string;
};

export const JS_MAX_FILE_SIZE = 50_000; // 50KB
export const JS_MAX_LINE_COUNT = 1000;
export const JS_MAX_CODE_LENGTH = 10_000;

export function validateJavaScript(
  code: string,
  options: JavaScriptValidationOptions = {}
): JavaScriptValidationResult {
  if (code.length > JS_MAX_CODE_LENGTH) {
    return { valid: false, reason: "Code too long." };
  }

  if (code.split("\n").length > JS_MAX_LINE_COUNT) {
    return { valid: false, reason: "Too many lines." };
  }

  const allowBrowserGlobals = options.allowBrowserGlobals ?? false;

  try {
    const ast = esprima.parseScript(code);
    let reason: string | undefined;

    estraverse.traverse(ast, {
      enter(node) {
        if (reason) {
          this.break();
          return;
        }

        const isCall = (name: string) =>
          node.type === "CallExpression" &&
          node.callee.type === "Identifier" &&
          node.callee.name === name;

        const isUnsafeMemberCall =
          node.type === "CallExpression" &&
          node.callee.type === "MemberExpression" &&
          node.callee.property.type === "Identifier" &&
          ["write", "assign", "replace", "open"].includes(
            node.callee.property.name
          );

        const isDangerousHtmlAssignment =
          node.type === "AssignmentExpression" &&
          node.left.type === "MemberExpression" &&
          node.left.property.type === "Identifier" &&
          ["innerHTML", "outerHTML"].includes(node.left.property.name);

        if (isCall("eval")) {
          reason = "eval() is not allowed.";
          return;
        }
        if (isCall("Function")) {
          reason = "Function() constructor is not allowed.";
          return;
        }
        if (isCall("setTimeout") || isCall("setInterval")) {
          reason = "Dynamic timer execution is not allowed.";
          return;
        }
        if (isUnsafeMemberCall) {
          reason = "Unsafe browser API call detected.";
          return;
        }
        if (isDangerousHtmlAssignment) {
          reason = "Direct HTML injection APIs are not allowed.";
          return;
        }
        if (
          node.type === "NewExpression" &&
          node.callee.type === "Identifier" &&
          node.callee.name === "Function"
        ) {
          reason = "new Function() is not allowed.";
          return;
        }
        if (
          node.type === "ImportDeclaration" ||
          node.type === "ExportNamedDeclaration" ||
          node.type === "ExportDefaultDeclaration"
        ) {
          reason = "ES module import/export is not allowed in playground mode.";
          return;
        }
        if (node.type === "WithStatement") {
          reason = "with statement is not allowed.";
          return;
        }
        if (
          node.type === "WhileStatement" &&
          node.test.type === "Literal" &&
          node.test.value === true
        ) {
          reason = "Potential infinite loop detected.";
          return;
        }
        if (node.type === "ForStatement" && node.test === null) {
          reason = "Potential infinite loop detected.";
          return;
        }
        if (
          !allowBrowserGlobals &&
          node.type === "Identifier" &&
          ["window", "document", "globalThis", "self"].includes(node.name)
        ) {
          reason = `Global "${node.name}" is not allowed for uploaded scripts.`;
        }
      },
    });

    if (reason) return { valid: false, reason };

    return { valid: true };
  } catch (err) {
    console.error("JS parse error:", err);
    return { valid: false, reason: "JavaScript parse error." };
  }
}
