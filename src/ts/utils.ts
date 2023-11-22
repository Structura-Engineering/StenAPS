import { Uri, ExtensionContext } from "vscode";
import { join } from "path";

/**
 * Returns the resource path for the extension.
 * @param {ExtensionContext} context - The extension context.
 * @returns {Uri} - The resource path.
 */
export function getResourcePath(context: ExtensionContext) {
  return Uri.file(join(context.extensionPath, "src"));
}
