import { ExtensionContext, commands } from "vscode";
import { invokeScriptByKey } from "./utils";
import { createWebview } from "./main_page";

/**
 * This function is called when your extension is activated.
 * It initializes the extension and registers the command for setup.
 *
 * @param {ExtensionContext} context - The context object which is used to
 * subscribe to events, register commands, and interact with the VS Code API.
 */
export function activate(context: ExtensionContext) {
  const disposables = [
    commands.registerCommand(
      "StenAPS.Setup",
      () => invokeScriptByKey("py") //implement key passing here.
    ),
    commands.registerCommand("StenAPS.Webview", createWebview),
  ];

  context.subscriptions.push(...disposables);
}
