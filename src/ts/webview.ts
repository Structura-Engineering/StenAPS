import { window, ViewColumn, Uri, ExtensionContext } from "vscode";
import { join } from "path";
import { readFileSync } from "fs";

/**
 * Returns the resource path for the extension.
 * @param {ExtensionContext} context - The extension context.
 * @returns {Uri} - The resource path.
 */
function getResourcePath(context: ExtensionContext) {
  return Uri.file(join(context.extensionPath, "src"));
}

/**
 * Returns the HTML content for the webview.
 * @param {ExtensionContext} context - The extension context.
 * @param {Uri} srcPath - The source path for the webview.
 * @returns {string} - The HTML content.
 */
function getHtmlContent(context: ExtensionContext, srcPath: Uri) {
  const htmlPath = Uri.file(
    join(context.extensionPath, "src", "html", "index.html"),
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
    },
  );

  const srcPath = panel.webview.asWebviewUri(getResourcePath(context));
  panel.webview.html = getHtmlContent(context, srcPath);
}
