import { postMessage } from "vscode";

/**
 * Run a script in the terminal.
 * @param {string} script - The script to be run.
 */
function runScript(script) {
  postMessage({
    command: "runTerminal",
    text: script,
  });
}

window.runScript = runScript;

// TODO: Rewrite this to work with webview.ts
