import { resolve } from "path";
import { runTests } from "@vscode/test-electron";

/**
 * This is the main function that runs the tests.
 * It sets up the paths for the extension and the tests,
 * and then runs the tests using the runTests function from @vscode/test-electron.
 * If the tests fail, it throws an error.
 */
async function main() {
  const extensionDevelopmentPath = resolve(__dirname, "../../");
  const extensionTestsPath = resolve(__dirname, "./suite/index");

  try {
    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    throw new Error(`Failed to run tests: ${err}`);
  }
}

main();
