import { postMessage } from "vscode";

function runScript(script) {
  postMessage({
    command: "runTerminal",
    text: script,
  });
}

window.runScript = runScript;