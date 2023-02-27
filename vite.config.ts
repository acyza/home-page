import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { RouterConfig, CpDocs } from "./vite-plugins";
import { getCommitTime } from "./vite-plugins/utils";

getCommitTime("./cache/acyza", "README.md");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [RouterConfig, CpDocs, vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
