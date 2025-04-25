import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/validations/index.ts",
    "src/git/index.ts",
  ],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
});
