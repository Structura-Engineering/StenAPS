import * as path from "path";

import { runTests } from "@vscode/test-electron";

async function main() {
  const extensionDevelopmentPath = path.resolve(__dirname, "../../");
  const extensionTestsPath = path.resolve(__dirname, "./suite/index");

  try {
    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    throw new Error(`Failed to run tests: ${err}`);
  }
}

main();
