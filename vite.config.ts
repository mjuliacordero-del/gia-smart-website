import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative base so the built folder works from any location (root, subfolder, host).
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Flat output: script.js and styles.css sit at the folder root.
        entryFileNames: "script.js",
        chunkFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? "";
          if (name.endsWith(".css")) return "styles.css";
          return "[name][extname]";
        },
      },
    },
  },
});
