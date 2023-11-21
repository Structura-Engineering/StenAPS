import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log("Congratulations, your extension is now active!");

  const disposableSetup = vscode.commands.registerCommand(
    "StenAPS.Setup",
    () => {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

      if (workspaceFolder) {
        const setupScriptPath = path.join(
          workspaceFolder.uri.fsPath,
          "setup.ps1"
        );
        const terminal = vscode.window.createTerminal();
        terminal.sendText(
          `powershell -ExecutionPolicy Bypass -File "${setupScriptPath}"`
        );
        terminal.show();
      } else {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a workspace folder and try again."
        );
      }
    }
  );
}
