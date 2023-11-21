import { ExtensionContext, commands, workspace, window } from "vscode";
import { join } from "path";

/**
 * This function is called when your extension is activated.
 * It initializes the extension and registers the command for setup.
 *
 * @param {ExtensionContext} context - The context object which is used to
 * subscribe to events, register commands, and interact with the VS Code API.
 */
export function activate(context: ExtensionContext) {
  console.log("Congratulations, your extension is now active!");

  const disposableSetup = commands.registerCommand("StenAPS.Setup", () => {
    const workspaceFolder = workspace.workspaceFolders?.[0];

    if (workspaceFolder) {
      const setupScriptPath = join(workspaceFolder.uri.fsPath, "setup.ps1");
      const terminal = window.createTerminal();
      terminal.sendText(
        `powershell -ExecutionPolicy Bypass -File "${setupScriptPath}"`,
      );
      terminal.show();
    } else {
      window.showErrorMessage(
        "No workspace folder found. Please open a workspace folder and try again.",
      );
    }
  });
  context.subscriptions.push(disposableSetup);
}
