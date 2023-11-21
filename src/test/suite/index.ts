import { resolve } from "path";
import Mocha from "mocha";
import { glob } from "glob";

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
