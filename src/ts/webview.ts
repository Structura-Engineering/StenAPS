import { window, ViewColumn, Uri, ExtensionContext } from "vscode";
import { join } from "path";
import { readFileSync } from "fs";
import { getResourcePath } from "./utils";

/**
 * Returns the HTML content for the webview.
 * @param {ExtensionContext} context - The extension context.
 * @param {Uri} srcPath - The source path for the webview.
 * @returns {string} - The HTML content.
 */
function getHtmlContent(context: ExtensionContext, srcPath: Uri) {
  const htmlPath = Uri.file(
    join(context.extensionPath, "src", "html", "index.html")
  );
  let htmlContent = readFileSync(htmlPath.fsPath, "utf8");

  htmlContent = htmlContent.replace(/src="\.\.\//g, `src="${srcPath}/`);
  htmlContent = htmlContent.replace(/href="\.\.\//g, `href="${srcPath}/`);

  return htmlContent;
}

/**
 * Creates a webview with the given context.
 * @param {ExtensionContext} context - The extension context.
 */
export function createWebview(context: ExtensionContext) {
  const panel = window.createWebviewPanel(
    "webview",
    "StenAPS",
    ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [getResourcePath(context)],
    }
  );

  const srcPath = panel.webview.asWebviewUri(getResourcePath(context));
  panel.webview.html = getHtmlContent(context, srcPath);

  panel.webview.onDidReceiveMessage(
    (message) => {
      switch (message.command) {
        case "runInTerminal":
          const scriptPath = join(__dirname, message.script);
          const terminal = window.createTerminal(
            `${message.id} Setup Terminal`
          );
          terminal.show();
          terminal.sendText(
            `powershell -ExecutionPolicy ByPass -File ${scriptPath}`
          );
          return;
        default:
          break;
      }
    },
    undefined,
    context.subscriptions
  );
}
