/* eslint-disable */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
const base = process.env.VITE_BASENAME;

console.log(base);

export default defineConfig(({ command, mode }) => {
  // configure base (base url for dev vs. GH pages) for ProtoShell
  const base = command === "serve" ? "/" : "protoshell";

  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base,
  };
});
