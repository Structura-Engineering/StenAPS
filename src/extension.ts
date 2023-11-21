import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "StenAPS" is now active!');

  const helloWorldCommand = vscode.commands.registerCommand(
    "StenAPS.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from StenAPS!");
    },
  );

  context.subscriptions.push(helloWorldCommand);
}

export function deactivate() {}
