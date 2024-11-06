import { defineBuildConfig } from "unbuild";

export default defineBuildConfig([
  {
    entries: ["src/index"],
    clean: true,
    declaration: true,
    rollup: {
      inlineDependencies: true,
      esbuild: {
        target: "node18",
        minify: true,
      },
    },
  },
  {
    entries: ["bin/cli"],
    clean: true,
    externals: ["esbuild"],
    rollup: {
      inlineDependencies: true,
      cjsBridge: true,
    },
  },
]);
