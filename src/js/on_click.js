import { postMessage } from "vscode";

function runScript(script) {
  postMessage({
    command: "runTerminal",
    text: script,
  });
}

window.runScript = runScript;

// TODO: Rewrite this to work with webview.ts
