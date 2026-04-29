import { defineConfig } from "tsdown";

export default defineConfig({
  outDir: "./dist",
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  clean: true,
  minify: true,
  target: false,
});
