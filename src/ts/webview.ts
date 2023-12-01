import { window, ViewColumn, ExtensionContext, WebviewPanel } from "vscode";
import { join } from "path";
import { readFileSync } from "fs";
import { getResourcePath, getHtmlContent } from "./utils";

/**
 * Commands for handling different actions.
 */
const CMDS = {
  RUN_IN_TERMINAL: "runInTerminal",
};

/**
 * Interface for message object.
 */
interface Msg {
  cmd: keyof typeof CMDS;
  target: string;
  id?: string;
}

/**
 * Handles incoming messages and performs actions based on the command.
 * @param {Msg} message - The incoming message object.
 * @param {WebviewPanel} panel - The webview panel.
 */
function handleMessage(message: Msg, panel: WebviewPanel) {
  switch (message.cmd) {
    case CMDS.RUN_IN_TERMINAL:
      runInTerminal(message);
      break;

    default:
      console.error(`Unknown command: ${message.cmd}`);
  }
}

/**
 * Runs a script in a new terminal.
 * @param {Msg} param0 - The message object containing the target script and id.
 */
function runInTerminal({ target, id }: Msg) {
  const scriptPath = join(__dirname, target);
  const terminal = window.createTerminal(`${id} Setup Terminal`);
  terminal.show();
  terminal.sendText(`powershell -ExecutionPolicy ByPass -File ${scriptPath}`);
}

/**
 * Creates a webview panel and sets up message handling.
 * @param {ExtensionContext} context - The extension context.
 */
export function createWebview(context: ExtensionContext) {
  const panel = window.createWebviewPanel(
    "webview",
    "StenAPS",
    ViewColumn.One,
    {
      enableScripts: true,
    },
  );

  const srcPath = panel.webview.asWebviewUri(getResourcePath(context));
  panel.webview.html = getHtmlContent(context, srcPath);

  panel.webview.onDidReceiveMessage(
    (message) => handleMessage(message, panel),
    undefined,
    context.subscriptions,
  );
}
