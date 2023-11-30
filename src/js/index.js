const vscode = acquireVsCodeApi();

/**
 * The Configs class contains configuration objects for the OnClick class.
 */
class Configs {
  /**
   * The constructor adds click event listeners to DOM elements with specified ids.
   * When one of these elements is clicked, a message is posted to the extension.
   * @param {object} scriptConfig - The configuration object for scripts.
   * @param {object} langConfig - The configuration object for languages.
   */
  constructor() {
    this.scriptConfig = {
      cmd: "runInTerminal",
      tag: "_script",
      path: "../src/scripts/",
      suffix: "_menu",
      ext: ".ps1",
    };

    this.langConfig = {
      cmd: "loadLangFile",
      tag: "_lang",
      path: "../src/json/",
      suffix: "",
      ext: ".json",
    };
  }
}

/**
 * The OnClick class adds click event listeners to DOM elements with specified ids.
 * When one of these elements is clicked, a message is posted to the extension.
 */
class OnClick {
  /**
   * The constructor adds click event listeners to DOM elements with specified ids.
   * When one of these elements is clicked, a message is posted to the extension.
   */
  constructor(configs) {
    const config = configs.scriptConfig;
    document.querySelectorAll(`[id$="${config.tag}"]`).forEach((item) => {
      const id = item.id.replace(config.tag, "");
      const cmd = config.cmd;
      const target = `${config.path}${id}${config.suffix}${config.ext}`;

      item.addEventListener("click", () =>
        vscode.postMessage({ id, cmd, target })
      );
    });
  }
}

/**
 * The L10N class adds click event listeners to DOM elements with specified ids.
 * When one of these elements is clicked, a message is posted to the extension.
 */
class L10N {}

document.addEventListener("DOMContentLoaded", () => {
  const configs = new Configs();
  new OnClick(configs);
  new L10N();
});
