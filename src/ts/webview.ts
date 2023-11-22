import { window, ViewColumn, workspace, Uri } from "vscode";
import { join } from "path";
import { readFileSync } from "fs";

const SRC_REGEX = /src="\.\.\//g;
const HREF_REGEX = /href="\.\.\//g;

/**
 * Replaces the given regex in the content with the new path.
 */
function replacePath(content: string, regex: RegExp, newPath: string) {
  return content.replace(regex, `${newPath}/`);
}

/**
 * Creates a webview panel and loads the html content.
 */
export function createWebview() {
  if (!workspace.workspaceFolders) {
    throw new Error("No workspace folders found");
  }

  const workspacePath = workspace.workspaceFolders[0].uri.fsPath;
  const srcPath = Uri.file(join(workspacePath, "src"));

  const panel = window.createWebviewPanel(
    "webview",
    "StenAPS",
    ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [srcPath],
    }
  );

  const htmlPath = Uri.file(join(workspacePath, "src", "html", "index.html"));
  let htmlContent = readFileSync(htmlPath.fsPath, "utf8");

  const webviewSrcPath = panel.webview.asWebviewUri(srcPath).toString();

  htmlContent = replacePath(htmlContent, SRC_REGEX, webviewSrcPath);
  htmlContent = replacePath(htmlContent, HREF_REGEX, webviewSrcPath);

  panel.webview.html = htmlContent;
}
