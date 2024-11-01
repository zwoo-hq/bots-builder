import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [dts()],
  build: {
    minify: true,
    lib: {
      entry: resolve(__dirname, "main.ts"),
      formats: ["es"],
    },
  },
});
