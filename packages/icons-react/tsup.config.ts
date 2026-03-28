import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/icons/*.tsx"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  bundle: false,
  treeshake: false,
  external: ["react"],
});
