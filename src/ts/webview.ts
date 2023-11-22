import { window, ViewColumn, workspace } from "vscode";
import { join } from "path";

/**
 * Creates a webview panel and loads the html content.
 */
export function createWebview() {
  const panel = window.createWebviewPanel(
    "webview",
    "StenAPS",
    ViewColumn.One,
    {}
  );

  if (workspace.workspaceFolders) {
    const htmlPath = join(
      workspace.workspaceFolders[0].uri.fsPath,
      "./src/html/index.html"
    );
    panel.webview.html = htmlPath;
  } else {
    window.showErrorMessage(
      "No workspace opened. Please open a workspace first."
    );
  }
}
