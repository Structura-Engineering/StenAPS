import { ExtensionContext, commands } from "vscode";
import { createWebview } from "./ts/webview";

/**
 * This function is called when your extension is activated.
 * It initializes the extension and registers the command for setup.
 *
 * @param {ExtensionContext} context - The context object which is used to
 * subscribe to events, register commands, and interact with the VS Code API.
 */
export function activate(context: ExtensionContext) {
  const RegisterCMDS: { [command: string]: () => void } = {
    "StenAPS.webview": () => createWebview(context),
  };

  const disposables = Object.keys(RegisterCMDS).map((command) =>
    commands.registerCommand(command, RegisterCMDS[command])
  );

  context.subscriptions.push(...disposables);
}
