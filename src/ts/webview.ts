import { window, ViewColumn, workspace, Uri } from "vscode";
import { join } from "path";
import { readFileSync } from "fs";

/**
 * Creates a webview panel and loads the html content.
 */
export function createWebview() {
  if (workspace.workspaceFolders) {
    const panel = window.createWebviewPanel(
      "webview",
      "StenAPS",
      ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          Uri.file(join(workspace.workspaceFolders[0].uri.fsPath, "src")),
        ],
      }
    );

    const htmlPath = Uri.file(
      join(
        workspace.workspaceFolders[0].uri.fsPath,
        "src",
        "html",
        "index.html"
      )
    );
    let htmlContent = readFileSync(htmlPath.fsPath, "utf8");

    const srcPath = panel.webview.asWebviewUri(
      Uri.file(join(workspace.workspaceFolders[0].uri.fsPath, "src"))
    );

    htmlContent = htmlContent.replace(/src="\.\.\//g, `src="${srcPath}/`);
    htmlContent = htmlContent.replace(/href="\.\.\//g, `href="${srcPath}/`);

    panel.webview.html = htmlContent;
  } else {
    console.error("No workspace folders found");
  }
}
