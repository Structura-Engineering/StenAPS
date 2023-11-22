import { window, ViewColumn, Uri, ExtensionContext } from "vscode";
import { join } from "path";
import { readFileSync } from "fs";

/**
 * Creates a webview panel and loads the html content.
 */
export function createWebview(context: ExtensionContext) {
  const panel = window.createWebviewPanel(
    "webview",
    "StenAPS",
    ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [Uri.file(join(context.extensionPath, "src"))],
    }
  );

  const htmlPath = Uri.file(
    join(context.extensionPath, "src", "html", "index.html")
  );
  let htmlContent = readFileSync(htmlPath.fsPath, "utf8");

  const srcPath = panel.webview.asWebviewUri(
    Uri.file(join(context.extensionPath, "src"))
  );

  htmlContent = htmlContent.replace(/src="\.\.\//g, `src="${srcPath}/`);
  htmlContent = htmlContent.replace(/href="\.\.\//g, `href="${srcPath}/`);

  panel.webview.html = htmlContent;
}
