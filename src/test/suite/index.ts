import { resolve } from "path";
import Mocha from "mocha";
import { glob } from "glob";

/**
 * This function runs the test suite using Mocha.
 * It finds all test files in the test directory and adds them to Mocha.
 * Then it runs the tests and returns a promise that resolves when the tests are done.
 * If any tests fail, it rejects the promise with an error.
 *
 * @returns {Promise<void>} A promise that resolves when the tests are done.
 */
export async function run(): Promise<void> {
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  const testsRoot = resolve(__dirname, "..");
  const files = await glob("**/**.test.js", { cwd: testsRoot });

  files.forEach((f) => mocha.addFile(resolve(testsRoot, f)));

  try {
    return new Promise<void>((c, e) => {
      mocha.run((failures) => {
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`));
        } else {
          c();
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}
