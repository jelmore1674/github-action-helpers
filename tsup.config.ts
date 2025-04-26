import { defineConfig } from "tsup";

export default defineConfig({
  outDir: "./dist",
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: true,
  clean: true,
  treeshake: "recommended",
  minify: true,
});
