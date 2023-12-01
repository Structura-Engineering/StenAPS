const vscode = acquireVsCodeApi();

/**
 * The Configs class contains configuration objects for the OnClick class.
 */
class Configs {
  /**
   * The constructor adds click event listeners to DOM elements with specified ids.
   * When one of these elements is clicked, a message is posted to the extension.
   * @param {object} scriptConfig - The configuration object for scripts.
   * @param {object} l10nConfig - The configuration object for languages.
   */
  constructor() {
    this.scriptConfig = {
      cmd: "runInTerminal",
      id: "_script",
      path: "../src/scripts/",
      suffix: "_menu",
      ext: ".ps1",
      event: "click",
    };
  }
}

/**
 * The Script class adds click event listeners to DOM elements with specified ids.
 * When one of these elements is clicked, a message is posted to the extension.
 */
class EventHandler {
  /**
   * The constructor adds click event listeners to DOM elements with specified ids.
   * When one of these elements is clicked, a message is posted to the extension.
   * @param {object} configs - The configuration object for scripts.
   */
  constructor(configs) {
    for (const configKey in configs) {
      this.addEventListeners(configs[configKey]);
    }
  }

  /**
   * The addEventListeners method adds click event listeners to DOM elements with specified ids.
   * When one of these elements is clicked, a message is posted to the extension.
   * @param {object} config - The configuration object for scripts.
   */
  addEventListeners(config) {
    document.querySelectorAll(`[id$="${config.id}"]`).forEach((item) => {
      const id = item.id.replace(config.id, "");
      const cmd = config.cmd;
      const target = `${config.path}${id}${config.suffix}${config.ext}`;

      item.addEventListener(config.event, () =>
        vscode.postMessage({ id, cmd, target }),
      );
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new EventHandler(new Configs());
});
