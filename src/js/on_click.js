const vscode = acquireVsCodeApi();

/**
 * The OnClick class adds click event listeners to DOM elements with specified ids.
 * When one of these elements is clicked, a message is posted to the extension.
 */
class OnClick {
  /**
   * The constructor adds click event listeners to DOM elements with specified ids.
   * When one of these elements is clicked, a message is posted to the extension.
   */
  constructor() {
    const scriptConfig = {
      cmd: "runInTerminal",
      tag: "_script",
      path: "../src/scripts/",
      suffix: "_menu",
      ext: ".ps1",
    };

    document.querySelectorAll(`[id$="${scriptConfig.tag}"]`).forEach((item) => {
      const id = item.id.replace(scriptConfig.tag, "");
      const cmd = scriptConfig.cmd;
      const target = `${scriptConfig.path}${id}${scriptConfig.suffix}${scriptConfig.ext}`;

      item.addEventListener("click", () =>
        vscode.postMessage({ id, cmd, target })
      );
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new OnClick());
