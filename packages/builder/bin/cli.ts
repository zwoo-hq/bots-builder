import * as esbuild from "esbuild";
import path from "node:path";
import fs from "node:fs";
import minimist from "minimist";
import colors from "picocolors";

const { cyan, magenta, red, blue, gray, green } = colors;

const mockGlobalContext =
  "var globals = { logger: {}, onEvent: () => {}, rand: {}, toInt: () => {}}; class WholeGameBotStateManager {}; class BasicBotStateManager {};";

const argv = minimist<{
  template?: string;
  help?: boolean;
}>(process.argv.slice(2), {
  default: { help: false },
  alias: { h: "help", o: "out", f: "file" },
  string: ["_"],
});

const helpMessage = `\
Usage: zwoo-bots-builder [COMMAND] [OPTION]...

Build tools for zwoo bots.

Options:
  -f, --file FILE        the entrypoint of your bot
  -o, --out  FILE        the output file
  -h, --help FILE        print this help message

Available commands:
${cyan("build")}         build your bot
${magenta("validate")}      validate you bot`;

async function init() {
  const argCommand = argv._[0];

  const help = argv.help;
  if (help) {
    console.log(helpMessage);
    return;
  }

  if (argCommand === "build") {
    const file = argv.file || argv.f;
    if (!file) {
      console.log(`${red("ERROR")} missing required argument: ${blue(file)}"`);
      return;
    }
    const input = path.resolve(file);
    const output = path.resolve(argv.out || argv.o || "bot.mjs");

    console.log(`Building your ${cyan("zwoo bot")} 🤖 from ${blue(input)}...`);

    await build(input, output);
    console.log(`${green("Done!")} your bot is ready at ${blue(output)}`);
  } else if (argCommand === "validate") {
    const file = argv.file || argv.f;
    if (!file) {
      console.log(`${red("ERROR")} missing required argument: ${blue(file)}"`);
      return;
    }
    const input = path.resolve(file);

    console.log(
      `Validating your ${cyan("zwoo bot")} 🤖 from ${blue(input)}...`
    );

    await validate(input);
    console.log(`${green("Done!")} your bot is valid!`);
  } else {
    if (argCommand) {
      console.log(`${red("ERROR")} unknown command: ${argCommand}"`);
    } else {
      console.log(helpMessage);
    }
  }
}

async function build(input: string, output: string, header?: string) {
  let buildFailed = false;

  try {
    // create a bundled build
    await esbuild.build({
      platform: "browser",
      bundle: true,
      minifyWhitespace: true,
      minifySyntax: true,
      format: "esm",
      allowOverwrite: true,
      entryPoints: [input],
      external: ["@zwoo/bots-builder/globals"],
      outfile: output,
      banner: {
        js: header ?? "",
      },
    });
  } catch (error) {
    buildFailed = true;
    // do some error reporting
    console.log(`${red("ERROR")} build failed: ${gray(`${error}`)}"`);
  }

  if (buildFailed) {
    process.exit(1);
  }
}

async function validate(input: string) {
  const randomString = Math.random().toString(36).substring(2, 8);
  const tmpOut = path.resolve(
    `zwoo-bots-builder-temp-validate_${randomString}.mjs`
  );

  await build(input, tmpOut, mockGlobalContext);

  let validateFailed = false;

  try {
    // validate the bundle
    await import("file://" + tmpOut).then((module) => {
      // check if a class named bot is exported
      if (typeof module.default !== "function") {
        logValidateError("missing default export");
        validateFailed = true;
      } else {
        logValidateSuccess("contains default export");
      }

      const botInstance = new module.default();
      // check if the constructor returns an object
      if (typeof botInstance !== "object") {
        logValidateError("cant construct Bot instance");
        validateFailed = true;
      } else {
        logValidateSuccess("can construct Bot instance");
      }

      // check if the object has the required methods
      if (typeof botInstance.AggregateNotification !== "function") {
        logValidateError("missing 'AggregateNotification' method");
        validateFailed = true;
      } else {
        logValidateSuccess("instance has 'AggregateNotification' method");
      }

      if (typeof botInstance.Reset !== "function") {
        logValidateError("missing 'Reset' method");
        validateFailed = true;
      } else {
        logValidateSuccess("instance has 'Reset' method");
      }
    });
  } catch (error) {
    console.log(
      `${red("ERROR")} validate failed: cant load module: ${gray(`${error}`)}"`
    );
  }

  fs.rmSync(tmpOut);

  if (validateFailed) {
    console.log(
      `${red("ERROR")} validate failed: bot does not meet the requirements`
    );
    process.exit(1);
  }
}

function logValidateError(message: string) {
  console.log(`  ${red("✗")} ${gray(message)}`);
}

function logValidateSuccess(message: string) {
  console.log(`  ${green("✓")} ${message}`);
}

init().catch((e) => {
  console.error(e);
});
