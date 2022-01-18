import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    polyfillDynamicImport: false,
    assetsDir: "",
    manifest: true,
    minify: false,
    target: "es2021",
    outDir: "./public/assets/",
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name][extname]",
        assetFileNames: "[name][extname]",
        manualChunks: undefined, // Désactive la séparation du vendor
      },
      input: {
        app: resolve("./src/front/index.tsx"),
      },
    },
  },
});
