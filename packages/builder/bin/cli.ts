import * as esbuild from "esbuild";
import path from "node:path";
import fs from "node:fs/promises";
import minimist from "minimist";
import colors from "picocolors";

const { cyan, magenta, red } = colors;

const argv = minimist<{
  template?: string;
  help?: boolean;
}>(process.argv.slice(2), {
  default: { help: false },
  alias: { h: "help", t: "template" },
  string: ["_"],
});

const helpMessage = `\
Usage: zwoo-bots-builder [COMMAND] [OPTION]...

Build tools for zwoo bots.

Options:
  -f, --file FILE        the entrypoint of your bot
  -o, --out  FILE        the output file

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
      console.log(red("Missing required argument: file"));
      return;
    }
    const input = path.resolve(file);
    const output = path.resolve(argv.out || argv.o || "bot.mjs");

    await build(input, output);
  } else if (argCommand === "validate") {
    const file = argv.file || argv.f;
    if (!file) {
      console.log(red("Missing required argument: file"));
      return;
    }
    const input = path.resolve(file);

    await validate(input);
  } else {
    if (argCommand) {
      console.log(red("Unknown command: ") + argCommand);
      console.log();
    }
    console.log(helpMessage);
  }
}

async function build(input: string, output: string, header?: string) {
  let buildFailed = false;
  try {
    // create a bundle
    await esbuild.build({
      platform: "node",
      bundle: true,
      minify: true,
      format: "esm",
      allowOverwrite: true,
      entryPoints: [input],
      outfile: output,
      banner: {
        js: header ?? "",
      },
      footer: {
        js: "function SetupZwooBot() { return new Bot(); }",
      },
    });
  } catch (error) {
    buildFailed = true;
    // do some error reporting
    console.error(error);
  }

  if (buildFailed) {
    console.error("Build failed");
    process.exit(1);
  }
}

async function validate(input: string) {
  const randomString = Math.random().toString(36).substring(2, 8);
  const tmpOut = path.resolve(
    `zwoo-bots-builder-temp-validate_${randomString}.mjs`
  );

  await build(
    input,
    tmpOut,
    "var globals = { logger: {}, onEvent: () => {}, rand: {}, toInt: () => {}}; class WholeGameBotStateManager {}; class BasicBotStateManager {};"
  );

  try {
    // validate the bundle
    await import("file://" + tmpOut).then((module) => {
      // check if a class named bot is exported
      if (typeof module.Bot !== "function") {
        throw new Error("The bot must export a 'Bot' class");
      }

      const botInstance = new module.Bot();
      // check if the constructor returns an object
      if (typeof botInstance !== "object") {
        throw new Error("The bot must return an object");
      }

      // check if the object has the required methods
      if (typeof botInstance.AggregateNotification !== "function") {
        throw new Error("The bot must have a AggregateNotification method");
      }

      if (typeof botInstance.Reset !== "function") {
        throw new Error("The bot must have a Reset method");
      }
    });
  } catch (error) {
    console.error(error);
  }

  await fs.rm(tmpOut);

  console.log("Bot validated successfully");
}

init().catch((e) => {
  console.error(e);
});
