import * as vscode from "vscode";
import * as path from "path";

const extensionName = "StenAPS";
const extensionASCII = "";

export function activate(context: vscode.ExtensionContext) {
  console.log("Congratulations, your extension is now active!");

  context.subscriptions.push(
    vscode.commands.registerCommand(`"${extensionName}.Setup"`, async () => {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

      if (workspaceFolder) {
        const setupScriptPath = path.join(
          workspaceFolder.uri.fsPath,
          "setup.ps1"
        );
        const terminal = vscode.window.createTerminal();
        terminal.show();
        terminal.sendText(`echo "${extensionASCII}"`);
        terminal.sendText(
          `powershell -ExecutionPolicy Bypass -File "${setupScriptPath}"`
        );
        terminal.show();
      } else {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a workspace folder and try again."
        );
      }
    })
  );
}
