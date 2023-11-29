const vscode = acquireVsCodeApi();

const scripts = {
  docker: "../src/scripts/docker_menu.ps1",
  nodejs: "../src/scripts/nodejs_menu.ps1",
  cpp: "../src/scripts/cpp_menu.ps1",
  py: "../src/scripts/py_menu.ps1",
};

/**
 * The OnClick class adds click event listeners to DOM elements with specified ids.
 * When one of these elements is clicked, a message is posted to the extension.
 */
class OnClick {
  /**
   * The constructor gets DOM elements with specified ids and adds click event listeners to them.
   */
  constructor() {
    this.toolItems = ["docker", "nodejs", "cpp", "py"].map((id) =>
      document.getElementById(id),
    );

    this.toolItems.forEach((item) => {
      item.addEventListener("click", () => {
        vscode.postMessage({
          command: "runInTerminal",
          id: item.id,
          script: scripts[item.id],
        });
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new OnClick());

// TODO: optimize this code. item.id is defined twice once in list and once in mapping.
