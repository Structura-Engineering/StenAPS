import { Uri, ExtensionContext } from "vscode";
import { join } from "path";
import { readFileSync } from "fs";

/**
 * Returns the resource path for the extension.
 * @param {ExtensionContext} context - The extension context.
 * @returns {Uri} - The resource path.
 */
export function getResourcePath(context: ExtensionContext) {
  return Uri.file(join(context.extensionPath, "src"));
}

/**
 * Returns the HTML content for the webview.
 * @param {ExtensionContext} context - The extension context.
 * @param {Uri} srcPath - The source path for the webview.
 * @returns {string} - The HTML content.
 */
export function getHtmlContent(context: ExtensionContext, srcPath: Uri) {
  const htmlPath = Uri.file(
    join(getResourcePath(context).fsPath, "html", "index.html")
  );

  let htmlContent = readFileSync(htmlPath.fsPath, "utf8");

  htmlContent = htmlContent.replace(/src="\.\.\//g, `src="${srcPath}/`);
  htmlContent = htmlContent.replace(/href="\.\.\//g, `href="${srcPath}/`);

  return htmlContent;
}
