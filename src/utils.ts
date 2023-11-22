import { workspace, window } from "vscode";
import { join } from "path";

interface Scripts {
  [key: string]: string | undefined;
}

export function invokeScriptByKey(key: string) {
  const workspaceFolder = workspace.workspaceFolders?.[0];

  if (!workspaceFolder) {
    window.showErrorMessage(
      "No workspace folder found. Please open a workspace folder and try again."
    );
    return;
  }

  const scripts: Scripts = {
    cpp: "scripts/cpp_menu.ps1",
    py: "scripts/python_menu.ps1",
  };

  const scriptPath = scripts[key];

  if (!scriptPath) {
    window.showErrorMessage("Invalid key provided.");
    return;
  }

  const terminal = window.createTerminal();
  terminal.sendText(
    `powershell -ExecutionPolicy Bypass -File "${join(
      workspaceFolder.uri.fsPath,
      scriptPath
    )}"`
  );
  terminal.show();
}
